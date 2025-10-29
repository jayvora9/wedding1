import os
import json
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from PyPDF2 import PdfMerger
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.units import inch

# Register the font once at the top of your script
font_path = r"fonts/Charm-Bold.ttf"
pdfmetrics.registerFont(TTFont("Charm", font_path))

# FONT_NAME = "Charm"


# Paths
json_file = "output.json"
pages_folder = "pages"   # contains 1.png, 2.png, 3.png... 11.png
output_folder = "invitations"

os.makedirs(output_folder, exist_ok=True)

# Load guests
with open(json_file, "r", encoding="utf-8") as f:
    guests = json.load(f)

# Font and style customization
FONT_NAME = "Charm"   # install TTF in system or register in ReportLab
FONT_SIZE = 48
FONT_COLOR = (0, 0, 0)

def png_to_pdf(png_path, pdf_path):
    """Convert PNG to PDF using Pillow"""
    img = Image.open(png_path).convert("RGB")
    img.save(pdf_path, "PDF", resolution=100.0)

def create_page2_pdf(guest_key, guest_data, save_path):
    """Create personalized Page 2 with clickable name link"""
    c = canvas.Canvas(save_path, pagesize=A4)
    width, height = A4
    bg_image = "pages/2.png"  # make sure 2.png is in same folder OR give full path
    c.drawImage(bg_image, 0, 0, width=width, height=height)

    # Text for the name
    name_text = f"{guest_data['name']} & Family"
    
    # Adjust font size based on name length to prevent overflow
    font_size = 30
    if len(name_text) > 25:
        font_size = 29  # Decrease font size by 1 for long names
    if len(name_text) > 27:
        font_size = 28
    if len(name_text) > 30:
        font_size = 26  
    if len(name_text) > 32:
        font_size = 24  
    c.setFont(FONT_NAME, font_size)
    c.setFillColorRGB(22/255, 117/255, 68/255)

    y_position = height - 0.6*inch
    c.drawCentredString(width/1.9, y_position, name_text)

    # ✅ Add clickable link to guest-specific page
    map_link = f"https://jayvora9.github.io/wedding1/{guest_key}"
    # map_link = f"http://localhost:5173/wedding1/{guest_key}"
    text_width = pdfmetrics.stringWidth(name_text, FONT_NAME, font_size)

    c.linkURL(
        map_link,
        (width/1.9 - text_width/2, y_position - 5,
         width/1.9 + text_width/2, y_position + 30),
        relative=0
    )

    # Address below name
    c.setFont(FONT_NAME, font_size)
    c.setFillColorRGB(22/255, 117/255, 68/255)
    # Handle blank address fields
    add1 = guest_data.get('add1', '').strip()
    add2 = guest_data.get('add2', '').strip()
    
    if add1 and add2:
        address_text = add1 + "  " + add2
    elif add1:
        address_text = add1
    elif add2:
        address_text = add2
    else:
        address_text = ""
    print(f"Address for {guest_data['name']}: '{address_text}'")
    if address_text:
        c.drawCentredString(width/2, height - 1.2*inch, address_text)

    c.save()


def generate_invitation(guest_key, guest_data):
    name_folder = os.path.join(output_folder, guest_data["name"])
    os.makedirs(name_folder, exist_ok=True)

    pdf_merger = PdfMerger()
    temp_files = []

    # Always page 1
    temp1 = os.path.join(name_folder, "page1.pdf")
    png_to_pdf(os.path.join(pages_folder, "1.png"), temp1)
    pdf_merger.append(temp1)
    temp_files.append(temp1)

    # Page 2 personalized with clickable link
    temp2 = os.path.join(name_folder, "page2.pdf")
    create_page2_pdf(guest_key, guest_data, temp2)
    pdf_merger.append(temp2)
    temp_files.append(temp2)

    # Page 3
    temp3 = os.path.join(name_folder, "page3.pdf")
    png_to_pdf(os.path.join(pages_folder, "3.png"), temp3)
    pdf_merger.append(temp3)
    temp_files.append(temp3)

    # Afternoon logic
    if guest_data.get("afternoon"):
        if guest_data["afternoonCount"] == "Sah kutum":
            temp5 = os.path.join(name_folder, "page5.pdf")
            png_to_pdf(os.path.join(pages_folder, "5.png"), temp5)
            pdf_merger.append(temp5)
            temp_files.append(temp5)
        elif guest_data["afternoonCount"] == "2 people":
            temp4 = os.path.join(name_folder, "page4.pdf")
            png_to_pdf(os.path.join(pages_folder, "4.png"), temp4)
            pdf_merger.append(temp4)
            temp_files.append(temp4)

    # Evening logic
    if not guest_data.get("evening"):
        raise ValueError(f"Guest {guest_data['name']} has evening = false, which is invalid.")

    if guest_data["eveningCount"] == "Sahkutum":
        for p in [7, 9]:
            temp = os.path.join(name_folder, f"page{p}.pdf")
            png_to_pdf(os.path.join(pages_folder, f"{p}.png"), temp)
            pdf_merger.append(temp)
            temp_files.append(temp)
    elif guest_data["eveningCount"] == "2 people":
        for p in [6, 8]:
            temp = os.path.join(name_folder, f"page{p}.pdf")
            png_to_pdf(os.path.join(pages_folder, f"{p}.png"), temp)
            pdf_merger.append(temp)
            temp_files.append(temp)

    # Always page 10 & 11
    for p in [10, 11]:
        temp = os.path.join(name_folder, f"page{p}.pdf")
        png_to_pdf(os.path.join(pages_folder, f"{p}.png"), temp)
        pdf_merger.append(temp)
        temp_files.append(temp)

    # Save final PDF
    output_pdf = os.path.join(name_folder, f"{guest_data['name']}.pdf")
    pdf_merger.write(output_pdf)
    pdf_merger.close()
    print(f"✅ Created invitation for {guest_data['name']}")

    # Delete all temporary PDFs
    for temp_file in temp_files:
        os.remove(temp_file)

# Generate invitations for all guests
for key, data in guests.items():
    if data.get("side", "").strip().lower() == "vora" and data.get("name","").strip()=="Mr Nehal H Vayeda":
        generate_invitation(key, data)
