import { Product } from '../types';
import { CONTENT_CONFIG } from './contentConfig';

export const PRODUCTS: Product[] = [
  {
    id: 'healthcare',
    name: 'Sarita HealthCare',
    slug: 'healthcare',
    badge: 'Hospital Management Information System (HMIS)',
    heroHeadline: 'Comprehensive Hospital Operations & Clinical Workflow System',
    heroSubheadline: 'Streamline patient registration, OPD/IPD care, clinical administration, OT, pharmacy, and diagnostic services while preparing your hospital for national digital health interoperability.',
    targetAudience: [
      'Multispeciality Hospitals',
      'Single-Speciality Clinics & Eye Hospitals',
      'Nursing Homes & Surgical Centers',
      'Diagnostic Centers & Pathology Labs',
      'Hospital Group Networks'
    ],
    businessProblems: [
      'Fragmented patient records between OPD, IPD, and diagnostic departments',
      'Delayed discharge summaries and complex manual billing calculation',
      'Inefficient bed management and operating theater scheduling bottlenecks',
      'Complex insurance and TPA claim processing with manual paperwork',
      'Lack of real-time visibility into pharmacy stock and clinical supply consumption'
    ],
    shortDescription: 'Enterprise HMIS managing patient care lifecycle from front-desk token to bed allocation, electronic medical records, OT, pharmacy, and billing.',
    fullDescription: 'Sarita HealthCare is an enterprise Hospital Management Information System engineered with over 23 years of healthcare domain expertise. Designed to support high-volume multispeciality hospitals, it unifies front-desk registration, doctor consultation desks, nursing stations, pharmacy dispensing, diagnostic orders, and financial accounts into a cohesive, secure platform.',
    keyFeatures: [
      {
        title: 'Patient Registration & UHID Management',
        description: 'Instant patient registration with unique health ID, biometric/photo capture, and history lookups for fast OPD check-ins.',
        iconName: 'UserCheck'
      },
      {
        title: 'OPD & IPD Clinical Administration',
        description: 'Intuitive consultation desks, e-prescriptions, clinical notes, bed allocation matrices, and discharge summaries.',
        iconName: 'Activity'
      },
      {
        title: 'Real-time Ward & Bed Management',
        description: 'Interactive visual bed matrix displaying occupancy, maintenance status, nurse allocations, and room tariffs.',
        iconName: 'BedDouble'
      },
      {
        title: 'Integrated Billing & TPA Processing',
        description: 'Itemized billing engine with automated package splitting, advance receipts, insurance pre-auth tracking, and cash desk reconciliations.',
        iconName: 'Receipt'
      },
      {
        title: 'Operating Theater (OT) Scheduling',
        description: 'Surgeon and anaesthetist rosters, pre-op checklists, pacu tracking, and implant consumption tracking.',
        iconName: 'Scissors'
      },
      {
        title: 'Pharmacy & Medical Consumable Control',
        description: 'Batch-wise expiry management, narcotic register, auto-replenishment warnings, and point-of-dispense e-prescription linking.',
        iconName: 'Pill'
      },
      {
        title: 'Laboratory & Radiology (LIS / RIS)',
        description: 'Sample barcode routing, machine interfacing, standard reference ranges, digital signoffs, and patient portal reporting.',
        iconName: 'FlaskConical'
      },
      {
        title: 'Executive Analytics & NABH Quality MIS',
        description: 'Dynamic dashboards for ALOS (Average Length of Stay), bed turnover rates, doctor revenue metrics, and compliance audits.',
        iconName: 'BarChart3'
      }
    ],
    featureCategories: [
      {
        name: 'Patient Journey & Front Desk',
        description: 'Ensure rapid turnaround at front reception counters and consultation desks.',
        features: [
          'Centralized UHID master across branches',
          'Token generation and digital calling display integration',
          'Online & walk-in doctor appointment scheduling',
          'Patient emergency fast-track admissions'
        ]
      },
      {
        name: 'Inpatient & Clinical Administration',
        description: 'Complete operational controls for nursing stations, wards, and ICU care.',
        features: [
          'Visual bed status with color-coded occupancy',
          'Electronic medication administration records (e-MAR)',
          'Daily doctor clinical notes & vital monitoring',
          'Automated diet schedule and housekeeping requests'
        ]
      },
      {
        name: 'Diagnostics & Laboratory Workflows',
        description: 'Accurate pathology and imaging workflows with specimen traceability.',
        features: [
          'Machine bidirectional interface capabilities',
          'Critical value alert SMS/system notifications',
          'Standardized normal ranges by age and gender',
          'Turnaround time (TAT) monitoring dashboards'
        ]
      },
      {
        name: 'Billing, TPA & Financial Operations',
        description: 'Transparent itemized statements and automated settlement tracking.',
        features: [
          'Tariff master configuration for private, corporate, and TPA rates',
          'Package billing with automatic overrun calculations',
          'Deposit tracking and interim bill printing',
          'Detailed day-end cash desk handover reconciliation'
        ]
      }
    ],
    workflow: [
      {
        stepNumber: 1,
        title: 'Patient Intake & Triage',
        description: 'Front-desk captures demographic data, issues digital UHID/token, and directs patient to consultation or emergency.',
        roleOrModule: 'Front Desk & Reception'
      },
      {
        stepNumber: 2,
        title: 'Doctor Desk & E-Prescription',
        description: 'Physician reviews medical history, enters clinical findings, prescribes medications, and orders diagnostic tests.',
        roleOrModule: 'OPD / EMR Desk'
      },
      {
        stepNumber: 3,
        title: 'IPD Admission & Bed Allocation',
        description: 'Wards assign available beds according to clinical requirements and room category; nursing station begins care plan.',
        roleOrModule: 'IPD Ward & Nursing'
      },
      {
        stepNumber: 4,
        title: 'Investigations & Pharmacy Dispense',
        description: 'Labs process barcoded samples; pharmacy dispenses medications automatically mapped to the patient billing folder.',
        roleOrModule: 'LIS & In-house Pharmacy'
      },
      {
        stepNumber: 5,
        title: 'Discharge Summary & Settlement',
        description: 'Doctors prepare digital discharge summary; billing desk reconciles advances, insurance pre-auth, and final bill.',
        roleOrModule: 'Billing & Cash Desk'
      }
    ],
    benefits: [
      {
        metric: '40% Reduction',
        title: 'Discharge Turnaround Time',
        description: 'Consolidated real-time billing and pre-built clinical discharge templates eliminate discharge clearance delays.'
      },
      {
        metric: '99.8% Accuracy',
        title: 'Pharmacy Dispensing & Billing',
        description: 'Direct prescription-to-dispense automation eliminates manual re-entry errors and unbilled consumables.'
      },
      {
        metric: 'Real-time',
        title: 'Bed & Resource Visibility',
        description: 'Instant operational clarity on vacant beds, OT turnover, and equipment utilization across hospital departments.'
      },
      {
        metric: 'Regulatory',
        title: 'NABH Audit Readiness',
        description: 'Standardized digital record-keeping, medication tracking, and incident logging simplify hospital accreditation.'
      }
    ],
    integrationsVerified: [
      'Standard HL7 / DICOM Imaging Equipment',
      'Laboratory Analyzer Bidirectional Interfacing',
      'SMS & WhatsApp Notification Gateways',
      'Tally & ERP Financial Export'
    ],
    implementationTimeline: 'Typical hospital rollout: 4 to 8 weeks depending on bed capacity and customizations.',
    faqs: [
      {
        question: 'Can Sarita HealthCare be deployed on local hospital servers or cloud?',
        answer: 'Sarita HealthCare supports on-premise local server installations with client workstations, private cloud hosting, or hybrid deployments based on hospital IT infrastructure requirements.'
      },
      {
        question: 'How does Sarita HealthCare handle laboratory equipment integration?',
        answer: 'Our laboratory module interfaces with bidirectional and unidirectional clinical chemistry and hematology analyzers, eliminating manual report typing and reducing transcriptional errors.'
      },
      {
        question: 'What is the status of ABDM and NHCX compliance in Sarita HealthCare?',
        answer: 'We have engineered the underlying data architectures for ABHA registration and NHCX claims integration. Status is currently designated as "Status to Be Confirmed" pending formal sandbox validation and audit with the National Health Authority.'
      },
      {
        question: 'Does the system support multiple tariff rates for general, private, and corporate patients?',
        answer: 'Yes. The tariff engine allows hospital administrators to define multiple fee structures, corporate tie-up rates, and insurance TPA price lists with automated bill line mapping.'
      }
    ],
    isVerifiedContent: true,
    abdmStatusConfig: {
      label: CONTENT_CONFIG.healthcareInteroperability.abdm.statusLabel,
      description: CONTENT_CONFIG.healthcareInteroperability.abdm.notice,
      status: 'Status to Be Confirmed',
      verifiedWorkflows: CONTENT_CONFIG.healthcareInteroperability.abdm.potentialWorkflows,
      disclaimer: 'Sarita Infotech does not make premature claims of live ABDM production certification without official testing records.'
    },
    nhcxStatusConfig: {
      label: CONTENT_CONFIG.healthcareInteroperability.nhcx.statusLabel,
      description: CONTENT_CONFIG.healthcareInteroperability.nhcx.notice,
      status: 'Status to Be Confirmed',
      intendedWorkflows: CONTENT_CONFIG.healthcareInteroperability.nhcx.intendedWorkflows,
      disclaimer: 'Claims exchange workflows are designed for future interoperability and require clearinghouse gateway onboarding.'
    }
  },

  {
    id: 'nimble',
    name: 'Sarita Nimble',
    slug: 'nimble',
    badge: 'Export & Import Trade Management Software',
    heroHeadline: 'Streamline Global Trade Documentation, Duty Schemes & Shipment Lifecycles',
    heroSubheadline: 'Eliminate manual paperwork, automate duty drawback and advance license tracking, integrate bank realization certificates, and manage multi-currency trade orders effortlessly.',
    targetAudience: [
      'Export Houses & Merchant Exporters',
      'Manufacturing Exporters (Textiles, Chemicals, Engineering, Food)',
      'Custom House Agents (CHA) & Trade Consultancies',
      'Import-Export Trading Firms',
      'Freight & Logistics Coordination Teams'
    ],
    businessProblems: [
      'Costly delays from clerical errors in shipping bills, customs invoices, and packing lists',
      'Difficulty in calculating advance license balances, duty drawbacks, and government incentives',
      'Manual tracking of Bank Realization Certificates (e-BRC / EDPMS) leading to compliance penalties',
      'Lack of centralized visibility over open buyer orders, shipments in transit, and pending realizations',
      'Complex multi-currency accounting and commission calculations for overseas sales agents'
    ],
    shortDescription: 'Comprehensive EXIM trade software that automates trade documentation, shipment tracking, duty drawback, license utilization, and bank realization.',
    fullDescription: 'Sarita Nimble is an specialized business software solution engineered specifically for Indian exporters and importers. Built on real trade operational principles, it eliminates repetitive data entry across proforma invoices, custom invoices, packing lists, and shipping documents while providing continuous financial visibility into duty drawback schemes, advance authorization utilization, and foreign exchange realization.',
    keyFeatures: [
      {
        title: 'Single-Entry Documentation Engine',
        description: 'Enter trade order data once; automatically generate Proforma Invoices, Customs Invoices, Multi-Pack Packing Lists, and Declarations.',
        iconName: 'FileText'
      },
      {
        title: 'Duty Drawback & Scheme Calculations',
        description: 'Automated calculation of export incentives, Duty Drawback (DBK), RoDTEP/RoSCTL, and government export promotion schemes.',
        iconName: 'Percent'
      },
      {
        title: 'Advance License & Authorization Tracking',
        description: 'Track duty-free import entitlement balances against physical export obligations with automated quota deductions.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Bank Realization (e-BRC / EDPMS) Monitoring',
        description: 'Link inward foreign remittances to specific shipping bills to avoid RBI cautionary listings and ensure regulatory compliance.',
        iconName: 'Landmark'
      },
      {
        title: 'Buyer & Agent Order Management',
        description: 'Track open purchase orders, production lead times, shipping schedules, and agent commissions on FOB or CIF values.',
        iconName: 'Briefcase'
      },
      {
        title: 'Comprehensive Shipment History & Container Tracking',
        description: 'Complete audit trail of port clearances, Bill of Lading (BL) details, vessel bookings, and delivery milestones.',
        iconName: 'Ship'
      },
      {
        title: 'Dynamic Report Designer',
        description: 'Built-in report designer to tailor commercial invoice layouts, country-specific certificates of origin, and custom documents.',
        iconName: 'Layers'
      },
      {
        title: 'Multi-Dimensional Sales Analysis',
        description: 'Deep reporting by Product, Buyer, Destination Country, Sales Agent, and Port of Loading.',
        iconName: 'TrendingUp'
      }
    ],
    featureCategories: [
      {
        name: 'Pre-Shipment Documentation',
        description: 'Accelerate order confirmation and export preparation.',
        features: [
          'Proforma Invoice generation with buyer-specific terms',
          'Export Order contract management and amendments',
          'Production order intimation and packing list formulation',
          'Pre-shipment inspection and quality certificate generation'
        ]
      },
      {
        name: 'Customs & Post-Shipment Documents',
        description: 'Flawless compliance for customs clearance and port logistics.',
        features: [
          'Commercial Invoice adhering to customs and DGFT formats',
          'Standardised Packing Lists with gross, net, and tare weights',
          'Certificate of Origin, Annexures, and GSP form generation',
          'Bill of Lading / Airway Bill document linkage'
        ]
      },
      {
        name: 'Export Schemes & Financial Realization',
        description: 'Protect your margins with automated government incentive management.',
        features: [
          'Advance Authorization license ledger and obligation monitoring',
          'Automatic Duty Drawback calculation at current schedule rates',
          'Inward remittance reconciliation against pending shipping bills',
          'EDPMS / IDPMS compliance tracking alerts'
        ]
      },
      {
        name: 'Business Analytics & Query Engine',
        description: 'Actionable visibility for management and operations teams.',
        features: [
          'Comprehensive query tool for pending buyer orders and shipments',
          'Country-wise trade balance and realization aging analysis',
          'Agent commission settlement statements',
          'Customised printable report designer'
        ]
      }
    ],
    workflow: [
      {
        stepNumber: 1,
        title: 'Buyer Order & Proforma Invoice',
        description: 'Input international buyer contract, specifications, Incoterms (FOB, CIF, CFR), currency, and payment terms (LC, TT, DA).',
        roleOrModule: 'Trade Sales & Order Desk'
      },
      {
        stepNumber: 2,
        title: 'Packing & Shipment Preparation',
        description: 'Generate multi-container packing lists with weight specifications, marks & numbers, and container allocations.',
        roleOrModule: 'Warehouse & Shipping'
      },
      {
        stepNumber: 3,
        title: 'Customs Clearance Documentation',
        description: 'One-click generation of customs invoices, shipping declarations, and license allocation certificates for CHA submission.',
        roleOrModule: 'EXIM Documentation'
      },
      {
        stepNumber: 4,
        title: 'Post-Shipment Bank Documents',
        description: 'Prepare bank negotiation schedules, Bill of Exchange, and dispatch documentation packets to the authorized dealer bank.',
        roleOrModule: 'Finance & Banking'
      },
      {
        stepNumber: 5,
        title: 'Realization & Scheme Closure',
        description: 'Reconcile inward foreign remittance against shipping bills, track e-BRC generation, and credit export incentive ledgers.',
        roleOrModule: 'Accounts & Compliance'
      }
    ],
    benefits: [
      {
        metric: '75% Faster',
        title: 'Documentation Turnaround',
        description: 'Generate complete commercial invoice sets and packing lists in minutes without duplicating data.'
      },
      {
        metric: 'Zero Errors',
        title: 'Customs Discrepancies',
        description: 'Unified calculations eliminate mismatched weights, missing Harmonized System (HS) codes, and currency errors.'
      },
      {
        metric: '100% Tracking',
        title: 'Export Incentive Realization',
        description: 'Never miss an unclaimed duty drawback or overdue advance authorization export obligation.'
      },
      {
        metric: 'Audit Ready',
        title: 'RBI & DGFT Compliance',
        description: 'Maintains comprehensive digital records linking order contracts, shipping bills, and bank realization data.'
      }
    ],
    integrationsVerified: [
      'Tally ERP / Prime Financial Accounting',
      'Excel Bulk Importer/Exporter',
      'Standard Customs Data Formats'
    ],
    implementationTimeline: 'Fast onboarding: 2 to 4 weeks including template customization and staff training.',
    faqs: [
      {
        question: 'Does Sarita Nimble support multiple foreign currencies in one trade profile?',
        answer: 'Yes. You can quote and invoice in USD, EUR, GBP, AED, JPY, or any global currency, with daily exchange rate tables and rupee conversion reporting.'
      },
      {
        question: 'Can customized invoice formats be designed to match specific overseas buyer requests?',
        answer: 'Yes. Sarita Nimble features a built-in Report Designer that allows users to adjust invoice templates, column formats, fonts, logos, and terms without programming.'
      },
      {
        question: 'How does the software assist with Advance License obligation monitoring?',
        answer: 'The system logs the CIF value and quantity allowed under each Advance Authorization, deducting utilized quantities upon every export shipment to prevent quota shortfalls.'
      }
    ],
    isVerifiedContent: true
  },

  {
    id: 'bankware',
    name: 'Sarita BankWare',
    slug: 'bankware',
    badge: 'Cooperative Banking & Credit Society Software',
    heroHeadline: 'Secure Core Accounting & Member Management for Credit Societies',
    heroSubheadline: 'Empower cooperative credit societies, employee credit funds, and urban banks with automated daily deposit collection, member share capital, loan disbursement, and compliance audit reporting.',
    targetAudience: [
      'Urban & Rural Cooperative Credit Societies',
      'Employee Co-Operative Credit Societies (Industrial & Corporate)',
      'Mahila Sahakari Mandali & Thrift Societies',
      'Nidhi Companies & Mutual Benefit Societies',
      'Primary Agricultural Credit Societies (PACS)'
    ],
    businessProblems: [
      'Risk of errors and reconciliation delays in manual piggy/daily deposit agent collections',
      'Complex calculation of interest on loans with irregular repayment schedules',
      'Difficult tracking of member share capital, dividend distribution, and share certificates',
      'Tedious manual preparation of statutory balance sheets and cooperative audit returns',
      'Inefficient recovery of overdue loans and lack of timely guarantor notifications'
    ],
    shortDescription: 'Core banking and member management software built for cooperative credit societies, daily deposit collection, loan portfolios, and statutory accounting.',
    fullDescription: 'Sarita BankWare is an established core banking and credit society administration platform developed to cater specifically to cooperative societies across Gujarat and India. Engineered to deliver rock-solid mathematical accuracy and audit compliance, it manages member shares, recurring and fixed deposits, daily pigmy collections, personal/vehicle loans, guarantor linkages, and double-entry financial accounting.',
    keyFeatures: [
      {
        title: 'Member & Share Capital Management',
        description: 'Member KYC records, share allotment, transfer ledgers, nomination records, and automated dividend distribution calculation.',
        iconName: 'Users'
      },
      {
        title: 'Daily / Pigmy Deposit Collection',
        description: 'Agent collection management, daily collection receipts, agent commission accounting, and reconciliation ledgers.',
        iconName: 'PiggyBank'
      },
      {
        title: 'Fixed & Recurring Deposit Engine',
        description: 'Flexible interest compounding schemes (monthly, quarterly, cumulative), maturity advice printing, and TDS calculations.',
        iconName: 'CreditCard'
      },
      {
        title: 'Comprehensive Loan Management System',
        description: 'Personal loans with/without EMI, gold loans, vehicle loans, and instant Loan Against Deposit (LAD) facilities.',
        iconName: 'Calculator'
      },
      {
        title: 'Guarantor & Security Linkage',
        description: 'Automatic validation of guarantor limits, active liability checks, and guarantor notices on loan defaults.',
        iconName: 'UserCheck'
      },
      {
        title: 'Double-Entry Financial Accounting',
        description: 'Integrated general ledger, automated day-book closing, cash scroll, bank reconciliation, and balance sheet compilation.',
        iconName: 'Scale'
      },
      {
        title: 'Bill Discounting & Advances',
        description: 'Bill discounting facility management, margin money deduction, and maturity realization tracking.',
        iconName: 'Receipt'
      },
      {
        title: 'Statutory Cooperative Audit Reports',
        description: 'One-click generation of N.P.A. classification (standard, sub-standard, doubtful), Form 1/2 returns, and annual audit files.',
        iconName: 'FileCheck'
      }
    ],
    featureCategories: [
      {
        name: 'Member Capital & Governance',
        description: 'Complete member registry and statutory shareholder compliance.',
        features: [
          'Member admission, resignation, and share transfer journals',
          'Share certificate printing with counterfoil records',
          'Annual General Meeting (AGM) dividend calculation lists',
          'Member nominee directory and legal heir records'
        ]
      },
      {
        name: 'Deposit Products & Pigmy Collection',
        description: 'Versatile savings instruments with automated interest scheduling.',
        features: [
          'Fixed Deposit (FD) accounts with reinvestment options',
          'Recurring Deposit (RD) accounts with penalty calculation for late installments',
          'Daily collection agent mobile/device data import',
          'Deposit premature closure and loan lien marking'
        ]
      },
      {
        name: 'Loan Sanctioning & Overdue Recovery',
        description: 'Robust lending lifecycle with strict compliance checks.',
        features: [
          'Loan application appraisal and guarantor eligibility checks',
          'EMI and reducing balance interest engines',
          'Overdue loan penal interest calculation and automated notices',
          'Loan Against Deposit (FD / RD lien assignment)'
        ]
      },
      {
        name: 'Financial Ledger & Cooperative Audits',
        description: 'Error-free financial accounting and regulatory returns.',
        features: [
          'Automated daily Cash Book, Transfer Book, and Day Book closing',
          'Profit & Loss Account and Balance Sheet as per Cooperative Societies Act',
          'NPA Asset Classification and provisioning statements',
          'Interest accrued but not due automated adjustments'
        ]
      }
    ],
    workflow: [
      {
        stepNumber: 1,
        title: 'Member Onboarding & KYC',
        description: 'Record member details, verify KYC documents, allot initial share capital, and issue share certificates.',
        roleOrModule: 'Membership Desk'
      },
      {
        stepNumber: 2,
        title: 'Deposit Account Opening & Collection',
        description: 'Open Savings, FD, RD, or Daily Deposit accounts; issue passbooks and assign daily collection agents.',
        roleOrModule: 'Deposit Operations'
      },
      {
        stepNumber: 3,
        title: 'Loan Appraisal & Sanction',
        description: 'Review loan request against member share ratio, check guarantor eligibility, and disburse sanctioned funds.',
        roleOrModule: 'Credit Committee'
      },
      {
        stepNumber: 4,
        title: 'Daily Cash Scroll & Repayment',
        description: 'Tally counter cash deposits, agent daily collections, and loan installments against the daily cash scroll.',
        roleOrModule: 'Cashier & Counter'
      },
      {
        stepNumber: 5,
        title: 'Day-End Closing & Audit Trail',
        description: 'Execute automated day-end batch, compute interest accruals, lock daily ledger, and review trial balance.',
        roleOrModule: 'Branch Manager / Accountant'
      }
    ],
    benefits: [
      {
        metric: '100% Accuracy',
        title: 'Interest & Dividend Calculations',
        description: 'Eliminate manual arithmetic errors across compound interest, penalties, and member dividend distributions.'
      },
      {
        metric: 'Instant',
        title: 'Daily Collection Tally',
        description: 'Reconcile agent daily collections in minutes rather than spending hours cross-referencing physical passbooks.'
      },
      {
        metric: 'Automated',
        title: 'Cooperative Audit Reports',
        description: 'Generate statutory cooperative society balance sheets, NPA reports, and audit statements on demand.'
      },
      {
        metric: 'Robust',
        title: 'Guarantor Risk Control',
        description: 'System-enforced rules prevent members from over-guaranteeing multiple active loans simultaneously.'
      }
    ],
    integrationsVerified: [
      'Thermal & Dot-Matrix Passbook Printers',
      'SMS Alert Gateways for Member Transactions',
      'Excel Import / Export Utility'
    ],
    implementationTimeline: 'Standard credit society setup: 2 to 4 weeks with historical ledger balance migration.',
    faqs: [
      {
        question: 'Can Sarita BankWare handle daily pigmy collection agents?',
        answer: 'Yes. Daily collection agents can be managed with individual collection ledgers, automated commission percentages, and seamless daily cash handover reconciliation.'
      },
      {
        question: 'Does the software support Gujarati or regional languages for passbook printing?',
        answer: 'Yes. The system supports customized printing formats and regional font outputs for member passbooks, receipts, and notices where required.'
      },
      {
        question: 'How are NPA assets classified under cooperative society guidelines?',
        answer: 'Sarita BankWare features automated NPA classification parameters that categorize overdue loans according to cooperative banking norms (Substandard, Doubtful, Loss) with required provisioning.'
      }
    ],
    isVerifiedContent: true
  },

  {
    id: 'retail',
    name: 'Sarita Retail',
    slug: 'retail',
    badge: 'Retail & Multi-Store Management System',
    heroHeadline: 'Modern POS Billing, Inventory Control & Multi-Store Retail Operations',
    heroSubheadline: 'Accelerate checkout counter speed, track batch-wise stock levels, manage purchase orders, and get real-time sales visibility across single or multi-outlet retail enterprises.',
    targetAudience: [
      'Supermarkets & Grocery Retailers',
      'Apparel & Footwear Stores',
      'Hardware, Electrical & Building Material Outlets',
      'Electronics & Home Appliance Showrooms',
      'Multi-Branch Retail Chains'
    ],
    businessProblems: [
      'Long queues at checkout counters during peak store shopping hours',
      'Stock pilferage, discrepancies, and unmonitored shrinkage',
      'Difficulty in tracking batch numbers, expiry dates, and barcode labels',
      'Manual purchase ordering resulting in stockouts or dead inventory',
      'Lack of unified consolidated sales reporting across multi-counter or multi-branch stores'
    ],
    shortDescription: 'Intuitive retail billing, barcode POS, stock valuation, vendor management, and multi-counter sales tracking system.',
    fullDescription: 'Sarita Retail is an easy-to-use business management software tailored for retail merchants, distributors, and multi-counter stores. Engineered for high-speed counter operations, it combines lightning-fast barcode scanning, touch-friendly POS checkout, automated stock valuation, customer loyalty records, and GST-compliant invoicing.',
    keyFeatures: [
      {
        title: 'High-Speed Barcode POS Billing',
        description: 'Supports shortcut keyboard keys, touch monitors, barcode scanners, and fast receipt printing in under 5 seconds.',
        iconName: 'ShoppingCart'
      },
      {
        title: 'Inventory & Stock Valuation (FIFO/Weighted)',
        description: 'Real-time inventory levels, re-order level alerts, stock transfers between godown and retail racks, and valuation reports.',
        iconName: 'Boxes'
      },
      {
        title: 'Batch & Expiry Date Management',
        description: 'Automated warnings for near-expiry products, batch-wise rate variations, and FIFO dispatch control.',
        iconName: 'Clock'
      },
      {
        title: 'Purchase & Vendor Management',
        description: 'Purchase orders, Goods Receipt Notes (GRN), purchase returns, and supplier payment aging ledgers.',
        iconName: 'Truck'
      },
      {
        title: 'Multi-Payment & Split Tender',
        description: 'Accept Cash, UPI QR code, Credit/Debit Cards, Gift Vouchers, and credit ledger in a single transaction.',
        iconName: 'Wallet'
      },
      {
        title: 'GST Billing & Compliance Invoicing',
        description: 'Automated HSN code mapping, CGST/SGST/IGST tax splits, E-way bill data preparation, and GSTR summaries.',
        iconName: 'FileSpreadsheet'
      },
      {
        title: 'Customer Loyalty & Khata / Credit Book',
        description: 'Customer purchase history, loyalty reward points, store credit memos, and credit customer outstanding recovery.',
        iconName: 'HeartHandshake'
      },
      {
        title: 'Real-Time Sales & Profitability MIS',
        description: 'Hourly sales trends, top-selling SKUs, margin analysis by brand/category, and cashier shift cash settlement.',
        iconName: 'BarChart'
      }
    ],
    featureCategories: [
      {
        name: 'Counter Billing & Checkout',
        description: 'Deliver rapid, pleasant checkout experiences for walk-in shoppers.',
        features: [
          'Barcode scanning with auto-line addition',
          'Hold bill and resume feature for pending customers',
          'Item discounts, bill-level promotional schemes, and coupons',
          'Support for thermal printers (2-inch, 3-inch, and laser A4/A5)'
        ]
      },
      {
        name: 'Inventory & Warehousing',
        description: 'Tight control over merchandise movements and stock shrinkage.',
        features: [
          'Multi-location godown and sales floor stock transfers',
          'Physical stock taking and reconciliation variance reports',
          'Automated reorder triggers based on average sales velocity',
          'Custom barcode label printing utility'
        ]
      },
      {
        name: 'Procurement & Vendor Accounts',
        description: 'Efficient supplier workflows and payable controls.',
        features: [
          'Purchase Order (PO) creation with vendor price history',
          'GRN verification with invoice rate variance detection',
          'Debit notes and return to vendor (RTV) management',
          'Comprehensive vendor payment aging statements'
        ]
      },
      {
        name: 'Retail Management Insights',
        description: 'Data-driven merchandising decisions and cashier accountability.',
        features: [
          'Day-end cashier shift reconciliation and cash drawer lock',
          'Slow-moving and dead-stock identification',
          'Category-wise and supplier-wise margin analysis',
          'GST sales return filing summaries (GSTR-1 format)'
        ]
      }
    ],
    workflow: [
      {
        stepNumber: 1,
        title: 'Item Catalog & Barcoding',
        description: 'Import or catalog merchandise with HSN codes, tax slabs, batch numbers, MRP, and print barcode stickers.',
        roleOrModule: 'Inventory Admin'
      },
      {
        stepNumber: 2,
        title: 'Vendor Procurement & GRN',
        description: 'Receive goods from suppliers, verify inward quantities against Purchase Order, and update stock ledger.',
        roleOrModule: 'Purchase / Warehouse'
      },
      {
        stepNumber: 3,
        title: 'Express Counter Billing',
        description: 'Scan barcodes at POS desk, apply promotional discounts, collect payment via cash/UPI/card, and issue printed bill.',
        roleOrModule: 'Cashier / POS Counter'
      },
      {
        stepNumber: 4,
        title: 'Shift Reconciliation',
        description: 'Reconcile collected cash, UPI slips, and card receipts at end of shift with zero discrepancy.',
        roleOrModule: 'Floor Supervisor'
      },
      {
        stepNumber: 5,
        title: 'Stock Replenishment & Reorder',
        description: 'Review low-stock alerts and generate automated purchase orders to ensure zero out-of-stock items.',
        roleOrModule: 'Store Manager'
      }
    ],
    benefits: [
      {
        metric: '< 5 Seconds',
        title: 'Billing Speed Per Item',
        description: 'Rapid barcode lookups and responsive shortcut keys prevent checkout queue buildups.'
      },
      {
        metric: 'Zero Leakage',
        title: 'Stock Shrinkage Control',
        description: 'Rigorous batch tracking and variance reporting protect retail margins against pilferage.'
      },
      {
        metric: '100% Compliant',
        title: 'GST-Ready Invoicing',
        description: 'Automatic tax rates, HSN tagging, and instant monthly tax filing preparation.'
      },
      {
        metric: '360° Visibility',
        title: 'Cashier & Margin Accountability',
        description: 'Shift-wise drawer counts and detailed margin analytics provide total store control.'
      }
    ],
    integrationsVerified: [
      'Standard USB / Bluetooth Barcode Scanners',
      'ESC/POS Thermal Receipt Printers',
      'Electronic Cash Drawers & Weighing Scales'
    ],
    implementationTimeline: 'Fast store setup: 1 to 2 weeks including item master data import.',
    faqs: [
      {
        question: 'Can Sarita Retail operate without an active internet connection?',
        answer: 'Yes. The POS counter billing operates on local store machines, ensuring uninterrupted sales even if internet connectivity drops temporarily.'
      },
      {
        question: 'Does the software support electronic weighing scale integration for loose grocery items?',
        answer: 'Yes. Sarita Retail interfaces with standard electronic weighing scales, automatically transferring weights to the billing screen.'
      },
      {
        question: 'Can we manage multiple cashier counters with separate cash drawers?',
        answer: 'Yes. The software supports multiple billing counters simultaneously with individual cashier shift logins and separate cash drawer audit counts.'
      }
    ],
    isVerifiedContent: false,
    contentReviewNotice: 'Demonstration Content — Sarita Retail features shown represent typical retail operations and are marked for client verification with Sarita Infotech product leads.'
  }
];
