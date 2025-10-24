import pandas as pd
import json
import random

def generate_unique_key(existing_keys):
    """Generate a unique random 6-digit number as a string."""
    while True:
        key = str(random.randint(100000, 999999))
        if key not in existing_keys:
            return key

def excel_to_json(excel_path, json_path):
    # Read Excel file
    df = pd.read_excel(excel_path)

    # Define mappings (column names to JSON fields)
    mappings = {
        'Full Name': 'name',       # Column A
        'Mumbai Area': 'add1',     # Column C
        'Village': 'add2',         # Column B
        'Side': 'side',            # Column H
        'Chori count (put 0 if no)': 'afternoonCount',  # Column D
        'Reception count': 'eveningCount'               # Column F
    }

    json_data = {}
    used_keys = set()

    for _, row in df.iterrows():
        unique_id = generate_unique_key(used_keys)
        used_keys.add(unique_id)

        # Check if afternoon column has '0 people'
        afternoon_value = str(row.get('Chori', '')).strip().lower()
        is_afternoon = False if afternoon_value == '0 people' else True

        # Build record
        record = {
            "name": str(row.get('Full Name', '')).strip(),
            "add1": str(row.get('Mumbai Area', '')).strip() if pd.notna(row.get('Mumbai Area')) else "",
            "add2": str(row.get('Village', '')).strip() if pd.notna(row.get('Village')) else "",
            "side": str(row.get('Side', '')).strip(),
            "afternoon": is_afternoon,
            "afternoonCount": str(row.get('Chori', '')).strip(),
            "evening": True,
            "eveningCount": str(row.get('Reception ', '')).strip()
        }

        json_data[unique_id] = record

    # Write JSON to file
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(json_data, f, indent=2, ensure_ascii=False)

    print(f"✅ JSON file successfully created at: {json_path}")


if __name__ == "__main__":
    excel_file = "Wedding Jay (2).xlsx"   # path to your Excel file
    output_json = "output.json" # path to save JSON file
    excel_to_json(excel_file, output_json)
