import { PartnerLead, PartnerOpportunity, PartnerResource } from '../types';

export const INITIAL_LEADS: PartnerLead[] = [
  {
    id: 'PL-1042',
    prospectName: 'Dr. Sanjay Mehta (Medical Director)',
    organization: 'Lifeline Surgical Hospital',
    email: 'sanjay.mehta@lifelinesurgical.example.in',
    phone: '+91 98251 99887',
    productInterest: 'Sarita HealthCare',
    region: 'Ahmedabad, Gujarat',
    expectedTimeline: '1-3 months',
    notes: 'Planning to replace legacy desktop billing with a 75-bed full HMIS including OT scheduling and LIS interfacing.',
    status: 'Proposal',
    createdAt: '2026-10-18',
    updatedAt: '2026-10-21',
    estimatedValue: '₹4,80,000'
  },
  {
    id: 'PL-1043',
    prospectName: 'Kunal Singhania (Head of Exports)',
    organization: 'Singhania Weaving & Prints',
    email: 'kunal@singhaniafabrics.example.com',
    phone: '+91 97277 33445',
    productInterest: 'Sarita Nimble',
    region: 'Surat, Gujarat',
    expectedTimeline: 'Immediate (< 1 month)',
    notes: 'Requires Advance Authorization license tracking and automated packing list generation for 60 containers/month.',
    status: 'Qualified',
    createdAt: '2026-10-19',
    updatedAt: '2026-10-20',
    estimatedValue: '₹2,50,000'
  },
  {
    id: 'PL-1044',
    prospectName: 'Hasmukhbhai Shah (Chairman)',
    organization: 'Navjeevan Urban Credit Co-Op Society',
    email: 'chairman@navjeevancredit.example.in',
    phone: '+91 94280 66554',
    productInterest: 'Sarita BankWare',
    region: 'Vadodara, Gujarat',
    expectedTimeline: '3-6 months',
    notes: 'Society opening 2 new branches. Looking for core software with daily collection agent mobile sync and cooperative audit returns.',
    status: 'Under Review',
    createdAt: '2026-10-21',
    updatedAt: '2026-10-22',
    estimatedValue: '₹3,75,000'
  },
  {
    id: 'PL-1045',
    prospectName: 'Gaurav Agarwal (Proprietor)',
    organization: 'Agarwal Super Mart (3 Outlets)',
    email: 'gaurav@agarwalmart.example.in',
    phone: '+91 98290 11223',
    productInterest: 'Sarita Retail',
    region: 'Indore, MP',
    expectedTimeline: '1-3 months',
    notes: 'Wants multi-outlet inventory replenishment, touch POS billing, and GST e-invoicing.',
    status: 'New',
    createdAt: '2026-10-22',
    updatedAt: '2026-10-22',
    estimatedValue: '₹1,90,000'
  },
  {
    id: 'PL-1040',
    prospectName: 'Dr. Ananya Roy',
    organization: 'Surat Eye & Laser Institute',
    email: 'info@surateyeinstitute.example.in',
    phone: '+91 98981 44556',
    productInterest: 'Sarita HealthCare',
    region: 'Surat, Gujarat',
    expectedTimeline: 'Immediate (< 1 month)',
    notes: 'Completed live product demonstration and customized cataract surgery package billing flow. Commercial sign-off completed.',
    status: 'Won',
    createdAt: '2026-09-28',
    updatedAt: '2026-10-15',
    estimatedValue: '₹3,20,000'
  }
];

