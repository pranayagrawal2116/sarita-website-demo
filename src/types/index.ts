export type ProductId = 'healthcare' | 'nimble' | 'bankware' | 'retail';

export interface ProductFeature {
  title: string;
  description: string;
  iconName?: string;
  isVerified?: boolean;
}

export interface FeatureCategory {
  name: string;
  description: string;
  features: string[];
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  description: string;
  roleOrModule: string;
}

export interface BusinessBenefit {
  metric?: string;
  title: string;
  description: string;
}

export interface Product {
  id: ProductId;
  name: string;
  slug: string;
  badge: string;
  heroHeadline: string;
  heroSubheadline: string;
  targetAudience: string[];
  businessProblems: string[];
  shortDescription: string;
  fullDescription: string;
  keyFeatures: ProductFeature[];
  featureCategories: FeatureCategory[];
  workflow: WorkflowStep[];
  benefits: BusinessBenefit[];
  integrationsVerified: string[];
  implementationTimeline: string;
  faqs: { question: string; answer: string }[];
  isVerifiedContent: boolean;
  contentReviewNotice?: string;
  // ABDM / NHCX fields (specifically for healthcare)
  abdmStatusConfig?: {
    label: string;
    description: string;
    status: 'Status to Be Confirmed' | 'In Roadmap' | 'Pilot Tested' | 'Production Ready';
    verifiedWorkflows: string[];
    disclaimer: string;
  };
  nhcxStatusConfig?: {
    label: string;
    description: string;
    status: 'Status to Be Confirmed' | 'In Roadmap' | 'Pilot Tested' | 'Production Ready';
    intendedWorkflows: string[];
    disclaimer: string;
  };
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  capabilities: string[];
  deliverables: string[];
  engagementModels: string[];
  processSteps: { title: string; description: string }[];
}

export interface Industry {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  challenges: string[];
  solutions: string[];
  relevantProducts: { id: ProductId; name: string; url: string }[];
  highlights: string[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientType: string;
  industry: string;
  location: string;
  challenge: string;
  solution: string;
  implementation: string;
  outcomes: string[];
  productUsed: string;
  isDemonstrationOnly: boolean;
}

/* Support Portal Types */
export type TicketStatus = 'Open' | 'Assigned' | 'In Progress' | 'Waiting for Customer' | 'Resolved' | 'Closed';
export type TicketPriority = 'Low' | 'Normal' | 'High' | 'Critical';
export type TicketCategory =
  | 'Technical Issue'
  | 'Product Usage'
  | 'Installation'
  | 'Configuration'
  | 'Data or Reporting'
  | 'Feature Request'
  | 'Other';

export interface TicketMessage {
  id: string;
  sender: string;
  senderType: 'customer' | 'support_agent' | 'system';
  message: string;
  timestamp: string;
  attachmentName?: string;
}

export interface TicketInternalNote {
  id: string;
  author: string;
  note: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string; // e.g., SIT-2489 or SRT-2026-0001
  customerId?: string;
  customerName: string;
  organization: string;
  organizationId: string;
  email: string;
  phone: string;
  product: string;
  siteReference: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  subject: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  assignedAgent: string;
  timeline: TicketMessage[];
  internalNotes: TicketInternalNote[]; // Strictly hidden from customer views
  resolutionNotes?: string;
  attachments: string[];
}

/* Customer Portal Types */
export type CustomerAccountStatus = 'Active' | 'Pending Approval' | 'Suspended';

export interface CustomerAccount {
  id: string; // e.g. CUST-2026-001
  name: string;
  email: string;
  phone: string;
  organization: string;
  organizationId: string;
  accountReference: string;
  product: string;
  status: CustomerAccountStatus;
  createdAt: string;
  lastLogin?: string;
}

/* Admin Portal Types */
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Administrator' | 'Support Lead' | 'Sales Manager';
  department: string;
}

/* Demo Appointment Scheduling Types */
export type DemoBookingStatus =
  | 'New Request'
  | 'Awaiting Confirmation'
  | 'Confirmed'
  | 'Rescheduled'
  | 'Completed'
  | 'Cancelled';

export interface DemoInternalNote {
  id: string;
  author: string;
  note: string;
  timestamp: string;
}

export interface DemoAppointment {
  id: string; // e.g. DMR-2026-0042
  name: string;
  organization: string;
  businessEmail: string;
  phone: string;
  productInterest: string;
  organizationSize: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTimeSlot: string; // e.g. "11:00 AM - 12:00 PM IST"
  timeZone: string; // e.g. "Asia/Kolkata (IST)"
  message: string;
  status: DemoBookingStatus;
  assignedSalesRep: string;
  meetingLink?: string;
  internalNotes: DemoInternalNote[];
  outcomeNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  product: string;
  summary: string;
  content: string;
  steps?: string[];
  relatedArticleIds?: string[];
}

/* Partner Portal Types */
export type LeadStatus = 'New' | 'Under Review' | 'Qualified' | 'Proposal' | 'Won' | 'Lost';

export interface PartnerLead {
  id: string; // e.g. PL-1042
  prospectName: string;
  organization: string;
  email: string;
  phone: string;
  productInterest: string;
  region: string;
  expectedTimeline: string;
  notes: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
  estimatedValue?: string;
}

export interface PartnerOpportunity {
  id: string;
  title: string;
  clientName: string;
  product: string;
  dealSize: string;
  stage: 'Discovery' | 'Demo Completed' | 'Commercial Evaluation' | 'Final Negotiation' | 'Closed Won';
  probability: number;
  expectedClose: string;
}

export interface PartnerResource {
  id: string;
  title: string;
  type: 'Brochure' | 'Sales Deck' | 'Technical Specs' | 'Training Manual' | 'Case Study';
  size: string;
  product: string;
  lastUpdated: string;
  format: 'PDF' | 'PPTX' | 'DOCX';
  isAvailableInDemo: boolean;
}

export interface DemoRequestPayload {
  name: string;
  organization: string;
  businessEmail: string;
  phone: string;
  industry?: string;
  productInterest: ProductId | 'all' | string;
  organizationSize?: string;
  preferredDate?: string; // YYYY-MM-DD
  preferredTimeSlot?: string; // e.g. "11:00 AM - 12:00 PM IST"
  timeZone?: string; // e.g. "Asia/Kolkata (IST)"
  message?: string;
}
