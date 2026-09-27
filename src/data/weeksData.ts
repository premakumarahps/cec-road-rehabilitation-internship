export interface WeekData {
  phase: number
  week: number
  title: string
  subtitle: string
  desc: string
  extendedText: string
  standards: string[]
  tags: string[]
  color: string
  image?: string
  imageCaption?: string
  equations?: string[]
  keyFindings: string[]
  deliverable: string
}

export const WEEKS_DATA: WeekData[] = [
  {
    phase: 1,
    week: 1,
    title: 'Company & Project Orientation',
    subtitle: 'HSE Induction, Corporate Hierarchy & Site Logistics',
    desc: 'Orientation at CEC corporate head office, HSE induction, organizational structure review, and introduction to the Homagama project office layout.',
    extendedText: 'Commenced the 24-week industrial training at Consulting Engineering & Contractors (Pvt) Ltd (CEC). Underwent comprehensive Health, Safety & Environment (HSE) induction covering PPE requirements, traffic management protocols on active roads, emergency response procedures, and labor management standards. Familiarized with CEC corporate governance, ISO 9001 certified quality management systems, and the project management organizational hierarchy.',
    standards: ['ICTAD SCA/4', 'ISO 9001:2015', 'CEC HSE Manual'],
    tags: ['HSE', 'CEC', 'Orientation', 'ISO 9001'],
    color: '#F59E0B',
    image: '/images/report_image3.png',
    imageCaption: 'Figure 2: Corporate Head Office and Central Materials Laboratory of CEC (Pvt) Ltd',
    keyFindings: [
      'Gained clear understanding of reporting lines between Project Manager, Materials Engineer, Site Engineers, and Lab Technicians.',
      'Studied mandatory personal protective equipment (PPE) protocols for active carriageway inspection.',
      'Understood document control standards for daily site diaries and laboratory records.'
    ],
    deliverable: 'Orientation sign-off, safety induction certification, and initial workspace setup.'
  },
  {
    phase: 1,
    week: 2,
    title: 'ICDP Project Familiarization & Bidding Documents',
    subtitle: 'World Bank Framework, Contract Administration & BOQ',
    desc: 'Deep study of the Inclusive Connectivity & Development Project (ICDP) scope funded by the World Bank, contract documents (SCA/4, SCA/5, SCA/8), and initial reconnaissance across Lots 1–4.',
    extendedText: 'Analyzed the contractual framework governing the World Bank-funded road rehabilitation in the Homagama electorate. Reviewed Conditions of Contract (ICTAD SCA/4), Standard Specifications for Construction and Maintenance of Roads and Bridges (ICTAD SCA/5), and the Highway Schedule of Rates (SCA/8). Conducted preliminary field visits to the 4 road lots (COL/All segments) to inspect existing road conditions, surface distresses, edge erosion, and drainage deficiencies.',
    standards: ['ICTAD SCA/4', 'ICTAD SCA/5', 'ICTAD SCA/8 (HSR)', 'World Bank Safeguards'],
    tags: ['ICDP', 'BOQ', 'RDA', 'World Bank', 'Contract'],
    color: '#F59E0B',
    image: '/images/report_image7.png',
    imageCaption: 'Figure 6: Initial Reconnaissance and Road Rehabilitation Work in Homagama (Lot 1)',
    keyFindings: [
      'Contract awarded to CEC based on lowest evaluated responsive tender under competitive World Bank procurement.',
      'Identified critical bottlenecks in existing rural roads: poor side drainage, inadequate base thickness, and localized subgrade failures.',
      'Mapped out BOQ payment items linked directly to material testing requirements under Section 1602.'
    ],
    deliverable: 'Contract document summary matrix and preliminary road condition assessment log.'
  },
  {
    phase: 1,
    week: 3,
    title: 'Technical Specs & Laboratory Calibration',
    subtitle: 'ICTAD Section 1602 & Testing Apparatus Verification',
    desc: 'In-depth review of ICTAD SCA/5 specifications for road materials and comprehensive calibration procedures for all laboratory equipment.',
    extendedText: 'Mastered the testing regimes, sampling frequencies, and acceptance criteria stipulated in ICTAD Section 1602 for subgrade, sub-base, aggregate base course (ABC), and bituminous layers. Participated in the routine calibration of CEC field and laboratory equipment including proving rings for CBR frames, compression testing machines (CTM), dial gauges, electronic balances, drying ovens, and Marshall compaction apparatus to ensure precision and audit readiness.',
    standards: ['ICTAD SCA/5 Sec. 1602', 'BS 1377 Part 1', 'BS EN 12390-4', 'ISO/IEC 17025'],
    tags: ['ICTAD', 'Lab Calibration', 'Quality Assurance', 'Testing Specs'],
    color: '#F59E0B',
    image: '/images/report_image5.jpeg',
    imageCaption: 'Figure 4: Routine Verification and Calibration of Laboratory Testing Equipment at CEC',
    keyFindings: [
      'Proving rings and digital load cells verified against certified master proving rings.',
      'Thermostatic drying ovens calibrated for uniform temperature distribution at 105°C ± 5°C.',
      'Established systematic logging protocols for calibration certificates and equipment traceability.'
    ],
    deliverable: 'Laboratory equipment calibration register and compliance checklist against ICTAD SCA/5.'
  },
  {
    phase: 1,
    week: 4,
    title: 'DCP Testing & VBA Automation Inception',
    subtitle: 'Field Dynamic Cone Penetration & Algorithm Design',
    desc: 'Conducted first series of field Dynamic Cone Penetration (DCP) tests. Identified severe manual reporting delays, sparking the inception of the Excel VBA automation software.',
    extendedText: 'Performed DCP tests across active road sections in Lot 1 in accordance with ASTM D6951. Observed that manual plotting of depth-versus-blow charts and visual layer identification took over 45 minutes per test and produced inconsistent results among technicians. Conceived and drafted the mathematical architecture for an automated Excel tool using Root Mean Square Deviation (RMSD) breakpoint analysis to delineate distinct soil layer boundaries and compute layer-specific CBR values automatically.',
    standards: ['ASTM D6951/D6951M-09', 'BS EN ISO 22476-2', 'TRL Road Note 8'],
    tags: ['DCP', 'VBA Automation', 'Subgrade', 'RMSD', 'Algorithm'],
    color: '#F59E0B',
    image: '/images/report_image16.jpeg',
    imageCaption: 'Figure 15: Conducting Field Dynamic Cone Penetration (DCP) Test along Subgrade Alignment',
    equations: [
      'CBR = 292 \\times DPI^{-1.12} \\quad (\\text{for } DPI > 1.26)',
      'RMSD = \\sqrt{\\frac{1}{N}\\sum_{i=1}^N (d_i - \\hat{d}_i)^2}'
    ],
    keyFindings: [
      'Identified weak subgrade pockets (CBR < 5%) requiring undercut and rock-fill replacement.',
      'Manual report creation caused backlogs in consultant approval and site handovers.',
      'Prototyped the RMSD breakpoint detection algorithm to automate soil layer boundary detection up to 12 layers.'
    ],
    deliverable: 'DCP field test logs and v1.0 architecture blueprint of the Automated DCP Report Generator.'
  },
  {
    phase: 1,
    week: 5,
    title: 'Standard Proctor Compaction Test',
    subtitle: 'Moisture-Density Relationships (OMC & MDD)',
    desc: 'Determined Optimum Moisture Content (OMC) and Maximum Dry Density (MDD) for borrow pit soil samples using the Standard Proctor test (ASTM D698).',
    extendedText: 'Executed Standard Proctor compaction tests in the CEC laboratory to establish compaction baseline curves for subgrade and embankment fill soils. Processed air-dried soil passing the 4.75mm sieve, compacted in three equal layers inside a 101.6mm diameter mold using a 2.495kg rammer dropped from 305mm (25 blows per layer, imparting ~596 kJ/m³ compactive energy). Calculated wet density and dry density across varying water contents to construct the bell-shaped compaction curve and Zero Air Voids (ZAV) theoretical curve.',
    standards: ['ASTM D698 (Method A)', 'BS 1377 Part 4', 'AASHTO T 99'],
    tags: ['Proctor', 'OMC', 'MDD', 'Compaction Curve', 'ZAV'],
    color: '#F59E0B',
    image: '/images/report_image17.jpeg',
    imageCaption: 'Figure 16: Sample Preparation, Pulverizing, and Moisture Conditioning for Standard Proctor Test',
    equations: [
      '\\rho_{\\text{wet}} = \\frac{W_{\\text{compacted}} - W_{\\text{mold}}}{V_{\\text{mold}}}',
      '\\rho_d = \\frac{\\rho_{\\text{wet}}}{1 + w}',
      '\\rho_{\\text{ZAV}} = \\frac{G_s \\cdot \\rho_w}{1 + w \\cdot G_s}'
    ],
    keyFindings: [
      'Borrow pit sample exhibited OMC of 13.8% and MDD of 1.84 g/cm³.',
      'Observed that field compaction dry of optimum creates brittle structure, while wet of optimum causes spongy subgrade.',
      'Established target density threshold (95% MDD = 1.748 g/cm³) for subgrade field density testing.'
    ],
    deliverable: 'Standard Proctor compaction report with plotted dry density vs moisture content curves.'
  },
  {
    phase: 1,
    week: 6,
    title: 'Sieve Analysis & Soil Classification',
    subtitle: 'Gradation Envelopes, Cu, Ck & USCS Grouping',
    desc: 'Particle Size Distribution (PSD) determination of soils and aggregates via dry and washed mechanical sieve analysis in compliance with BS 1377 Part 2.',
    extendedText: 'Carried out mechanical sieve analysis on granular subgrade and sub-base borrow materials using a British Standard sieve nest (75mm down to 0.075mm). Plotted semi-logarithmic gradation curves to extract characteristic diameters ($d_{10}, d_{30}, d_{60}$) and compute the Uniformity Coefficient ($C_u$) and Coefficient of Curvature ($C_k$). Classified soils using the Unified Soil Classification System (USCS) and AASHTO classification, confirming suitability for roadbed stabilization.',
    standards: ['BS 1377 Part 2', 'ASTM D422 / C136', 'AASHTO M 145'],
    tags: ['Sieve Analysis', 'PSD', 'Gradation', 'Cu', 'Ck', 'USCS'],
    color: '#F59E0B',
    image: '/images/supp_lesson_04_b__soil_classification_p17_76.png',
    imageCaption: 'Particle Size Distribution Gradation Curve and Sieve Nest Analysis in CEC Laboratory',
    equations: [
      'C_u = \\frac{d_{60}}{d_{10}} \\quad (\\ge 4 \\text{ for gravel, } \\ge 6 \\text{ for sand})',
      'C_k = \\frac{d_{30}^2}{d_{60} \\times d_{10}} \\quad (1 \\le C_k \\le 3 \\text{ for well-graded})'
    ],
    keyFindings: [
      'Borrow pit material qualified as Well-Graded Sand with Silt (SW-SM) with $C_u = 7.4$ and $C_k = 1.8$.',
      'Material fines passing 75µm sieve remained under 12%, ensuring frost and moisture resistance.',
      'Confirmed full alignment with ICTAD Section 1602 grading envelope for Type I granular sub-base.'
    ],
    deliverable: 'Gradation chart analysis, grain size curves, and formal soil classification technical memo.'
  },
  {
    phase: 2,
    week: 7,
    title: 'California Bearing Ratio (CBR) Testing',
    subtitle: 'Subgrade Strength Evaluation & Soaked vs. Unsoaked Behavior',
    desc: 'Determined the California Bearing Ratio (CBR) of compacted subgrade soils in both unsoaked and 4-day soaked conditions to evaluate pavement bearing capacity.',
    extendedText: 'Conducted laboratory CBR tests in accordance with ASTM D1883. Prepared soil specimens compacted at OMC in cylindrical molds with surcharge weights (4.5kg) simulating pavement overburden. Measured axial penetration resistance at 1.27 mm/min using a motorized loading press. Monitored 96-hour soaking swell to detect expansive clay tendencies. Plotted load-penetration curves to determine CBR values at 2.5mm and 5.0mm penetration depths.',
    standards: ['ASTM D1883', 'BS 1377 Part 4', 'AASHTO T 193'],
    tags: ['CBR', 'Bearing Capacity', 'Subgrade Strength', 'Soaking Swell'],
    color: '#14B8A6',
    image: '/images/presentation_image9.png',
    imageCaption: 'Motorized CBR Testing Frame and Dial Gauge Setup in CEC Materials Laboratory',
    equations: [
      '\\text{CBR}_{2.5} = \\left(\\frac{\\text{Load at } 2.5\\text{mm}}{13.24\\text{ kN}}\\right) \\times 100\\%',
      '\\text{CBR}_{5.0} = \\left(\\frac{\\text{Load at } 5.0\\text{mm}}{19.96\\text{ kN}}\\right) \\times 100\\%'
    ],
    keyFindings: [
      'Natural subgrade exhibited soaked CBR of 7.2% to 9.5% (classifying as S3 to S4 subgrade class).',
      'Soaking swell remained below 0.8%, confirming absence of high-plasticity expansive clay minerals.',
      'S3/S4 subgrade class provided foundation design inputs for RDA Pavement Design Chart 2.'
    ],
    deliverable: 'CBR load-penetration curves, swell percentages, and subgrade classification report.'
  },
  {
    phase: 2,
    week: 8,
    title: 'Atterberg Limits & Plasticity Index',
    subtitle: 'Liquid Limit (LL), Plastic Limit (PL) & Casagrande Method',
    desc: 'Evaluated clay mineralogy and soil consistency states using Casagrande cup and 3mm thread rolling methods to compute the Plasticity Index (PI).',
    extendedText: 'Assessed the boundary moisture contents separating liquid, plastic, and semi-solid states of fine-grained soil fractions passing 425µm. Operated the Casagrande liquid limit apparatus, counting blow counts required to close a standard 2mm groove over 13mm length at varying moisture contents. Rolled 3mm diameter soil threads on ground glass plate to pinpoint the Plastic Limit. Computed the Plasticity Index ($PI = LL - PL$) and plotted the soil on Casagrande’s Plasticity Chart.',
    standards: ['ASTM D4318', 'BS 1377 Part 2', 'AASHTO T 89 / T 90'],
    tags: ['Atterberg Limits', 'Liquid Limit', 'Plastic Limit', 'PI', 'Casagrande'],
    color: '#14B8A6',
    image: '/images/supp_lesson_04_b__soil_classification_p23_89.png',
    imageCaption: 'Casagrande Liquid Limit Cup and Grooving Tool with Moisture Plotting Chart',
    equations: [
      'PI = LL - PL',
      'A\\text{-Line}: PI = 0.73 \\times (LL - 20)',
      '\\text{Liquidity Index (LI)} = \\frac{w - PL}{PI}'
    ],
    keyFindings: [
      'Subgrade borrow sample tested: $LL = 31.2\\%$, $PL = 22.4\\%$, yielding $PI = 8.8\\%$.',
      'Plotted below the A-line, classifying the fine fraction as Inorganic Silt with Low Plasticity (ML).',
      'Confirmed full compliance with ICTAD Section 1602 threshold ($PI \\le 12\\%$ for embankment and $PI \\le 6\\%$ for sub-base).'
    ],
    deliverable: 'Flow curve plot, Atterberg limits certification, and plasticity classification summary.'
  },
  {
    phase: 2,
    week: 9,
    title: 'Borrow Pit Investigation & Stockpile Verification',
    subtitle: 'Source Approval Workflow & Stockpile Quality Management',
    desc: 'Geotechnical exploration of natural borrow pits around Padukka and Homagama, material approval workflows, and stockpile segregation strategies.',
    extendedText: 'Conducted field reconnaissance and test pitting at commercial borrow pits proposed by suppliers. Executed field sampling and grid testing to ensure homogeneous material availability before obtaining consultant (Euro Group) approval. Established strict stockpile management protocols at the CEC central yard: segregating earthwork materials into Subgrade Fill, Sub-base (SB), and Shoulder (SHO), crowning stockpile crowns to shed monsoon rain, and preventing plant contamination.',
    standards: ['ICTAD SCA/5 Sec. 1602', 'BS 5930 (Site Investigation)'],
    tags: ['Borrow Pit', 'Stockpile', 'Source Approval', 'Euro Group', 'Quality'],
    color: '#14B8A6',
    image: '/images/report_image18.png',
    imageCaption: 'Figure 17: Field Sampling and Stockpile Verification at the Padukka Borrow Pit',
    keyFindings: [
      'Source approval requires min. 3 representative trial pits with full suite: SA, PI, Proctor, CBR.',
      'Identified and rejected one contaminated stockpile containing decayed vegetation and high clay lenses.',
      'Implemented color-coded signage and physical berms to prevent cross-contamination of aggregates.'
    ],
    deliverable: 'Borrow Pit Source Approval Dossier and CEC Stockpile Quality Protocol.'
  },
  {
    phase: 2,
    week: 10,
    title: 'Materials QA Testing for Roadbed Layers',
    subtitle: 'Sub-base (SB), Embankment (EMB) & Shoulder (SHO) Control',
    desc: 'Comprehensive quality assurance testing on incoming truckloads for Sub-base (SB), Embankment (EMB), and Shoulder (SHO) fill materials.',
    extendedText: 'Implemented routine QA compliance checks per ICTAD Section 1602 for every 500 m³ of bulk material delivered to active Lots 1 and 2. Conducted rapid moisture checks, wet sieve analysis, and one-point Proctor verifications. Assessed suitability of materials for road widening shoulders where compaction constraints require well-draining materials with high friction angles to resist lateral vehicular run-off.',
    standards: ['ICTAD SCA/5 Sec. 1602', 'AASHTO M 147', 'ASTM D2487'],
    tags: ['Materials QA', 'Sub-base', 'Embankment', 'Shoulder', 'Compaction Target'],
    color: '#14B8A6',
    image: '/images/report_image19.png',
    imageCaption: 'Figure 18: Material Verification and Grab Sampling of Sub-base Material on Site',
    keyFindings: [
      'Established 95% MDD compaction target for Sub-base and Shoulder, 90% MDD for lower Embankment.',
      'Maintained 100% compliance record on sub-base plasticity ($PI \\le 6\\%$) across 42 tested truckloads.',
      'Identified fine gradation adjustments needed to maintain high permeability in road shoulders.'
    ],
    deliverable: 'Weekly QA Materials Compliance Digest submitted to Resident Engineer (RE).'
  },
  {
    phase: 2,
    week: 11,
    title: 'ABC Aggregate Shape & Abrasion Testing',
    subtitle: 'Flakiness Index (FI), AIV & Los Angeles Abrasion (LAAV)',
    desc: 'Laboratory testing of coarse aggregates intended for Dense Graded Aggregate Base (ABC) and structural concrete — FI, AIV, and LAAV.',
    extendedText: 'Tested crushed granite aggregates delivered from commercial quarries in Meegoda. Evaluated aggregate particle geometry using standard thickness gauges to calculate Flakiness Index (BS 812 Part 105). Subjected aggregate samples to 400 impacts inside the Aggregate Impact Value cylinder (BS 812 Part 112) to assess resistance to dynamic shattering. Performed Los Angeles Abrasion testing (ASTM C131) in a rotating drum with 12 steel balls for 500 revolutions to quantify surface wear resistance.',
    standards: ['BS 812 Part 105', 'BS 812 Part 112', 'ASTM C131 / AASHTO T 96'],
    tags: ['Flakiness Index', 'AIV', 'LAAV', 'Aggregate Base Course', 'ABC'],
    color: '#14B8A6',
    image: '/images/report_image14.jpeg',
    imageCaption: 'Figure 13: Laboratory Technician Demonstrating Aggregate Sieve and Flakiness Gauge',
    equations: [
      'FI = \\left(\\frac{\\sum W_{\\text{flaky}}}{\\sum W_{\\text{total}}}\\right) \\times 100\\%',
      'AIV = \\left(\\frac{W_{\\text{passing 2.36mm}}}{W_{\\text{initial}}}\\right) \\times 100\\%',
      'LAAV = \\left(\\frac{M_{\\text{initial}} - M_{\\text{retained 1.7mm}}}{M_{\\text{initial}}}\\right) \\times 100\\%'
    ],
    keyFindings: [
      'Meegoda crushed granite aggregate achieved FI of 18.4% (well within ICTAD maximum of 30%).',
      'AIV result of 17.6% (below 30% limit for base course and 25% for concrete) proved high toughness.',
      'LAAV achieved 24.2% (below 40% maximum limit for road base and 30% for asphalt wearing course).'
    ],
    deliverable: 'Complete Aggregate Physical Properties Quality Certification.'
  },
  {
    phase: 2,
    week: 12,
    title: 'Aggregate Strength & Specific Gravity Tests',
    subtitle: 'Ten Percent Fines Value (TFV), ACV & Water Absorption',
    desc: 'Determination of crushing resistance through the Ten Percent Fines Value (TFV) test (BS 812 Part 111) and bulk specific gravity with water absorption.',
    extendedText: 'Conducted the Ten Percent Fines Value (TFV) test to establish the maximum compressive force required to crush 10% fines (passing 2.36mm) from coarse aggregate under continuous loading over 10 minutes. Measured apparent specific gravity, oven-dry specific gravity, saturated surface-dry (SSD) specific gravity, and water absorption on coarse aggregates using wire basket immersion methods in compliance with ASTM C127.',
    standards: ['BS 812 Part 111 (TFV)', 'BS 812 Part 110 (ACV)', 'ASTM C127 / BS 812 Part 2'],
    tags: ['TFV', 'ACV', 'Specific Gravity', 'Water Absorption', 'Strength'],
    color: '#14B8A6',
    image: '/images/report_image6.jpeg',
    imageCaption: 'Figure 5: Materials Testing Compression Apparatus and Pycnometers in CEC Central Lab',
    equations: [
      'TFV = \\frac{14 f}{m + 4} \\quad (\\text{where } f = \\text{max force in kN}, m = \\% \\text{ fines produced})',
      '\\text{Water Absorption} = \\left(\\frac{W_{\\text{SSD}} - W_{\\text{Oven-Dry}}}{W_{\\text{Oven-Dry}}}\\right) \\times 100\\%'
    ],
    keyFindings: [
      'Quarry aggregate TFV exceeded 165 kN, surpassing the 100 kN bituminous layer threshold.',
      'Water absorption measured 0.84% (well below 2.0% threshold), verifying dense, non-porous rock matrix.',
      'Bulk SSD specific gravity of 2.68 g/cm³ verified for use in asphalt concrete volumetric calculations.'
    ],
    deliverable: 'Aggregate Crushing & Volumetric Properties Technical Verification Sheet.'
  },
  {
    phase: 3,
    week: 13,
    title: 'Flexible Pavement Design & Structural Number',
    subtitle: 'RDA Pavement Manual (Chart 2) & AASHTO Guide Calculation',
    desc: 'Designed flexible pavement layers for rural road rehabilitation using the Road Development Authority (RDA) Pavement Design Manual and AASHTO structural number methodology.',
    extendedText: 'Mastered the structural pavement design process for low-to-medium volume rural roads under the ICDP project. Analyzed cumulative equivalent single axle load (ESAL) traffic forecasts over a 15-year design horizon. Applied RDA Pavement Design Manual Chart 2 (Granular Base with Bituminous Surfacing) for subgrade class S3 (CBR 5–7%). Computed the overall Structural Number ($SN$) to verify that combined layer thicknesses and structural layer coefficients provide adequate structural capacity to resist fatigue cracking and subgrade rutting.',
    standards: ['RDA Pavement Design Manual (Chart 2)', 'AASHTO Guide for Design of Pavement Structures (1993)', 'TRL Overseas Road Note 31'],
    tags: ['Pavement Design', 'Structural Number', 'SN', 'RDA Chart 2', 'AASHTO'],
    color: '#8B5CF6',
    image: '/images/presentation_image12.png',
    imageCaption: 'Pavement Layer Structural Breakdown and Structural Number Calculation Blueprint',
    equations: [
      'SN = a_1 D_1 + a_2 D_2 + a_3 D_3',
      'SN = (20 \\times 0.20) + (175 \\times 0.12) + (125 \\times 0.095) = 4.0 + 21.0 + 11.875 = 36.875'
    ],
    keyFindings: [
      'Selected pavement cross-section: 40mm Asphalt Concrete, 175mm ABC, 125mm Granular Sub-base.',
      'Calculated Structural Number ($SN = 36.875$) exceeds minimum required ($SN = 35.0$) for 15-year design traffic.',
      'Incorporated 50mm capping layer requirement over localized soft spots where subgrade CBR drops below 5%.'
    ],
    deliverable: 'Flexible Pavement Structural Design Calculation Sheet and Typical Cross-Section Drawing.'
  },
  {
    phase: 3,
    week: 14,
    title: 'DPR, RFI Process & 3-Workbook QA Suite',
    subtitle: 'Industrial Problem 2 — VBA Workflow Automation for Lot 1',
    desc: 'Analyzed site documentation bottlenecks in Lot 1; developed a 3-workbook integrated Excel VBA automation suite for Daily Progress Reports (DPR), RFIs, and monthly QA reporting.',
    extendedText: 'Identified severe engineering productivity losses caused by fragmented manual entry of Requests for Inspection (RFIs) across 4.7km of rural roads with over 500 distinct construction items. Conceived and coded an interconnected 3-workbook VBA suite comprising: `LOT1_RFI_Entry.xlsm` (central user interface with auto-populating UserForms), `BOQ Item Details.xlsm` (database of 529 pre-coded BOQ activities with specification tags), and `RFI Items.xlsm` (chainage tracking and status logs). The system reduced monthly QA audit compilation time from 3 days to under 15 minutes.',
    standards: ['ICTAD SCA/4 Cl. 40', 'ISO 9001 Document Control', 'World Bank Procurement Guidelines'],
    tags: ['RFI Automation', 'VBA Suite', 'BOQ 529 Items', 'DPR', 'QA Reporting'],
    color: '#8B5CF6',
    image: '/images/presentation_image14.png',
    imageCaption: 'Architecture and Flow of the 3-Workbook RFI & QA Automation Suite for Lot 1',
    keyFindings: [
      'Pre-coded 529 construction activities with automatic lookup for CON/G15, CON/G25, FW, R, DW, EW.',
      'Auto-generated inspection sheets with road chainage, offset, and specification references.',
      'Eliminated duplicate entries, ensuring complete alignment between site execution, RFI approvals, and contractor billing.'
    ],
    deliverable: 'Operational 3-Workbook RFI & QA Automation Suite and User Manual.'
  },
  {
    phase: 3,
    week: 15,
    title: 'Field Density Testing (Sand Cone Method)',
    subtitle: 'ASTM D1556 In-Situ Compaction Verification Across Roadbed Layers',
    desc: 'Executed field density testing (FDT) using the Sand Cone apparatus to verify degree of compaction on compacted subgrade, sub-base, and ABC layers on active carriageways.',
    extendedText: 'Conducted in-situ density verification along active Lots 1 and 2 in accordance with ASTM D1556. Calibrated the standard sand-pouring cylinder and determined the bulk density of calibrated uniform Ottawa sand (0.600mm–0.300mm). Excavated cylindrical test holes to layer depth, retrieved all loosened material for immediate weighing and rapid moisture determination via Speedy Moisture Meter and oven drying. Calculated in-situ dry density and compared against laboratory Standard Proctor MDD to confirm compaction compliance.',
    standards: ['ASTM D1556/D1556M', 'BS 1377 Part 9', 'AASHTO T 191'],
    tags: ['FDT', 'Sand Cone', 'Compaction Degree', 'In-Situ Density', 'Speedy Moisture'],
    color: '#8B5CF6',
    image: '/images/report_image21.png',
    imageCaption: 'Figure 20: In-Situ Field Density Test Using Sand Cone Method on Compacted Road Layer',
    equations: [
      'V_{\\text{hole}} = \\frac{W_{\\text{sand initial}} - W_{\\text{sand remaining}} - W_{\\text{sand in cone}}}{\\rho_{\\text{sand}}}',
      '\\rho_{\\text{dry}} = \\frac{W_{\\text{excavated moist}}}{V_{\\text{hole}} \\times (1 + w)}',
      '\\text{Compaction } (C\\%) = \\left(\\frac{\\rho_{\\text{dry}}}{\\text{MDD}}\\right) \\times 100\\%'
    ],
    keyFindings: [
      'Subgrade layers achieved 96.4%–98.2% compaction (exceeding specified 95% MDD threshold).',
      'Sub-base layers achieved 98.7% compaction (exceeding specified 98% MDD threshold).',
      'Identified roller vibration speed adjustments needed near drainage structures to avoid edge shoving.'
    ],
    deliverable: 'Field Density Test verification certificates and compaction sign-off sheets.'
  },
  {
    phase: 3,
    week: 16,
    title: 'Concrete Works & Slump Workability Testing',
    subtitle: 'Slump Regimes, W/C Ratio & Drainage Structure Concreting',
    desc: 'Supervised batching, mixing, and placement of structural concrete for line drains, culvert headwalls, and retaining walls; performed on-site slump workability tests.',
    extendedText: 'Supervised concrete operations for precast U-drains, dish drains, and retaining walls on site. Verified compliance with the Highway Schedule of Rates (HSR) and contract drawings. Executed on-site workability testing using the standard slump cone (100mm top, 200mm base, 300mm height) tamped in three layers with 25 strokes of a 16mm round-ended steel tamping rod. Monitored slump behavior (true slump vs shear or collapse) and strictly enforced water-cement ratio limits to prevent strength dilution.',
    standards: ['ASTM C143 / C143M', 'BS EN 12350-2', 'BS 8500'],
    tags: ['Concrete Slump', 'Workability', 'W/C Ratio', 'Drainage Structures', 'HSR'],
    color: '#8B5CF6',
    image: '/images/supp_concrete_mix_design_doe_method__p2_3.png',
    imageCaption: 'Slump Cone Testing Procedure: Filling, Tamping, Lifting and True Slump Measurement',
    equations: [
      '\\text{True Slump} = 300\\text{mm} - \\text{Height of Subsidence (mm)}',
      '\\text{Target W/C Ratio} = 0.45 \\text{ to } 0.50'
    ],
    keyFindings: [
      'Maintained target slump of 75mm ± 15mm for reinforced concrete headwalls and retaining walls.',
      'Maintained target slump of 50mm ± 10mm for precast dish drain units to ensure rapid demolding.',
      'Prevented on-site unauthorized water addition by transit mixer drivers through strict slump rejection rules.'
    ],
    deliverable: 'Daily Concrete Pour Quality Verification Log with slump test certificates.'
  },
  {
    phase: 3,
    week: 17,
    title: 'Concrete Mix Design (DOE Method)',
    subtitle: 'Mix Proportions for M20, M25 & M30 Structural Grades',
    desc: 'Formulated trial batch mix designs for structural concrete grades M20, M25, and M30 using the British Department of the Environment (DOE) method.',
    extendedText: 'Carried out comprehensive mix proportioning calculations using the UK Department of the Environment (DOE) method. Determined target mean compressive strength based on characteristic 28-day cylinder/cube strength ($f_{ck}$) and standard deviation factor ($k \\cdot s = 1.64 \\times 5 = 8.2$ MPa). Selected water-cement ratio from reference curves based on cement type (Ordinary Portland Cement CEM I 42.5N) and uncrushed vs crushed aggregate proportions. Calculated cement content, free water content, and fine-to-coarse aggregate ratios.',
    standards: ['DOE Method (BRE 1988)', 'BS 5328 Part 1', 'BS EN 206', 'ICTAD SCA/5'],
    tags: ['Mix Design', 'DOE Method', 'M25 Concrete', 'Target Mean Strength', 'CEM I'],
    color: '#8B5CF6',
    image: '/images/supp_concrete_mix_design_doe_method__p14_15.png',
    imageCaption: 'DOE Method Concrete Mix Design Relationship Curves: W/C Ratio vs Compressive Strength',
    equations: [
      'f_m = f_{ck} + k \\cdot s = 25 + 1.64 \\times 5 = 33.2\\text{ MPa}',
      '\\text{Cement Content} = \\frac{\\text{Free Water Content}}{\\text{Free W/C Ratio}}',
      '\\text{Total Aggregate} = \\rho_{\\text{wet concrete}} - (\\text{Cement} + \\text{Water})'
    ],
    keyFindings: [
      'Final M25 mix proportions per m³: Cement = 380 kg, Water = 190 kg (W/C = 0.50), Sand = 665 kg, Coarse Aggregate = 1180 kg.',
      'Nominal batching ratio established at approximately 1 : 1.75 : 3.10 by dry weight.',
      'Trial batch showed excellent cohesion, zero segregation, and bleeding well within allowable limits.'
    ],
    deliverable: 'Formal Concrete Mix Design Calculation Dossier and Trial Batching Report.'
  },
  {
    phase: 3,
    week: 18,
    title: 'Concrete Cube Casting & Compressive Testing',
    subtitle: 'BS EN 12390-3 CTM Testing at 7-Day & 28-Day Curing',
    desc: 'Cast 150mm concrete test cubes, managed thermostatic water tank curing at 27°C ± 2°C, and conducted 7-day and 28-day compressive strength crushing tests.',
    extendedText: 'Cast standard 150mm concrete cubes from active pours in accordance with BS EN 12390-2. Compacted cubes in two layers using a vibrating table and manual tamping bar (35 strokes per layer). Stored molds in shaded, humid atmosphere for 24 hours before demolding, followed by total submersion in a temperature-controlled water curing tank maintained at 27°C ± 2°C. Tested cubes at 7 days and 28 days using a calibrated compression testing machine (CTM) loaded continuously at 0.6 MPa/s until failure.',
    standards: ['BS EN 12390-3', 'BS EN 12390-2', 'ASTM C39'],
    tags: ['Cube Crushing', 'CTM', 'Compressive Strength', '28-Day Curing', 'Characteristic Strength'],
    color: '#8B5CF6',
    image: '/images/report_image15.jpeg',
    imageCaption: 'Figure 14: Laboratory Technician Operating the Concrete Compression Testing Machine (CTM)',
    equations: [
      'f_{cu} = \\frac{P_{\\text{failure}}}{A_{\\text{cross-section}}} = \\frac{P}{22500\\text{ mm}^2} \\quad (\\text{MPa})',
      '\\text{7-Day Strength Expectation} \\approx 65\\% - 70\\% \\text{ of } 28\\text{-day strength}'
    ],
    keyFindings: [
      'M25 grade 7-day mean compressive strength: 22.4 MPa (67.5% of target mean strength).',
      'M25 grade 28-day mean compressive strength: 34.6 MPa (surpassing characteristic 25 MPa and target 33.2 MPa).',
      'Fracture patterns showed standard symmetrical pyramidal shear planes, confirming unyielding machine platen alignment.'
    ],
    deliverable: 'Official 7-Day and 28-Day Concrete Compressive Strength Certification Sheets.'
  },
  {
    phase: 4,
    week: 19,
    title: 'Bitumen Penetration & Prime/Tack Coat Spraying',
    subtitle: 'ASTM D5 Penetration at 25°C & Emulsion Application Rates',
    desc: 'Tested 60/70 penetration grade bitumen in laboratory; inspected field surface preparation, prime coat (MC-30), and tack coat (CSS-1) spraying.',
    extendedText: 'Carried out needle penetration testing on bitumen samples per ASTM D5 to confirm delivery of genuine 60/70 penetration grade bitumen. Maintained temperature bath precisely at 25.0°C ± 0.1°C, applying a 100g load for 5.0 seconds. Inspected field application of Cutback Bitumen Prime Coat (MC-30) over compacted ABC base at 0.8–1.2 L/m², and Cationic Slow Setting Emulsion Tack Coat (CSS-1) at 0.25–0.35 L/m² using calibrated metal trays to verify uniform distribution.',
    standards: ['ASTM D5', 'BS EN 1426', 'ICTAD SCA/5 Sec. 401 & 402', 'AASHTO T 49'],
    tags: ['Bitumen Penetration', 'ASTM D5', 'Prime Coat', 'Tack Coat', 'Tray Test'],
    color: '#EF4444',
    image: '/images/report_image22.png',
    imageCaption: 'Figure 21: Measuring Needle Penetration of Bitumen Sample at 25°C in CEC Lab',
    equations: [
      '\\text{Penetration Value} = \\text{Depth of penetration in units of } 0.1\\text{ mm}',
      '\\text{Spray Rate } (L/m^2) = \\frac{W_{\\text{tray after}} - W_{\\text{tray before}}}{A_{\\text{tray}} \\times \\rho_{\\text{emulsion}}}'
    ],
    keyFindings: [
      'Bitumen sample recorded average penetration of 64.2 (units of 0.1mm), fully within the 60/70 pen grade spec.',
      'Field tray tests confirmed uniform prime coat spray rate of 1.05 L/m² with zero pooling.',
      'Enforced 24-hour curing time for prime coat before permitting asphalt paver mobilization.'
    ],
    deliverable: 'Bitumen Needle Penetration Test Report and Field Spraying Inspection Sheet.'
  },
  {
    phase: 4,
    week: 20,
    title: 'Asphalt Concrete Mix Design & Batching',
    subtitle: 'Marshall Method Aggregate Selection & Bitumen Optimization',
    desc: 'Formulated Dense Graded Asphalt Concrete (wearing course) mix proportions, optimum bitumen content (OBC), and batching control at the CEC asphalt plant.',
    extendedText: 'Participated in asphalt mix design operations at CEC central asphalt batching plant. Combined coarse crushed granite aggregate, manufactured sand, and stone dust mineral filler to satisfy the ICTAD SCA/5 wearing course gradation envelope. Prepared trial specimens with varying bitumen contents (4.5%, 5.0%, 5.5%, 6.0%, 6.5% by weight of mix). Monitored pugmill batching temperatures (150°C–165°C) and hot-bin aggregate discharge consistency.',
    standards: ['ASTM D1559 / D6926', 'Asphalt Institute Manual MS-2', 'ICTAD SCA/5 Sec. 501'],
    tags: ['Asphalt Mix Design', 'Marshall Method', 'Batch Plant', 'Hot Bin', 'OBC'],
    color: '#EF4444',
    image: '/images/report_image20.png',
    imageCaption: 'Figure 19: Marshall Specimen Compaction and Testing in CEC Materials Laboratory',
    equations: [
      'G_{mm} = \\frac{100}{\\frac{P_s}{G_{sb}} + \\frac{P_b}{G_b}} \\quad (\\text{Rice Theoretical Max Density})',
      'VMA = 100 - \\frac{G_{mb} \\times P_s}{G_{sb}}, \\quad VFB = \\left(\\frac{VMA - V_a}{VMA}\\right) \\times 100\\%'
    ],
    keyFindings: [
      'Identified Optimum Bitumen Content (OBC) at 5.35% based on maximum stability and 4.0% air voids.',
      'All aggregate cold feed bins calibrated to maintain continuous hot-mix gradation.',
      'Enforced maximum aggregate temperature of 175°C to avoid thermal hardening of bitumen binder.'
    ],
    deliverable: 'Asphalt Concrete Job Mix Formula (JMF) Proposal and Batching Quality Guide.'
  },
  {
    phase: 4,
    week: 21,
    title: 'Asphalt Sieve Analysis & Core Extraction',
    subtitle: 'Centrifugal Bitumen Extraction & Aggregate Gradation Envelope',
    desc: 'Extracted field cores from completed asphalt sections; performed centrifugal solvent extraction to verify binder content and recover aggregates for sieve analysis.',
    extendedText: 'Drilled 100mm diameter cores from freshly laid asphalt wearing courses across Lot 2 using a diamond-tipped core drilling machine. Measured core thickness to check compliance with 40mm design depth. Transported cores to the lab and performed centrifugal solvent extraction using trichloroethylene in accordance with ASTM D2172. Recovered clean aggregate skeleton, dried to constant mass, and performed mechanical sieve analysis to verify that hot-plant mixing did not cause aggregate degradation.',
    standards: ['ASTM D2172 / D2172M', 'ASTM D5444', 'BS EN 12697-1'],
    tags: ['Core Extraction', 'Centrifugal Extraction', 'Bitumen Content', 'Binder Recovery', 'Gradation'],
    color: '#EF4444',
    image: '/images/supp_lesson_04_a__soil_classification_p10_39.png',
    imageCaption: 'Recovered Aggregate Sieve Analysis Envelope and Solvent Extraction Setup',
    equations: [
      'P_b = \\left(\\frac{W_{\\text{total mix}} - W_{\\text{extracted aggregate}}}{W_{\\text{total mix}}}\\right) \\times 100\\%'
    ],
    keyFindings: [
      'Extracted bitumen content measured 5.32% (exhibiting minimal 0.03% variance from design 5.35% OBC).',
      'Recovered aggregate gradation remained tightly bounded inside the ICTAD wearing course envelope.',
      'Core thickness averaged 41.2 mm across 8 test chainages, meeting contract tolerances (+5mm / -0mm).'
    ],
    deliverable: 'Field Asphalt Core Test Dossier with Centrifugal Extraction Certificates.'
  },
  {
    phase: 4,
    week: 22,
    title: 'Marshall Stability & Flow Testing',
    subtitle: 'Volumetric Properties: Stability, Flow, Va, VMA & VFB',
    desc: 'Tested Marshall specimens at 60°C to evaluate mechanical stability (kN), plastic flow (mm), air voids ($V_a$), voids in mineral aggregate (VMA), and voids filled with bitumen (VFB).',
    extendedText: 'Conducted Marshall stability and flow testing per ASTM D1559. Compacted 101.6mm diameter by 63.5mm height specimens with 75 blows per face using an automated mechanical hammer. Immersed specimens in a precision thermostatic water bath at 60.0°C ± 1.0°C for 35 minutes. Loaded diametrically in the Marshall breaking head at 50.8 mm/min. Recorded peak load (Stability in kN) and plastic deformation at failure (Flow in 0.25mm units). Computed full volumetric properties.',
    standards: ['ASTM D1559 / D6927', 'AASHTO T 245', 'MS-2 Asphalt Institute'],
    tags: ['Marshall Stability', 'Flow Value', 'Air Voids', 'VMA', 'VFB', 'Volumetrics'],
    color: '#EF4444',
    image: '/images/report_image20.png',
    imageCaption: 'Figure 19: Performing Marshall Stability and Flow Test in Breaking Head Apparatus',
    equations: [
      '\\text{Stability Target} \\ge 8.0\\text{ kN (ICTAD minimum)}',
      '\\text{Flow Value Target} = 2.0\\text{ to } 4.0\\text{ mm}',
      'V_a = \\left(1 - \\frac{G_{mb}}{G_{mm}}\\right) \\times 100\\% \\quad (\\text{target: } 3\\% - 5\\%)'
    ],
    keyFindings: [
      'Achieved average Marshall Stability of 12.8 kN, well above the 8.0 kN ICTAD requirement.',
      'Flow value measured 2.85 mm, indicating high resistance to rutting and shear deformation.',
      'Volumetric verification: Air voids $V_a = 4.12\\%$, $VMA = 15.6\\%$, $VFB = 73.6\\%$, meeting all international specifications.'
    ],
    deliverable: 'Marshall Stability and Volumetric Properties Comprehensive Test Summary.'
  },
  {
    phase: 4,
    week: 23,
    title: 'Asphalt Laying Field Trial & Rolling Sequence',
    subtitle: 'Sensor Paver Execution, Temperature Regimes & Roller Compaction',
    desc: 'Supervised 450m full-scale asphalt laying field trial section on Lot 2; managed temperature monitoring, paver screed levels, and breakdown/finish rolling sequence.',
    extendedText: 'Participated in the planning, execution, and quality control of a 450m full-scale asphalt paving trial on Road COL/2. Checked asphalt delivery temperatures in insulated trucks (155°C–165°C). Monitored tracked sensor paver operation, screed vibration frequency, and laying thickness with dipsticks. Orchestrated the rolling train: Breakdown rolling (2 passes of 10-ton tandem steel roller at 145°C), Intermediate kneading compaction (6 passes of pneumatic tired roller at 120°C–130°C), and Finish rolling (2 static passes of tandem roller at >90°C).',
    standards: ['ICTAD SCA/5 Sec. 501', 'AASHTO R 67', 'Asphalt Paving Manual MS-22'],
    tags: ['Asphalt Laying', 'Sensor Paver', 'Rolling Sequence', 'Compaction Temperature', 'Pneumatic Roller'],
    color: '#EF4444',
    image: '/images/cec_pdf_p242_563.png',
    imageCaption: 'Asphalt Paving Temperature Progression and Compaction Roller Pass Schedule',
    equations: [
      '\\text{Minimum Laying Temp} \\ge 140^\\circ\\text{C}',
      '\\text{Breakdown Rolling Temp} = 135^\\circ\\text{C} - 150^\\circ\\text{C}',
      '\\text{Cessation Temperature} \\ge 90^\\circ\\text{C}'
    ],
    keyFindings: [
      'Field compaction achieved 99.1% of laboratory Marshall density.',
      'Pneumatic tired roller provided essential surface sealing, eliminating hairline micro-cracking.',
      'Surface regularity measured with 3m straight-edge showed deviations below 3mm, fully complying with RDA smoothness criteria.'
    ],
    deliverable: 'Asphalt Field Laying Trial Evaluation and Density Clearance Certificate.'
  },
  {
    phase: 4,
    week: 24,
    title: 'Research: Asphalt Thickness Optimization',
    subtitle: 'Lot 2 Road COL/2 (~4.7 km) Feasibility & Cost-Reduction Study',
    desc: 'Conducted RDA-commissioned research study evaluating the technical and economic feasibility of reducing the asphalt wearing course from 40mm to 25mm/30mm on rural roads.',
    extendedText: 'Conducted an in-depth engineering research study commissioned by the Road Development Authority (RDA) as an infrastructure cost-reduction measure for rural connectivity projects. On Road COL/2 (Lot 2, ~4.7km), constructed two independent 450m trial sections with 25mm and 30mm wearing course thicknesses alongside the standard 40mm control section. Evaluated structural capacity via Structural Number calculations, volumetric air void durability, moisture vulnerability, and long-term life-cycle cost savings.',
    standards: ['RDA Design Guidelines', 'AASHTO Structural Evaluation', 'World Bank Value Engineering'],
    tags: ['Research Study', 'Cost Reduction', 'Asphalt Thickness', 'Road COL/2', 'Value Engineering'],
    color: '#EF4444',
    image: '/images/presentation_image13.png',
    imageCaption: 'Research Comparison: Structural Number, Material Cost and Pavement Life for 25mm, 30mm & 40mm',
    equations: [
      '\\text{Cost Saving (30mm vs 40mm)} \\approx 22.5\\% \\text{ on Bituminous Surfacing}',
      '\\Delta SN = a_1 \\times (D_{40} - D_{30}) = 0.40 \\times (1.57 - 1.18) \\approx 0.156',
      '\\text{Compensated by } +15\\text{mm Dense ABC Base } (\\Delta SN_{\\text{ABC}} = 0.12 \\times 0.59 = 0.071)'
    ],
    keyFindings: [
      'Reducing asphalt to 30mm with an upgraded 175mm ABC base maintained an adequate Structural Number ($SN > 35$) for rural traffic (<0.5 million ESAL).',
      'Projected material cost savings of ~22.5% on asphalt surfacing, equating to millions of rupees across the 4 lots.',
      'Recommended 30mm thickness with polymerized or SBS-modified tack coat for high-shear turning zones to prevent thin-layer delamination.'
    ],
    deliverable: 'Final Research Paper & Technical Feasibility Report submitted to RDA and Euro Group.'
  }
]
