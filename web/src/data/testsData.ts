export interface TestCriterion {
  label: string
  value: string
  pass: boolean
  standardRef?: string
}

export interface TestDetail {
  id: string
  title: string
  fullName: string
  category: 'Geotechnical Soil' | 'Coarse Aggregate' | 'Concrete QA' | 'Bitumen & Asphalt'
  standard: string
  purpose: string
  apparatus: string[]
  formula: string
  formulaLabel: string
  procedure: string[]
  criteria: TestCriterion[]
  siteObserved: string
  output: string
  image: string
  imageCaption: string
  badgeColor: string
}

export const TESTS_DATA: TestDetail[] = [
  {
    id: 'dcp',
    title: 'Dynamic Cone Penetration (DCP)',
    fullName: 'ASTM D6951 In-Situ Subgrade Bearing Assessment',
    category: 'Geotechnical Soil',
    standard: 'ASTM D6951 / BS EN ISO 22476-2',
    purpose: 'Rapid in-situ assessment of subgrade bearing capacity, layer boundary stratification, and California Bearing Ratio (CBR) estimation without destructive pit excavation.',
    apparatus: [
      '8 kg (17.6 lb) sliding steel drop hammer with standard 575 mm (22.6 in) free-fall guide rod',
      '16 mm diameter high-tensile steel drive rod (1.0m to 2.0m depth capacity)',
      '60° replaceable hardened tool steel cone tip with 20 mm base diameter',
      'Dual-scale vertical measurement rule graduated in millimeters',
      'Anvil collar with quick-release locking mechanism'
    ],
    formula: 'CBR = 292 \\times DPI^{-1.12} \\quad (\\text{for } DPI > 1.26 \\text{ mm/blow})',
    formulaLabel: 'DPI = Dynamic Penetration Index (mm/blow)',
    procedure: [
      'Hold the DCP drive rod vertically plumb over the designated subgrade test chainage.',
      'Record the zero initial penetration depth reading with the cone tip seated flush at surface level.',
      'Raise the 8 kg hammer to the upper stop collar and release freely without downward user momentum.',
      'Record penetration depth at consecutive increments of 1 to 5 blows depending on soil firmness.',
      'Continue penetration to 800 mm – 1000 mm depth; extract rod using the mechanical jack.'
    ],
    criteria: [
      { label: 'Subgrade CBR > 8% (S4 Class)', value: 'DPI < 21 mm/blow', pass: true, standardRef: 'RDA Specs' },
      { label: 'Subgrade CBR > 5% (S3 Class)', value: 'DPI < 30 mm/blow', pass: true, standardRef: 'RDA Specs' },
      { label: 'Unsuitable Subgrade (Undercut Required)', value: 'DPI > 45 mm/blow (CBR < 3%)', pass: false, standardRef: 'ICTAD Sec. 301' }
    ],
    siteObserved: 'Lot 1 (COL/1) subgrade DPI ranged from 14.5 to 26.2 mm/blow, corresponding to CBR values of 6.2% to 11.4% (S3–S4 class).',
    output: 'Depth vs. blow profile, layer boundaries via RMSD breakpoint analysis, estimated CBR per layer.',
    image: '/images/report_image16.jpeg',
    imageCaption: 'Figure 15: Conducting Field Dynamic Cone Penetration (DCP) Test along Subgrade Alignment',
    badgeColor: '#F59E0B'
  },
  {
    id: 'sa',
    title: 'Sieve Analysis & Soil Classification',
    fullName: 'Particle Size Distribution (PSD) & Gradation Curve',
    category: 'Geotechnical Soil',
    standard: 'BS 1377 Part 2 / ASTM D422 / ASTM C136',
    purpose: 'Determine the quantitative proportions of different particle sizes in soil and aggregate samples to evaluate gradation envelopes and USCS/AASHTO classification.',
    apparatus: [
      'Nest of certified woven-wire brass test sieves (75mm down to 0.075mm / No. 200)',
      'Motorized mechanical sieve shaker with automatic cycle timer',
      'Precision digital balance accurate to 0.1g',
      'Thermostatically controlled electric drying oven (105°C ± 5°C)',
      'Washing sieve (0.075mm) and non-metallic soft bristle cleaning brushes'
    ],
    formula: 'C_u = \\frac{d_{60}}{d_{10}}, \\quad C_k = \\frac{d_{30}^2}{d_{60} \\times d_{10}}',
    formulaLabel: 'Uniformity Coefficient (Cu) & Coefficient of Curvature (Ck)',
    procedure: [
      'Oven-dry representative soil sample at 105°C to constant mass; record dry sample weight.',
      'Wash fine fraction over the 75µm sieve if significant silt/clay is present; dry retained fraction.',
      'Assemble sieve nest in descending order with lid and collection pan at the base.',
      'Agitate in mechanical sieve shaker for 10–15 minutes; record retained mass on each sieve.',
      'Compute percent passing; plot semi-logarithmic particle size distribution curve.'
    ],
    criteria: [
      { label: 'Well-graded gravel (GW)', value: 'Cu ≥ 4 and 1 ≤ Ck ≤ 3', pass: true, standardRef: 'USCS' },
      { label: 'Well-graded sand (SW)', value: 'Cu ≥ 6 and 1 ≤ Ck ≤ 3', pass: true, standardRef: 'USCS' },
      { label: 'Sub-base fines (< 75µm)', value: '≤ 12% passing', pass: true, standardRef: 'ICTAD Sec. 1602' }
    ],
    siteObserved: 'Borrow pit granular fill exhibited Cu = 7.4, Ck = 1.8, and 8.6% passing 75µm, qualifying as Well-Graded Sand with Silt (SW-SM).',
    output: 'Gradation curve, Cu, Ck, d10, d30, d60 values, percentage gravel/sand/fines, USCS group symbol.',
    image: '/images/supp_lesson_04_b__soil_classification_p17_76.png',
    imageCaption: 'Gradation Curve and Sieve Analysis Setup in CEC Materials Laboratory',
    badgeColor: '#14B8A6'
  },
  {
    id: 'pi',
    title: 'Plasticity Index & Atterberg Limits',
    fullName: 'Liquid Limit (LL), Plastic Limit (PL) & Casagrande Method',
    category: 'Geotechnical Soil',
    standard: 'ASTM D4318 / BS 1377 Part 2 / AASHTO T 89/90',
    purpose: 'Quantify the water content boundaries separating liquid, plastic, and semi-solid consistency states for subgrade suitability and clay mineral assessment.',
    apparatus: [
      'Standard mechanical Casagrande liquid limit device with brass cup and hard rubber base',
      'Flat grooving tool (ASTM or BS standard curved)',
      'Ground glass plate for rolling plastic limit threads',
      'Moisture tins, spatula, distilled water wash bottle, and analytical balance (0.01g precision)',
      'Drying oven at 105°C ± 5°C'
    ],
    formula: 'PI = LL - PL \\quad | \\quad A\\text{-Line}: PI = 0.73 \\times (LL - 20)',
    formulaLabel: 'Plasticity Index & Casagrande A-Line Threshold',
    procedure: [
      'Pass air-dried soil through 425µm (No. 40) sieve; thoroughly mix with distilled water into uniform paste.',
      'Place paste into Casagrande brass cup, level to 10mm thickness, and cut central 2mm groove.',
      'Turn crank at 2 drops per second; count blows required for groove halves to contact along 13mm.',
      'Take moisture sample; repeat across 4 trials spanning 15 to 35 blows to plot the flow curve.',
      'Roll soil paste into 3mm diameter threads on glass plate until they crumble; determine moisture as PL.'
    ],
    criteria: [
      { label: 'Granular Sub-base (PI Limit)', value: 'PI ≤ 6%', pass: true, standardRef: 'ICTAD Sec. 1602' },
      { label: 'Embankment Fill (PI Limit)', value: 'PI ≤ 12%', pass: true, standardRef: 'ICTAD Sec. 1602' },
      { label: 'Unsuitable High Plasticity Clay', value: 'PI > 17% or LL > 50%', pass: false, standardRef: 'RDA Guidelines' }
    ],
    siteObserved: 'Tested borrow pit samples: Liquid Limit LL = 31.2%, Plastic Limit PL = 22.4%, Plasticity Index PI = 8.8% (fully approved for embankment and subgrade).',
    output: 'Flow curve, LL (%), PL (%), PI (%), Casagrande A-line chart position (ML/CL class).',
    image: '/images/supp_lesson_04_b__soil_classification_p23_89.png',
    imageCaption: 'Casagrande Liquid Limit Device, Grooving Blade and Plastic Limit Glass Plate',
    badgeColor: '#14B8A6'
  },
  {
    id: 'proctor',
    title: 'Standard Proctor Compaction Test',
    fullName: 'ASTM D698 Optimum Moisture Content (OMC) & Max Dry Density (MDD)',
    category: 'Geotechnical Soil',
    standard: 'ASTM D698 (Method A) / BS 1377 Part 4',
    purpose: 'Establish the fundamental relationship between soil moisture content and compacted dry density to identify OMC and MDD for field compaction target setting.',
    apparatus: [
      'Standard cylindrical compaction mold (101.6 mm inner diameter, 116.4 mm height, 944 cm³ volume)',
      '2.495 kg (5.5 lb) metal rammer dropped from standard 305 mm (12 in) height',
      'Removable extension collar and baseplate with clamping brackets',
      'Rigid steel straight-edge for trimming compacted specimen flush',
      'Moisture cans, balance (1.0g accuracy), and drying oven'
    ],
    formula: '\\rho_d = \\frac{\\rho_{\\text{moist}}}{1 + w}, \\quad \\rho_{\\text{ZAV}} = \\frac{G_s \\cdot \\rho_w}{1 + w \\cdot G_s}',
    formulaLabel: 'Dry Density & Theoretical Zero Air Voids (ZAV) Curve',
    procedure: [
      'Prepare ~3 kg of air-dried soil passing 4.75mm sieve; add target initial moisture (e.g. 8%).',
      'Compact soil in mold in three equal layers, applying 25 uniformly distributed blows per layer.',
      'Remove extension collar; carefully trim excess soil flush with mold rim using straight-edge.',
      'Weigh mold with compacted wet soil; extract representative top and bottom samples for moisture.',
      'Break up soil, increase water content by 2%, and repeat for at least 5 points to define peak of curve.'
    ],
    criteria: [
      { label: 'Subgrade Compaction Target', value: '≥ 95% MDD', pass: true, standardRef: 'ICTAD Sec. 1602' },
      { label: 'Sub-base / ABC Compaction', value: '≥ 98% MDD', pass: true, standardRef: 'ICTAD Sec. 1602' },
      { label: 'Embankment Fill Compaction', value: '≥ 90% MDD', pass: true, standardRef: 'ICTAD Sec. 1602' }
    ],
    siteObserved: 'Subgrade borrow material: OMC = 13.8%, MDD = 1.84 g/cm³; field target 95% MDD = 1.748 g/cm³.',
    output: 'Compaction curve, OMC (%), MDD (g/cm³), Zero Air Voids theoretical limit line.',
    image: '/images/report_image17.jpeg',
    imageCaption: 'Figure 16: Preparing Soil Samples for Standard Proctor Compaction Test at CEC Lab',
    badgeColor: '#F59E0B'
  },
  {
    id: 'cbr',
    title: 'California Bearing Ratio (CBR) Test',
    fullName: 'ASTM D1883 Laboratory & In-Situ Bearing Capacity',
    category: 'Geotechnical Soil',
    standard: 'ASTM D1883 / BS 1377 Part 4 / AASHTO T 193',
    purpose: 'Measure the shearing resistance and bearing capacity of compacted subgrade and sub-base materials under controlled moisture and surcharge conditions.',
    apparatus: [
      'Cylindrical metal CBR mold (152.4 mm diameter, 177.8 mm height) with perforated baseplate',
      'Solid steel surcharge weights (annular and slotted, 4.5 kg total)',
      'Motorized loading press with 50 kN proving ring and 49.6 mm diameter cylindrical piston',
      'Soaking water tank with automated drainage and dial swell gauge (0.01 mm precision)',
      'Tripod dial gauge holder for swell measurement during 96-hour soak'
    ],
    formula: '\\text{CBR} = \\left(\\frac{\\text{Measured Test Load}}{\\text{Standard Load}}\\right) \\times 100\\%',
    formulaLabel: 'Standard Loads: 2.5 mm penetration = 13.24 kN | 5.0 mm penetration = 19.96 kN',
    procedure: [
      'Compact soil at OMC inside CBR mold using standard or modified compactive effort.',
      'Place perforated swell plate and 4.5 kg surcharge weights onto surface.',
      'Immerse mold in water bath for 96 hours; record swell readings every 24 hours.',
      'Mount mold on motorized press; seat piston with 45 N seating load.',
      'Apply penetration load at constant rate of 1.27 mm/min; record loads at 0.5mm increments to 12.5mm.'
    ],
    criteria: [
      { label: 'Sub-base Minimum CBR', value: 'CBR ≥ 8%', pass: true, standardRef: 'ICTAD Sec. 1602' },
      { label: 'Subgrade S3 Class', value: 'CBR 5% – 7%', pass: true, standardRef: 'RDA Manual' },
      { label: 'Soaking Swell Limit', value: 'Swell ≤ 1.5%', pass: true, standardRef: 'AASHTO Specs' }
    ],
    siteObserved: 'Subgrade samples exhibited soaked CBR of 7.2% to 9.5% with swell < 0.8% (S3 to S4 subgrade class).',
    output: 'Load vs penetration curve, CBR at 2.5mm & 5.0mm, soaking swell percentage, subgrade class (S1–S6).',
    image: '/images/presentation_image9.png',
    imageCaption: 'Motorized CBR Testing Machine with Dial Penetration Indicator in CEC Central Lab',
    badgeColor: '#14B8A6'
  },
  {
    id: 'fdt',
    title: 'Field Density Test (Sand Cone Method)',
    fullName: 'ASTM D1556 In-Situ Density & Degree of Compaction',
    category: 'Geotechnical Soil',
    standard: 'ASTM D1556 / BS 1377 Part 9 / AASHTO T 191',
    purpose: 'Directly verify in-situ dry density and degree of compaction on active construction layers without disturbing underlying foundation strata.',
    apparatus: [
      'Standard sand-pouring cylinder apparatus with dual 60° metal cone and rotary valve',
      'Square metal baseplate with central 165 mm diameter flanged hole',
      'Clean, dry, calibrated uniform standard Ottawa sand (passing 600µm, retained 300µm)',
      'Excavation chisel, spoon, sealable bags, and high-capacity field balance (0.1g accuracy)',
      'Speedy calcium carbide moisture meter or field drying hot-plate'
    ],
    formula: '\\rho_d = \\frac{W_{\\text{dry excavated}}}{V_{\\text{hole}}}, \\quad \\text{Compaction} \\% = \\left(\\frac{\\rho_d}{\\text{MDD}}\\right) \\times 100\\%',
    formulaLabel: 'In-Situ Dry Density & Compaction Percentage against Lab MDD',
    procedure: [
      'Level test surface on active road layer; secure baseplate firmly using steel anchor pins.',
      'Chisel cylindrical test hole ~150 mm deep through baseplate opening; collect all soil into sealed tray.',
      'Weigh excavated wet soil; take immediate moisture sample using Speedy Moisture Meter.',
      'Place sand-pouring cylinder inverted over baseplate; open valve and allow calibrated sand to fill hole.',
      'Close valve, weigh cylinder with remaining sand, compute hole volume, and calculate field dry density.'
    ],
    criteria: [
      { label: 'Subgrade Compaction Pass', value: '≥ 95% MDD', pass: true, standardRef: 'ICTAD Sec. 1602' },
      { label: 'Sub-base Layer Pass', value: '≥ 98% MDD', pass: true, standardRef: 'ICTAD Sec. 1602' },
      { label: 'ABC Base Course Pass', value: '≥ 98% MDD', pass: true, standardRef: 'ICTAD Sec. 1602' }
    ],
    siteObserved: 'Field density tests on Lot 1 subgrade achieved 96.4% to 98.2% MDD; ABC base achieved 98.8% MDD.',
    output: 'In-situ bulk density, in-situ dry density (g/cm³), field moisture content (%), compaction percentage.',
    image: '/images/report_image21.png',
    imageCaption: 'Figure 20: In-Situ Field Density Test Using Sand Cone Method on Compacted Road Layer',
    badgeColor: '#14B8A6'
  },
  {
    id: 'fi',
    title: 'Flakiness Index (FI)',
    fullName: 'BS 812 Part 105 Coarse Aggregate Particle Shape',
    category: 'Coarse Aggregate',
    standard: 'BS 812 Part 105.1 / EN 933-3',
    purpose: 'Determine the percentage by weight of flaky particles (least dimension < 0.6 times mean fraction size) in coarse aggregate to prevent crushing under compaction.',
    apparatus: [
      'Standard metal thickness gauge with precision slotted apertures corresponding to sieve fractions',
      'Nest of BS test sieves (63mm, 50mm, 37.5mm, 28mm, 20mm, 14mm, 10mm, 6.3mm)',
      'Precision balance accurate to 0.1g',
      'Sample splitter (riffle box) and drying oven'
    ],
    formula: 'FI = \\left(\\frac{\\sum W_{\\text{flaky}}}{\\sum W_{\\text{total}}}\\right) \\times 100\\%',
    formulaLabel: 'Percentage Flaky Particles by Weight Passing Thickness Slots',
    procedure: [
      'Sieve aggregate sample into standard individual size fractions from 63mm down to 6.3mm.',
      'Discard any particles retained on 63mm or passing 6.3mm; weigh each individual size fraction.',
      'Pass particles of each fraction manually through the corresponding slot on the standard thickness gauge.',
      'Collect and weigh all particles that pass through their designated thickness slots.',
      'Sum the weights of all flaky particles and compute the Flakiness Index as percentage of total mass.'
    ],
    criteria: [
      { label: 'Aggregate Base Course (ABC)', value: 'FI ≤ 30%', pass: true, standardRef: 'ICTAD Sec. 1602' },
      { label: 'Asphalt Wearing Course', value: 'FI ≤ 25%', pass: true, standardRef: 'ICTAD Sec. 501' },
      { label: 'Structural Concrete Aggregate', value: 'FI ≤ 20%', pass: true, standardRef: 'BS 882' }
    ],
    siteObserved: 'Meegoda quarry ABC crushed aggregate achieved FI of 18.4% (well within the 30% ICTAD threshold).',
    output: 'Flakiness Index (%), sieve fraction breakdown, compliance certificate with ICTAD Section 1602.',
    image: '/images/report_image14.jpeg',
    imageCaption: 'Figure 13: Laboratory Technician Using Thickness Gauge for Flakiness Index Determination',
    badgeColor: '#F59E0B'
  },
  {
    id: 'aiv',
    title: 'Aggregate Impact Value (AIV)',
    fullName: 'BS 812 Part 112 Dynamic Shock Resistance',
    category: 'Coarse Aggregate',
    standard: 'BS 812 Part 112',
    purpose: 'Assess the resistance of coarse aggregates to sudden dynamic shock or impact loads encountered under heavy wheel braking and uneven pavement surfaces.',
    apparatus: [
      'Standard AIV testing machine with 13.5–14.0 kg falling hammer and 380 mm free-fall drop',
      'Cylindrical steel cup (102 mm internal diameter, 50 mm depth)',
      'Standard metal tamping rod (10 mm diameter, 230 mm length with rounded end)',
      'BS test sieves: 14.0 mm, 10.0 mm, and 2.36 mm',
      'Electronic balance (0.1g precision)'
    ],
    formula: 'AIV = \\left(\\frac{W_{\\text{passing 2.36mm}}}{W_{\\text{initial}}}\\right) \\times 100\\%',
    formulaLabel: 'Percentage of Crushed Fines Produced by Dynamic Impact',
    procedure: [
      'Sieve aggregate sample to isolate fraction passing 14.0mm and retained on 10.0mm; oven dry.',
      'Fill measuring cylinder in three equal layers, tamping each layer with 25 strokes.',
      'Transfer aggregate into AIV machine cup; fix securely onto heavy cast iron baseplate.',
      'Subject aggregate to 15 blows of the 13.5 kg hammer dropped from 380 mm at intervals of ~1 second.',
      'Sieve crushed aggregate over 2.36mm sieve; record weight of fines passing to compute AIV.'
    ],
    criteria: [
      { label: 'Aggregate Base Course (ABC)', value: 'AIV ≤ 30%', pass: true, standardRef: 'ICTAD Sec. 1602' },
      { label: 'Bituminous Wearing Surfaces', value: 'AIV ≤ 25%', pass: true, standardRef: 'ICTAD Sec. 501' },
      { label: 'Heavy Duty Concrete Pavements', value: 'AIV ≤ 20%', pass: true, standardRef: 'BS 882' }
    ],
    siteObserved: 'Quarry crushed granite aggregate achieved AIV of 17.6%, proving high structural toughness.',
    output: 'Aggregate Impact Value (%), weight of fines produced, aggregate toughness classification.',
    image: '/images/report_image6.jpeg',
    imageCaption: 'Figure 5: Aggregate Impact Machine and Testing Apparatus in CEC Materials Laboratory',
    badgeColor: '#F59E0B'
  },
  {
    id: 'laav',
    title: 'Los Angeles Abrasion Value (LAAV)',
    fullName: 'ASTM C131 Resistance to Degradation by Abrasion & Impact',
    category: 'Coarse Aggregate',
    standard: 'ASTM C131 / AASHTO T 96 / BS 812 Part 113',
    purpose: 'Quantify aggregate resistance to continuous mechanical grinding, rolling abrasion, and impact inside a rotating steel drum with steel abrasive charges.',
    apparatus: [
      'Los Angeles abrasion testing machine (hollow steel cylinder, 711 mm diameter, 508 mm length)',
      'Abrasive charge: 12 cast-iron or steel spheres (~46.8 mm diameter, ~420g each)',
      'Electric drive rotating drum at constant speed of 30 to 33 rpm for 500 revolutions',
      'BS test sieve 1.70 mm (No. 12) and drying oven'
    ],
    formula: 'LAAV = \\left(\\frac{M_{\\text{initial}} - M_{\\text{retained 1.7mm}}}{M_{\\text{initial}}}\\right) \\times 100\\%',
    formulaLabel: 'Percentage Mass Loss After 500 Revolutions in LA Drum',
    procedure: [
      'Wash and oven-dry aggregate; grade sample to ASTM Grading B (5000g total: 2500g 19-12.5mm, 2500g 12.5-9.5mm).',
      'Place aggregate and 12 steel balls into LA drum; close and latch sealed dust-cover lid.',
      'Rotate machine for 500 revolutions at uniform speed of 31 rpm.',
      'Discharge sample into catch tray; sieve through 1.70mm (No. 12) sieve.',
      'Wash retained material thoroughly, oven-dry at 105°C, and weigh to compute mass lost.'
    ],
    criteria: [
      { label: 'ABC Road Base Course', value: 'LAAV ≤ 40%', pass: true, standardRef: 'ICTAD Sec. 1602' },
      { label: 'Asphalt Concrete Surface Course', value: 'LAAV ≤ 30%', pass: true, standardRef: 'ICTAD Sec. 501' },
      { label: 'Sub-base Granular Material', value: 'LAAV ≤ 45%', pass: true, standardRef: 'ICTAD Sec. 1602' }
    ],
    siteObserved: 'Meegoda quarry coarse aggregate achieved LAAV of 24.2%, confirming high abrasion resistance.',
    output: 'Los Angeles Abrasion Value (%), grading type, mass lost after 500 revs, wear classification.',
    image: '/images/report_image14.jpeg',
    imageCaption: 'Figure 13: Sieve Verification of Crushed Aggregate Samples Post-Abrasion',
    badgeColor: '#F59E0B'
  },
  {
    id: 'tfv',
    title: 'Ten Percent Fines Value (TFV)',
    fullName: 'BS 812 Part 111 Static Crushing Strength Resistance',
    category: 'Coarse Aggregate',
    standard: 'BS 812 Part 111',
    purpose: 'Determine the static crushing load required to produce exactly 10% fines passing a 2.36mm sieve, indicating aggregate crushing strength under continuous load.',
    apparatus: [
      '150 mm internal diameter steel cylinder with plunger and detachable baseplate',
      'Calibrated motorized compression testing machine capable of applying up to 500 kN load',
      'Standard tamping rod (16 mm diameter, 600 mm length with hemispherical ends)',
      'BS test sieves: 14.0 mm, 10.0 mm, and 2.36 mm',
      'Electronic digital balance (0.1g precision)'
    ],
    formula: 'TFV = \\frac{14 f}{m + 4} \\quad (\\text{where } f = \\text{max force in kN}, m = \\% \\text{ fines produced})',
    formulaLabel: 'Interpolated Load (kN) to Produce Exactly 10% Fines',
    procedure: [
      'Sieve aggregate sample to isolate fraction passing 14.0mm and retained on 10.0mm; dry.',
      'Place sample in test cylinder in three equal layers, tamping each layer with 25 strokes.',
      'Place plunger on aggregate bed; place assembly into compression testing machine.',
      'Apply continuous uniform compressive load to reach target load (e.g. 150 kN) in exactly 10 minutes.',
      'Release load, sieve crushed material over 2.36mm sieve, calculate actual fines % ($m$), and compute TFV.'
    ],
    criteria: [
      { label: 'Bituminous Road Surface Courses', value: 'TFV ≥ 100 kN', pass: true, standardRef: 'BS 812' },
      { label: 'Heavy Structural Concrete', value: 'TFV ≥ 150 kN', pass: true, standardRef: 'BS 882' },
      { label: 'High Traffic Wearing Courses', value: 'TFV ≥ 140 kN', pass: true, standardRef: 'ICTAD Specs' }
    ],
    siteObserved: 'Tested quarry aggregate achieved TFV of 168 kN, proving exceptional crushing resistance.',
    output: 'Ten Percent Fines Value (kN), load applied, percentage fines produced, crushing classification.',
    image: '/images/report_image6.jpeg',
    imageCaption: 'Figure 5: Compression Plunger and Cylinder for TFV Crushing Test at CEC Lab',
    badgeColor: '#F59E0B'
  },
  {
    id: 'concrete',
    title: 'Concrete Slump & Cube Compressive Strength',
    fullName: 'BS EN 12390 Compressive Strength & Slump Workability',
    category: 'Concrete QA',
    standard: 'BS EN 12390-3 / BS EN 12350-2 / ASTM C39 / ASTM C143',
    purpose: 'Verify that delivered structural concrete maintains required workability and meets characteristic compressive strength at 7 and 28 days of curing.',
    apparatus: [
      'Standard slump cone (100mm top, 200mm base, 300mm height) with steel tamping rod',
      'Precision machined steel cube molds (150 mm x 150 mm x 150 mm) with clamp bolts',
      'Vibrating compaction table and manual steel tamping bar (35 strokes/layer)',
      'Thermostatically controlled water curing tank maintained at 27°C ± 2°C',
      '2000 kN calibrated digital Compression Testing Machine (CTM) with spherical seating'
    ],
    formula: 'f_{cu} = \\frac{P_{\\text{failure}}}{A_{\\text{cross-section}}} = \\frac{P}{22500\\text{ mm}^2} \\quad (\\text{MPa})',
    formulaLabel: 'Compressive Stress at Failure over 150x150 mm Bearing Area',
    procedure: [
      'Sample fresh concrete directly from mixer truck chute; perform slump test on clean baseplate.',
      'Cast concrete into 150mm steel cube molds in two equal layers; compact on vibrating table.',
      'Cover molds with damp hessian cloth for 24 hours in shaded environment (25°C–30°C).',
      'Demold cubes, mark with permanent identification, and submerge into 27°C curing bath.',
      'Crush 3 cubes at 7 days and 3 cubes at 28 days in CTM loaded at continuous 0.6 MPa/s rate.'
    ],
    criteria: [
      { label: 'M20 Grade 28-Day Target', value: 'fcu ≥ 20 MPa', pass: true, standardRef: 'ICTAD SCA/5' },
      { label: 'M25 Grade 28-Day Target', value: 'fcu ≥ 25 MPa (Mean > 33.2 MPa)', pass: true, standardRef: 'ICTAD SCA/5' },
      { label: 'M30 Grade 28-Day Target', value: 'fcu ≥ 30 MPa', pass: true, standardRef: 'ICTAD SCA/5' }
    ],
    siteObserved: 'M25 grade drainage concrete achieved average 7-day strength of 22.4 MPa and 28-day strength of 34.6 MPa (exceeding 33.2 MPa target mean strength).',
    output: 'Slump measurement (mm), 7-day compressive strength, 28-day compressive strength, failure mode.',
    image: '/images/report_image15.jpeg',
    imageCaption: 'Figure 14: Senior Technician Demonstrating Cube Crushing on CTM in CEC Laboratory',
    badgeColor: '#8B5CF6'
  },
  {
    id: 'marshall',
    title: 'Marshall Stability & Flow Test',
    fullName: 'ASTM D1559 / D6927 Asphalt Mix Performance & Volumetrics',
    category: 'Bitumen & Asphalt',
    standard: 'ASTM D1559 / ASTM D6927 / AASHTO T 245',
    purpose: 'Determine the resistance to plastic flow (stability and flow) and volumetric air void parameters of hot-mix asphalt concrete to establish Optimum Bitumen Content (OBC).',
    apparatus: [
      'Marshall compaction mold assembly (101.6 mm diameter, 63.5 mm height) with baseplate',
      'Automated mechanical Marshall hammer (4.536 kg drop mass, 457.2 mm free-fall height)',
      'Water curing bath maintained at 60.0°C ± 1.0°C with digital thermostat',
      'Motorized Marshall breaking head press loaded at constant rate of 50.8 mm/min',
      'Dial flow meter measuring plastic deformation in units of 0.25 mm'
    ],
    formula: '\\text{Stability} \\ge 8.0\\text{ kN}, \\quad V_a = \\left(1 - \\frac{G_{mb}}{G_{mm}}\\right) \\times 100\\%, \\quad VMA = 100 - \\frac{G_{mb} \\times P_s}{G_{sb}}',
    formulaLabel: 'Peak Breaking Force (kN), Flow (mm), Air Voids (Va) & VMA',
    procedure: [
      'Heat aggregate and 60/70 bitumen to 155°C–165°C; mix thoroughly into homogeneous hot-mix asphalt.',
      'Place mix into heated mold; compact with 75 blows per face using mechanical Marshall hammer.',
      'Allow specimen to cool, extract using mechanical extruder, and record dry and submerged weights for Gmb.',
      'Submerge specimens in 60°C water bath for 30–40 minutes.',
      'Place in Marshall breaking head; apply 50.8 mm/min load; record peak stability (kN) and flow value (mm).'
    ],
    criteria: [
      { label: 'Minimum Marshall Stability', value: '≥ 8.0 kN (ICTAD minimum)', pass: true, standardRef: 'ICTAD Sec. 501' },
      { label: 'Flow Value Window', value: '2.0 mm to 4.0 mm', pass: true, standardRef: 'ICTAD Sec. 501' },
      { label: 'Design Air Voids (Va)', value: '3.0% to 5.0%', pass: true, standardRef: 'MS-2 Manual' }
    ],
    siteObserved: 'Wearing course hot-mix at 5.35% OBC achieved 12.8 kN stability, 2.85 mm flow, 4.12% air voids, and 15.6% VMA.',
    output: 'Marshall stability (kN), flow (mm), air voids Va (%), VMA (%), VFB (%), Optimum Bitumen Content (%).',
    image: '/images/report_image20.png',
    imageCaption: 'Figure 19: Performing Marshall Stability and Flow Test for Asphalt Mix Evaluation',
    badgeColor: '#EF4444'
  },
  {
    id: 'bitumen',
    title: 'Bitumen Needle Penetration Test',
    fullName: 'ASTM D5 Penetration Grade Consistency at 25°C',
    category: 'Bitumen & Asphalt',
    standard: 'ASTM D5 / BS EN 1426 / AASHTO T 49',
    purpose: 'Measure the consistency and hardness of penetration-grade bitumen under specified conditions of load, time, and temperature to confirm 60/70 pen grade specification.',
    apparatus: [
      'Standard penetrometer with friction-free vertical guide rod and dial calibrated in 0.1 mm units',
      'Certified standard stainless steel penetration needle (100g total loaded assembly)',
      'Precision thermostatic water bath maintained at 25.0°C ± 0.1°C with transfer dish',
      'Electronic digital stopwatch timer calibrated for automatic 5.00-second release',
      'Sample container (55 mm diameter, 35 mm depth)'
    ],
    formula: '\\text{Penetration Value} = \\text{Depth of Needle Penetration in units of } 0.1\\text{ mm}',
    formulaLabel: 'Penetration at 25°C, 100g load applied for 5.0 seconds',
    procedure: [
      'Heat bitumen sample gently to 90°C above softening point; pour into metal test container.',
      'Cool in room temperature air (15°C–30°C) for 1.5 hours, then immerse in 25°C water bath for 1.5 hours.',
      'Place container inside transfer dish filled with 25°C water and position on penetrometer baseplate.',
      'Lower needle until tip makes contact with bitumen surface (verified using needle shadow).',
      'Release 100g needle assembly for exactly 5.0 seconds; record penetration depth in 0.1mm increments across 3 trials.'
    ],
    criteria: [
      { label: '60/70 Grade Penetration Range', value: '60 to 70 (units of 0.1 mm)', pass: true, standardRef: 'ICTAD Sec. 401' },
      { label: 'Penetration Index (PI)', value: '-1.0 to +1.0', pass: true, standardRef: 'ASTM D5' }
    ],
    siteObserved: 'Tested refinery bitumen sample recorded mean penetration of 64.2 (0.1 mm units), confirming genuine 60/70 grade bitumen.',
    output: 'Penetration value (0.1 mm), test temperature (°C), needle release time, grade classification.',
    image: '/images/report_image22.png',
    imageCaption: 'Figure 21: Measuring Penetration of Bitumen Sample at 25°C in CEC Central Laboratory',
    badgeColor: '#EF4444'
  }
]
