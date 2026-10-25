export type Project = {
  title: string;
  blurb: string;
  link?: string;
  linkLabel?: string;
  image?: string;
  tag?: string;
  placeholder?: boolean;
};

export type ClusterSection = {
  heading: string;
  items: Project[];
};

export type Cluster = {
  id: string;
  label: string;
  kicker: string;
  sections: ClusterSection[];
};

export const ABOUT_PARAGRAPHS = [
  `I'm a machine learning engineer and scientist, holding two PhDs (System Optimization & Security and Image & Signal Processing) and an Electronic Engineering background.`,
  `My career spans nuclear & medical imaging — where I built PET reconstruction and attenuation-correction algorithms with deep neural networks at CNEA and CONICET — through blockchain data analysis and decentralized AI at Pocket Scan and the Pocket Network Foundation, to LLMs and agentic systems as co-founder and ML Lead of Pnyx AI, and as a researcher at UTN-FRBA, directing projects on ML-driven ecotoxicology automation and adversarial evaluation of language models.`,
  `I'm a pragmatic, test-oriented researcher and fast learner, focused on turning bleeding-edge methods into real-world applications — from CUDA kernels and Triton/vLLM deployments to MCP servers and autonomous agents. I work in Spanish and English and can communicate in German and French.`,
];

export const SKILL_CHIPS = [
  "CUDA kernels",
  "Triton/vLLM deployments",
  "MCP servers",
  "Autonomous agents",
  "PET reconstruction",
  "Nuclear imaging",
  "Deep neural networks",
  "GANs & diffusion",
  "Adversarial LLM evaluation",
  "Linux - k8s",
  "Blockchain data analysis",
  "Statistical modeling",

];

export const LANGUAGES = [
  { name: "Spanish", level: "Working" },
  { name: "English", level: "Working" },
  { name: "German", level: "Conversational" },
  { name: "French", level: "Conversational" },
];

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/rawthil" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rodriguez-colmeiro/" },
  { label: "X / Twitter", href: "https://twitter.com/Rama_stdout" },
  { label: "ResearchGate", href: "https://www.researchgate.net/profile/Ramiro-Rodriguez-Colmeiro" },
  { label: "ORCID", href: "https://orcid.org/0000-0001-9279-5717" },
];

export type CareerNode = {
  id: string;
  org: string;
  role: string;
  detail?: string;
  stage: number;
  col: 0 | 1 | 2;
  current?: boolean;
  fromElsewhere?: boolean;
};

export type CareerEdge = {
  from: string;
  to: string;
};

export const CAREER_NODES: CareerNode[] = [
  {
    id: "utn-ee",
    org: "UTN-FRBA",
    role: "Electronic Engineering",
    detail: "Engineering degree",
    stage: 0,
    col: 1,
  },
  {
    id: "cnea",
    org: "CNEA",
    role: "Detector development",
    detail: "Scintillation detectors & PET instrumentation",
    stage: 1,
    col: 0,
  },
  {
    id: "utt-master",
    org: "UTT",
    role: "Master OSS",
    detail: "Optimization & System Security",
    stage: 1,
    col: 1,
  },
  {
    id: "utn-ta",
    org: "UTN-FRBA",
    role: "Teacher assistant",
    detail: "Electronic engineering courses",
    stage: 1,
    col: 2,
    current: true,
  },
  {
    id: "conicet",
    org: "CONICET",
    role: "Doctoral grant",
    detail: "Medical imaging & deep learning",
    stage: 2,
    col: 1,
  },
  {
    id: "phd-utn",
    org: "UTN-FRBA",
    role: "PhD · Image & Signal Processing",
    detail: "Reduced-dose PET reconstruction",
    stage: 3,
    col: 0,
  },
  {
    id: "phd-utt",
    org: "UTT",
    role: "PhD · System Optimization & Security",
    detail: "Sparse sampling & machine learning",
    stage: 3,
    col: 2,
  },
  {
    id: "giar",
    org: "UTN-FRBA · GIAR",
    role: "Researcher",
    detail: "Position at the Artificial Intelligence and Robotics Group (GIAR)",
    stage: 4,
    col: 1,
    current: true,
  },
  {
    id: "poktscan",
    org: "Pocket Scan",
    role: "Data & ML",
    detail: "Chain traffic analytics & relay mining",
    stage: 5,
    col: 1,
    fromElsewhere: true,
  },
  {
    id: "pnf",
    org: "Pocket Network Foundation",
    role: "Data Analysis",
    detail: "Blockchain, tokenomics and data analytics",
    stage: 6,
    col: 0,
    current: true,
  },
  {
    id: "pnyx",
    org: "Pnyx AI",
    role: "Co-founder & ML Lead",
    detail: "LLM & agentic systems in production",
    stage: 6,
    col: 2,
    current: true,
  },
];

