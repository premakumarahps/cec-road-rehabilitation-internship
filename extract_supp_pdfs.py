import sys
sys.stdout.reconfigure(encoding='utf-8')

import pdfplumber
import json

# Extract Final Report PDF (the compact one, likely summary)
pdf_path = r'd:\1.Antigravity Projects\16_CEC_Internship\docs\final-report\Final report.pdf'
output_path = r'd:\1.Antigravity Projects\16_CEC_Internship\final_report_text.txt'

with pdfplumber.open(pdf_path) as pdf:
    total = len(pdf.pages)
    print(f"Final Report - Total pages: {total}")
    
    all_text = []
    for i, page in enumerate(pdf.pages):
        text = page.extract_text()
        if text:
            all_text.append(f"\n=== PAGE {i+1} ===\n{text}")
        else:
            all_text.append(f"\n=== PAGE {i+1} === [IMAGE PAGE]")

with open(output_path, 'w', encoding='utf-8') as f:
    f.write("\n".join(all_text))

print(f"Saved to {output_path}")

# Also extract managerial problem
pdf_path2 = r'd:\1.Antigravity Projects\16_CEC_Internship\docs\managerial-problem\Managerial Problem Proposal.pdf'
with pdfplumber.open(pdf_path2) as pdf:
    total2 = len(pdf.pages)
    print(f"\nManagerial Problem PDF - Total pages: {total2}")
    all_text2 = []
    for i, page in enumerate(pdf.pages):
        text = page.extract_text()
        if text:
            all_text2.append(f"\n=== PAGE {i+1} ===\n{text}")
        else:
            all_text2.append(f"\n=== PAGE {i+1} === [IMAGE PAGE]")
    
    with open(r'd:\1.Antigravity Projects\16_CEC_Internship\managerial_problem_text.txt', 'w', encoding='utf-8') as f:
        f.write("\n".join(all_text2))
    print("Saved managerial_problem_text.txt")

# Also extract Service Letter
pdf_path3 = r'd:\1.Antigravity Projects\16_CEC_Internship\docs\service-letter\CEC Trainee Service Letter.pdf'
with pdfplumber.open(pdf_path3) as pdf:
    total3 = len(pdf.pages)
    print(f"\nService Letter PDF - Total pages: {total3}")
    all_text3 = []
    for i, page in enumerate(pdf.pages):
        text = page.extract_text()
        if text:
            all_text3.append(f"\n=== PAGE {i+1} ===\n{text}")
    
    with open(r'd:\1.Antigravity Projects\16_CEC_Internship\service_letter_text.txt', 'w', encoding='utf-8') as f:
        f.write("\n".join(all_text3))
    print("Saved service_letter_text.txt")

print("\nAll supplementary PDFs extracted!")
