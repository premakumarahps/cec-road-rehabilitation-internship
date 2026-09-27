# Geotechnical DCP Layer Analyzer — Web Tool Architecture & Blueprint

**Project Host:** `16_CEC_Internship`  
**Target Module:** Interactive Dynamic Cone Penetrometer (DCP) Automated Stratification Tool  
**Engineer:** Sandun Premakumara (Materials & Civil Infrastructure Internship)  
**Status:** Architectural Blueprint & Implementation Specification  

---

## 1. Executive Vision
During the 24-week industrial internship at Consulting Engineers & Contractors (Pvt) Ltd (CEC) on the Central Expressway and national road rehabilitation projects, soil compaction and California Bearing Ratio (CBR) estimations relied heavily on manual Dynamic Cone Penetrometer (DCP) field logs processed through spreadsheet templates.

This project converts the static Excel analysis into a **reactive, browser-based geotechnical engineering tool** that ingests field DCP logs (blow counts vs. penetration depth in mm), applies mathematical **Root Mean Square Deviation (RMSD)** and linear slope regression, and renders instant soil layer stratification profiles and in-situ CBR values.

---

## 2. Core Mathematical & Engineering Logic

### 2.1 Penetration Index (DPI)
$$\text{DPI} = \frac{\Delta \text{Depth (mm)}}{\Delta \text{Blow Count}}$$

### 2.2 In-Situ CBR Correlations (TRL / ASTM D6951)
Standard empirical correlation formula for granular subgrades:
$$\log_{10}(\text{CBR}) = 2.48 - 1.057 \times \log_{10}(\text{DPI})$$
For fine-grained cohesive soils:
$$\log_{10}(\text{CBR}) = 2.46 - 1.12 \times \log_{10}(\text{DPI})$$

### 2.3 Automated Layer Boundary Detection (RMSD Algorithm)
1. **Cumulative Blow vs. Depth Curve Splitting:** Treat the cumulative curve as a piecewise linear function.
2. **Iterative Horizon Splitting:** Divide the test depth $H$ into candidate horizons $z_k$.
3. **Slope Fit Evaluation:** For each candidate boundary, calculate the least-squares linear regression slope.
4. **RMSD Minimization:** Select boundary points $z_k^*$ that minimize the root mean square error between the raw cumulative blow curve and the piecewise linear segments.
5. **Geotechnical Validation:** Ensure layer thicknesses exceed minimum physical threshold ($\ge 75\text{ mm}$) to prevent false micro-layering.

---

## 3. UI / UX Design & Component Layout

```
+-------------------------------------------------------------------------------+
|  DCP Geotechnical Soil Stratification Suite (CEC Internship Tool)             |
+-------------------------------------------------------------------------------+
| [Upload Excel / CSV Log]  or  [Load CEC Sample: Ch. 12+450 Outer Lane]        |
+------------------------------------+------------------------------------------+
| INPUT & CALIBRATION PANEL          | INTERACTIVE LAYER STRATIFICATION DIAGRAM |
| - Hammer Weight: 8.0 kg (Std)      | +-- Depth (mm) -------------------------+|
| - Drop Height: 575 mm              | | [Layer 1: Asphalt Premix (0-85mm)]    ||
| - Correlation Model: TRL / ASTM    | | CBR: >80% | DPI: 1.2 mm/blow          ||
| - Sensitivity Threshold: 0.15 RMSD | |---------------------------------------||
|                                    | | [Layer 2: Dense ABC Base (85-260mm)]  ||
| [Run Automated Stratification]     | | CBR: 48%  | DPI: 2.8 mm/blow          ||
|                                    | |---------------------------------------||
|                                    | | [Layer 3: Subbase (260-480mm)]        ||
|                                    | | CBR: 18%  | DPI: 6.4 mm/blow          ||
|                                    | |---------------------------------------||
|                                    | | [Layer 4: Natural Subgrade (>480mm)]  ||
|                                    | | CBR: 6.2% | DPI: 14.2 mm/blow         ||
|                                    | +---------------------------------------+|
+------------------------------------+------------------------------------------+
| TABULAR EXPORT & FIELD REPORT                                                 |
| [Download Certified Geotechnical Summary PDF]   [Export Stratified CSV]       |
+-------------------------------------------------------------------------------+
```

---

## 4. Implementation Stack inside `16_CEC_Internship`
- **Framework:** React + TypeScript (Vite)
- **Visualization:** Chart.js with dynamic slope line annotation plugins / SVG Cross-Section
- **Data Parser:** `xlsx` / `papaparse` for reading CEC raw field Excel files directly in client memory
- **Export:** `jspdf` + `jspdf-autotable` for generating road authority compliance reports
