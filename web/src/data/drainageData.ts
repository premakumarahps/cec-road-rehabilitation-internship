export interface DrainageStructure {
  id: string
  title: string
  category: 'Surface Drainage' | 'Subsurface Drainage' | 'Earth Retention' | 'Cross Drainage'
  purpose: string
  dimensions: string
  materials: string
  keySpecs: string[]
  constructionSteps: string[]
  image?: string
  imageCaption?: string
}

export const DRAINAGE_STRUCTURES: DrainageStructure[] = [
  {
    id: 'dish-drain',
    title: 'Precast Concrete Dish Drain',
    category: 'Surface Drainage',
    purpose: 'Shallow surface water runoff conveyance along constrained road shoulders where open deep drains present traffic safety hazards.',
    dimensions: 'Width: 600 mm – 750 mm | Invert Depth: 100 mm – 150 mm | Unit Length: 1000 mm precast sections',
    materials: 'Grade M25 structural concrete, 1:3 cement mortar jointing, 50mm compacted aggregate bedding',
    keySpecs: [
      'Minimum longitudinal bed slope of 0.5% (1 in 200) to ensure non-silting self-cleansing velocity.',
      'Flush installation with finished shoulder level to permit smooth pedestrian and light vehicular traversal.',
      'Mortar-sealed interlocking joints preventing base saturation and subgrade weakening.'
    ],
    constructionSteps: [
      'Trench excavation to design formation level with string-line grade control.',
      'Placement and compaction of 50mm crushed stone aggregate leveling blinding layer.',
      'Precise laying of precast M25 dish drain units using rubber mallets and spirit levels.',
      'Butt joint sealing with 1:3 cement-sand mortar enriched with waterproofing admixture.',
      'Careful shoulder backfilling and compaction flush with outer drain lip.'
    ],
    image: '/images/cec_pdf_p150_371.png',
    imageCaption: 'Precast Dish Drain Cross-Section and Subgrade Blinding Layer Details'
  },
  {
    id: 'u-drain',
    title: 'Reinforced Concrete U-Drain with Cover Slabs',
    category: 'Surface Drainage',
    purpose: 'High-capacity stormwater discharge through built-up township zones, commercial frontages, and high-incline terrain.',
    dimensions: 'Internal Clear Width: 450 mm – 600 mm | Clear Depth: 600 mm – 900 mm | Wall Thickness: 100 mm – 125 mm',
    materials: 'Grade M25 reinforced concrete, Grade 500 TMT high-yield deformed bars, precast perforated M30 cover slabs',
    keySpecs: [
      'Cast-in-situ reinforced base slab and walls with continuous water-stop construction joints.',
      'Integrated precast removable cover slabs designed for Class B (125 kN) or Class C (250 kN) vehicular wheel loads.',
      'Periodic catchpits installed at 30m maximum spacing for sediment collection and maintenance access.'
    ],
    constructionSteps: [
      'Mechanical excavation to formation level with 150mm over-dig for gravel bedding.',
      'Pouring 75mm Grade M15 blinding concrete layer to support reinforcement chairs.',
      'Fixing rebar cage per structural schedule with minimum 40mm cover blocks.',
      'Erecting rigid steel formwork; pouring M25 ready-mix concrete with needle poker vibration.',
      'Curing with water spray for minimum 7 days; laying precast trafficable cover slabs.'
    ]
  },
  {
    id: 'earth-drain',
    title: 'Unlined Trapezoidal Earth Drain',
    category: 'Surface Drainage',
    purpose: 'Cost-effective rural runoff evacuation along open fields, agricultural stretches, and unpaved road verges.',
    dimensions: 'Bed Width: 300 mm – 500 mm | Top Width: 900 mm – 1200 mm | Side Slope: 1:1 to 1:1.5',
    materials: 'In-situ native compacted soil, sodding / turfing for erosion control on vulnerable batters',
    keySpecs: [
      'Strict control of longitudinal invert gradient between 0.3% and 1.0% to prevent scour while avoiding stagnation.',
      'Turf planting along outer slopes to stabilize loose silty soil against monsoon rains.',
      'Outfall directed into designated natural streams or public irrigation canals.'
    ],
    constructionSteps: [
      'Grading shoulder slope to establish natural fall into the ditch alignment.',
      'Excavation using mini-excavator bucket shaped to trapezoidal profile.',
      'Manual trimming of slopes and removal of loose tree roots and boulders.',
      'Compacting drain invert and applying spot turfing on steep discharge sections.'
    ]
  },
  {
    id: 'retaining-wall',
    title: 'Random Rubble Masonry (RRM) Retaining Wall',
    category: 'Earth Retention',
    purpose: 'Stabilizing steep hillside cuts and supporting road embankments adjacent to valleys, low-lying paddy fields, and stream banks.',
    dimensions: 'Height: 1.5 m to 4.5 m | Top Width: 450 mm | Base Width: 0.4H to 0.6H (stepped rear face)',
    materials: 'Dressed hard quarry granite stones, 1:4 cement-sand mortar, PVC weep-holes (75mm), graded stone backfill',
    keySpecs: [
      'Stepped rear face with 1:6 front batter to ensure the resultant thrust line remains within middle third of base.',
      'Staggered 75mm diameter PVC weep-holes installed at 1.5m horizontal and 1.0m vertical centers with 1:20 outward fall.',
      'Cohesive free-draining granular backfill filter zone (min. 300mm thick) behind wall face to relieve hydrostatic head.'
    ],
    constructionSteps: [
      'Excavation to hard founding rock or dense subgrade stratum with minimum 600mm embedment depth.',
      'Pouring 100mm Grade M15 mass concrete leveling foundation bed.',
      'Laying angular quarry stones in full beds of 1:4 mortar, breaking vertical joints systematically.',
      'Positioning PVC weep-hole pipes encased in non-woven geotextile envelopes at specified levels.',
      'Placing permeable aggregate filter backing simultaneously with masonry lifts in 300mm compacted layers.'
    ],
    image: '/images/cec_pdf_p147_362.png',
    imageCaption: 'Figure 15: Structural Details and Drainage Layer of Rubble Masonry Retaining Wall'
  },
  {
    id: 'culverts',
    title: 'Reinforced Concrete Pipe & Box Culverts',
    category: 'Cross Drainage',
    purpose: 'Transmitting natural cross-drainage streams and ditch discharges safely beneath the active road formation.',
    dimensions: 'Pipe Diameter: 600 mm – 900 mm (Spun Concrete NP3 class) | Box Culverts: 1.2 m x 1.2 m to 2.0 m x 1.5 m',
    materials: 'Precast spun concrete pipes, Grade M25 structural concrete headwalls and wingwalls, rip-rap stone aprons',
    keySpecs: [
      'Minimum cover of 600mm between pipe crown and finished road surface to distribute heavy axle loads.',
      'Granular pipe cradle bedding (Class B bedding) supporting 120° of pipe circumference.',
      'Wingwalls angled at 30° to 45° to channel stream flow smoothly without upstream eddy scouring.'
    ],
    constructionSteps: [
      'Excavating culvert trench with appropriate trench shoring and dewatering pump setup.',
      'Laying 150mm thick compacted granular bedding shaped to pipe underside curvature.',
      'Lowering and aligning precast pipe segments using crane straps; sealing spigot and socket joints.',
      'Shuttering and casting Grade M25 mass concrete inlet/outlet headwalls, wingwalls, and drop pits.',
      'Constructing stone rip-rap pitching at outlet to prevent downstream scour and embankment erosion.'
    ]
  }
]
