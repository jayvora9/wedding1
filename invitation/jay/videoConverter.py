import os
import fitz  # PyMuPDF
from PIL import Image, ImageChops
from moviepy import ImageClip, concatenate_videoclips, AudioFileClip
from moviepy.video.fx import FadeIn, FadeOut

# ===== SETTINGS =====
main_folder = "test/"          # Folder containing PDFs
pdf_page_duration = 6          # seconds per page
fade_duration = 1              # seconds for fade-in/out
song_path = "inviteSong.mp3"   # Path to background song
target_w, target_h = 1080, 1920  # Output video size

# ===== HELPER: auto-crop white borders =====
def trim_whitespace(im):
    bg = Image.new(im.mode, im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg)
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)
    return im

# ===== MAIN LOGIC =====
print("Starting video conversion...")

for root, dirs, files in os.walk(main_folder):
    print(f"\nEntering folder: {root}")
    for file in files:
        if file.lower().endswith(".pdf"):
            pdf_path = os.path.join(root, file)
            print(f"Processing: {pdf_path}")

            doc = fitz.open(pdf_path)
            image_paths = []

            # ===== Convert PDF pages to images =====
            for page_num in range(len(doc)):
                page = doc[page_num]
                pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))  # High resolution
                img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

                # --- Step 1: Trim white borders ---
                trimmed_img = trim_whitespace(img)

                # --- Step 2: Resize to fit 1920x1080 while keeping aspect ratio ---
                trimmed_img.thumbnail((target_w, target_h), Image.Resampling.LANCZOS)

                # --- Step 3: Pad with white background to exactly 1920x1080 ---
                bg = Image.new("RGB", (target_w, target_h), (255, 255, 255))
                x = (target_w - trimmed_img.width) // 2
                y = (target_h - trimmed_img.height) // 2
                bg.paste(trimmed_img, (x, y))

                # --- Save final processed image ---
                img_path = os.path.join(root, f"{os.path.splitext(file)[0]}_page{page_num+1}_clean.png")
                bg.save(img_path)
                image_paths.append(img_path)

            # ===== Create video clips =====
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

            # ===== Combine all clips =====
            video = concatenate_videoclips(clips, method="compose")

            # ===== Add background music =====
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

            # ===== Export final video =====
            video_path = os.path.join(root, f"{os.path.splitext(file)[0]}.mp4")
            video.write_videofile(video_path, fps=24)
            print(f"✅ Saved video: {video_path}")

            # ===== Cleanup temporary images =====
            for img in image_paths:
                os.remove(img)
