import os
import fitz  # PyMuPDF
from PIL import Image, ImageChops
from moviepy import ImageClip, concatenate_videoclips, AudioFileClip
from moviepy.video.fx import FadeIn, FadeOut
from concurrent.futures import ThreadPoolExecutor
import multiprocessing

# ===== SETTINGS =====
main_folder = "./test"    # Folder containing PDFs
pdf_page_duration = 6          # seconds per page
fade_duration = 1              # seconds for fade-in/out
song_path = "inviteSong.mp3"   # Path to background song
target_w, target_h = 1080, 1920  # Output video size
# If you want to start processing from a specific folder (under `main_folder`),
# set START_FOLDER to its name (e.g. "Nilesh Premji Chheda") or a path
# relative to the script. Leave empty to process all folders from the beginning.
# START_FOLDER = "Nilesh Premji Chheda"
START_FOLDER = None

# ===== HELPER: auto-crop white borders =====
def trim_whitespace(im):
    bg = Image.new(im.mode, im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg)
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)
    return im

# ===== HELPER: process single PDF =====
def process_pdf(pdf_path):
    print(f"Processing: {pdf_path}")
    
    # Check if video already exists
    video_path = os.path.join(os.path.dirname(pdf_path), f"{os.path.splitext(os.path.basename(pdf_path))[0]}.mp4")
    if os.path.exists(video_path):
        print(f"Found existing video: {video_path}")
        os.remove(video_path)
        print(f"Removed old video, will create new one")

    doc = fitz.open(pdf_path)
    image_paths = []
    
    # Process PDF pages in parallel
    def process_page(page_num):
        page = doc[page_num]
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        trimmed_img = trim_whitespace(img)
        trimmed_img.thumbnail((target_w, target_h), Image.Resampling.LANCZOS)
        bg = Image.new("RGB", (target_w, target_h), (255, 255, 255))
        x = (target_w - trimmed_img.width) // 2
        y = (target_h - trimmed_img.height) // 2
        bg.paste(trimmed_img, (x, y))
        img_path = os.path.join(os.path.dirname(pdf_path), f"{os.path.splitext(os.path.basename(pdf_path))[0]}_page{page_num+1}_clean.png")
        bg.save(img_path)
        return img_path

    # Use ThreadPoolExecutor for parallel page processing
    with ThreadPoolExecutor(max_workers=multiprocessing.cpu_count()) as executor:
        image_paths = list(executor.map(process_page, range(len(doc))))

    return image_paths, video_path

# ===== MAIN LOGIC =====
print("Starting video conversion...")

# Get all PDF files in alphabetical order
pdf_files = []
for root, dirs, files in os.walk(main_folder):
    dirs.sort()  # Process directories in alphabetical order
    for file in sorted(files):  # Process files in alphabetical order
        if file.lower().endswith(".pdf"):
            pdf_files.append(os.path.join(root, file))
# Resolve START_FOLDER to an absolute path (if provided) so we can skip until it
# script_dir = os.path.dirname(os.path.abspath(__file__))
# main_folder_abs = os.path.abspath(os.path.join(script_dir, main_folder))
# start_folder_abs = None
# if START_FOLDER and START_FOLDER.strip():
#     # If START_FOLDER is absolute, use it; otherwise resolve under main_folder
#     if os.path.isabs(START_FOLDER):
#         start_folder_abs = os.path.abspath(START_FOLDER)
#     else:
#         start_folder_abs = os.path.abspath(os.path.join(main_folder_abs, START_FOLDER))

# Process PDFs one by one (skip until we hit start_folder_abs if set)
script_dir = os.path.dirname(os.path.abspath(__file__))
main_folder_abs = os.path.abspath(os.path.join(script_dir, main_folder))
start_folder_abs = None
if START_FOLDER and START_FOLDER.strip():
    # If START_FOLDER is absolute, use it; otherwise resolve under main_folder
    if os.path.isabs(START_FOLDER):
        start_folder_abs = os.path.abspath(START_FOLDER)
    else:
        start_folder_abs = os.path.abspath(os.path.join(main_folder_abs, START_FOLDER))

started = False if start_folder_abs else True
for pdf_path in pdf_files:
    pdf_dir_abs = os.path.abspath(os.path.dirname(pdf_path))
    # If a start folder is set and we haven't reached it yet, skip until we do
    if not started:
        # If the PDF lives in (or under) the start folder, begin processing
        if pdf_dir_abs == start_folder_abs or pdf_dir_abs.startswith(start_folder_abs + os.sep):
            started = True
        else:
            print(f"Skipping (before start): {pdf_path}")
            continue
    print(f"\nProcessing PDF in: {os.path.dirname(pdf_path)}")
    try:
        # Process PDF and get image paths
        image_paths, video_path = process_pdf(pdf_path)

        # Create video clips with optimized loading
        clips = []
        for img in image_paths:
            clip = ImageClip(img).with_duration(pdf_page_duration)
            try:
                clip = clip.fx(FadeIn.FadeIn, fade_duration)
                clip = clip.fx(FadeOut.FadeOut, fade_duration)
            except Exception:
                try:
                    clip = clip.fx(FadeIn, fade_duration)
                    clip = clip.fx(FadeOut, fade_duration)
                except Exception:
                    pass
            clips.append(clip)

        # Combine clips and add audio
        video = concatenate_videoclips(clips, method="compose")
        if os.path.exists(song_path):
            audio = AudioFileClip(song_path)
            try:
                audio = audio.with_duration(video.duration)
            except Exception:
                audio = audio.set_duration(video.duration)
            try:
                video = video.set_audio(audio)
            except Exception:
                setattr(video, "audio", audio)

        # Export optimized video
        print(f"Creating video: {video_path}")
        video.write_videofile(video_path, fps=24, threads=multiprocessing.cpu_count())
        print(f"✅ Saved video: {video_path}")

    except Exception as e:
        print(f"❌ Error processing {pdf_path}: {str(e)}")
    
    finally:
        # Cleanup temporary images
        for img in image_paths:
            try:
                os.remove(img)
            except:
                pass
