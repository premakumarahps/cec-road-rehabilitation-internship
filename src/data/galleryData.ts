export interface GalleryItem {
  id: string
  title: string
  category: 'Field Works' | 'Materials Lab' | 'Software Automation' | 'Safety & HSE' | 'Schematics'
  src: string
  caption: string
  locationOrDate: string
  figureNo?: string
}

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'g1',
    title: 'CEC Corporate Head Office & Central Lab',
    category: 'Materials Lab',
    src: '/images/report_image3.png',
    caption: 'Corporate Head Office and Central Materials Laboratory complex of Consulting Engineering and Contractors (Pvt) Ltd.',
    locationOrDate: 'Peliyagoda / Homagama — Dec 2024',
    figureNo: 'Figure 2'
  },
  {
    id: 'g2',
    title: 'Organizational Structure of CEC (Pvt) Ltd',
    category: 'Schematics',
    src: '/images/report_image4.png',
    caption: 'Official corporate and project hierarchy of CEC (Pvt) Ltd showing Material Engineering division placement.',
    locationOrDate: 'Corporate Quality Manual',
    figureNo: 'Figure 3'
  },
  {
    id: 'g3',
    title: 'Laboratory Equipment Calibration',
    category: 'Materials Lab',
    src: '/images/report_image5.jpeg',
    caption: 'Routine verification and calibration of electronic scales, proving rings, and compression frames.',
    locationOrDate: 'CEC Materials Laboratory — Dec 2024',
    figureNo: 'Figure 4'
  },
  {
    id: 'g4',
    title: 'CEC Materials Testing Laboratory',
    category: 'Materials Lab',
    src: '/images/report_image6.jpeg',
    caption: 'Overview of testing facilities: pycnometers, CBR loading frames, drying ovens, and aggregate testing tools.',
    locationOrDate: 'CEC Materials Laboratory — Jan 2025',
    figureNo: 'Figure 5'
  },
  {
    id: 'g5',
    title: 'Road Rehabilitation in Progress (Lot 1)',
    category: 'Field Works',
    src: '/images/report_image7.png',
    caption: 'Initial grading, subgrade preparation, and heavy earthmoving machinery active on Homagama rural network.',
    locationOrDate: 'Lot 1 (COL/1) — Jan 2025',
    figureNo: 'Figure 6'
  },
  {
    id: 'g6',
    title: 'Subgrade Compaction & Formation Level',
    category: 'Field Works',
    src: '/images/report_image8.png',
    caption: 'Vibratory roller compaction of prepared subgrade ahead of in-situ density verification.',
    locationOrDate: 'Lot 2 (COL/2) — Feb 2025',
    figureNo: 'Figure 7'
  },
  {
    id: 'g7',
    title: 'Edge Widening & Base Layer Construction',
    category: 'Field Works',
    src: '/images/report_image9.png',
    caption: 'Excavation and subgrade backfilling for carriageway edge widening to standard 4.5m width.',
    locationOrDate: 'Lot 3 (COL/3) — Feb 2025',
    figureNo: 'Figure 8'
  },
  {
    id: 'g8',
    title: 'On-Site Safety Signage & Traffic Barriers',
    category: 'Safety & HSE',
    src: '/images/report_image10.png',
    caption: 'Safety barricades, warning cones, and directional signage installed around active trench excavations.',
    locationOrDate: 'Active Carriageway Zone — Jan 2025',
    figureNo: 'Figure 9'
  },
  {
    id: 'g9',
    title: 'Deep Trench Protection & PPE Enforcement',
    category: 'Safety & HSE',
    src: '/images/report_image11.png',
    caption: 'Hard hat, high-visibility vest, and safety boots compliance during drainage excavation.',
    locationOrDate: 'Lot 1 Drainage Works — Jan 2025',
    figureNo: 'Figure 10'
  },
  {
    id: 'g10',
    title: 'Daily Toolbox Meeting & Safety Briefing - 1',
    category: 'Safety & HSE',
    src: '/images/report_image12.png',
    caption: 'Morning toolbox safety briefing conducted with site laborers, plant operators, and supervisory staff.',
    locationOrDate: 'Site Yard — Feb 2025',
    figureNo: 'Figure 11'
  },
  {
    id: 'g11',
    title: 'Daily Toolbox Meeting & Safety Briefing - 2',
    category: 'Safety & HSE',
    src: '/images/report_image13.png',
    caption: 'Reviewing daily work hazards, blind-spot precautions, and traffic diversion plans before mobilization.',
    locationOrDate: 'Site Yard — Feb 2025',
    figureNo: 'Figure 12'
  },
  {
    id: 'g12',
    title: 'Senior Technician Demonstrating Flakiness Gauge',
    category: 'Materials Lab',
    src: '/images/report_image14.jpeg',
    caption: 'Demonstration of thickness gauge slotted apertures for coarse aggregate shape analysis.',
    locationOrDate: 'CEC Materials Laboratory — Feb 2025',
    figureNo: 'Figure 13'
  },
  {
    id: 'g13',
    title: 'Compressive Testing Machine Demonstration',
    category: 'Materials Lab',
    src: '/images/report_image15.jpeg',
    caption: 'Operation of digital 2000 kN Compression Testing Machine for concrete cube quality control.',
    locationOrDate: 'CEC Materials Laboratory — Mar 2025',
    figureNo: 'Figure 14'
  },
  {
    id: 'g14',
    title: 'Conducting Field DCP Test on Subgrade',
    category: 'Field Works',
    src: '/images/report_image16.jpeg',
    caption: 'Trainee Material Engineer and assistant conducting 8kg dynamic cone penetration test in the field.',
    locationOrDate: 'Lot 1 Subgrade Chainage 0+450 — Jan 2025',
    figureNo: 'Figure 15'
  },
  {
    id: 'g15',
    title: 'Soil Sample Preparation for Standard Proctor',
    category: 'Materials Lab',
    src: '/images/report_image17.jpeg',
    caption: 'Pulverizing, sieving, and moisture conditioning borrow pit soil specimens for Proctor compaction curve.',
    locationOrDate: 'CEC Materials Laboratory — Jan 2025',
    figureNo: 'Figure 16'
  },
  {
    id: 'g16',
    title: 'Borrow Pit Stockpile Sampling & Verification - 1',
    category: 'Field Works',
    src: '/images/report_image18.png',
    caption: 'Inspection of granular sub-base stockpile at Padukka borrow pit for grain size uniformity.',
    locationOrDate: 'Padukka Commercial Pit — Feb 2025',
    figureNo: 'Figure 17'
  },
  {
    id: 'g17',
    title: 'Borrow Pit Stockpile Sampling & Verification - 2',
    category: 'Field Works',
    src: '/images/report_image19.png',
    caption: 'Representative grab sampling from stockpile heights to test plasticity index and compaction parameters.',
    locationOrDate: 'Padukka Commercial Pit — Feb 2025',
    figureNo: 'Figure 18'
  },
  {
    id: 'g18',
    title: 'Marshall Stability & Flow Test Apparatus',
    category: 'Materials Lab',
    src: '/images/report_image20.png',
    caption: 'Compression breaking head and flow gauge measuring mechanical stability of asphalt core at 60°C.',
    locationOrDate: 'CEC Central Lab — Apr 2025',
    figureNo: 'Figure 19'
  },
  {
    id: 'g19',
    title: 'In-Situ Field Density Test (Sand Cone Method)',
    category: 'Field Works',
    src: '/images/report_image21.png',
    caption: 'Excavation and calibrated sand-pouring on compacted road base to determine field dry density.',
    locationOrDate: 'Lot 2 ABC Layer — Mar 2025',
    figureNo: 'Figure 20'
  },
  {
    id: 'g20',
    title: 'Bitumen Penetration Test at 25°C',
    category: 'Materials Lab',
    src: '/images/report_image22.png',
    caption: 'Needle penetrometer measuring consistency of 60/70 penetration grade bitumen sample in water bath.',
    locationOrDate: 'CEC Materials Laboratory — Apr 2025',
    figureNo: 'Figure 21'
  },
  {
    id: 'g21',
    title: 'Pre-Construction Crack Survey on Structures',
    category: 'Safety & HSE',
    src: '/images/presentation_image22.png',
    caption: 'Documenting baseline pre-existing structural cracks on adjacent houses along road corridor prior to compaction vibration.',
    locationOrDate: 'Homagama Road Corridor — Dec 2024',
    figureNo: 'Presentation Slide 11'
  },
  {
    id: 'g22',
    title: 'DCP Automation Tool — Input Panel UI',
    category: 'Software Automation',
    src: '/images/cec_pdf_p65_180.png',
    caption: 'Central control interface of DCP Test Report Generator.xlsm with action buttons and metadata inputs.',
    locationOrDate: 'VBA Software Suite — Jan 2025',
    figureNo: 'Software UI Stage 1'
  },
  {
    id: 'g23',
    title: 'DCP Tool — Automatic Layer Detection & Plot',
    category: 'Software Automation',
    src: '/images/cec_pdf_p68_192.png',
    caption: 'Auto-generated individual test report showing depth vs blow curve, RMSD breakpoints, and layer CBR.',
    locationOrDate: 'VBA Software Suite — Jan 2025',
    figureNo: 'Software UI Stage 4'
  },
  {
    id: 'g24',
    title: 'DCP Tool — Master Road Chainage Summary',
    category: 'Software Automation',
    src: '/images/cec_pdf_p69_196.png',
    caption: 'Compiled master road summary sheet grouping test results by chainage, carriageway, and shoulder.',
    locationOrDate: 'VBA Software Suite — Jan 2025',
    figureNo: 'Software UI Stage 5'
  },
  {
    id: 'g25',
    title: 'Precast Dish Drain Structural Details',
    category: 'Schematics',
    src: '/images/cec_pdf_p150_371.png',
    caption: 'Cross-sectional geometry and foundation bed specifications for precast concrete dish drains.',
    locationOrDate: 'Engineering Drawings',
    figureNo: 'Drainage Standard'
  },
  {
    id: 'g26',
    title: 'Rubble Masonry Retaining Wall Cross-Section',
    category: 'Schematics',
    src: '/images/cec_pdf_p147_362.png',
    caption: 'Structural drawing of random rubble masonry retaining wall with weep-holes and granular backfill filter.',
    locationOrDate: 'Engineering Drawings',
    figureNo: 'Structures Standard'
  }
]
