import pandas as pd
import random
import json

# Input and output file paths
input_file = "Wedding Jay.xlsx"
output_file = "wedding_guests.json"

# Load the Excel file
df = pd.read_excel(input_file,sheet_name="Form Responses 1")

# 1) Normalize column names (fixes 'Reception ' → 'Reception')
df.rename(columns=lambda c: str(c).strip(), inplace=True)

# 2) Replace NaN with None so JSON has null
df = df.where(pd.notnull(df), None)

# Function to generate a unique random 6-digit number
def generate_unique_key(existing_keys):
    while True:
        key = str(random.randint(100000, 999999))
        if key not in existing_keys:
            return key

json_data = {}
used_keys = set()

for _, row in df.iterrows():
    key = generate_unique_key(used_keys)
    used_keys.add(key)

    # Afternoon details (Chori count)
    afternoon_count = row.get("Chori count (put 0 if no)")
    try:
        afternoon_count = int(afternoon_count) if afternoon_count is not None else 0
    except Exception:
        afternoon_count = 0

    json_data[key] = {
        "name": row.get("Full Name"),
        "add1": row.get("Mumbai Area"),
        "add2": row.get("Village"),
        "side": "Vora",
        "afternoon": afternoon_count > 0,
        "afternoonCount": row.get("Chori"),
        "evening": True,
        "eveningCount": row.get("Reception"),  # now found after stripping headers
    }

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(json_data, f, indent=2, ensure_ascii=False)

print(f"JSON file created: {output_file}")
