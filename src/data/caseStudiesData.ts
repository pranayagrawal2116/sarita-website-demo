import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'multispeciality-hospital-navsari',
    slug: 'multispeciality-hospital-navsari',
    title: 'Transforming Patient Care & Discharge Velocity at a 150-Bed Multispeciality Hospital',
    clientType: 'Multispeciality Hospital (Navsari)',
    industry: 'Healthcare & Hospitals',
    location: 'Navsari, Gujarat, India',
    productUsed: 'Sarita HealthCare',
    challenge: 'The hospital faced severe bottlenecks at the discharge billing desk, where consolidating manual paper vouchers from the pharmacy, diagnostic labs, and nursing wards took up to 3 to 4 hours per patient. Additionally, lack of real-time bed visibility resulted in delayed emergency admissions.',
    solution: 'Deployment of Sarita HealthCare HMIS across all departments. Front-desk UHID issuance connected directly to OPD clinics, nursing stations, laboratory analyzer interfaces, and the central billing ledger. Real-time ward matrices gave floor supervisors instant bed occupancy status.',
    implementation: 'Phased 6-week rollout including bedside nursing station training, legacy patient record import, and bidirectional interfacing with hematology laboratory analyzers.',
    outcomes: [
      'Discharge billing turnaround reduced from 3.5 hours to under 45 minutes',
      'Zero unbilled clinical consumables through integrated pharmacy dispensing',
      'Instant departmental visibility on bed turnover and occupancy rates',
      'Standardized digital discharge summaries accelerating insurance approvals'
    ],
    isDemonstrationOnly: true
  },
  {
    id: 'export-house-trade-documentation',
    slug: 'export-house-trade-documentation',
    title: 'Automating Export Documentation & Duty Drawback Realization for a Leading Textile Exporter',
    clientType: 'Textile & Synthetic Fabric Exporter',
    industry: 'International Trade & EXIM',
    location: 'Surat, Gujarat, India',
    productUsed: 'Sarita Nimble',
    challenge: 'Managing over 120 export consignments per month to Europe and the Middle East using manual spreadsheets led to clerical errors in customs invoices, delayed shipping bills, and an estimated 8% of duty drawback incentives going unclaimed due to poor ledger tracking.',
    solution: 'Implementation of Sarita Nimble single-entry documentation engine. Sales orders automatically generate buyer-tailored commercial invoices, multi-pack packing lists, customs declarations, and bank negotiation schedules. Automated ledger tracking monitors Advance License import entitlements against export obligations.',
    implementation: '3-week transition including configuration of company-specific invoice layouts via the built-in Report Designer and historical shipping bill ledger migration.',
    outcomes: [
      'Document preparation time slashed by 70% per shipment',
      'Zero customs clearance rejections caused by clerical weight or HS code discrepancies',
      'Comprehensive realization tracking preventing e-BRC / EDPMS compliance alerts',
      'Automated agent commission calculation on FOB contract values'
    ],
    isDemonstrationOnly: true
  },
  {
    id: 'cooperative-credit-society-banking',
    slug: 'cooperative-credit-society-banking',
    title: 'Modernizing Daily Pigmy Deposit Operations and Core Accounting for an Urban Credit Society',
    clientType: 'Urban Cooperative Credit Society',
    industry: 'Cooperative Banking',
    location: 'South Gujarat, India',
    productUsed: 'Sarita BankWare',
    challenge: 'The society struggled with manual daily piggy collection reconciliations across 15 field agents, leading to frequent ledger disputes and day-end closing delays. Calculating compounding interest on mixed deposit accounts and tracking guarantor limits required tedious manual cross-referencing.',
    solution: 'Rollout of Sarita BankWare core credit society system. Daily deposit agent collections were structured with automated commission ledgers, instant receipt scrolls, and automated guarantor exposure validation for member loan requests.',
    implementation: '4-week parallel run alongside physical ledger books, verifying opening member share balances, fixed deposits, and recurring accounts before final cutover.',
    outcomes: [
      'Agent daily collection reconciliation time reduced from 3 hours to 15 minutes',
      'Strict guarantor limit enforcement prevented multi-loan exposure risks',
      'Automated one-click generation of statutory cooperative audit balance sheets and NPA classifications',
      'Instant Gujarati and English passbook printing for walk-in members'
    ],
    isDemonstrationOnly: true
  },
  {
    id: 'retail-supermarket-pos-inventory',
    slug: 'retail-supermarket-pos-inventory',
    title: 'Accelerating Checkout Speed and Eliminating Stock Shrinkage Across a 4-Counter Supermarket',
    clientType: 'Multi-Department Retail Store',
    industry: 'Retail & Multi-Store',
    location: 'Surat, Gujarat, India',
    productUsed: 'Sarita Retail',
    challenge: 'Long weekend checkout lines caused customer walkouts, while lack of batch-wise expiry monitoring led to write-offs of perishable goods. Cash drawer balances frequently showed variances at the end of cashier shifts.',
    solution: 'Deployment of Sarita Retail on 4 high-speed POS billing counters with barcode scanners, thermal receipt printers, and electronic weighing scale integration. The back-office system tracked real-time stock levels, near-expiry alerts, and automated purchase reorders.',
    implementation: '10-day deployment including item master barcode cataloging, staff cashier training, and GST tax slab configuration.',
    outcomes: [
      'Average checkout time reduced to under 5 seconds per line item',
      'Near-expiry notifications eliminated obsolete stock write-offs by 85%',
      'Cash drawer reconciliation variance reduced to zero with shift-wise audit locks',
      'Seamless GSTR-1 sales summary export for monthly tax filing'
    ],
    isDemonstrationOnly: true
  }
];
