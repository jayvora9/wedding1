import pandas as pd
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.units import inch, cm
from reportlab.lib.colors import Color

# Register the font once at the top of your script
font_path = r"D:/SHAAY/invitation/jay/fonts/Charm-Bold.ttf"
pdfmetrics.registerFont(TTFont("Charm", font_path))

def read_excel_data(excel_file, sheet_name="kankotri"):
    """Read data from Excel file"""
    try:
        df = pd.read_excel(excel_file, sheet_name=sheet_name)
        # Assuming columns are A=Name, B=Kutch, C=Mumbai Area
        data = []
        for index, row in df.iterrows():
            if pd.notna(row.iloc[0]):  # Check if name is not empty
                data.append({
                    'name': str(row.iloc[0]) if pd.notna(row.iloc[0]) else "",
                    'kutch': str(row.iloc[1]) if pd.notna(row.iloc[1]) else "",
                    'mumbai': str(row.iloc[2]) if pd.notna(row.iloc[2]) else ""
                })
        return data
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        return []

def create_name_layout_pdf(data, output_file="name_layout.pdf"):
    """Create PDF with names arranged in blocks"""
    
    # Page dimensions: 13x19 inches
    page_width = 13 * inch
    page_height = 19 * inch
    
    # Block dimensions - reduced width to fit 3 columns
    block_width = 11 * cm  # Reduced from 12cm to 11cm
    block_height = 2 * cm
    
    # Margins - reduced to fit more content
    margin = 0.3 * inch  # Reduced from 0.5 inch
    block_margin = 0.1 * cm  # Reduced from 0.5cm

    # Calculate available space
    available_width = page_width - (2 * margin)
    available_height = page_height - (2 * margin)
    
    # Calculate how many blocks fit per row and column
    blocks_per_row = int(available_width // (block_width + block_margin))
    blocks_per_column = int(available_height // (block_height + block_margin))
    
    print(f"Page size: {page_width/inch:.1f}x{page_height/inch:.1f} inches")
    print(f"Blocks per row: {blocks_per_row}")
    print(f"Blocks per column: {blocks_per_column}")
    print(f"Total blocks per page: {blocks_per_row * blocks_per_column}")
    
    # Create PDF
    c = canvas.Canvas(output_file, pagesize=(page_width, page_height))
    
    # Font settings - adjusted for smaller blocks
    font_name = "Charm"
    name_font_size = 22  # Reduced from 24 for smaller blocks
    address_font_size = 18  # Reduced from 20 for smaller blocks
    
    # Color settings (same as invite.py)
    text_color = Color(22/255, 117/255, 68/255)
    border_color = Color(0, 0, 0)  # Black for hairline border
    
    current_page = 1
    block_count = 0
    
    for i, entry in enumerate(data):
        # Calculate position
        row = block_count // blocks_per_row
        col = block_count % blocks_per_row
        
        # Check if we need a new page
        if row >= blocks_per_column:
            c.showPage()
            current_page += 1
            block_count = 0
            row = 0
            col = 0
        
        # Calculate block position
        x = margin + col * (block_width + block_margin)
        y = page_height - margin - (row + 1) * (block_height + block_margin)
        
        # Draw hairline border
        c.setStrokeColor(border_color)
        c.setLineWidth(0.5)
        # c.rect(x, y, block_width, block_height, stroke=1, fill=0)
        
        # Set text color
        c.setFillColor(text_color)
        
        # Draw name (centered, positioned below top border)
        if entry['name']:
            c.setFont(font_name, name_font_size)
            name_y = y + block_height - 0.7 * cm  # Moved further down to avoid border overlap
            c.drawCentredString(x + block_width/2, name_y, entry['name'])
        
        # Draw Kutch and Mumbai area on same line (centered, bottom part of block)
        address_line = ""
        if entry['kutch'] and entry['mumbai']:
            address_line = f"{entry['kutch']}  •  {entry['mumbai']}"
        elif entry['kutch']:
            address_line = entry['kutch']
        elif entry['mumbai']:
            address_line = entry['mumbai']
        
        if address_line:
            c.setFont(font_name, address_font_size)
            address_y = y + 0.3 * cm  # Positioned above bottom border
            c.drawCentredString(x + block_width/2, address_y, address_line)
        
        block_count += 1
    
    # Save the PDF
    c.save()
    print(f"✅ Created PDF with {len(data)} entries across {current_page} page(s): {output_file}")

def main():
    # Configuration
    excel_file = "C:\\Users\\Jay Vora\\Downloads\\Wedding Jay (2).xlsx"  # Update this to your Excel file name
    output_file = "kankotri_names.pdf"
    
    print("Reading Excel data...")
    data = read_excel_data(excel_file)
    
    if not data:
        print("❌ No data found or error reading Excel file")
        return
    
    print(f"Found {len(data)} entries")
    print("Creating PDF layout...")
    
    create_name_layout_pdf(data, output_file)

if __name__ == "__main__":
    main()