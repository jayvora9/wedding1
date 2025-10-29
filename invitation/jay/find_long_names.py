import json

def find_long_names(json_file_path, max_length=20):
    """Find and print all names with length greater than specified max_length"""
    
    # Load the JSON file
    with open(json_file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    long_names = []
    
    # Iterate through all guests
    for guest_id, guest_data in data.items():
        name = guest_data.get('name', '')
        if len(name) > max_length:
            long_names.append({
                'id': guest_id,
                'name': name,
                'length': len(name)
            })
    
    # Print results
    if long_names:
        print(f"Found {len(long_names)} names with length greater than {max_length} characters:\n")
        print(f" {'Length':<8} {'Name'}")
        print("-" * 50)
        
        for entry in long_names:
            print(f" {entry['length']:<8} {entry['name']}")
    else:
        print(f"No names found with length greater than {max_length} characters.")
    
    return long_names

if __name__ == "__main__":
    json_file = "output.json"
    find_long_names(json_file, 23)