export const INITIAL_OPPORTUNITIES: PartnerOpportunity[] = [
  {
    id: 'OPP-301',
    title: 'Lifeline Surgical Hospital - 75 Bed HMIS Deployment',
    clientName: 'Lifeline Surgical Hospital',
    product: 'Sarita HealthCare',
    dealSize: '₹4,80,000',
    stage: 'Final Negotiation',
    probability: 80,
    expectedClose: '2026-11-15'
  },
  {
    id: 'OPP-302',
    title: 'Singhania Fabrics - EXIM Single Entry & License Engine',
    clientName: 'Singhania Weaving & Prints',
    product: 'Sarita Nimble',
    dealSize: '₹2,50,000',
    stage: 'Commercial Evaluation',
    probability: 65,
    expectedClose: '2026-11-05'
  },
  {
    id: 'OPP-303',
    title: 'Navjeevan Credit Society - Multi-Branch Core Banking',
    clientName: 'Navjeevan Urban Credit Co-Op Society',
    product: 'Sarita BankWare',
    dealSize: '₹3,75,000',
    stage: 'Demo Completed',
    probability: 40,
    expectedClose: '2026-12-10'
  },
  {
    id: 'OPP-304',
    title: 'Surat Eye Institute - EMR & Ophthalmic Package System',
    clientName: 'Surat Eye & Laser Institute',
    product: 'Sarita HealthCare',
    dealSize: '₹3,20,000',
    stage: 'Closed Won',
    probability: 100,
    expectedClose: '2026-10-15'
  }
];

export const PARTNER_RESOURCES: PartnerResource[] = [
  {
    id: 'res-1',
    title: 'Sarita HealthCare - Enterprise HMIS Solution Overview & Architecture',
    type: 'Brochure',
    size: '3.4 MB',
    product: 'Sarita HealthCare',
    lastUpdated: 'October 2026',
    format: 'PDF',
    isAvailableInDemo: true
  },
  {
    id: 'res-2',
    title: 'Sarita HealthCare - ABDM & NHCX Architectural Readiness Brief',
    type: 'Technical Specs',
    size: '1.8 MB',
    product: 'Sarita HealthCare',
    lastUpdated: 'October 2026',
    format: 'PDF',
    isAvailableInDemo: true
  },
  {
    id: 'res-3',
    title: 'Sarita Nimble - Export Documentation & Duty Scheme Automation Deck',
    type: 'Sales Deck',
    size: '4.2 MB',
    product: 'Sarita Nimble',
    lastUpdated: 'September 2026',
    format: 'PPTX',
    isAvailableInDemo: true
  },
  {
    id: 'res-4',
    title: 'Sarita BankWare - Cooperative Society Core Software Feature Matrix',
    type: 'Technical Specs',
    size: '2.1 MB',
    product: 'Sarita BankWare',
    lastUpdated: 'August 2026',
    format: 'PDF',
    isAvailableInDemo: true
  },
  {
    id: 'res-5',
    title: 'Sarita Retail - High-Speed POS & Multi-Store Inventory Brochure',
    type: 'Brochure',
    size: '2.8 MB',
    product: 'Sarita Retail',
    lastUpdated: 'October 2026',
    format: 'PDF',
    isAvailableInDemo: true
  },
  {
    id: 'res-6',
    title: 'Sarita Infotech Partner Program - Enablement Guide & Commission Terms',
    type: 'Training Manual',
    size: '2.2 MB',
    product: 'All Products',
    lastUpdated: 'October 2026',
    format: 'PDF',
    isAvailableInDemo: true
  }
];

export const CURRENT_PARTNER_PROFILE = {
  companyName: 'Apex Infotech Solutions',
  partnerId: 'PARTNER-IN-2024-089',
  contactPerson: 'Devendra Parekh',
  designation: 'Managing Partner',
  email: 'devendra@apexsolutions.example.in',
  phone: '+91 98255 44332',
  partnerTier: 'Certified Gold Partner',
  assignedTerritory: 'Gujarat & Western Maharashtra',
  partnerSince: 'January 2022',
  channelManager: 'Anand Verma (VP Channel Alliances, Sarita Infotech)',
  managerEmail: 'anand.verma@saritainfotech.com',
  managerPhone: '+91 79900 29373',
  certifiedEngineers: 3,
  ytdCommissionEarned: '₹3,45,000',
  activePipelineValue: '₹14,95,000'
};
