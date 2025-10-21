import os
import fitz  # PyMuPDF
from moviepy.editor import ImageClip, concatenate_videoclips, AudioFileClip

# ===== SETTINGS =====
main_folder = "D:/SHAAY/invitation/jay/invitation"  # Change to your jay folder path
pdf_page_duration = 5  # seconds per page (customizable)
fade_duration = 1      # seconds for fade-in/out
song_path = "D:/SHAAY/invitation/jay/Ishq Hai - PagalWorld.mp3"  # Change to your song path

# ===== LOOP THROUGH FOLDERS =====
print("Starting video conversion...")
for root, dirs, files in os.walk(main_folder):
    print("Root:", root)
    print("Dirs:", dirs)
    print("Files:", files)
    print(f"Entering folder: {root}")
    for file in files:
        if file.lower().endswith(".pdf"):
            pdf_path = os.path.join(root, file)
            print(f"Processing: {pdf_path}")

            # ===== CONVERT PDF TO IMAGES =====
            doc = fitz.open(pdf_path)
            image_paths = []

            for page_num in range(len(doc)):
                page = doc[page_num]
                pix = page.get_pixmap()
                img_path = os.path.join(root, f"{os.path.splitext(file)[0]}_page{page_num+1}.png")
                pix.save(img_path)
                image_paths.append(img_path)

            # ===== CREATE VIDEO CLIPS WITH TRANSITIONS =====
            clips = []
            for img in image_paths:
                clip = ImageClip(img).set_duration(pdf_page_duration)
                clip = clip.crossfadein(fade_duration).crossfadeout(fade_duration)
                clips.append(clip)

            # Concatenate clips with crossfade effect
            video = concatenate_videoclips(clips, method="compose")

            # ===== ADD AUDIO =====
            if os.path.exists(song_path):
                audio = AudioFileClip(song_path)
                audio = audio.set_duration(video.duration)  # match video length
                video = video.set_audio(audio)

            # ===== SAVE VIDEO =====
            video_path = os.path.join(root, f"{os.path.splitext(file)[0]}.mp4")
            video.write_videofile(video_path, fps=24)

            # ===== CLEANUP TEMP IMAGES =====
            for img in image_paths:
                os.remove(img)

            print(f"Saved video: {video_path}")
