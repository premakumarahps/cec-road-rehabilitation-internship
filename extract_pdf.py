import sys
sys.stdout.reconfigure(encoding='utf-8')

import pdfplumber
import json

pdf_path = r'd:\1.Antigravity Projects\16_CEC_Internship\docs\learning-outcomes\CEC Internship.pdf'
output_path = r'd:\1.Antigravity Projects\16_CEC_Internship\cec_internship_full.txt'

with pdfplumber.open(pdf_path) as pdf:
    total = len(pdf.pages)
    print(f"Total pages: {total}")
    
    all_text = []
    image_pages = []
    
    for i, page in enumerate(pdf.pages):
        text = page.extract_text()
        if text and len(text.strip()) > 20:
            all_text.append(f"\n=== PAGE {i+1} ===\n{text}")
        else:
            image_pages.append(i+1)
            all_text.append(f"\n=== PAGE {i+1} === [IMAGE/FIGURE PAGE - No extractable text]")
        
        if (i+1) % 20 == 0:
            print(f"  Processed {i+1}/{total} pages...")
    
    print(f"\nImage-only pages: {image_pages}")
    print(f"Text pages: {total - len(image_pages)}")

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(f"CEC Internship Report - Full Text Extraction\n")
    f.write(f"Total Pages: {total}\n")
    f.write(f"Image-only pages: {image_pages}\n\n")
    f.write("\n".join(all_text))

print(f"\nSaved to {output_path}")
print(f"File size: {len(chr(10).join(all_text))} chars")
