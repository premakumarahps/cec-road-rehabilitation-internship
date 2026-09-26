import zipfile, os, re, json

xlsm_files = {
    'DCP_Report_Generator': r'd:\1.Antigravity Projects\16_CEC_Internship\docs\industrial-problem\DCP Test Report Generator\DCP Test Report Generator.xlsm',
    'LOT1_RFI_Entry': r'd:\1.Antigravity Projects\16_CEC_Internship\docs\industrial-problem\RFI Automater Programe\LOT1_RFI_Entry.xlsm',
    'BOQ_Item_Details': r'd:\1.Antigravity Projects\16_CEC_Internship\docs\industrial-problem\RFI Automater Programe\BOQ Item Details.xlsm',
    'RFI_Items': r'd:\1.Antigravity Projects\16_CEC_Internship\docs\industrial-problem\RFI Automater Programe\RFI Items.xlsm',
}

results = {}
for name, f in xlsm_files.items():
    try:
        with zipfile.ZipFile(f, 'r') as z:
            all_files = z.namelist()
            
            # Get sheet names from workbook.xml
            sheet_names = []
            if 'xl/workbook.xml' in all_files:
                wb = z.read('xl/workbook.xml').decode('utf-8', errors='ignore')
                sheet_names = re.findall(r'name="([^"]+)"', wb)
            
            # Get shared strings
            shared_strings = []
            if 'xl/sharedStrings.xml' in all_files:
                ss = z.read('xl/sharedStrings.xml').decode('utf-8', errors='ignore')
                shared_strings = re.findall(r'<t[^>]*>([^<]+)</t>', ss)
            
            results[name] = {
                'sheet_names': sheet_names,
                'file_count': len(all_files),
                'has_vba': 'xl/vbaProject.bin' in all_files,
                'shared_strings_count': len(shared_strings),
                'shared_strings_sample': shared_strings[:100],
            }
            
            print(f"=== {name} ===")
            print(f"Sheets: {sheet_names}")
            print(f"Has VBA: {'xl/vbaProject.bin' in all_files}")
            print(f"Shared Strings ({len(shared_strings)} total):")
            for s in shared_strings[:50]:
                print(f"  - {s}")
            print()
            
    except Exception as e:
        results[name] = {'error': str(e)}
        print(f"{name}: Error - {e}")

with open(r'd:\1.Antigravity Projects\16_CEC_Internship\excel_data.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)
print("Saved to excel_data.json")
