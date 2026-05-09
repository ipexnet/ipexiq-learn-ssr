export interface ChapterMeta {
  slug: string;
  sourceUrl: string;
  targetUrl: string;
  title: string;
  description: string;
}

export const chapters: ChapterMeta[] = [
  {
    slug: '',
    sourceUrl: 'https://www.ipexiq.com/learn',
    targetUrl: 'https://learn.ipexiq.com/',
    title: 'Project Controls Field Guide — IPEXIQ',
    description:
      "A practitioner's field guide to FEL, Interfaces, CPDS, Benchmarking and Planning — industry references (CII, AACE) paired with the IPEXIQ apps that implement them.",
  },
  {
    slug: 'fel',
    sourceUrl: 'https://www.ipexiq.com/fel',
    targetUrl: 'https://learn.ipexiq.com/fel',
    title: 'Front-End Loading (FEL) — IPEXIQ Field Guide',
    description:
      'How CII FEL gates de-risk capital projects, and how IPEXIQ implements FEL deliverables, gate reviews and PDRI scoring.',
  },
  {
    slug: 'interfaces',
    sourceUrl: 'https://www.ipexiq.com/interfaces',
    targetUrl: 'https://learn.ipexiq.com/interfaces',
    title: 'Interface Management — IPEXIQ Field Guide',
    description:
      'Managing project interfaces between disciplines, contractors and stakeholders using a structured register and IPEXIQ tooling.',
  },
  {
    slug: 'cpds',
    sourceUrl: 'https://www.ipexiq.com/cpds',
    targetUrl: 'https://learn.ipexiq.com/cpds',
    title: 'Contract & PO Delivery Status (CPDS) — IPEXIQ',
    description:
      'Tracking contract and purchase-order delivery status against milestone gates with the IPEXIQ CPDS app.',
  },
  {
    slug: 'benchmarking',
    sourceUrl: 'https://www.ipexiq.com/benchmarking',
    targetUrl: 'https://learn.ipexiq.com/benchmarking',
    title: 'Project Benchmarking (CII) — IPEXIQ Field Guide',
    description:
      'Using CII benchmarking metrics to compare project performance and drive predictable cost and schedule outcomes.',
  },
  {
    slug: 'planning',
    sourceUrl: 'https://www.ipexiq.com/planning',
    targetUrl: 'https://learn.ipexiq.com/planning',
    title: 'Planning & Scheduling — IPEXIQ Field Guide',
    description:
      'Levels of schedule, P6 best practice, logic quality, and the IPEXIQ XER reader for fast schedule analysis.',
  },
  {
    slug: 'estimating',
    sourceUrl: 'https://www.ipexiq.com/estimating',
    targetUrl: 'https://learn.ipexiq.com/estimating',
    title: 'Estimating (AACE) — IPEXIQ Field Guide',
    description:
      'AACE Class 5–1 estimate classes, accuracy ranges, and how IPEXIQ tools support estimate development and validation.',
  },
  {
    slug: 'deliverable-management',
    sourceUrl: 'https://www.ipexiq.com/deliverable-management',
    targetUrl: 'https://learn.ipexiq.com/deliverable-management',
    title: 'Deliverable Management & Earned Value — IPEXIQ',
    description:
      'Level-5 progress measurement on engineering and management deliverables using gatesets, weightings and earned value.',
  },
  {
    slug: 'deliverable-history',
    sourceUrl: 'https://www.ipexiq.com/deliverable-history',
    targetUrl: 'https://learn.ipexiq.com/deliverable-history',
    title: 'Deliverable History — IPEXIQ Field Guide',
    description:
      'Tracking the revision history of engineering deliverables with a clean timeline view and reporting.',
  },
  {
    slug: 'ctr',
    sourceUrl: 'https://www.ipexiq.com/ctr',
    targetUrl: 'https://learn.ipexiq.com/ctr',
    title: 'Cost-Time-Resource (CTR) Norms — IPEXIQ',
    description:
      'Building reusable CTR norms for engineering effort estimation and progress measurement.',
  },
  {
    slug: 'xer',
    sourceUrl: 'https://www.ipexiq.com/xer',
    targetUrl: 'https://learn.ipexiq.com/xer',
    title: 'XER Reader & Schedule Analysis — IPEXIQ',
    description:
      'Fast P6 XER analysis, variance reports and resource S-curves with the IPEXIQ XER reader.',
  },
];