export const CAREER_EDGES: CareerEdge[] = [
  { from: "utn-ee", to: "cnea" },
  { from: "utn-ee", to: "utt-master" },
  { from: "utn-ee", to: "utn-ta" },
  { from: "cnea", to: "conicet" },
  { from: "utt-master", to: "conicet" },
  { from: "conicet", to: "phd-utn" },
  { from: "conicet", to: "phd-utt" },
  { from: "phd-utn", to: "giar" },
  { from: "phd-utt", to: "giar" },
  { from: "poktscan", to: "pnf" },
  { from: "poktscan", to: "pnyx" },
];

export const CLUSTERS: Cluster[] = [
  {
    id: "academia",
    label: "Academia",
    kicker: "Teaching · GIAR · PhD",
    sections: [
      {
        heading: "PhD research",
        items: [
          {
            title: "Towards Reduced-Dose PET Imaging Using Sparse Sampling and Machine Learning",
            blurb: "PhD thesis in System Optimization & Security (UTT) and Image & Signal Processing (UTN).",
            link: "https://www.theses.fr/2021TROY0015",
            linkLabel: "Read thesis",
            image: "/assets/image_abstract.png",
            tag: "PhD",
          },
          {
            title: "Synthetic CT generation with 3D CNNs and GANs for PET attenuation correction",
            blurb: "Deep-learning attenuation correction to cut tracer dose without losing diagnostic quality.",
            link: "https://github.com/RawthiL/PET_DeepAttCorrection",
            linkLabel: "Code",
            image: "/assets/paper_att_corr.png",
            tag: "PhD",
          },
          {
            title: "Gamma photon impact localization on scintillation crystals via NNs",
            blurb: "Impact-distribution-matching loss for border-effect reduction in gamma detectors.",
            link: "https://doi.org/10.1109/CAE51562.2021.9397557",
            linkLabel: "DOI",
            image: "/assets/paper_event_loc.jpg",
            tag: "Paper",
          },
          {
            title: "PET 3D reconstruction using a parallelizable 2D remesh representation",
            blurb: "Journal of Medical Imaging — remesh-based reconstruction for GPU scalability.",
            link: "https://doi.org/10.1117/1.JMI.8.2.024001",
            linkLabel: "DOI",
            image: "/assets/paper_mesh.png",
            tag: "Paper",
          },
          {
            title: "Scintillation camera design with genetic-algorithm PMT placement",
            blurb: "Strategic photomultiplier positioning to maximize localization accuracy.",
            link: "https://doi.org/10.24215/16666038.18.e02",
            linkLabel: "DOI",
            image: "/assets/paper_PMT_loc.jpg",
            tag: "Paper",
          },
        ],
      },
      {
        heading: "GIAR & General Research",
        items: [
          {
            title: "Automating the Allium cepa Bioassay Through Deep Learning",
            blurb: "Segmentation and classification of interphase and mitotic states of cell nuclei in the Allium cepa bioassay.",
            link: "https://55jaiio.sadio.org.ar/wp-content/uploads/2026/07/77.pdf",
            linkLabel: "Publication",
            image: "/assets/paper_ina_2.png",
            tag: "GIAR",
          },
          {
            title: "Automatic segmentation of Allium cepa cells by unsupervised machine vision methods",
            blurb: "Allium cepa cell detection using unsupervised methods.",
            link: "https://ria.utn.edu.ar/items/46a5136b-6fa4-4b8b-9fd0-1ad84be1d681",
            linkLabel: "Publication",
            image: "/assets/paper_ina_1.png",
            tag: "GIAR",
          },
          {
            title: "Analysis of reflex-agent success in discrete environments",
            blurb: "Agent behavior study in maze-like discrete worlds.",
            link: "https://www.researchgate.net/publication/359962248_Analysis_of_Reflex_Agents_Success_When_Navigating_on_Discrete_Environments",
            linkLabel: "Publication",
            image: "/assets/paper_mazes1.png",
            tag: "GIAR",
          },
          {
            title: "Brain tumor segmentation with coarse-to-fine 3D CNNs",
            blurb: "Multi-resolution convolutional segmentation pipeline.",
            link: "https://doi.org/10.1007/978-3-319-75238-9_20",
            linkLabel: "DOI",
            image: "/assets/paper_brain_tummor.png",
            tag: "GIAR",
          },
          {
            title: "Vehicle trajectory prediction with recursive neural networks (Lyft)",
            blurb: "Motion prediction on the Lyft Level 5 dataset.",
            link: "https://github.com/RawthiL/Lyft_Agent-Motion-Prediction",
            linkLabel: "Code",
            image: "/assets/proj_lyft.png",
            tag: "Project",
          },
        ],
      },
      {
        heading: "Teaching",
        items: [
          {
            title: "UTN-FRBA — Electronic Engineering",
            blurb: "Teaching assistant for Electronic Measurements I — statistical methods, measurement bench automation, and sensors.",
            link: "https://github.com/Medias-Electronicas-I-UTN-FRBA",
            linkLabel: "Course repo",
            image: "/assets/utn.png",
            tag: "Teaching",
          },
          {
            title: "UTN-FRBA — Grupo de Inteligencia Artificial y Robótica",
            blurb: "Class D researcher, directing and developing research projects.",
            link: "https://giar.ai/",
            linkLabel: "Web",
            image: "/assets/giar.png",
            tag: "Research",
          },
          {
            title: "Automatización de ensayos ecotoxicológicos con métodos de aprendizaje automático",
            blurb: "Allium cepa bioassay automation using machine learning methods.",
            link: "https://drive.google.com/file/d/17P1osO56CSypEnqIAgON7pdkyvYFdsPi/view?ts=6add3eb8",
            linkLabel: "Manuscript",
            image: "/assets/tesis_ina.png",
            tag: "Supervised Engineering Thesis",
          },
        ],
      },
    ],
  },
  {
    id: "pnyx",
    label: "PNYX",
    kicker: "Startup · Co-founder & ML Lead",
    sections: [
      {
        heading: "Pnyx AI",
        items: [
          {
            title: "Co-founder & ML Lead",
            blurb: "From research and design to backend engineering, solving hard problems.",
            link: "https://pnyxai.com/",
            linkLabel: "Web",
            image: "/assets/pnyx-icon-holo-v2.svg",
            tag: "PNYX",
          },
          {
            title: "Architecting a Fair Marketplace for Decentralized AI",
            blurb: "How do you judge LLM quality when anyone can run a node? Pnyx makes the case for Pocket Network (POKT) as the decentralized backbone for AI inference, then introduces the Pnyx-ML-Testbench: an open-source framework that treats LLMs as black boxes, scores outcomes rather than model provenance, and feeds a live, skill-based leaderboard.",
            link: "https://pnyxai.com/blog/pokt-the-decentralized-backbone-for-ai",
            linkLabel: "Post",
            image: "/assets/blog_desc_ai.png",
            tag: "Blog",
          },
          {
            title: "How to Judge an AI by Its Answers, Not Its Code",
            blurb: "Exact match punishes paraphrasing, string overlap misses meaning, and logprobs rarely leave the API. Enter A‑VERT: an open-source, pip-installable evaluator that clusters answers into correct and wrong meanings, then compares new responses semantically using small embedding or reranker models—hitting ~0.96 balanced accuracy and ~0.97 correlation with human judges.",
            link: "https://pnyxai.com/blog/a-vert-how-to-judge-an-ai-by-its-answers-not-its-code",
            linkLabel: "Post",
            image: "/assets/blog_avert.png",
            tag: "Blog",
          },
        ],
      },
    ],
  },
  {
    id: "web3",
    label: "Web3 / Crypto",
    kicker: "Work & research",
    sections: [
      {
        heading: "Decentralized AI & protocols",
        items: [
          {
            title: "Decentralized AI: Permissionless LLM Inference on the POKT Network",
            blurb: "Running LLM inference across a decentralized relay layer.",
            link: "https://arxiv.org/abs/2405.20450",
            linkLabel: "arXiv",
            image: "/assets/paper_decAI.png",
            tag: "Research",
          },
          {
            title: "Relay Mining: Verifiable Multi-Tenant Distributed Rate Limiting",
            blurb: "Proof-of-work-free rate limiting as a security primitive for open networks.",
            link: "https://arxiv.org/abs/2305.10672",
            linkLabel: "arXiv",
            image: "/assets/paper_relay_mining.png",
            tag: "Research",
          },
          {
            title: "Analysis & forecasting of Pocket Network chain traffic",
            blurb: "Statistical tooling over on-chain gateway traffic, presented at InfraCon 2022.",
            link: "https://github.com/pokt-scan/infracon-2022",
            linkLabel: "Repo",
            image: "/assets/paper_Infracon2022.jpg",
            tag: "Pocket Scan",
          },
        ],
      },
      // {
      //   heading: "Consulting & paid engagements",
      //   items: [
      //     {
      //       title: "Blockchain data analysis — client work",
      //       blurb: "Placeholder: list paid engagements (protocol analytics, ML for on-chain data) — anonymized where needed.",
      //       tag: "Consulting",
      //       placeholder: true,
      //     },
      //   ],
      // },
    ],
  },
];
