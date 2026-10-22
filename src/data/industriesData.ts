import { Industry } from '../types';

export const INDUSTRIES: Industry[] = [
  {
    id: 'healthcare',
    slug: 'healthcare',
    title: 'Healthcare & Hospitals',
    tagline: 'Streamlining clinical care, diagnostics, and administrative workflows for modern hospitals',
    description: 'Healthcare organizations operate in 24/7 high-stakes environments where clerical errors directly impact patient outcomes and institutional revenue. Sarita Infotech delivers battle-tested hospital management solutions that bring clinical clarity, rapid billing turnaround, and digital interoperability readiness to hospitals of all sizes.',
    iconName: 'Stethoscope',
    challenges: [
      'Disjointed data across OPD, IPD, ICU, OT, Pharmacy, and Diagnostics',
      'Long patient wait times at registration, cash counters, and discharge',
      'Cumbersome manual insurance / TPA pre-authorization paperwork',
      'Uncontrolled pharmacy inventory, stockouts, and medication expiry loss',
      'Regulatory compliance requirements including NABH accreditation and digital health guidelines'
    ],
    solutions: [
      'Unified electronic patient health record linked to permanent UHID',
      'Automated IPD discharge billing reducing clearance time by up to 40%',
      'Connected laboratory information system (LIS) interfacing with clinical analyzers',
      'Real-time bed matrix, OT schedules, and nurse station documentation',
      'Architectural foundation for ABDM (ABHA) and NHCX claims interoperability'
    ],
    relevantProducts: [
      { id: 'healthcare', name: 'Sarita HealthCare', url: '/products/healthcare' }
    ],
    highlights: [
      'Proven in multispeciality, eye, and surgical hospitals',
      'Rapid bedside nursing documentation and e-MAR',
      'Granular role-based security protecting sensitive patient records'
    ]
  },
  {
    id: 'trade',
    slug: 'trade',
    title: 'International Trade & EXIM',
    tagline: 'Mastering export/import documentation, customs compliance, and foreign realization',
    description: 'Global trade demands strict compliance with evolving customs regulations, DGFT policies, and international banking terms. Sarita Infotech equips exporters and trading houses with specialized software that automates commercial documentation, eliminates clerical errors, and tracks government export incentive schemes.',
    iconName: 'Ship',
    challenges: [
      'Clerical inconsistencies between commercial invoices, customs entries, and packing lists',
      'Missed duty drawback claims and incomplete Advance Authorization obligation ledgers',
      'Delays in obtaining and tracking Bank Realization Certificates (e-BRC / EDPMS)',
      'Lack of real-time status on buyer orders, shipments in transit, and container bookings',
      'Complex calculation of multi-currency transactions and overseas sales commissions'
    ],
    solutions: [
      'Single-entry generation of all customs, shipping, and banking export documentation',
      'Automated calculation of Duty Drawback, RoDTEP, and Advance License import balances',
      'Inward foreign remittance reconciliation against specific shipping bills',
      'Built-in Report Designer to tailor commercial formats to buyer and customs guidelines',
      'Dynamic multi-dimensional sales reports by country, buyer, product, and agent'
    ],
    relevantProducts: [
      { id: 'nimble', name: 'Sarita Nimble', url: '/products/nimble' }
    ],
    highlights: [
      'Eliminates repetitive data entry across trade forms',
      'Supports textile, chemical, engineering, and food exporters',
      'Protects profit margins through automated incentive tracking'
    ]
  },
  {
    id: 'cooperative-banking',
    slug: 'cooperative-banking',
    title: 'Cooperative Banking & Credit Societies',
    tagline: 'Reliable core accounting, member management, and daily deposit operations',
    description: 'Cooperative credit societies, employee credit funds, and thrift organizations form the financial backbone of local communities. Sarita Infotech provides rock-solid core accounting software designed specifically for the unique regulatory and operational needs of cooperative financial institutions.',
    iconName: 'Landmark',
    challenges: [
      'Reconciliation bottlenecks from daily piggy deposit collections across multiple agents',
      'Complex interest computation on varied deposit and loan schemes with irregular payments',
      'Manual management of member share capital, transfer records, and dividend payouts',
      'Rigorous cooperative society audit guidelines and NPA provisioning standards',
      'Guarantor risk management and tracking of loan recovery legal notices'
    ],
    solutions: [
      'End-to-end member management with share allotment and dividend distribution ledgers',
      'Daily / Pigmy deposit collection tracking with agent commission accounting',
      'Personal loans, vehicle loans, and instant Loan Against Deposit (LAD) calculators',
      'Double-entry core financial accounting with automated daily cash scroll and day book closing',
      'Statutory cooperative audit returns, NPA classification, and Form 1/2 compliance reports'
    ],
    relevantProducts: [
      { id: 'bankware', name: 'Sarita BankWare', url: '/products/bankware' }
    ],
    highlights: [
      'Trusted by urban and rural credit societies for decades',
      'Regional language passbook and notice printing support',
      'Strict guarantor exposure validation prevents multi-loan liabilities'
    ]
  },
  {
    id: 'retail',
    slug: 'retail',
    title: 'Retail & Multi-Store Operations',
    tagline: 'Accelerating counter checkout speed, inventory valuation, and store profitability',
    description: 'In fast-paced retail environments, every second at the cash desk counts. Sarita Infotech provides comprehensive retail point-of-sale and stock management software that keeps checkout queues moving, maintains accurate inventory levels, and ensures seamless GST compliance.',
    iconName: 'ShoppingBag',
    challenges: [
      'Long customer queues at billing counters during peak footfall hours',
      'Inventory shrinkage, untracked stock pilferage, and warehouse discrepancies',
      'Difficulty in managing batch numbers, expiry dates, and barcode labels',
      'Unoptimized procurement leading to frequent stockouts or excess capital lockup',
      'Fragmented view of sales, cash drawers, and margins across multiple counters'
    ],
    solutions: [
      'High-speed barcode POS billing with shortcut keys and instant thermal printing',
      'Real-time inventory valuation (FIFO/Weighted) with automated reorder level alerts',
      'Near-expiry notifications and batch-wise margin tracking',
      'Multi-tender payment acceptance (Cash, UPI QR, Cards, Store Credit Khata)',
      'GST-compliant invoices with automatic HSN mapping and tax ledger preparation'
    ],
    relevantProducts: [
      { id: 'retail', name: 'Sarita Retail', url: '/products/retail' }
    ],
    highlights: [
      'Operates seamlessly offline during internet outages',
      'Integrates with barcode scanners, thermal printers, and weighing scales',
      'Shift-wise cashier reconciliation ensures zero cash drawer leakage'
    ]
  }
];
