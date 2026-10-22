import { Service } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'custom-software-development',
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    subtitle: 'Tailored enterprise applications engineered specifically for your business logic and workflows',
    description: 'When off-the-shelf software falls short of addressing your unique operational intricacies, Sarita Infotech provides end-to-end bespoke software engineering. With over two decades of domain experience, we design, develop, and deploy scalable desktop, web, and hybrid enterprise software that mirrors your exact processes.',
    iconName: 'Code2',
    capabilities: [
      'Requirements analysis and business process modeling',
      'Database architecture and high-performance transactional design',
      'Desktop, Client-Server, and Web portal application development',
      'Legacy system refactoring, modernization, and cloud migration',
      'Strict quality assurance, regression testing, and security hardening'
    ],
    deliverables: [
      'Comprehensive functional specifications & system architecture documentation',
      'Fully tested, production-ready software executable and database scripts',
      'Role-based security configuration and administrative manuals',
      'Staff onboarding and user training programs',
      'Warranty and continuous post-launch maintenance SLA'
    ],
    engagementModels: [
      'Fixed Scope & Fixed Price Turnkey Projects',
      'Dedicated Extended Engineering Team',
      'Milestone-Based Agile Customization'
    ],
    processSteps: [
      {
        title: '1. Discovery & Process Mapping',
        description: 'Our senior analysts conduct on-site or virtual discovery workshops to document pain points, data flows, and regulatory considerations.'
      },
      {
        title: '2. Solution Architecture & Prototyping',
        description: 'We craft clear schema designs, user journeys, and interactive prototypes for stakeholder alignment before coding begins.'
      },
      {
        title: '3. Agile Development & Sprint Demos',
        description: 'Our development team delivers functional software modules iteratively, providing regular working demos for feedback.'
      },
      {
        title: '4. Rigorous QA & Pilot Deployment',
        description: 'Comprehensive functional, stress, and security testing followed by parallel pilot runs alongside existing operations.'
      },
      {
        title: '5. Production Go-Live & Dedicated Handover',
        description: 'Smooth final rollout, data balance migration, hands-on user training, and immediate on-site or remote cutover support.'
      }
    ]
  },
  {
    id: 'implementation-migration',
    slug: 'implementation-migration',
    title: 'Implementation & Data Migration',
    subtitle: 'Safe, structured software rollout with zero loss of historical records',
    description: 'Successful software adoption depends on smooth implementation. Our experienced implementation engineers ensure that your master data, customer records, inventory balances, and historical ledgers are audited, scrubbed, and migrated safely without operational downtime.',
    iconName: 'DatabaseZap',
    capabilities: [
      'Legacy database extraction (FoxPro, Access, legacy SQL, Excel)',
      'Data cleaning, deduplication, and master data standardization',
      'Hardware and network infrastructure readiness audits',
      'Phased cutover planning and parallel run coordination',
      'Multi-department staff role-based operational training'
    ],
    deliverables: [
      'Verified data migration sign-off audit sheets',
      'Departmental operational standard operating procedures (SOPs)',
      'Hardware and network checklist approvals'
    ],
    engagementModels: [
      'Turnkey Implementation Package',
      'Guided Remote Migration Assistance'
    ],
    processSteps: [
      {
        title: '1. Data Audit & Mapping',
        description: 'Comprehensive audit of legacy data structures and schema mapping to Sarita software entities.'
      },
      {
        title: '2. Trial Migration & Validation',
        description: 'Trial run in staging environment to verify totals, balances, and historical ledger integrity.'
      },
      {
        title: '3. Live Cutover & Verification',
        description: 'Final cutover over a scheduled weekend or maintenance window with immediate verification.'
      }
    ]
  },
  {
    id: 'system-integration',
    slug: 'system-integration',
    title: 'System Integration & API Engineering',
    subtitle: 'Connecting your business software with banks, government portals, and hardware',
    description: 'Modern enterprises operate within connected ecosystems. We bridge Sarita software applications with third-party systems, payment gateways, electronic invoicing platforms, biometric hardware, and specialized diagnostic instruments.',
    iconName: 'Network',
    capabilities: [
      'Laboratory & Diagnostic machine interfacing (LIS / RIS / HL7)',
      'Payment gateways, UPI QR, and POS card terminal integrations',
      'SMS, WhatsApp, and email notification gateway triggers',
      'E-Way bill and GST portal data export pipelines',
      'Biometric fingerprint, barcode scanner, and RFID hardware drivers'
    ],
    deliverables: [
      'API connectors and automated synchronization jobs',
      'Integration testing reports and failover error logs',
      'Maintenance protocols for third-party API changes'
    ],
    engagementModels: [
      'Standalone Integration Engagement',
      'Bundled Implementation Add-on'
    ],
    processSteps: [
      {
        title: '1. API & Protocol Analysis',
        description: 'Evaluation of protocol specifications, baud rates, and security authentication requirements.'
      },
      {
        title: '2. Connector Development',
        description: 'Engineering robust middleware services with local caching and offline retry logic.'
      },
      {
        title: '3. End-to-End Testing',
        description: 'Live payload verification with real instruments and financial gateways.'
      }
    ]
  },
  {
    id: 'support-maintenance',
    slug: 'support-maintenance',
    title: 'Annual Maintenance & Support (AMC)',
    subtitle: 'Dedicated technical desk, regulatory updates, and prompt troubleshooting',
    description: 'Business continuity requires dependable technical support. Sarita Infotech offers structured Annual Maintenance Contracts (AMC) providing rapid response times, statutory software updates, database performance tuning, and continuous assistance.',
    iconName: 'Headphones',
    capabilities: [
      'Dedicated telephonic, remote desktop, and ticketing desk support',
      'Statutory compliance and tax regime updates (e.g. GST rate adjustments)',
      'Periodic database optimization, indexing, and backup verification',
      'New staff refresher training sessions',
      'Emergency holiday and month-end closing support'
    ],
    deliverables: [
      'Defined Service Level Agreement (SLA) response times',
      'Quarterly system health check reports',
      'Regular product service packs and security hotfixes'
    ],
    engagementModels: [
      'Comprehensive Annual Maintenance Contract (AMC)',
      'Pay-per-Incident On-Demand Support'
    ],
    processSteps: [
      {
        title: '1. SLA Onboarding',
        description: 'Assignment of dedicated support account representative and helpdesk credentials.'
      },
      {
        title: '2. Continuous Monitoring & Helpdesk',
        description: 'Immediate ticket triage and resolution via remote desktop tools.'
      },
      {
        title: '3. Proactive Health Audits',
        description: 'Regular checkups on database size, disk space, and backup validation.'
      }
    ]
  }
];
