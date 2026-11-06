/* ==========================================================================
   Daud Mustafa Minhas — personal site
   1. Content data (from CV 2026)
   2. Page UI (theme, nav, rendering, filters)
   3. Three.js stage helper
   4. FIG. 01 — Digital twin of a home area power network + industrial grid
   5. FIG. 02 — Secure industrial communication (IEC 62443 zones & conduits)
   ========================================================================== */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* =======================================================================
     1. CONTENT
     ======================================================================= */
  const ROLES = [
    "Digitalization & AI Engineer",
    "Green Energy & OT/IT Security Researcher",
    "Educator in AI Automation",
    "CISM® Certified",
    "Digital Twins · Smart Grids · Agentic AI",
  ];

  const LANGS = [
    { n: "English", l: "C1 · Full professional", p: 85 },
    { n: "German", l: "B1 · Working knowledge", p: 50 },
    { n: "Urdu", l: "C2 · Native", p: 100 },
    { n: "Hindi", l: "C1 · Native", p: 88 },
    { n: "Arabic", l: "A2 · Elementary", p: 25 },
  ];

  const LAYERS = [
    {
      id: "teach", name: "TEACHING & TRANSFER", sub: "Layer 4 · multiplier", c: "var(--fuzz)",
      title: "Teaching & knowledge transfer",
      kicker: "15+ YEARS · SAARLAND UNIVERSITY · SCHEER SCHOOL · UOL",
      text: "I turn research into skills. My M.Sc. courses take students from machine learning to LLM agents built from scratch, with live coding, Git and Python.",
      points: [
        "AI in Automation, Automation Systems (LLM agents, RAG, LangGraph, MCP), Soft Control, OT/ICS Security and Data Science for Threat Analysis.",
        "Academic lead for Foundations in Mathematical Mastery, an intensive English-taught Master’s course.",
        "Grant writing and consortium building: SURF (€4.3M, BMWE) and Erasmus+ proposals Energy4U, DigiCRAFT and ReCAP.",
      ],
      chips: ["Agentic AI for Automation", "Engineering Mathematics", "Project-based Learning", "Evidence-Based Technical Teaching", "Grant Writing & Consortium Building"],
    },
    {
      id: "trust", name: "CYBER-PHYSICAL TRUST LAYER", sub: "Layer 3 · protection", c: "var(--secure)",
      title: "Cyber-physical trust layer",
      kicker: "CISM® · IEC 62443 · NIS2 · KRITIS · BSI",
      text: "Distributed energy resources are now networked control systems. I test, model and harden them so that flexibility does not become an attack surface.",
      points: [
        "Security and digitalization work-package lead in the €4.3M BMWE-funded SURF regional flexibility platform.",
        "Nine-phase Python security and compliance automation toolkit for DER monitoring platforms, mapped to NIS2, IEC 62443, BSI IT-Grundschutz, KRITIS and §14a EnWG.",
        "Full-stack penetration tests of commercial home energy management systems and pymodbus-based Modbus-TCP fuzzing of PV, wallbox, heat pump and storage devices.",
        "AI-driven anomaly detection, STRIDE threat modelling and intrusion detection for AMI networks and digital twins.",
      ],
      chips: ["CISM®", "IEC 62443", "NIS2 · KRITIS · BSI", "OT Pentesting", "STRIDE Threat Modelling", "Intrusion / Anomaly Detection"],
    },
    {
      id: "digital", name: "DIGITALIZATION & AGENTIC AI", sub: "Layer 2 · intelligence", c: "var(--accent-2)",
      title: "Digitalization & agentic AI",
      kicker: "DIGITAL TWINS · CO-SIMULATION · LLMs & RAG",
      text: "Digital twins and AI turn measured energy assets into systems that can forecast, optimise and explain themselves.",
      points: [
        "Agentic workflow for document and tender intelligence using RAG, a vector database and OCR.",
        "Green AI benchmarking of energy, latency and CO₂ footprints of LLM prompting strategies across Gemma, Llama and Qwen.",
        "Virtual energy replication framework predicting residential PV power, heat pump load and thermal comfort from weather forecasts.",
        "Digital-twin co-simulation for plug-and-play microgrids and PV power prediction.",
      ],
      chips: ["Agentic AI", "LLMs & RAG", "LangGraph · MCP", "Digital Twins", "Co-simulation", "ML Forecasting", "Process Automation"],
    },
    {
      id: "energy", name: "CRITICAL ENERGY INFRASTRUCTURE", sub: "Layer 1 · foundation", c: "var(--power)",
      title: "Critical energy infrastructure",
      kicker: "SMART GRIDS · POWER ELECTRONICS · iEMS & MPC",
      text: "My foundation is power systems. My doctorate modelled home area power networks component by component and controlled them with ML-based model predictive control.",
      points: [
        "Dr.-Ing. thesis on component-based dynamic modelling and energy management strategies for a smart Home Area Power Network (HAPN).",
        "ML-based MPC and digital-twin co-simulation that reduced simulated operational energy costs by 15% (ECO Microgrid).",
        "Optimal control and queueing-theory models for AC/DC smart power systems, DC microgrid stability and power-factor correction.",
        "Industrial roots: LV/MV commissioning, Allen-Bradley and Siemens PLCs, SCADA panels and 132 kV grid-station ETAP studies.",
      ],
      chips: ["Smart Grid / DERs", "iEMS & MPC", "TRNSYS · PyPSA", "PV · EV · Heat Pump · BESS", "SCADA / PLC", "Modbus-TCP"],
    },
  ];

  const EXPERIENCE = [
    {
      when: "2025 – Present", current: true, code: "LOG-06",
      role: "OT Security R&D Engineer – Industrial Security Lab", org: "ZeMA gGmbH (SEI), Saarbrücken, GER",
      items: [
        ["SEI-Partner Lead (SURF – €4.3M BMWE-funded)", "Spearheading the security and digitalization work package for the Smart, User-Based Regional Flexibility Platform for Electricity Markets, integrating AI-driven analytics and cybersecurity frameworks into distributed energy grids."],
        ["Automated digital grid toolkits", "Built a nine-phase Python security and compliance automation toolkit for DER monitoring platforms, mapped to NIS2, IEC 62443, BSI IT-Grundschutz, KRITIS and §14a EnWG."],
        ["Critical energy hardware/software testing", "Led full-stack penetration tests of commercial Home Energy Management Systems (HEMS) and designed pymodbus-based fuzzing and validation frameworks for prosumer grid interfaces."],
        ["Soft/hardware fuzzing", "Modbus-TCP fuzzing and validation of prosumer devices (PV, wallbox, heat pump, storage). AI-driven anomaly detection and threat modelling for critical energy infrastructure."],
      ],
    },
    {
      when: "2023 – Present", current: true, code: "LOG-05",
      role: "Teaching Associate (Adjunct Faculty) – Chair of Automation & Energy Systems", org: "Saarland University (AES), GER",
      items: [
        ["Agentic AI & automation teaching", "Designing and lecturing postgraduate M.Sc. courses including AI in Automation (ML to LLMs built from scratch), Automation Systems (introductory and advanced: LLM agents, RAG, LangGraph, MCP), Soft Control (Fuzzy, ML, Optimization), OT/ICS Security and Data Science for Threat Analysis."],
        ["Digital teaching methods", "Integrating project-based learning, live coding, Git and Python to translate complex control, optimisation and AI-agent concepts into practical engineering skills."],
        ["Mentorship track record", "Supervised numerous Master’s and Bachelor’s theses on power load disaggregation, digital twins, appliance classification and cyber-physical network security."],
        ["Grant acquisition", "Key contributor and work-package lead on the €4.3M BMWE-funded SURF smart-grid flexibility proposal across cross-functional academic and industrial teams."],
        ["Erasmus+ leadership", "Led EU Erasmus+ capacity enhancement proposals (Energy4U / DigiCRAFT / ReCAP) and international researcher mobility programmes."],
      ],
    },
    {
      when: "2025 – Present", current: true, code: "LOG-04",
      role: "Ambassador & Mathematics Expert – Digital Sciences for Transformation", org: "Scheer School of Digital Sciences, GER",
      items: [
        ["Mathematics expert", "Academic lead for Foundations in Mathematical Mastery, an intensive English-taught Master’s course: teaching, weekly feedback and assessment of final pitches."],
        ["Digital sciences ambassador", "Promote the digital-sciences curriculum and guide students on pathways linking mathematics and business processes with digital transformation."],
      ],
    },
    {
      when: "2016 – 2023", code: "LOG-03",
      role: "Research Associate – Chair of Automation & Energy Systems", org: "Saarland University, GER",
      items: [
        ["Project 01 (ECO Microgrid)", "Developed machine-learning-based Model Predictive Control (MPC) and digital twin co-simulation for plug-and-play microgrids, reducing simulated operational energy costs by 15%."],
        ["Project 02 (SE-ProEng)", "Contributed to an EU-funded cloud-based networked simulator for flexible systems engineering product design."],
      ],
    },
    {
      when: "2008 – 2016", code: "LOG-02",
      role: "Assistant Professor / Lecturer – Department of Electrical Engineering", org: "University of Lahore (UOL) & CUST, PAK",
      items: [
        ["R&D", "Conducted R&D on optimal control strategies for AC/DC smart power systems (CUST, 2013–2016)."],
        ["Undergraduate and graduate teaching and project supervision", "Taught Machine Learning, Smart Grid, Big Data with R, Power System Protection, Power Electronics, Instrumentation & Measurement and Circuit Analysis (UOL)."],
      ],
    },
    {
      when: "2007 – 2008", code: "LOG-01",
      role: "System Engineer – Electrical (PLC/SCADA) & Telecom Networks", org: "SoulTech Pvt Ltd & Supernet Ltd, PAK",
      items: [
        ["Industrial commissioning", "Hands-on commissioning of LV/MV electrical equipment, Allen-Bradley/Siemens PLCs and SCADA panels (SoulTech)."],
        ["Telecom networks", "Field installation and commissioning of wireless point-to-(multi)point, VSAT and iDirect networks (Supernet)."],
      ],
    },
  ];

  const CAT = {
    ai: { n: "AI & Agents", c: "var(--accent-2)" },
    energy: { n: "Energy Grids", c: "var(--power)" },
    security: { n: "Security", c: "var(--secure)" },
    twin: { n: "Digital Twins", c: "var(--wind)" },
  };

  const PROJECTS = [
    { y: "2025–2026", org: "ZeMA / Saarland Univ.", cat: ["ai"], t: "Applied Agentic AI & Green AI Benchmarking",
      d: "Designed an agentic workflow for automated document and tender intelligence using RAG, a vector database and OCR. Benchmarked the energy, latency and CO₂ footprints of LLM prompting strategies across Gemma, Llama and Qwen.",
      tools: ["RAG", "Vector DB", "OCR", "Gemma", "Llama", "Qwen", "Green AI"] },
    { y: "2025–Present", org: "ZeMA gGmbH (SEI)", cat: ["security", "energy"], t: "SURF – Smart, User-Based Regional Flexibility Platform",
      d: "€4.3M BMWE-funded platform for electricity-market flexibility. As SEI-partner lead I head the security and digitalization work package, integrating AI-driven analytics and cybersecurity frameworks into distributed energy grids.",
      tools: ["€4.3M · BMWE", "DER Flexibility", "NIS2", "IEC 62443", "§14a EnWG"], from: "Working experience" },
    { y: "2025", org: "ZeMA gGmbH", cat: ["twin", "energy", "ai"], t: "Digital Twins in Energy Systems",
      d: "Architectures, AI integration and pathways to resilient and sustainable smart grids (ProjSe 2025).",
      tools: ["Digital Twins", "AI Integration", "Smart Grids", "Resilience"] },
    { y: "2025", org: "ZeMA gGmbH", cat: ["security", "ai"], t: "Bridging the Cyber-Physical Divide",
      d: "Cybersecurity challenges and AI-driven innovations in smart grids.",
      tools: ["Smart Grid Security", "AI", "Cyber-Physical Systems"] },
    { y: "2024", org: "Saarland University", cat: ["security"], t: "Security Framework for Digital Transformation in Energy Networks",
      d: "Compliance-mapped security architecture and anomaly detection in cyber-physical networks.",
      tools: ["Security Architecture", "Compliance Mapping", "Anomaly Detection"] },
    { y: "2023", org: "Saarland University", cat: ["energy", "twin"], t: "Simulation of a Fast-Charging Station for Electric Vehicles",
      d: "Co-simulation and grid-impact modelling for high-power EV integration.",
      tools: ["Co-simulation", "EV Charging", "Grid Impact"] },
    { y: "2016–2023", org: "Saarland University", cat: ["energy", "ai", "twin"], t: "ECO Microgrid",
      d: "Machine-learning-based Model Predictive Control (MPC) and digital-twin co-simulation for plug-and-play microgrids, reducing simulated operational energy costs by 15%.",
      tools: ["ML-based MPC", "Digital Twin", "Co-simulation", "Microgrids"], from: "Working experience" },
    { y: "2016–2023", org: "Saarland University", cat: ["twin"], t: "SE-ProEng",
      d: "Contribution to an EU-funded cloud-based networked simulator for flexible systems-engineering product design.",
      tools: ["Distributed Simulation", "Systems Engineering", "Cloud"], from: "Working experience" },
    { y: "2021", org: "Saarland University", cat: ["ai", "energy"], t: "Home Load Disaggregation Using Multiple CNNs",
      d: "Deep-learning-based non-intrusive load monitoring (Master’s thesis supervision).",
      tools: ["CNN", "NILM", "Deep Learning", "Thesis Supervision"] },
    { y: "2018–2020", org: "Saarland University", cat: ["energy", "ai"], t: "Smart Building Digitalization",
      d: "Model-driven classification of power appliances, wireless network control and master/slave power-node communication.",
      tools: ["Appliance Classification", "Wireless Control", "Power Nodes"] },
    { y: "2010–2011", org: "SoulTech / Industry", cat: ["energy"], t: "Industrial Grid & PLC/SCADA Rollouts",
      d: "Remote PLC/SCADA operations (Honda Power / Japan Power), commercial PV/inverter installations and 132 kV grid-station ETAP harmonic and load-flow optimisation.",
      tools: ["PLC / SCADA", "PV Inverters", "ETAP", "132 kV"] },
  ];

  const PUBCAT = {
    j1: { n: "Indexed journals", c: "var(--power)" },
    j2: { n: "Peer-reviewed journals", c: "var(--accent-2)" },
    bc: { n: "Book chapters", c: "var(--fuzz)" },
    conf: { n: "Conference papers", c: "var(--secure)" },
    post: { n: "Posters & preprints", c: "var(--wind)" },
  };
  const ME = "D. M. Minhas et al.";
  const PUBS = [
    [1, "j1", 2026, "M. Shahzad, B. Ali, D. M. Minhas, and G. Frey", "A Multi-Stage Framework for Intrusion Detection and Attack-Path Reconstruction in Advanced Metering Infrastructure (AMI) Networks", "Smart Cities, vol. 9, no. 9, art. 158", "10.3390/smartcities9090158"],
    [2, "j1", 2025, "U. M. Shah, D. M. Minhas, K. Kifayat, K. A. Shah, and G. Frey", "Threat Modeling and Attacks on Digital Twins of Vehicles: A Systematic Literature Review", "Smart Cities, vol. 8, no. 5, art. 142", "10.3390/smartcities8050142"],
    [3, "j1", 2025, ME, "Invisible Eyes: Real-Time Activity Detection Through Encrypted Wi-Fi Traffic Without Machine Learning", "Internet of Things, vol. 31, art. 101602"],
    [4, "j1", 2021, ME, "Rolling Horizon Based Time-Triggered Distributed Control for AC/DC Home Area Power Network", "IEEE Transactions on Industry Applications", "10.1109/TIA.2021.3074901"],
    [5, "j1", 2020, ME, "Modeling and Optimizing Energy Supply and Demand in Home Area Power Network (HAPN)", "IEEE Access, vol. 8, pp. 2052–2072", "10.1109/ACCESS.2019.2962660"],
    [6, "j1", 2018, ME, "Mathematical Modeling and Stability Analysis of DC Microgrid Using SM Hysteresis Controller", "International Journal of Electrical Power & Energy Systems"],
    [7, "j2", 2026, "M. T. Jamalabad, E. Abohamzeh, D. M. Minhas, S. Kim, D. Kim, A. Yoon, and G. Frey", "Comparative Assessment of Supervised Machine Learning Models for Predicting Water Uptake in Sorption-Based Thermal Energy Storage", "Energies, vol. 19, no. 7, art. 1619", "10.3390/en19071619"],
    [8, "j2", 2025, "D. M. Minhas, M. Usman, I. B. Raja, A. Wakeel, M. Ali, and G. Frey", "Virtual Energy Replication Framework for Predicting Residential PV Power, Heat Pump Load, and Thermal Comfort Using Weather Forecast Data", "Energies, vol. 18, no. 18, art. 5036", "10.3390/en18185036"],
    [9, "j2", 2025, "T. Mehmood, T. ur Rashid, M. Usman, M. Ali, D. M. Minhas, and G. Frey", "Adapting Energy Conservation Building Code-2023 for the Diverse Climates of Pakistan: A Path to Affordable Energy Efficiency and Sustainable Living", "Buildings, vol. 15, no. 17, art. 3053", "10.3390/buildings15173053"],
    [10, "j2", 2022, ME, "Electric Vehicle Battery Storage Concentric Intelligent Home Energy Management System Using Real-Life Data Sets", "Energies, vol. 15, no. 5, art. 1619", "10.3390/en15051619"],
    [11, "j2", 2021, ME, "Mitigation of Circulating Currents for Parallel Connected Sources in a Standalone DC Microgrid", "Engineering Proceedings"],
    [12, "bc", 2025, "H. Khalil, G. Ali, and D. M. Minhas", "Explainable AI in Threat Intelligence: Improving Human–Machine Teaming", "in Cybersecurity, Cybercrimes, and Smart Emerging Technologies", "10.1201/9781003614197"],
    [13, "bc", 2025, "H. Khalil, D. M. Minhas, et al.", "Optimizing Cloud Virtual Machine Management Through AI-Enabled Infrastructure-as-Code", "Book chapter"],
    [14, "bc", 2016, ME, "Efficient Control Strategies to Optimize Electricity Cost and Consumer Satisfaction", "Book chapter"],
    [15, "conf", 2026, "D. M. Minhas, P. Kushare, H. Khalil, and G. Frey", "Carbon-Aware Benchmarking of Prompting Strategies Across Open-Source LLM Families", "IEEE Cyber-AI", null, "Proceedings citation/DOI to be added when available."],
    [16, "conf", 2023, ME, "Co-Simulation Strategy for Photovoltaic Power Prediction and Validation of Digital Twin", "EEEIC / I&CPS Europe"],
    [17, "conf", 2022, ME, "Energy Optimization of a Residential Building Using Model Predictive Control: A Case Study in Temperate Oceanic Climate", "Conference paper"],
    [18, "conf", 2022, ME, "A Rule-Based Expert System for Home Power Management Incorporating Real-Life Data Sets", "IEEE Smart Grid and Renewable Energy Conference", "10.1109/SGRE53517.2022.9774212"],
    [19, "conf", 2020, ME, "Stochastic Optimization Scheme to Schedule Energy Supply and Demands in an Islanded Microgrid", "IEEE IECON"],
    [20, "conf", 2020, ME, "Two-Stage Multi-Time-Scale Energy Management and Control Framework for Home Area Power Network", "EEEIC / I&CPS Europe", "10.1109/EEEIC/ICPSEurope49358.2020.9160519"],
    [21, "conf", 2019, ME, "Optimal Scheduling of Energy Supply Entities in Home Area Power Network", "IEEE Conference on Control, Decision and Information Technologies (CoDIT), pp. 732–737", "10.1109/CoDIT.2019.8820673"],
    [22, "conf", 2018, ME, "SoMAS Based Cooperative Control for Cyber Physical Energy Systems", "Conference paper"],
    [23, "conf", 2017, ME, "Activation of Electrical Loads Under Electricity Price Uncertainty", "IEEE Smart Energy Grid Engineering (SEGE)"],
    [24, "conf", 2017, ME, "Real-Time Power Balancing in Photovoltaic-Integrated Smart Micro-Grid", "IEEE IECON, pp. 7469–7474", "10.1109/IECON.2017.8217308"],
    [25, "conf", 2017, ME, "Short-Term Load Forecasting Using Hybrid Adaptive Fuzzy Neural System: The Performance Evaluation", "IEEE PowerAfrica", "10.1109/PowerAfrica.2017.7991270"],
    [26, "conf", 2017, ME, "Load Control for Supply-Demand Balancing Under Renewable Energy Forecasting", "IEEE International Conference on DC Microgrids", "10.1109/ICDCM.2017.8001071"],
    [27, "conf", 2016, ME, "PFC Topologies for AC to DC Converters in DC Micro-Grid", "Conference paper"],
    [28, "conf", 2016, ME, "Cost-Effective Bidirectional Power Transactions for Queueing Energy Requests in Smart Micro-Grids", "Conference paper"],
    [29, "conf", 2015, ME, "Load Balancing in Smart DC Micro-Grid Using Delay Tolerant User Demands", "IEEE SmartGridComm, pp. 157–162"],
    [30, "conf", 2015, ME, "Comparison of S-Band Diplexer Design Using Multiplexer Theory with Coupling Matrix Synthesis", "Conference paper"],
    [31, "conf", 2015, ME, "Optimal Control of Power Cost and Consumer Satisfaction Using Smart Grid Intelligent Energy Management System", "Asian Control Conference"],
    [32, "post", 2022, ME, "Verteilte Simulation zur flexiblen Produktgestaltung im Systems Engineering (SE-ProEng / TP3)", "Poster"],
    [33, "post", 2017, ME, "Efficient Energy Management Strategies in Smart Grids Using Shiftable Power Loads", "Poster"],
    [34, "post", 2024, "T. Mehmood et al., including D. M. Minhas", "Adapting Passive Houses for the Diverse Climates of Pakistan: A Path to Affordable Energy Efficiency and Sustainable Living", "Preprint", null, "Precursor to the 2025 Buildings article."],
  ].map(([n, cat, y, a, t, v, doi, note]) => ({ n, cat, y, a, t, v, doi: doi || null, note: note || "" }));

  const COURSES = [
    { lvl: "M.Sc. · SAARLAND UNIVERSITY", t: "AI in Automation", d: "From machine learning to LLMs built from scratch.", chips: ["ML", "Deep Learning", "LLMs from scratch"] },
    { lvl: "M.Sc. · SAARLAND UNIVERSITY", t: "Automation Systems", d: "Introductory and advanced tracks, including LLM agents, RAG, LangGraph and MCP.", chips: ["LLM Agents", "RAG", "LangGraph", "MCP"] },
    { lvl: "M.Sc. · SAARLAND UNIVERSITY", t: "Soft Control", d: "Fuzzy logic, machine learning and optimisation for control.", chips: ["Fuzzy", "ML", "Optimization"] },
    { lvl: "M.Sc. · SAARLAND UNIVERSITY", t: "OT/ICS Security", d: "Security of operational technology and industrial control systems.", chips: ["IEC 62443", "ICS", "OT Pentesting"] },
    { lvl: "M.Sc. · SAARLAND UNIVERSITY", t: "Data Science for Threat Analysis", d: "Data-driven detection and analysis of cyber threats.", chips: ["Anomaly Detection", "Python", "Threat Analysis"] },
    { lvl: "MASTER’S · SCHEER SCHOOL", t: "Foundations in Mathematical Mastery", d: "Intensive English-taught Master’s course: teaching, weekly feedback and assessment of final pitches.", chips: ["Engineering Mathematics", "Digital Transformation"] },
    { lvl: "B.Sc./M.Sc. · UOL 2008–2016", t: "Earlier teaching at the University of Lahore", d: "Undergraduate and graduate teaching and project supervision.", chips: ["Machine Learning", "Smart Grid", "Big Data with R", "Power System Protection", "Power Electronics", "Instrumentation & Measurement", "Circuit Analysis"] },
  ];

  const EDUCATION = [
    { y: "2017–2023", t: "Doctor of Engineering (Dr.-Ing.) in Systems Engineering", badge: "magna cum laude",
      d: "Thesis: “Component-Based Dynamic Modelling of Energy Entities and Energy Management Strategies for a Smart Home Area Power Network (HAPN).” Researched ML-based Model Predictive Control (MPC) and mathematical modelling of intelligent power entities to enable smart-grid flexibility and cost and emission reduction.",
      w: "Saarland University, Germany", x: "Supervisor: Prof. Dr.-Ing. Georg Frey · Award: DAAD scholarship" },
    { y: "2013–2016", t: "Postgraduate Research Stay (Smart Grid Applications)",
      d: "R&D on optimal control strategies and queueing-theory models for AC/DC smart power systems.",
      w: "Capital University of Science & Technology, PAK", x: "" },
    { y: "2008–2011", t: "Master of Science (M.Sc.) in Electrical Engineering", badge: "CGPA 3.58 / 4.00",
      d: "Specialization: Power Engineering & Electromagnetic Compatibility.", w: "The University of Lahore, PAK", x: "" },
    { y: "2003–2008", t: "Bachelor of Science (B.Sc.) in Electrical Engineering", badge: "CGPA 3.44 / 4.00",
      d: "Specialization: Electronics, Control & Communication Networks.", w: "The University of Lahore, PAK", x: "" },
  ];

  const SKILLS = [
    { ico: "T", n: "TEACHING", c: "var(--fuzz)", s: ["Agentic AI for Automation", "Engineering Mathematics", "Project-based Learning", "Evidence-Based Technical Teaching", "Grant Writing & Consortium Building"] },
    { ico: "AI", n: "DIGITALIZATION & AGENTIC AI", c: "var(--accent-2)", s: ["Agentic AI", "LLMs & RAG", "LangGraph · MCP", "Digital Twins", "Co-simulation", "ML Forecasting", "Process Automation"] },
    { ico: "⚡", n: "CRITICAL ENERGY INFRASTRUCTURE", c: "var(--power)", s: ["Smart Grid / DERs", "iEMS & MPC", "TRNSYS · PyPSA", "PV · EV · Heat Pump · BESS", "SCADA / PLC", "Modbus-TCP"] },
    { ico: "🛡", n: "CYBER-PHYSICAL TRUST LAYER", c: "var(--secure)", s: ["CISM®", "IEC 62443", "NIS2 · KRITIS · BSI", "OT Pentesting", "STRIDE Threat Modelling", "Intrusion / Anomaly Detection"] },
    { ico: "</>", n: "ENGINEERING & DEV STACK", c: "var(--wind)", s: ["Python · PyTorch · scikit-learn", "MATLAB/Simulink", "TRNSYS", "R · C++", "Git · Streamlit", "LaTeX", "MathCad", "Arduino · ESP", "Raspberry Pi"] },
  ];

  const CERTS = {
    "CYBERSECURITY": [
      ["2023", "Certified Information Security Manager (CISM®)", "ISACA", "ID: 242639970", true],
      ["2024", "Penetration Testing, Threat Hunting & Cryptography", "IBM", "Coursera Credential ID: UU4515ZXWZG3"],
      ["2024", "Cybersecurity Architecture", "IBM", "Coursera Credential ID: US7F7F4ZMOXW"],
      ["2024", "Cybersecurity Threat Vectors & Mitigation", "Microsoft", "Coursera Credential ID: 98SOKNZ7RM8N"],
      ["2024", "Cyber Security in Manufacturing", "SUNY", "Coursera Credential ID: H9V5RF3I1G7X"],
      ["2024", "Cybersecurity and the Internet of Things", "Kennesaw State Univ.", "Coursera Credential ID: 2UNT4XHFSKNW"],
      ["2024", "Gen AI in Cybersecurity", "Edureka", "Coursera Credential ID: YLJEZT1BTKDV"],
    ],
    "DIGITALIZATION, AI & INDUSTRIAL": [
      ["2024", "Generative AI & LLMs: Architecture and Data Preparation", "IBM", "Coursera Credential ID: 1LD0GE77VGI0"],
      ["2023", "Mastering Digital Twins", "EIT Digital, EU", "Coursera Credential ID: S7BESAUN68E4"],
      ["2023", "Machine Learning", "Stanford Online", "Coursera Credential ID: KH8AS35EZTMT"],
      ["2018", "Learn and Teach in Academics and Profession", "Saarland University", ""],
      ["2011", "Certified Associate in PLC & SCADA", "NUST, PAK", "CAPS-9-1-2011-0032"],
      ["2011", "Project Planning, Scheduling & Progress Monitoring", "NIDA, PAK", "NA-0911-1133"],
      ["2011", "Pro/Engineer: Machine Modelling & Analysis", "Aeromotive, PAK", ""],
    ],
  };

  const TALKS = [
    ["2026", "LLM energy/CO₂ benchmarking for cybersecurity – IEEE CyberAI, Bucharest"],
    ["2023", "Doctoral poster – ABB Energy Efficiency Symposium, Mannheim"],
    ["2023", "Technical workshop for high-school students – Tag der Technik, VDE Saar"],
    ["2021/23", "IEEE EEEIC / I&CPS Europe, Madrid"],
    ["2019", "IEEE CoDIT, Paris"],
    ["2015/16", "IEEE MELECON, Cyprus · IEEE ASCC, Malaysia · invited talk, MAJU Islamabad"],
  ];
  const AWARDS = [
    ["2023", "magna cum laude, PhD defence – Saarland University"],
    ["2016", "DAAD PhD Scholarship"],
    ["2015/16", "HEC travel grants (Malaysia, Cyprus)"],
    ["2013", "Postgraduate Fellowship – CUST"],
  ];

  /* =======================================================================
     2. PAGE UI
     ======================================================================= */
  const root = document.documentElement;
  const themeListeners = [];
  const isLight = () => root.getAttribute("data-theme") === "light";
  function setTheme(t, save) {
    root.setAttribute("data-theme", t);
    if (save) { try { localStorage.setItem("dmm-theme", t); } catch (e) { /* ignore */ } }
    themeListeners.forEach((f) => f(t === "light"));
  }
  (function initTheme() {
    let t = null;
    try { t = localStorage.getItem("dmm-theme"); } catch (e) { /* ignore */ }
    if (!t) t = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setTheme(t, false);
    $("#themeToggle").addEventListener("click", () => setTheme(isLight() ? "dark" : "light", true));
  })();

  // Mobile directory
  const nav = $("#nav"), menuBtn = $("#menuToggle");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  $$("#nav a").forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }));

  // Scroll progress + active nav
  const bar = $("#progressBar"), pct = $("#progressPct");
  function onScroll() {
    const h = document.documentElement.scrollHeight - innerHeight;
    const p = h > 0 ? clamp(scrollY / h, 0, 1) : 0;
    bar.style.width = (p * 100).toFixed(1) + "%";
    pct.textContent = String(Math.round(p * 100)).padStart(2, "0") + "%";
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const navLinks = $$("#nav a");
  const secObs = new IntersectionObserver((ents) => {
    ents.forEach((e) => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main > section[id]").forEach((s) => secObs.observe(s));

  // Role rotator
  (function rotator() {
    const el = $("#roleRotator");
    if (reduced) return;
    let i = 0, ch = el.textContent.length, del = true;
    function tick() {
      const word = ROLES[i];
      if (del) {
        ch--; el.textContent = word.slice(0, ch);
        if (ch <= 0) { del = false; i = (i + 1) % ROLES.length; }
        setTimeout(tick, 28);
      } else {
        const w = ROLES[i]; ch++; el.textContent = w.slice(0, ch);
        if (ch >= w.length) { del = true; setTimeout(tick, 2400); } else setTimeout(tick, 55);
      }
    }
    setTimeout(tick, 2600);
  })();

  // Languages
  $("#langList").innerHTML = LANGS.map((l) => `<li><div class="lv"><b style="color:var(--text)">${l.n}</b><span>${l.l}</span></div><div class="bar"><i data-w="${l.p}"></i></div></li>`).join("");

  // Research stack
  (function research() {
    const stack = $("#stack"), detail = $("#layerDetail");
    stack.innerHTML = LAYERS.map((L, i) => `<button class="layer" role="tab" id="tab-${L.id}" aria-controls="layerDetail" style="top:${i * 25 + 2}%;--c:${L.c};z-index:${10 - i}" data-i="${i}"><span>${L.name}<small>${L.sub}</small></span></button>`).join("");
    function show(i) {
      const L = LAYERS[i];
      $$(".layer", stack).forEach((b, j) => { b.classList.toggle("active", j === i); b.setAttribute("aria-selected", String(j === i)); });
      detail.style.setProperty("--c", L.c);
      detail.innerHTML = `<div class="fade-in"><span class="kicker">${L.kicker}</span><h3>${L.title}</h3><p>${L.text}</p><ul>${L.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul><div class="chips">${L.chips.map((c) => `<span class="chip">${esc(c)}</span>`).join("")}</div></div>`;
    }
    stack.addEventListener("click", (e) => { const b = e.target.closest(".layer"); if (b) show(+b.dataset.i); });
    show(3);
  })();

  // Experience timeline
  (function timeline() {
    const ol = $("#timeline");
    ol.innerHTML = EXPERIENCE.map((x, i) => `
      <li class="tl reveal ${x.current ? "current" : ""} ${i < 1 ? "open" : ""}">
        <button class="tl__btn" aria-expanded="${i < 1}" aria-controls="tlb-${i}">
          <span class="tl__when">${x.current ? "<b>● CURRENT</b>" : ""}${x.when}</span>
          <span class="tl__role">${esc(x.role)}<span class="tl__org">${esc(x.org)}</span></span>
          <span class="tl__code">${x.code}<i>+</i></span>
        </button>
        <div class="tl__body" id="tlb-${i}"><div><ul>${x.items.map(([h, t]) => `<li><b>${esc(h)}:</b> ${esc(t)}</li>`).join("")}</ul></div></div>
      </li>`).join("");
    ol.addEventListener("click", (e) => {
      const b = e.target.closest(".tl__btn"); if (!b) return;
      const li = b.parentElement, open = li.classList.toggle("open");
      b.setAttribute("aria-expanded", String(open));
    });
  })();

  // Project cards
  const FIGS = {
    energy: '<svg viewBox="0 0 300 120" preserveAspectRatio="none"><path d="M0 60 Q 25 15 50 60 T 100 60 T 150 60 T 200 60 T 250 60 T 300 60"/><path d="M0 60 Q 25 105 50 60 T 100 60 T 150 60 T 200 60 T 250 60 T 300 60" opacity=".35"/><path d="M228 22 l-14 34 h14 l-10 34 26-44 h-14 l10-24z"/></svg>',
    ai: '<svg viewBox="0 0 300 120"><g><circle cx="60" cy="30" r="6"/><circle cx="60" cy="60" r="6"/><circle cx="60" cy="90" r="6"/><circle cx="150" cy="40" r="6"/><circle cx="150" cy="80" r="6"/><circle cx="240" cy="60" r="8"/><path d="M66 30 144 40M66 30 144 80M66 60 144 40M66 60 144 80M66 90 144 40M66 90 144 80M156 40 232 60M156 80 232 60" opacity=".55"/></g></svg>',
    security: '<svg viewBox="0 0 300 120"><path d="M150 14 196 30v30c0 26-20 40-46 50-26-10-46-24-46-50V30z"/><path d="M134 62l12 12 22-24"/><path d="M20 40h60M20 60h50M20 80h60M220 40h60M230 60h50M220 80h60" opacity=".4"/></svg>',
    twin: '<svg viewBox="0 0 300 120"><path d="M70 40l40-18 40 18v40l-40 18-40-18zM70 40l40 18 40-18M110 58v40"/><path d="M160 40l40-18 40 18v40l-40 18-40-18zM160 40l40 18 40-18M200 58v40" stroke-dasharray="4 4"/><path d="M150 60h10" /></svg>',
  };
  (function projects() {
    const wrap = $("#projCards"), filt = $("#projFilters");
    const counts = { all: PROJECTS.length };
    PROJECTS.forEach((p) => p.cat.forEach((c) => (counts[c] = (counts[c] || 0) + 1)));
    filt.innerHTML = `<button class="filter active" data-f="all">ALL<em>${counts.all}</em></button>` +
      Object.keys(CAT).map((k) => `<button class="filter" data-f="${k}">${CAT[k].n.toUpperCase()}<em>${counts[k] || 0}</em></button>`).join("");
    wrap.innerHTML = PROJECTS.map((p, i) => {
      const c = CAT[p.cat[0]];
      return `<button class="card reveal" data-i="${i}" data-cat="${p.cat.join(" ")}" style="--c:${c.c}">
        <div class="card__fig">${FIGS[p.cat[0]]}<span class="fig-no">PROJECT / ${String(i + 1).padStart(2, "0")}</span></div>
        <div class="card__body">
          <div class="card__meta"><b>${p.cat.map((k) => CAT[k].n).join(" · ")}</b><span>${p.y}</span></div>
          <h3>${esc(p.t)}</h3>
          <p>${esc(p.d.length > 130 ? p.d.slice(0, 127).replace(/\s+\S*$/, "") + "…" : p.d)}</p>
          <span class="card__more">VIEW PROJECT DOSSIER →</span>
        </div></button>`;
    }).join("");
    filt.addEventListener("click", (e) => {
      const b = e.target.closest(".filter"); if (!b) return;
      $$(".filter", filt).forEach((x) => x.classList.toggle("active", x === b));
      const f = b.dataset.f;
      $$(".card", wrap).forEach((c) => c.classList.toggle("hide", f !== "all" && !c.dataset.cat.split(" ").includes(f)));
    });
    const modal = $("#projModal");
    wrap.addEventListener("click", (e) => {
      const card = e.target.closest(".card"); if (!card) return;
      const p = PROJECTS[+card.dataset.i];
      $("#pmCode").textContent = `PROJECT DOSSIER / ${String(+card.dataset.i + 1).padStart(2, "0")}`;
      $("#pmTitle").textContent = p.t;
      $("#pmMeta").innerHTML = `<dt>PERIOD</dt><dd>${p.y}</dd><dt>ORG</dt><dd>${esc(p.org)}</dd><dt>DOMAIN</dt><dd>${p.cat.map((k) => CAT[k].n).join(" · ")}</dd>${p.from ? `<dt>SOURCE</dt><dd>${p.from}</dd>` : ""}`;
      $("#pmBody").textContent = p.d;
      $("#pmTags").innerHTML = p.tools.map((t) => `<span class="chip">${esc(t)}</span>`).join("");
      if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
    });
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
  })();

  // Publications
  (function publications() {
    const list = $("#pubList"), filt = $("#pubFilters"), search = $("#pubSearch"), count = $("#pubCount");
    let cat = "all";
    const counts = { all: PUBS.length };
    PUBS.forEach((p) => (counts[p.cat] = (counts[p.cat] || 0) + 1));
    filt.innerHTML = `<button class="filter active" data-f="all">ALL<em>${counts.all}</em></button>` +
      Object.keys(PUBCAT).map((k) => `<button class="filter" data-f="${k}">${PUBCAT[k].n.toUpperCase()}<em>${counts[k]}</em></button>`).join("");
    function hl(text, q) {
      let h = esc(text);
      if (q) {
        const re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
        h = h.replace(re, "<mark>$1</mark>");
      }
      return h;
    }
    function render() {
      const q = search.value.trim();
      const ql = q.toLowerCase();
      const rows = PUBS.filter((p) => (cat === "all" || p.cat === cat) && (!ql || (p.t + " " + p.a + " " + p.v + " " + p.y).toLowerCase().includes(ql)));
      count.textContent = `SHOWING ${rows.length} OF ${PUBS.length} ENTRIES` + (cat !== "all" ? ` · ${PUBCAT[cat].n.toUpperCase()}` : "");
      list.innerHTML = rows.map((p) => {
        const C = PUBCAT[p.cat];
        const authors = hl(p.a, q).replace(/D\. M\. Minhas/g, "<b>D. M. Minhas</b>");
        const scholar = "https://scholar.google.com/scholar?q=" + encodeURIComponent('"' + p.t + '"');
        return `<li class="pub" style="--c:${C.c}">
          <span class="pub__n">[${p.n}]</span>
          <div>
            <div class="pub__t">${hl(p.t, q)}</div>
            <div class="pub__a">${authors}</div>
            <div class="pub__v">${hl(p.v, q)}, ${p.y}.</div>
            ${p.note ? `<div class="pub__note">${esc(p.note)}</div>` : ""}
            <div class="pub__links">${p.doi ? `<a href="https://doi.org/${p.doi}" target="_blank" rel="noopener">DOI ↗</a>` : ""}<a href="${scholar}" target="_blank" rel="noopener">SCHOLAR ↗</a></div>
          </div>
          <div class="pub__side"><span class="pub__y">${p.y}</span><span class="pub__cat">${C.n}</span></div>
        </li>`;
      }).join("") || `<li class="pub"><span></span><div class="pub__a">No entries match “${esc(q)}”.</div></li>`;
    }
    filt.addEventListener("click", (e) => {
      const b = e.target.closest(".filter"); if (!b) return;
      cat = b.dataset.f;
      $$(".filter", filt).forEach((x) => x.classList.toggle("active", x === b));
      render();
    });
    search.addEventListener("input", render);
    render();
  })();

  // Teaching, education, skills, certs, talks
  $("#courses").innerHTML = COURSES.map((c) => `<div class="course reveal"><span class="mono">${c.lvl}</span><h3>${esc(c.t)}</h3><p>${esc(c.d)}</p><div class="chips">${c.chips.map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</div></div>`).join("");
  $("#eduList").innerHTML = EDUCATION.map((e) => `<div class="edu__item reveal"><span class="edu__when">${e.y}</span><div><h3>${esc(e.t)}${e.badge ? `<span class="badge">${esc(e.badge)}</span>` : ""}</h3><p>${esc(e.d)}</p></div><div class="edu__where"><b>${esc(e.w)}</b>${esc(e.x)}</div></div>`).join("");
  $("#skillGroups").innerHTML = SKILLS.map((g) => `<div class="skill reveal" style="--c:${g.c}"><h3><span class="ico">${esc(g.ico)}</span>${g.n}</h3><div class="chips">${g.s.map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</div></div>`).join("");
  $("#certs").innerHTML = Object.keys(CERTS).map((k) => `<div class="cert-col reveal"><h4>${k}</h4>${CERTS[k].map(([y, t, o, id, star]) => `<div class="cert ${star ? "star" : ""}"><span class="cert__y">${y}</span><div><b>${esc(t)}</b> <span>– ${esc(o)}</span>${id ? `<small>${esc(id)}</small>` : ""}</div></div>`).join("")}</div>`).join("");
  $("#talkList").innerHTML = TALKS.map(([y, t]) => `<li><span class="mono">${y}</span><span>${esc(t)}</span></li>`).join("");
  $("#awardList").innerHTML = AWARDS.map(([y, t]) => `<li><span class="mono">${y}</span><span>${esc(t)}</span></li>`).join("");
  $("#year").textContent = new Date().getFullYear();

  // Reveal on scroll + counters + language bars
  const revObs = new IntersectionObserver((ents) => {
    ents.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      revObs.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => revObs.observe(el));
  const cntObs = new IntersectionObserver((ents) => {
    ents.forEach((e) => {
      if (!e.isIntersecting) return;
      cntObs.unobserve(e.target);
      const el = e.target, end = +el.dataset.count, dec = +(el.dataset.decimals || 0), pre = el.dataset.prefix || "";
      if (reduced) return;
      const t0 = performance.now();
      (function step(t) {
        const k = clamp((t - t0) / 1400, 0, 1), v = end * (1 - Math.pow(1 - k, 3));
        el.textContent = pre + v.toFixed(dec);
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => cntObs.observe(el));
  const langObs = new IntersectionObserver((ents) => {
    ents.forEach((e) => { if (e.isIntersecting) { $$(".bar i", e.target).forEach((i) => (i.style.width = i.dataset.w + "%")); langObs.unobserve(e.target); } });
  }, { threshold: 0.3 });
  langObs.observe($("#langList"));

  /* =======================================================================
     3. THREE.JS STAGE HELPER
     ======================================================================= */
  if (!window.THREE) {
    $$(".stage").forEach((s) => s.classList.add("no-webgl"));
    return;
  }
  const T = window.THREE;

  // Shared palette + materials (theme-aware)
  const PAL = {
    dark: { body: 0x13284f, body2: 0x1b3768, edge: 0x5c8cff, ground: 0x0a1a36, gridA: 0x2a4f9a, gridB: 0x142c58, panel: 0x1d4fd0, line: 0x355ea8, win: 0xffc966 },
    light: { body: 0xffffff, body2: 0xe2e9f8, edge: 0x1f4fd8, ground: 0xe8eefb, gridA: 0x9fb6ee, gridB: 0xd2ddf5, panel: 0x2a5be0, line: 0x8aa5e6, win: 0xffb020 },
  };
  const COL = { power: 0xffb020, wind: 0x5ee7ff, secure: 0x22e0a1, danger: 0xff4d6d, accent: 0x4f8cff, load: 0xff8a3d, fuzz: 0xc084fc, data: 0x7fd4ff };
  const M = {
    body: new T.MeshStandardMaterial({ color: PAL.dark.body, roughness: 0.65, metalness: 0.15 }),
    body2: new T.MeshStandardMaterial({ color: PAL.dark.body2, roughness: 0.6, metalness: 0.2 }),
    panel: new T.MeshStandardMaterial({ color: PAL.dark.panel, roughness: 0.25, metalness: 0.7, emissive: 0x0a1f55, emissiveIntensity: 0.5 }),
    ground: new T.MeshStandardMaterial({ color: PAL.dark.ground, roughness: 1, transparent: true, opacity: 0.85 }),
    edge: new T.LineBasicMaterial({ color: PAL.dark.edge, transparent: true, opacity: 0.75 }),
    line: new T.LineBasicMaterial({ color: PAL.dark.line, transparent: true, opacity: 0.6 }),
    win: new T.MeshStandardMaterial({ color: 0x223355, emissive: PAL.dark.win, emissiveIntensity: 0.2 }),
    led: new T.MeshBasicMaterial({ color: COL.secure }),
    ledRed: new T.MeshBasicMaterial({ color: COL.danger }),
    power: new T.MeshBasicMaterial({ color: COL.power }),
    soc: new T.MeshBasicMaterial({ color: COL.secure }),
    twin: new T.MeshBasicMaterial({ color: COL.accent, wireframe: true, transparent: true, opacity: 0.8 }),
    twinCore: new T.MeshBasicMaterial({ color: COL.data, transparent: true, opacity: 0.9 }),
    sun: new T.MeshBasicMaterial({ color: 0xffd27a }),
    data: new T.LineDashedMaterial({ color: COL.data, dashSize: 0.25, gapSize: 0.18, transparent: true, opacity: 0.55 }),
  };
  const pointMats = [];
  const grids = [];
  function applyTheme3D(light) {
    const P = light ? PAL.light : PAL.dark;
    M.body.color.setHex(P.body); M.body2.color.setHex(P.body2); M.panel.color.setHex(P.panel);
    M.ground.color.setHex(P.ground); M.edge.color.setHex(P.edge); M.line.color.setHex(P.line);
    M.edge.opacity = light ? 0.9 : 0.75;
    pointMats.forEach((m) => {
      m.blending = light ? T.NormalBlending : T.AdditiveBlending;
      if (m.userData.base) m.size = m.userData.base * (light ? 1.35 : 1);
      m.needsUpdate = true;
    });
    grids.forEach((g) => {
      g.material.vertexColors = false; g.material.color.setHex(P.gridA);
      g.material.transparent = true; g.material.opacity = light ? 0.5 : 0.35; g.material.needsUpdate = true;
    });
  }
  themeListeners.push(applyTheme3D);

  const dotTex = (function () {
    const c = document.createElement("canvas"); c.width = c.height = 64;
    const g = c.getContext("2d"), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(0.35, "rgba(255,255,255,.85)"); gr.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return new T.CanvasTexture(c);
  })();
  function pointsMat(color, size) {
    const m = new T.PointsMaterial({ color, size: size * (isLight() ? 1.35 : 1), map: dotTex, transparent: true, depthWrite: false, blending: isLight() ? T.NormalBlending : T.AdditiveBlending, sizeAttenuation: true });
    m.userData.base = size;
    pointMats.push(m);
    return m;
  }

  // geometry helpers
  function edges(mesh, thr) { mesh.add(new T.LineSegments(new T.EdgesGeometry(mesh.geometry, thr || 25), M.edge)); return mesh; }
  function box(p, w, h, d, mat, x, y, z) { const m = edges(new T.Mesh(new T.BoxGeometry(w, h, d), mat || M.body)); m.position.set(x || 0, y || 0, z || 0); p.add(m); return m; }
  function cyl(p, rt, rb, h, mat, x, y, z, seg) { const m = edges(new T.Mesh(new T.CylinderGeometry(rt, rb, h, seg || 14), mat || M.body), 40); m.position.set(x || 0, y || 0, z || 0); p.add(m); return m; }
  function prism(p, w, h, d, mat, x, y, z) {
    const s = new T.Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(0, h); s.lineTo(-w / 2, 0);
    const g = new T.ExtrudeGeometry(s, { depth: d, bevelEnabled: false }); g.translate(0, 0, -d / 2);
    const m = edges(new T.Mesh(g, mat || M.body2)); m.position.set(x || 0, y || 0, z || 0); p.add(m); return m;
  }
  function line(p, pts, mat) { const g = new T.BufferGeometry().setFromPoints(pts); const l = new T.Line(g, mat || M.line); if (mat && mat.isLineDashedMaterial) l.computeLineDistances(); p.add(l); return l; }

  const stageUpdates = new WeakMap();
  function makeStage(host, opts) {
    let renderer;
    try {
      renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch (e) { host.classList.add("no-webgl"); return null; }
    if (!renderer.getContext()) { host.classList.add("no-webgl"); return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(opts.fov || 38, host.clientWidth / host.clientHeight, 0.1, 300);
    camera.position.copy(opts.cam);
    const controls = new T.OrbitControls(camera, renderer.domElement);
    controls.target.copy(opts.target);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.enablePan = false; controls.enableZoom = false;
    controls.minPolarAngle = 0.35; controls.maxPolarAngle = 1.3;
    const auto = !reduced && !opts.noAuto;
    controls.autoRotate = auto; controls.autoRotateSpeed = opts.rot || 0.5;
    if (opts.azimuth) { controls.minAzimuthAngle = -opts.azimuth; controls.maxAzimuthAngle = opts.azimuth; }
    let resume;
    controls.addEventListener("start", () => { controls.autoRotate = false; clearTimeout(resume); });
    controls.addEventListener("end", () => { resume = setTimeout(() => (controls.autoRotate = auto), 8000); });

    const layer = document.createElement("div");
    layer.className = "lbl-layer";
    host.appendChild(layer);
    const labels = [];
    function addLabel(text, obj, dy, cls, onClick) {
      const el = document.createElement(onClick ? "button" : "div");
      el.className = "lbl " + (cls || "");
      el.textContent = text;
      if (onClick) { el.type = "button"; el.addEventListener("click", onClick); }
      layer.appendChild(el);
      const L = { el, obj, off: new T.Vector3(0, dy || 0, 0) };
      labels.push(L);
      return el;
    }
    const v = new T.Vector3();
    function updateLabels() {
      const W = host.clientWidth, H = host.clientHeight;
      for (const L of labels) {
        L.obj.getWorldPosition(v); v.add(L.off); v.project(camera);
        if (v.z > 1) { L.el.style.display = "none"; continue; }
        L.el.style.display = "";
        L.el.style.transform = `translate(${((v.x * 0.5 + 0.5) * W).toFixed(1)}px,${((-v.y * 0.5 + 0.5) * H).toFixed(1)}px) translate(-50%,-100%) translateY(-6px)`;
      }
    }

    // picking
    const pickables = [];
    const ray = new T.Raycaster(), mouse = new T.Vector2();
    let down = null, hoverId = null;
    function pick(ev) {
      const r = renderer.domElement.getBoundingClientRect();
      mouse.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(mouse, camera);
      const hit = ray.intersectObjects(pickables, true)[0];
      if (!hit) return null;
      let o = hit.object;
      while (o && !o.userData.id) o = o.parent;
      return o ? o.userData.id : null;
    }
    renderer.domElement.addEventListener("pointerdown", (e) => (down = { x: e.clientX, y: e.clientY }));
    renderer.domElement.addEventListener("pointerup", (e) => {
      if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return;
      const id = pick(e);
      if (id && opts.onPick) opts.onPick(id);
    });
    let lastMove = 0;
    renderer.domElement.addEventListener("pointermove", (e) => {
      const now = performance.now(); if (now - lastMove < 60) return; lastMove = now;
      const id = pick(e);
      if (id !== hoverId) { hoverId = id; renderer.domElement.style.cursor = id ? "pointer" : ""; if (opts.onHover) opts.onHover(id); }
    });

    // resize + visibility
    const ro = new ResizeObserver(() => {
      const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
    });
    ro.observe(host);
    let visible = true;
    new IntersectionObserver((e) => (visible = e[0].isIntersecting), { threshold: 0.01 }).observe(host);

    const clock = new T.Clock();
    let elapsed = 0;
    function frame() {
      requestAnimationFrame(frame);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!visible || document.hidden) return;
      elapsed += dt;
      const up = stageUpdates.get(stage);
      if (up) up(dt, elapsed);
      controls.update();
      renderer.render(scene, camera);
      updateLabels();
    }
    let started = false;
    const stage = { scene, camera, controls, renderer, addLabel, pickables, start: () => { if (!started) { started = true; frame(); } } };
    return stage;
  }

  function addGround(scene, size, radius) {
    const g = new T.Mesh(new T.CircleGeometry(radius, 64), M.ground);
    g.rotation.x = -Math.PI / 2; g.position.y = -0.01; scene.add(g);
    const grid = new T.GridHelper(size, size, PAL.dark.gridA, PAL.dark.gridB);
    scene.add(grid); grids.push(grid);
    const ring = new T.Mesh(new T.RingGeometry(radius - 0.06, radius, 96), new T.MeshBasicMaterial({ color: COL.accent, transparent: true, opacity: 0.5, side: T.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.01; scene.add(ring);
  }
  function addLights(scene) {
    const hemi = new T.HemisphereLight(0xbcd4ff, 0x0a1430, 0.7); scene.add(hemi);
    const dir = new T.DirectionalLight(0xffffff, 0.9); dir.position.set(10, 18, 8); scene.add(dir);
    return { hemi, dir };
  }

  /* Flow along a pre-sampled curve, drawn as moving glowing points */
  function Flow(scene, pts, color, n, size) {
    const curve = new T.CatmullRomCurve3(pts, false, "centripetal");
    const samples = curve.getSpacedPoints(120);
    line(scene, samples, M.line);
    const geo = new T.BufferGeometry();
    const pos = new Float32Array(n * 3);
    geo.setAttribute("position", new T.BufferAttribute(pos, 3));
    const mat = pointsMat(color, size || 0.62);
    const pts3 = new T.Points(geo, mat);
    pts3.frustumCulled = false;
    scene.add(pts3);
    let phase = Math.random();
    return {
      mat, points: pts3,
      update(dt, value) {
        const a = Math.abs(value);
        if (a < 0.05) { pts3.visible = false; return; }
        pts3.visible = true;
        phase += Math.sign(value) * dt * (0.08 + a * 0.035);
        mat.opacity = clamp(0.35 + a / 6, 0.35, 1);
        for (let i = 0; i < n; i++) {
          let u = (i / n + phase) % 1; if (u < 0) u += 1;
          const f = u * (samples.length - 1), k = Math.floor(f), t = f - k;
          const A = samples[k], B = samples[Math.min(k + 1, samples.length - 1)];
          pos[i * 3] = A.x + (B.x - A.x) * t; pos[i * 3 + 1] = A.y + (B.y - A.y) * t; pos[i * 3 + 2] = A.z + (B.z - A.z) * t;
        }
        geo.attributes.position.needsUpdate = true;
      },
    };
  }
  const V = (x, y, z) => new T.Vector3(x, y, z);
  function arc(a, b, h) { return [a, V((a.x + b.x) / 2, Math.max(a.y, b.y) + h, (a.z + b.z) / 2), b]; }

  /* =======================================================================
     4. FIG. 01 — DIGITAL TWIN
     ======================================================================= */
  (function twin() {
    const host = $("#twinStage");
    const sim = { h: 12, soc: 55, playing: !reduced, mpc: true, data: true, sel: null };
    let live = {};

    const S = makeStage(host, {
      cam: V(25, 19, 31), target: V(-1.5, 2, -0.5), rot: 0.35, fov: 36,
      onPick: (id) => openCard(id),
      onHover: (id) => Object.keys(lblEls).forEach((k) => lblEls[k].classList.toggle("active", k === id || k === sim.sel)),
    });
    if (!S) return;
    const { scene } = S;
    scene.fog = new T.Fog(isLight() ? 0xf4f6fb : 0x060f22, 45, 85);
    themeListeners.push((l) => scene.fog.color.setHex(l ? 0xf4f6fb : 0x060f22));
    addGround(scene, 40, 19.5);
    const L = addLights(scene);
    const devices = {};
    const lblEls = {};
    function device(id, x, z, label, dy) {
      const g = new T.Group(); g.position.set(x, 0, z); g.userData.id = id; scene.add(g);
      devices[id] = g; S.pickables.push(g);
      lblEls[id] = S.addLabel(label, g, dy, "", () => openCard(id));
      return g;
    }

    // --- Grid substation + pylon
    const grid = device("grid", -12, -4, "GRID · 20 kV SUBSTATION", 3.2);
    box(grid, 3.4, 0.25, 3.4, M.body2, 0, 0.12, 0);
    [-0.8, 0.8].forEach((x) => {
      box(grid, 1.1, 1.3, 1.1, M.body, x, 0.9, 0.3);
      for (let i = 0; i < 4; i++) box(grid, 0.08, 1.0, 1.2, M.body2, x - 0.45 + i * 0.3, 0.9, 0.3);
      cyl(grid, 0.08, 0.1, 0.8, M.body2, x, 1.9, 0.3, 8);
    });
    const pylon = new T.Group(); pylon.position.set(-7, 0, -3.5); scene.add(pylon);
    [[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]].forEach(([x, z]) => {
      const leg = cyl(pylon, 0.04, 0.07, 6.2, M.body2, x * 0.5, 3.1, z * 0.5, 6);
      leg.rotation.z = -x * 0.09; leg.rotation.x = z * 0.09;
    });
    box(pylon, 2.6, 0.12, 0.14, M.body2, 0, 5.6, 0); box(pylon, 1.8, 0.1, 0.12, M.body2, 0, 4.7, 0);

    // --- Wind turbine
    const wind = device("wind", -12, 6, "WIND TURBINE", 9.2);
    cyl(wind, 0.14, 0.32, 7, M.body2, 0, 3.5, 0);
    box(wind, 0.5, 0.45, 1.1, M.body, 0, 7.1, 0);
    const rotor = new T.Group(); rotor.position.set(0, 7.1, 0.65); wind.add(rotor);
    cyl(rotor, 0.18, 0.18, 0.25, M.body, 0, 0, 0, 10).rotation.x = Math.PI / 2;
    for (let i = 0; i < 3; i++) {
      const b = new T.Group(); b.rotation.z = (i * Math.PI * 2) / 3; rotor.add(b);
      box(b, 0.28, 2.9, 0.06, M.body2, 0, 1.55, 0);
    }

    // --- PV array
    const pv = device("pv", -5, 7.5, "PV ARRAY · 9 kWp", 2.4);
    for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
      const g = new T.Group(); g.position.set(-2.4 + c * 1.6, 0, -0.8 + r * 1.8); pv.add(g);
      cyl(g, 0.04, 0.04, 0.7, M.body2, 0, 0.35, 0, 6);
      const p = box(g, 1.45, 0.06, 1.0, M.panel, 0, 0.8, 0); p.rotation.x = -0.5;
    }

    // --- House
    const house = device("house", 2.5, 1.5, "SMART HOME · HAPN", 4.6);
    box(house, 4, 2.4, 3.2, M.body, 0, 1.2, 0);
    prism(house, 4.5, 1.5, 3.5, M.body2, 0, 2.4, 0);
    [[-1.1, 1.4], [1.1, 1.4]].forEach(([x, y]) => box(house, 0.8, 0.6, 0.05, M.win, x, y, 1.62));
    box(house, 0.7, 1.2, 0.05, M.body2, 0, 0.6, 1.62);
    box(house, 0.05, 0.6, 0.8, M.win, 2.02, 1.4, 0);
    // rooftop PV
    [-0.9, 0.9].forEach((x) => { const p = box(house, 1.3, 0.05, 1.2, M.panel, x, 3.05, 0.85); p.rotation.x = 0.6; });

    // --- Heat pump
    const hp = device("hp", 5.4, -1.4, "HEAT PUMP", 1.6);
    box(hp, 1.3, 1.0, 0.6, M.body2, 0, 0.5, 0);
    const fan = new T.Group(); fan.position.set(0, 0.5, 0.32); hp.add(fan);
    for (let i = 0; i < 3; i++) { const b = box(fan, 0.12, 0.7, 0.02, M.body, 0, 0, 0); b.rotation.z = (i * Math.PI) / 3; }

    // --- Battery storage
    const bess = device("bess", 7.5, -5.5, "BESS · 13.5 kWh", 2.4);
    box(bess, 3.0, 1.6, 1.4, M.body, 0, 0.8, 0);
    for (let i = 0; i < 4; i++) box(bess, 0.5, 1.2, 0.04, M.body2, -1.0 + i * 0.66, 0.8, 0.72);
    const socBar = new T.Mesh(new T.BoxGeometry(0.16, 1.2, 0.05), M.soc);
    socBar.geometry.translate(0, 0.6, 0); socBar.position.set(1.35, 0.2, 0.73); bess.add(socBar);

    // --- EV + charger
    const ev = device("ev", 9.5, 3.5, "EV · 11 kW WALLBOX", 2.4);
    box(ev, 0.45, 1.6, 0.35, M.body2, -1.9, 0.8, 0);
    const evLed = new T.Mesh(new T.BoxGeometry(0.2, 0.08, 0.02), M.led); evLed.position.set(-1.9, 1.35, 0.19); ev.add(evLed);
    box(ev, 2.7, 0.6, 1.35, M.body, 0, 0.55, 0);
    box(ev, 1.5, 0.5, 1.2, M.body2, -0.1, 1.1, 0);
    [[-0.9, 0.7], [0.9, 0.7], [-0.9, -0.7], [0.9, -0.7]].forEach(([x, z]) => { const w = cyl(ev, 0.28, 0.28, 0.18, M.body2, x, 0.28, z, 12); w.rotation.x = Math.PI / 2; });

    // --- Factory
    const fac = device("factory", -3, -10, "INDUSTRIAL LOAD · PLC/SCADA", 4.4);
    box(fac, 6.5, 2.4, 3.4, M.body, 0, 1.2, 0);
    for (let i = 0; i < 4; i++) { const p = prism(fac, 1.6, 1.0, 3.4, M.body2, -2.4 + i * 1.6, 2.4, 0); p.rotation.y = 0; }
    cyl(fac, 0.25, 0.35, 4.2, M.body2, 2.6, 2.1, -1.1);
    for (let i = 0; i < 5; i++) box(fac, 0.7, 0.5, 0.05, M.win, -2.6 + i * 1.3, 1.2, 1.72);

    // --- Edge PLC / iEMS gateway
    const plc = device("plc", -1.5, -2.8, "EDGE PLC · iEMS GATEWAY", 2.6);
    box(plc, 1.0, 1.8, 0.6, M.body2, 0, 0.9, 0);
    const leds = [];
    for (let i = 0; i < 4; i++) { const l = new T.Mesh(new T.BoxGeometry(0.12, 0.06, 0.02), M.led.clone()); l.position.set(-0.3 + i * 0.2, 1.5, 0.31); plc.add(l); leds.push(l); }
    cyl(plc, 0.02, 0.02, 0.9, M.body2, 0.35, 2.25, 0, 6);

    // --- AC/DC bus
    const BUS = V(1.2, 0.3, -1.2);
    const busNode = device("bus", BUS.x, BUS.z, "AC/DC BUS", 0.9);
    cyl(busNode, 0.45, 0.45, 0.3, M.body2, 0, 0.15, 0, 20);

    // --- Digital twin core
    const twinG = device("twin", -0.5, 0, "DIGITAL TWIN · AI CORE", 2.4);
    twinG.position.y = 9.2;
    const ico = new T.Mesh(new T.IcosahedronGeometry(1.4, 1), M.twin); twinG.add(ico);
    const core = new T.Mesh(new T.IcosahedronGeometry(0.55, 0), M.twinCore); twinG.add(core);
    const ring = new T.Mesh(new T.TorusGeometry(2.1, 0.02, 6, 80), M.twin); ring.rotation.x = Math.PI / 2.3; twinG.add(ring);
    const ring2 = new T.Mesh(new T.TorusGeometry(2.5, 0.015, 6, 80), M.twin); ring2.rotation.x = Math.PI / 1.7; twinG.add(ring2);

    // --- Sun
    const sun = new T.Mesh(new T.SphereGeometry(0.9, 20, 16), M.sun); scene.add(sun);

    // --- Energy flows
    const port = (g, dy, dx, dz) => V(g.position.x + (dx || 0), dy, g.position.z + (dz || 0));
    const F = {
      pv: Flow(scene, arc(port(pv, 0.4), BUS, 0.8), COL.power, 18),
      wind: Flow(scene, arc(port(wind, 0.4), BUS, 1.2), COL.wind, 18),
      house: Flow(scene, arc(BUS, port(house, 0.4, 0, -1.6), 0.6), COL.load, 10),
      hp: Flow(scene, arc(BUS, port(hp, 0.4), 0.6), COL.load, 10),
      ev: Flow(scene, arc(BUS, port(ev, 0.4, -1.9), 1.0), COL.load, 14),
      bess: Flow(scene, arc(BUS, port(bess, 0.4, -1.5), 0.8), COL.secure, 14),
      grid: Flow(scene, [port(grid, 2.2, 0.8, 0.3), V(-7, 5.6, -3.5), V(-3, 4.2, -2.4), BUS], COL.accent, 22),
      factory: Flow(scene, arc(port(grid, 0.4, 1.4), port(fac, 0.4, -1, 1.7), 0.6), COL.accent, 14),
    };

    // --- Data links (devices -> PLC -> twin)
    const dataGroup = new T.Group(); scene.add(dataGroup);
    const plcTop = V(plc.position.x, 2.7, plc.position.z);
    const dataFlows = [];
    ["pv", "wind", "house", "hp", "bess", "ev", "factory", "grid"].forEach((id) => {
      const g = devices[id];
      const a = V(g.position.x, id === "wind" ? 7.6 : id === "factory" ? 3.6 : id === "house" ? 3.9 : 2.0, g.position.z);
      const pts = arc(a, plcTop, 1.5);
      const curve = new T.CatmullRomCurve3(pts);
      line(dataGroup, curve.getPoints(40), M.data);
      dataFlows.push(Flow(dataGroup, pts, COL.data, 3, 0.28));
    });
    const upPts = [plcTop, V(-1, 6, -1.4), V(twinG.position.x, twinG.position.y - 1.2, 0)];
    line(dataGroup, new T.CatmullRomCurve3(upPts).getPoints(30), M.data);
    const uplink = Flow(dataGroup, upPts, COL.data, 8, 0.34);
    dataGroup.children.forEach((c) => { if (c.isPoints) c.frustumCulled = false; });

    applyTheme3D(isLight());

    // --- Simulation
    const g = (h, c, s) => Math.exp(-((h - c) ** 2) / (2 * s * s));
    function compute(h) {
      const pvP = 9 * Math.max(0, Math.sin((Math.PI * (h - 6)) / 13.5)) * (0.88 + 0.12 * Math.sin(h * 3.1));
      const windP = clamp(2.2 + 1.4 * Math.sin(h * 0.55 + 1.3) + 0.5 * Math.sin(h * 2.3), 0.2, 5);
      const houseP = 0.5 + 1.1 * g(h, 7.5, 1.4) + 2.0 * g(h, 19.5, 2) + 0.4 * g(h, 13, 1.5);
      const hpP = 0.7 + 1.4 * (0.5 + 0.5 * Math.cos((2 * Math.PI * (h - 4)) / 24));
      const evP = sim.mpc ? (h >= 10.5 && h < 14.5 ? 7.4 : 0) : (h >= 17.5 && h < 21.5 ? 7.4 : 0);
      const facP = h >= 6 && h < 18 ? 4.5 + 0.8 * Math.sin(h * 2) : 1.2;
      return { pvP, windP, houseP, hpP, evP, facP };
    }
    function step(dt) {
      const dh = sim.playing ? dt * 0.4 : 0;
      sim.h = (sim.h + dh) % 24;
      const c = compute(sim.h);
      const load = c.houseP + c.hpP + c.evP;
      const net = c.pvP + c.windP - load;
      let b = 0;
      if (net > 0 && sim.soc < 95) b = Math.min(net, 5);
      else if (net < 0 && sim.soc > 10) b = Math.max(net, -5);
      sim.soc = clamp(sim.soc + (b * dh / 13.5) * 100, 5, 100);
      const gridP = -(net - b);
      live = { ...c, load, bess: b, grid: gridP, soc: sim.soc, self: clamp(100 * (1 - Math.max(gridP, 0) / load), 0, 100) };
      return live;
    }

    // --- HUD
    const el = { time: $("#hudTime"), pv: $("#tPV"), wind: $("#tWind"), load: $("#tLoad"), bess: $("#tBess"), grid: $("#tGrid"), gl: $("#tGridLbl"), soc: $("#tSoc"), socBar: $("#tSocBar"), self: $("#tSelf"), slider: $("#timeSlider") };
    let hudT = 0;
    function hud() {
      const hh = Math.floor(sim.h), mm = Math.floor((sim.h - hh) * 60);
      el.time.textContent = String(hh).padStart(2, "0") + ":" + String(mm).padStart(2, "0");
      el.pv.textContent = live.pvP.toFixed(1);
      el.wind.textContent = live.windP.toFixed(1);
      el.load.textContent = live.load.toFixed(1);
      el.bess.textContent = (live.bess >= 0 ? "+" : "") + live.bess.toFixed(1);
      el.grid.textContent = Math.abs(live.grid).toFixed(1);
      el.gl.textContent = live.grid >= 0 ? "GRID IMPORT" : "GRID EXPORT";
      el.soc.textContent = Math.round(live.soc);
      el.socBar.style.width = live.soc + "%";
      el.self.textContent = Math.round(live.self);
      if (sim.playing && document.activeElement !== el.slider) el.slider.value = sim.h.toFixed(1);
      if (sim.sel) fillLive(sim.sel);
    }

    // --- Device card
    const INFO = {
      grid: { t: "Grid connection · substation", b: "Medium-voltage feeder that imports or exports the home’s residual power and supplies the industrial load. In SURF, flexibility from many such connection points is aggregated for regional electricity markets.", tags: ["Smart Grid", "§14a EnWG", "PyPSA", "SURF"], live: () => [["GRID", (live.grid >= 0 ? "↓ " : "↑ ") + Math.abs(live.grid).toFixed(1) + " kW"], ["FACTORY", live.facP.toFixed(1) + " kW"]] },
      wind: { t: "Wind turbine", b: "Distributed generation with a fluctuating profile. ML forecasting feeds the predictive controller so that storage and flexible loads can follow it.", tags: ["DER", "ML Forecasting"], live: () => [["OUTPUT", live.windP.toFixed(1) + " kW"], ["ROTOR", (live.windP * 3).toFixed(0) + " rpm"]] },
      pv: { t: "PV array", b: "Rooftop and ground PV. Digital-twin co-simulation predicts and validates PV power from weather forecast data (virtual energy replication).", tags: ["PV", "Co-simulation", "TRNSYS"], live: () => [["OUTPUT", live.pvP.toFixed(1) + " kW"], ["YIELD", Math.round((live.pvP / 9) * 100) + " %"]] },
      house: { t: "Smart home · Home Area Power Network", b: "The subject of my doctoral thesis: component-based dynamic models of every energy entity, coordinated by an intelligent energy management system.", tags: ["HAPN", "iEMS", "Rolling Horizon"], live: () => [["HOUSE", live.houseP.toFixed(1) + " kW"], ["SELF-SUFF.", Math.round(live.self) + " %"]] },
      hp: { t: "Heat pump", b: "Thermal flexibility. The virtual replication framework predicts heat-pump load and thermal comfort, so heating can shift without loss of comfort.", tags: ["Heat Pump", "Thermal Comfort", "Modbus-TCP"], live: () => [["POWER", live.hpP.toFixed(1) + " kW"], ["COP", (3 + Math.sin(sim.h / 4)).toFixed(1)]] },
      bess: { t: "Battery energy storage", b: "Stores PV surplus and serves the evening peak. Charge and discharge setpoints are a typical target for Modbus-TCP fuzzing and validation.", tags: ["BESS", "MPC", "Fuzzing"], live: () => [["POWER", (live.bess >= 0 ? "+" : "") + live.bess.toFixed(1) + " kW"], ["SoC", Math.round(live.soc) + " %"]] },
      ev: { t: "EV + wallbox", b: "With iEMS / MPC switched on, charging moves into the solar window. Switch it off to see the uncoordinated evening peak hit the grid.", tags: ["EV", "Smart Charging", "Fast-Charging Co-sim"], live: () => [["CHARGING", live.evP.toFixed(1) + " kW"], ["MODE", sim.mpc ? "MPC" : "DUMB"]] },
      factory: { t: "Industrial load · PLC / SCADA", b: "Industrial consumers controlled through PLCs and SCADA. The same OT protocols that run them must be hardened according to IEC 62443.", tags: ["PLC", "SCADA", "IEC 62443"], live: () => [["LOAD", live.facP.toFixed(1) + " kW"], ["SHIFT", sim.h >= 6 && sim.h < 18 ? "ON" : "OFF"]] },
      plc: { t: "Edge PLC · iEMS gateway", b: "Collects Modbus-TCP telemetry from every device and runs the control loop. It is also the most exposed point, so it sits behind zones and conduits (see FIG. 02).", tags: ["Modbus-TCP", "Edge", "OT Security"], live: () => [["DEVICES", "8 online"], ["POLL", "1 s"]] },
      bus: { t: "AC/DC bus", b: "Point of common coupling where generation, storage, loads and grid are balanced in real time.", tags: ["Power Electronics", "DC Microgrid"], live: () => [["BALANCE", "0.0 kW"], ["NET", (live.pvP + live.windP - live.load).toFixed(1) + " kW"]] },
      twin: { t: "Digital twin · AI core", b: "A live virtual replica that ingests telemetry, forecasts with ML and optimises setpoints with model predictive control. Agentic AI and LLMs can query it.", tags: ["Digital Twin", "MPC", "Agentic AI", "LLMs"], live: () => [["HORIZON", "24 h"], ["STATE", sim.mpc ? "OPTIMISING" : "MONITORING"]] },
    };
    const card = $("#deviceCard");
    function fillLive(id) { $("#dcLive").innerHTML = INFO[id].live().map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join(""); }
    function openCard(id) {
      if (!INFO[id]) return;
      sim.sel = id;
      $("#dcTitle").textContent = INFO[id].t.toUpperCase();
      $("#dcBody").textContent = INFO[id].b;
      $("#dcTags").innerHTML = INFO[id].tags.map((t) => `<span class="chip">${t}</span>`).join("");
      fillLive(id);
      card.hidden = false;
      Object.keys(lblEls).forEach((k) => lblEls[k].classList.toggle("active", k === id));
    }
    $("#deviceClose").addEventListener("click", () => { card.hidden = true; sim.sel = null; Object.values(lblEls).forEach((e) => e.classList.remove("active")); });

    // --- Controls
    const playBtn = $("#playBtn"), mpcBtn = $("#mpcBtn"), dataBtn = $("#dataBtn");
    const setPlay = (p) => { sim.playing = p; playBtn.textContent = p ? "❚❚ PAUSE" : "▶ PLAY"; playBtn.setAttribute("aria-pressed", String(p)); };
    setPlay(sim.playing);
    playBtn.addEventListener("click", () => setPlay(!sim.playing));
    el.slider.addEventListener("input", () => { sim.h = +el.slider.value; });
    mpcBtn.addEventListener("click", () => {
      sim.mpc = !sim.mpc;
      mpcBtn.textContent = "iEMS / MPC: " + (sim.mpc ? "ON" : "OFF");
      mpcBtn.classList.toggle("ctl--on", sim.mpc); mpcBtn.classList.toggle("ctl--off", !sim.mpc);
      mpcBtn.setAttribute("aria-pressed", String(sim.mpc));
    });
    dataBtn.addEventListener("click", () => {
      sim.data = !sim.data; dataGroup.visible = sim.data;
      dataBtn.textContent = "DATA LINKS: " + (sim.data ? "ON" : "OFF");
      dataBtn.classList.toggle("ctl--on", sim.data); dataBtn.classList.toggle("ctl--off", !sim.data);
      dataBtn.setAttribute("aria-pressed", String(sim.data));
    });

    // --- Frame update
    const baseUpdate = (dt, t) => {
      step(dt);
      const a = (Math.PI * (sim.h - 6)) / 12, day = clamp(Math.sin(a), 0, 1);
      sun.position.set(Math.cos(a) * -20, Math.sin(a) * 16 + 1, -6);
      sun.visible = Math.sin(a) > -0.05;
      L.dir.position.copy(sun.position); L.dir.intensity = 0.2 + 0.85 * day;
      L.hemi.intensity = 0.45 + 0.4 * day;
      M.win.emissiveIntensity = 0.15 + 1.1 * (1 - day);

      rotor.rotation.z -= dt * live.windP * 0.6;
      fan.rotation.z += dt * live.hpP * 4;
      socBar.scale.y = clamp(live.soc / 100, 0.02, 1);
      M.soc.color.setHex(live.soc < 20 ? COL.danger : live.soc < 50 ? COL.power : COL.secure);
      M.led.color.setHex(live.evP > 0 ? COL.secure : 0x3a4a6a);
      leds.forEach((l, i) => (l.material.color.setHex(Math.sin(t * 6 + i * 1.7) > 0.2 ? COL.secure : 0x1d3a2e)));

      ico.rotation.y += dt * 0.25; ico.rotation.x += dt * 0.1;
      core.rotation.y -= dt * 0.6; core.scale.setScalar(1 + 0.08 * Math.sin(t * 3));
      ring.rotation.z += dt * 0.3; ring2.rotation.z -= dt * 0.2;
      twinG.position.y = 9.2 + Math.sin(t * 0.8) * 0.2;

      F.pv.update(dt, live.pvP);
      F.wind.update(dt, live.windP);
      F.house.update(dt, live.houseP);
      F.hp.update(dt, live.hpP);
      F.ev.update(dt, live.evP);
      F.bess.update(dt, live.bess);
      F.grid.update(dt, live.grid);
      F.factory.update(dt, live.facP);
      if (sim.data) { dataFlows.forEach((f) => f.update(dt, 1.5)); uplink.update(dt, 2.5); }

      hudT += dt; if (hudT > 0.15) { hudT = 0; hud(); }
    };
    stageUpdates.set(S, baseUpdate);
    step(0); hud();
    S.start();
  })();

  /* =======================================================================
     5. FIG. 02 — SECURE INDUSTRIAL COMMUNICATION
     ======================================================================= */
  (function security() {
    const host = $("#secStage");
    const st = { tls: true, ids: true, ok: 0, blocked: 0, enc: 0, normal: 0, anom: 0.02, busy: false, compromised: 0 };
    const S = makeStage(host, {
      cam: V(-2, 20, 28), target: V(-2, 0, -2.5), fov: 40, azimuth: 0.75, noAuto: true,
      onPick: (id) => describe(id),
    });
    if (!S) return;
    const { scene } = S;
    scene.fog = new T.Fog(isLight() ? 0xf4f6fb : 0x060f22, 40, 80);
    themeListeners.push((l) => scene.fog.color.setHex(l ? 0xf4f6fb : 0x060f22));
    addGround(scene, 44, 21);
    addLights(scene);

    const N = {};
    const lbl = {};
    const ASSET = {
      atk: "Untrusted network · attacker host 203.0.113.66 (illustrative)",
      agg: "SURF flexibility platform / aggregator · zone E · SL-T 2",
      dso: "DSO / market interface · zone E · SL-T 2",
      fw: "Industrial firewall with deep packet inspection and IDS · conduit E↔C",
      hems: "HEMS / iEMS gateway · Modbus-TCP master · zone C · SL-T 3",
      scada: "SCADA HMI · operator station · zone C · SL-T 3",
      fuzzer: "pymodbus fuzzing test bench · isolated lab conduit",
      pvinv: "PV inverter · Modbus-TCP unit 1 · zone F",
      wallbox: "Wallbox · Modbus-TCP unit 3 · zone F",
      hpump: "Heat pump · Modbus-TCP unit 4 · zone F",
      bess: "Battery storage · Modbus-TCP unit 2 · zone F",
      meter: "Smart meter gateway · zone F",
    };
    function node(id, x, z, label, build, dy) {
      const g = new T.Group(); g.position.set(x, 0.12, z); g.userData.id = id; scene.add(g);
      build(g); N[id] = g; S.pickables.push(g);
      lbl[id] = S.addLabel(label, g, dy || 2, "", () => describe(id));
      return g;
    }
    function zone(x, z, w, d, label, color) {
      const m = new T.Mesh(new T.BoxGeometry(w, 0.16, d), new T.MeshStandardMaterial({ color, transparent: true, opacity: 0.12 }));
      m.position.set(x, 0.06, z); scene.add(m);
      m.add(new T.LineSegments(new T.EdgesGeometry(m.geometry), new T.LineBasicMaterial({ color, transparent: true, opacity: 0.8 })));
      const anchor = new T.Object3D(); anchor.position.set(x, 0.2, z + d / 2 + 0.9); scene.add(anchor);
      S.addLabel(label, anchor, 0, "lbl--zone");
    }
    zone(-9, 0, 6, 9, "ZONE E · ENTERPRISE / CLOUD · SL-T 2", COL.accent);
    zone(1, 0, 5, 9, "ZONE C · CONTROL · SL-T 3", COL.secure);
    zone(8.5, 0, 6.5, 10, "ZONE F · FIELD DEVICES · MODBUS-TCP", COL.power);

    const rack = (g) => { box(g, 1.1, 2, 0.9, M.body, 0, 1, 0); for (let i = 0; i < 5; i++) box(g, 0.9, 0.12, 0.02, M.body2, 0, 0.4 + i * 0.32, 0.46); };
    node("atk", -14.2, 4.6, "UNTRUSTED NETWORK", (g) => {
      const o = new T.Mesh(new T.OctahedronGeometry(0.8, 0), new T.MeshBasicMaterial({ color: COL.danger, wireframe: true }));
      o.position.y = 1.6; g.add(o); g.userData.spin = o;
      cyl(g, 0.6, 0.8, 0.3, M.body2, 0, 0.15, 0, 6);
    }, 2.8);
    node("agg", -9.5, -2, "FLEX PLATFORM · AGGREGATOR", (g) => { rack(g); g.children[0].position.x = -0.6; const r2 = new T.Group(); r2.position.x = 0.7; g.add(r2); rack(r2); }, 2.6);
    node("dso", -9, 2.6, "DSO / MARKET", (g) => { box(g, 1.6, 1.3, 1.2, M.body, 0, 0.65, 0); prism(g, 1.8, 0.6, 1.3, M.body2, 0, 1.3, 0); }, 2.4);
    const fwMat = new T.MeshStandardMaterial({ color: PAL.dark.body2, emissive: COL.danger, emissiveIntensity: 0 });
    themeListeners.push((l) => fwMat.color.setHex(l ? PAL.light.body2 : PAL.dark.body2));
    node("fw", -4.6, 0, "FIREWALL + DPI / IDS", (g) => {
      const w = box(g, 0.5, 2.6, 4.6, fwMat, 0, 1.3, 0);
      for (let r = 0; r < 5; r++) box(g, 0.52, 0.04, 4.6, M.body, 0, 0.3 + r * 0.5, 0);
      g.userData.wall = w;
    }, 3.2);
    node("hems", 1, -1.8, "HEMS / iEMS GATEWAY", (g) => {
      box(g, 1.3, 1.6, 0.8, M.body2, 0, 0.8, 0);
      const ledMat = new T.MeshBasicMaterial({ color: COL.secure });
      for (let i = 0; i < 4; i++) { const l = new T.Mesh(new T.BoxGeometry(0.14, 0.06, 0.02), ledMat); l.position.set(-0.4 + i * 0.27, 1.3, 0.41); g.add(l); }
    }, 2.4);
    node("scada", 1, 2.4, "SCADA HMI", (g) => {
      box(g, 1.4, 0.7, 0.8, M.body, 0, 0.35, 0);
      const s = box(g, 1.5, 0.95, 0.08, M.panel, 0, 1.25, -0.1); s.rotation.x = -0.15;
    }, 2.2);
    node("fuzzer", -1.8, 6.4, "PYMODBUS FUZZER · TEST BENCH", (g) => {
      box(g, 1.2, 0.8, 0.8, M.body2, 0, 0.4, 0);
      const s = new T.Mesh(new T.TorusKnotGeometry(0.28, 0.07, 48, 6), new T.MeshBasicMaterial({ color: COL.fuzz, wireframe: true }));
      s.position.y = 1.25; g.add(s); g.userData.spin = s;
    }, 2.1);
    const devMat = {};
    function fieldDev(id, x, z, label, build) {
      devMat[id] = new T.MeshStandardMaterial({ color: PAL.dark.body, emissive: COL.danger, emissiveIntensity: 0 });
      node(id, x, z, label, (g) => build(g, devMat[id]), 1.9);
    }
    themeListeners.push((l) => Object.values(devMat).forEach((m) => m.color.setHex(l ? PAL.light.body : PAL.dark.body)));
    fieldDev("pvinv", 7, -3.2, "PV INVERTER", (g, m) => { box(g, 0.9, 1.1, 0.4, m, 0, 0.55, 0); const p = box(g, 1.4, 0.05, 0.9, M.panel, 0.9, 0.7, 0.6); p.rotation.x = -0.4; });
    fieldDev("wallbox", 10.2, -3.2, "WALLBOX", (g, m) => { box(g, 0.5, 1.4, 0.35, m, 0, 0.7, 0); box(g, 1.6, 0.5, 0.9, M.body2, 1.2, 0.35, 0.4); });
    fieldDev("hpump", 7, 0.6, "HEAT PUMP", (g, m) => { box(g, 1.2, 0.9, 0.6, m, 0, 0.45, 0); cyl(g, 0.3, 0.3, 0.05, M.body2, 0, 0.45, 0.32, 16).rotation.x = Math.PI / 2; });
    fieldDev("bess", 10.2, 0.6, "BESS", (g, m) => { box(g, 1.6, 1.1, 0.8, m, 0, 0.55, 0); });
    fieldDev("meter", 8.6, 3.6, "SMART METER GW", (g, m) => { box(g, 0.7, 0.9, 0.3, m, 0, 0.45, 0); });

    // Shield dome over zones C + F
    const dome = new T.Mesh(new T.SphereGeometry(7.2, 32, 14, 0, Math.PI * 2, 0, Math.PI / 2), new T.MeshBasicMaterial({ color: COL.secure, wireframe: true, transparent: true, opacity: 0.12 }));
    dome.scale.set(1.25, 0.6, 0.85); dome.position.set(5, 0, 0.3); scene.add(dome);

    // Conduits
    const P = (id, y) => V(N[id].position.x, y == null ? 0.9 : y, N[id].position.z);
    const segCache = {};
    function seg(a, b) {
      const k = a + ">" + b;
      if (segCache[k]) return segCache[k];
      const A = P(a), B = P(b), mid = V((A.x + B.x) / 2, 1.9 + A.distanceTo(B) * 0.06, (A.z + B.z) / 2);
      const c = new T.QuadraticBezierCurve3(A, mid, B);
      return (segCache[k] = { c, len: c.getLength() });
    }
    [["agg", "fw"], ["dso", "fw"], ["fw", "hems"], ["scada", "hems"], ["hems", "pvinv"], ["hems", "wallbox"], ["hems", "hpump"], ["hems", "bess"], ["hems", "meter"], ["atk", "fw"], ["fuzzer", "pvinv"]].forEach(([a, b]) => {
      const mat = a === "atk" ? new T.LineDashedMaterial({ color: COL.danger, dashSize: 0.3, gapSize: 0.25, transparent: true, opacity: 0.5 })
        : a === "fuzzer" ? new T.LineDashedMaterial({ color: COL.fuzz, dashSize: 0.3, gapSize: 0.25, transparent: true, opacity: 0.5 }) : M.line;
      line(scene, seg(a, b).c.getPoints(40), mat);
    });
    applyTheme3D(isLight());

    // Packets
    const pktGeo = new T.BoxGeometry(0.32, 0.32, 0.32);
    const lockGeo = new T.TorusGeometry(0.3, 0.035, 6, 20);
    const PM = {
      ok: new T.MeshBasicMaterial({ color: COL.secure }),
      plain: new T.MeshBasicMaterial({ color: COL.power }),
      bad: new T.MeshBasicMaterial({ color: COL.danger }),
      fuzz: new T.MeshBasicMaterial({ color: COL.fuzz }),
    };
    const packets = [];
    function spawn(route, type, meta) {
      const m = new T.Mesh(pktGeo, PM[type]);
      if (type === "ok") { const r = new T.Mesh(lockGeo, PM.ok); m.add(r); m.userData.ring = r; }
      scene.add(m);
      const p = { route, i: 0, t: 0, type, mesh: m, meta: meta || {}, speed: type === "fuzz" ? 9 : type === "bad" ? 6 : 5 };
      packets.push(p);
      return p;
    }
    // bursts
    const bursts = [];
    function burst(pos, color) {
      const n = 26, geo = new T.BufferGeometry(), arr = new Float32Array(n * 3), vel = [];
      for (let i = 0; i < n; i++) { arr.set([pos.x, pos.y, pos.z], i * 3); vel.push(V(Math.random() - 0.5, Math.random() * 0.8, Math.random() - 0.5).normalize().multiplyScalar(2 + Math.random() * 3)); }
      geo.setAttribute("position", new T.BufferAttribute(arr, 3));
      const pts = new T.Points(geo, pointsMat(color, 0.35)); pts.frustumCulled = false; scene.add(pts);
      bursts.push({ pts, vel, life: 0.9 });
    }
    // sniff lines
    const sniffs = [];
    function sniff(p) {
      const g = new T.BufferGeometry().setFromPoints([P("atk", 1.6), p.mesh.position.clone()]);
      const l = new T.Line(g, new T.LineBasicMaterial({ color: COL.danger, transparent: true, opacity: 0.9 }));
      scene.add(l); sniffs.push({ l, p, life: 0.8 });
    }

    // Log
    const logEl = $("#secLog");
    function log(msg, cls) {
      const d = new Date();
      const ts = d.toTimeString().slice(0, 8);
      const div = document.createElement("div");
      div.innerHTML = `<span class="t">${ts}</span> <span class="${cls || ""}">${esc(msg)}</span>`;
      logEl.appendChild(div);
      while (logEl.children.length > 120) logEl.removeChild(logEl.firstChild);
      logEl.scrollTop = logEl.scrollHeight;
    }
    function describe(id) {
      log("[ASSET] " + ASSET[id], "info");
      Object.keys(lbl).forEach((k) => lbl[k].classList.toggle("active", k === id));
      setTimeout(() => lbl[id] && lbl[id].classList.remove("active"), 2500);
    }
    [["[BOOT] OT security monitor started · zones E / C / F loaded", "info"], ["[POLICY] conduit E↔C: TCP/8883 (MQTT/TLS), TCP/502 via DPI only", "info"], ["[TLS 1.3] mutual authentication established: aggregator ⇄ HEMS gateway", "ok"], ["[IDS] baseline learned · anomaly model armed", "ok"]].forEach(([m, c]) => log(m, c));

    // Normal traffic
    const DEV = ["pvinv", "wallbox", "hpump", "bess", "meter"];
    const DEVN = { pvinv: "PV inverter", wallbox: "wallbox", hpump: "heat pump", bess: "BESS", meter: "smart meter" };
    const rnd = (a) => a[Math.floor(Math.random() * a.length)];
    const hex = (n, w) => "0x" + n.toString(16).toUpperCase().padStart(w || 2, "0");
    let spawnT = 0, logEvery = 0, sniffLogT = 0;
    function spawnNormal() {
      const d = rnd(DEV), r = Math.random(), type = st.tls ? "ok" : "plain";
      let route, msg;
      if (r < 0.3) { route = ["agg", "fw", "hems", d]; msg = `flex signal → ${DEVN[d]}: P_max = ${(2 + Math.random() * 6).toFixed(1)} kW (§14a EnWG)`; }
      else if (r < 0.6) { route = [d, "hems", "fw", "agg"]; msg = `telemetry ${DEVN[d]} → aggregator: P = ${(Math.random() * 7).toFixed(1)} kW`; }
      else if (r < 0.8) { route = ["hems", d]; msg = `Modbus FC 0x03 read holding regs → ${DEVN[d]}`; }
      else if (r < 0.9) { route = ["scada", "hems"]; msg = "SCADA poll HEMS status"; }
      else { route = ["dso", "fw", "hems"]; msg = "DSO tariff/limit update → HEMS"; }
      const p = spawn(route, type, { msg });
      st.normal++; if (st.tls) st.enc++;
      if (++logEvery % 4 === 0) log((st.tls ? "[TLS 1.3 ✓] " : "[PLAINTEXT] ") + msg, st.tls ? "ok" : "warn");
      if (!st.tls && route.includes("fw")) p.sniff = true;
    }

    // Attack
    const attackBtn = $("#attackBtn"), fuzzBtn = $("#fuzzBtn"), tlsBtn = $("#tlsBtn"), idsBtn = $("#idsBtn");
    attackBtn.addEventListener("click", () => {
      if (st.busy) return;
      st.busy = true; attackBtn.disabled = true; fuzzBtn.disabled = true;
      log("[!] Inbound: spoofed aggregator session from 203.0.113.66 → TCP/502", "bad");
      for (let i = 0; i < 5; i++) setTimeout(() => spawn(["atk", "fw", "hems", "wallbox"], "bad", { k: i }), i * 380);
      setTimeout(() => { st.busy = false; attackBtn.disabled = false; fuzzBtn.disabled = false; }, 6000);
    });
    // Fuzz
    let findings = 0, fuzzCases = 0;
    fuzzBtn.addEventListener("click", () => {
      if (st.busy) return;
      st.busy = true; attackBtn.disabled = true; fuzzBtn.disabled = true; findings = 0; fuzzCases = 0;
      log("[FUZZ] campaign start · target PV inverter unit 1 · 18 mutated Modbus-TCP frames", "fz");
      for (let i = 0; i < 18; i++) setTimeout(() => spawn(["fuzzer", "pvinv"], "fuzz", { fc: rnd([1, 2, 3, 4, 5, 6, 15, 16, 0x2b, 0x5a, 0x80]), addr: Math.floor(Math.random() * 65536), qty: rnd([0, 1, 125, 126, 2000, 65535]) }), i * 200);
      setTimeout(() => {
        log(`[FUZZ] campaign done · ${fuzzCases} cases · ${findings} finding(s) · report exported`, "fz");
        st.busy = false; attackBtn.disabled = false; fuzzBtn.disabled = false;
      }, 18 * 200 + 2500);
    });
    function toggle(btn, key, label) {
      st[key] = !st[key];
      btn.textContent = label + (st[key] ? "ON" : "OFF");
      btn.classList.toggle("ctl--on", st[key]); btn.classList.toggle("ctl--off", !st[key]);
      btn.setAttribute("aria-pressed", String(st[key]));
    }
    tlsBtn.addEventListener("click", () => {
      toggle(tlsBtn, "tls", "🔒 TLS / mTLS: ");
      log(st.tls ? "[TLS 1.3] re-established · certificates pinned · plaintext disabled" : "[WARN] TLS disabled · Modbus/MQTT now in plaintext · traffic can be sniffed", st.tls ? "ok" : "warn");
    });
    idsBtn.addEventListener("click", () => {
      toggle(idsBtn, "ids", "◉ DPI / IDS: ");
      log(st.ids ? "[IDS] deep packet inspection enabled · write function codes from zone E denied" : "[WARN] DPI/IDS disabled · firewall now forwards any TCP/502 that matches the conduit rule", st.ids ? "ok" : "warn");
    });

    // Arrival logic
    function arrive(p, nodeId, last) {
      if (p.type === "bad") {
        if (nodeId === "fw") {
          if (st.ids) {
            burst(p.mesh.position, COL.danger); fwMat.emissiveIntensity = 1.2;
            st.blocked++; st.anom = Math.min(1, st.anom + 0.12);
            log(`[IDS] BLOCK Modbus FC 0x06 write → wallbox reg 40${100 + p.meta.k} · unauthenticated source · IEC 62443 SR 3.5`, "bad");
            return "kill";
          }
          if (p.meta.k === 0) log("[FW] forwarded: TCP/502 matches conduit rule · no payload inspection", "warn");
        }
        if (last) {
          st.anom = Math.min(1, st.anom + 0.2);
          if (!st.compromised) {
            st.compromised = 4;
            log("[!!] Wallbox setpoint overwritten: I_max 32 A → 0 A · physical process affected", "bad");
            setTimeout(() => log("[SOC] Incident contained · wallbox restored from known-good config · re-enable DPI/IDS", "info"), 4200);
          }
          burst(p.mesh.position, COL.danger);
          return "kill";
        }
      } else if (p.type === "fuzz" && last) {
        fuzzCases++;
        const r = Math.random(), base = `FC ${hex(p.meta.fc)} addr ${hex(p.meta.addr, 4)} qty ${p.meta.qty}`;
        if (r < 0.09 || (fuzzCases === 13 && findings === 0)) {
          findings++; devMat.pvinv.emissive.setHex(COL.fuzz); devMat.pvinv.emissiveIntensity = 1;
          log(`[FUZZ] ${base} → no response 2.0 s · watchdog reset · finding #${findings} logged`, "warn");
        } else if (p.meta.fc > 16) log(`[FUZZ] ${base} → exception 0x01 ILLEGAL FUNCTION ✓ handled`, "fz");
        else if (p.meta.qty === 0 || p.meta.qty > 125) log(`[FUZZ] ${base} → exception 0x03 ILLEGAL DATA VALUE ✓ handled`, "fz");
        else log(`[FUZZ] ${base} → exception 0x02 ILLEGAL DATA ADDRESS ✓ handled`, "fz");
        burst(p.mesh.position, COL.fuzz);
        return "kill";
      } else if (last) { st.ok++; return "kill"; }
      return null;
    }

    // KPI
    const k = { ok: $("#kOk"), bl: $("#kBlocked"), enc: $("#kEnc"), an: $("#kAnom"), bar: $("#anomBar") };
    let kpiT = 0;
    function kpis() {
      k.ok.textContent = st.ok; k.bl.textContent = st.blocked;
      k.enc.textContent = st.normal ? Math.round((st.enc / st.normal) * 100) + "%" : "100%";
      k.an.textContent = st.anom.toFixed(2);
      k.bar.style.width = Math.max(2, st.anom * 100) + "%";
      if (st.normal > 60) { st.enc *= 0.98; st.normal *= 0.98; }
    }

    const tmp = V(0, 0, 0);
    stageUpdates.set(S, (dt, t) => {
      spawnT += dt;
      if (spawnT > (reduced ? 1.2 : 0.5)) { spawnT = 0; spawnNormal(); }
      // packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        const s = seg(p.route[p.i], p.route[p.i + 1]);
        p.t += (p.speed * dt) / s.len;
        let res = null;
        if (p.t >= 1) {
          p.i++; p.t = 0;
          const last = p.i >= p.route.length - 1;
          res = arrive(p, p.route[p.i], last);
          if (!res && last) res = "kill";
        }
        if (res === "kill") { scene.remove(p.mesh); packets.splice(i, 1); continue; }
        const cs = seg(p.route[p.i], p.route[p.i + 1]);
        cs.c.getPoint(Math.min(p.t, 1), tmp);
        p.mesh.position.copy(tmp);
        p.mesh.rotation.x += dt * 2; p.mesh.rotation.y += dt * 3;
        if (p.sniff && p.route[p.i] === "fw" && p.t > 0.3 && !p.sniffed) {
          p.sniffed = true; sniff(p); st.anom = Math.min(1, st.anom + 0.03);
          if (t - sniffLogT > 3) { sniffLogT = t; log("[MITM] plaintext frame captured on conduit E↔C · " + p.meta.msg, "bad"); }
        }
      }
      // bursts
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i]; b.life -= dt;
        const a = b.pts.geometry.attributes.position;
        for (let j = 0; j < b.vel.length; j++) { a.array[j * 3] += b.vel[j].x * dt; a.array[j * 3 + 1] += b.vel[j].y * dt; a.array[j * 3 + 2] += b.vel[j].z * dt; }
        a.needsUpdate = true; b.pts.material.opacity = Math.max(0, b.life / 0.9);
        if (b.life <= 0) { scene.remove(b.pts); b.pts.geometry.dispose(); pointMats.splice(pointMats.indexOf(b.pts.material), 1); b.pts.material.dispose(); bursts.splice(i, 1); }
      }
      for (let i = sniffs.length - 1; i >= 0; i--) {
        const s = sniffs[i]; s.life -= dt;
        const arr = s.l.geometry.attributes.position.array; const q = s.p.mesh.position; arr[3] = q.x; arr[4] = q.y; arr[5] = q.z; s.l.geometry.attributes.position.needsUpdate = true;
        s.l.material.opacity = Math.max(0, s.life);
        if (s.life <= 0) { scene.remove(s.l); s.l.geometry.dispose(); s.l.material.dispose(); sniffs.splice(i, 1); }
      }
      // effects
      fwMat.emissiveIntensity = Math.max(0, fwMat.emissiveIntensity - dt * 2);
      if (st.compromised > 0) {
        st.compromised = Math.max(0, st.compromised - dt);
        devMat.wallbox.emissiveIntensity = 0.6 + 0.4 * Math.sin(t * 12);
        lbl.wallbox.classList.add("bad"); lbl.wallbox.textContent = "WALLBOX · COMPROMISED";
        if (st.compromised === 0) { devMat.wallbox.emissiveIntensity = 0; lbl.wallbox.classList.remove("bad"); lbl.wallbox.textContent = "WALLBOX"; }
      }
      if (devMat.pvinv.emissiveIntensity > 0) { devMat.pvinv.emissiveIntensity = Math.max(0, devMat.pvinv.emissiveIntensity - dt * 1.2); if (devMat.pvinv.emissiveIntensity === 0) devMat.pvinv.emissive.setHex(COL.danger); }
      st.anom += ((st.tls ? 0.02 : 0.18) + (st.ids ? 0 : 0.08) - st.anom) * dt * 0.25;
      dome.material.opacity = st.tls ? 0.1 + 0.05 * Math.sin(t * 2) : 0.03;
      dome.material.color.setHex(st.tls ? COL.secure : COL.power);
      dome.rotation.y += dt * 0.05;
      N.atk.userData.spin.rotation.y += dt * 1.5;
      N.fuzzer.userData.spin.rotation.y += dt * 1.2;
      kpiT += dt; if (kpiT > 0.25) { kpiT = 0; kpis(); }
    });
    S.start();
  })();
})();
