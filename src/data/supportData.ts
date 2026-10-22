import { SupportTicket, KnowledgeArticle } from '../types';

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'SIT-2489',
    customerId: 'CUST-2024-001',
    customerName: 'Dr. Ramesh Patel',
    organization: 'Apex Multispeciality Hospital',
    organizationId: 'ORG-APEX-001',
    email: 'rpatel@apexmed.example.in',
    phone: '+91 98250 12345',
    product: 'Sarita HealthCare',
    siteReference: 'APEX-SURAT-SRV01',
    category: 'Technical Issue',
    priority: 'High',
    status: 'In Progress',
    subject: 'Bidirectional analyzer interfacing timeout on Sysmex XN-350',
    description: 'The hematology lab reported that CBC test results from the Sysmex XN-350 analyzer stopped auto-populating into the patient LIS folder since 10:30 AM today. IP addresses and serial ports were checked and appear connected. Manual entry is currently being used as a temporary fallback.',
    createdAt: '2026-10-22 10:45 AM',
    updatedAt: '2026-10-22 02:15 PM',
    assignedAgent: 'Vikram Joshi (Senior Support Engineer)',
    attachments: ['sysmex_interface_log.txt', 'error_screenshot_oct22.png'],
    internalNotes: [
      {
        id: 'inote-1',
        author: 'Vikram Joshi',
        note: 'Customer hospital has AMC Platinum SLA (2-hour response). COM3 baud rate was mismatched after client OS update.',
        timestamp: '2026-10-22 11:00 AM'
      }
    ],
    timeline: [
      {
        id: 'msg-1',
        sender: 'Dr. Ramesh Patel',
        senderType: 'customer',
        message: 'The hematology analyzer auto-sync has stopped functioning. Please inspect the communication service urgently as morning OPD patient samples are piling up.',
        timestamp: '2026-10-22 10:45 AM',
        attachmentName: 'error_screenshot_oct22.png'
      },
      {
        id: 'msg-2',
        sender: 'Vikram Joshi',
        senderType: 'support_agent',
        message: 'Hello Dr. Patel, we have acknowledged your ticket. We observed a COM port timeout in the interface listener log. We have initiated a remote desktop session to restart the Sarita LIS Bridge Service and flush the socket buffer.',
        timestamp: '2026-10-22 11:15 AM'
      },
      {
        id: 'msg-3',
        sender: 'Vikram Joshi',
        senderType: 'support_agent',
        message: 'Update: We restarted the listener and test packets are now receiving ACK response from the instrument. We are currently observing 5 live sample transmissions to ensure stability before resolving this ticket.',
        timestamp: '2026-10-22 02:15 PM'
      }
    ]
  },
  {
    id: 'SIT-2490',
    customerId: 'CUST-2023-014',
    customerName: 'Mehul Shah',
    organization: 'AeroTex Global Exporters',
    organizationId: 'ORG-AEROTEX-002',
    email: 'mshah@aerotexglobal.example.com',
    phone: '+91 98980 54321',
    product: 'Sarita Nimble',
    siteReference: 'AEROTEX-HQ-DB',
    category: 'Product Usage',
    priority: 'Normal',
    status: 'Open',
    subject: 'Query regarding RoDTEP schedule rate revision on textile HS 5407',
    description: 'We need guidance on updating the revised RoDTEP incentive schedule rates notified by DGFT for synthetic fabric exports. We want to ensure that all proforma and custom invoices generated from next Monday reflect the updated percentage automatically.',
    createdAt: '2026-10-21 04:30 PM',
    updatedAt: '2026-10-21 05:00 PM',
    assignedAgent: 'Sunil Varma (EXIM Specialist)',
    attachments: ['dgft_public_notice_rodtep.pdf'],
    internalNotes: [
      {
        id: 'inote-2',
        author: 'Sunil Varma',
        note: 'Verified DGFT notification #32/2026. Master table patch script prepared.',
        timestamp: '2026-10-21 04:50 PM'
      }
    ],
    timeline: [
      {
        id: 'msg-1',
        sender: 'Mehul Shah',
        senderType: 'customer',
        message: 'Could you share the exact step-by-step procedure to update the RoDTEP percentage master table in Sarita Nimble? We have attached the notification for reference.',
        timestamp: '2026-10-21 04:30 PM',
        attachmentName: 'dgft_public_notice_rodtep.pdf'
      },
      {
        id: 'msg-2',
        sender: 'Sunil Varma',
        senderType: 'support_agent',
        message: 'Hello Mehul ji, you can update this directly via Masters > Scheme Management > RoDTEP Master by entering the new rate with effective date. We will schedule a 10-minute remote walkthrough tomorrow morning at 11 AM.',
        timestamp: '2026-10-21 05:00 PM'
      }
    ]
  },
  {
    id: 'SIT-2491',
    customerId: 'CUST-2022-009',
    customerName: 'Pravinbhai Patel',
    organization: 'Kabilpore Co-Op Credit Society Ltd.',
    organizationId: 'ORG-KABILPORE-003',
    email: 'pravin@kabilporecredit.example.in',
    phone: '+91 94261 77889',
    product: 'Sarita BankWare',
    siteReference: 'KABILPORE-MAIN-BR01',
    category: 'Configuration',
    priority: 'High',
    status: 'Waiting for Customer',
    subject: 'Annual General Meeting (AGM) dividend distribution list calculation',
    description: 'Our board has approved a 12% dividend on member share capital for the financial year. We ran the dividend calculation routine, but need verification on how to handle members who resigned midway through the fiscal period.',
    createdAt: '2026-10-20 02:15 PM',
    updatedAt: '2026-10-21 11:20 AM',
    assignedAgent: 'Pooja Mehta (Banking Solutions)',
    attachments: [],
    internalNotes: [
      {
        id: 'inote-3',
        author: 'Pooja Mehta',
        note: 'Customer bylaws section 14(b) usually mandates day-wise pro-rata. Awaiting formal confirmation from Society Secretary.',
        timestamp: '2026-10-21 11:15 AM'
      }
    ],
    timeline: [
      {
        id: 'msg-1',
        sender: 'Pravinbhai Patel',
        senderType: 'customer',
        message: 'Please advise on the configuration flag for pro-rata dividend calculation for members admitted/resigned during the year.',
        timestamp: '2026-10-20 02:15 PM'
      },
      {
        id: 'msg-2',
        sender: 'Pooja Mehta',
        senderType: 'support_agent',
        message: 'Hello Pravin ji, Sarita BankWare provides two methods: (1) Full dividend on active members as of 31st March, or (2) Day-wise pro-rata based on admission/resignation date. Please confirm which method is stipulated in your society bylaws so we can toggle the parameter.',
        timestamp: '2026-10-21 11:20 AM'
      }
    ]
  },
  {
    id: 'SIT-2492',
    customerId: 'CUST-2026-031',
    customerName: 'Suresh Shah',
    organization: 'CityLife Retail Mart',
    organizationId: 'ORG-CITYLIFE-004',
    email: 'suresh@citylife.example.in',
    phone: '+91 98241 33221',
    product: 'Sarita Retail',
    siteReference: 'CITYLIFE-POS-TERMINAL-02',
    category: 'Installation',
    priority: 'Normal',
    status: 'Resolved',
    subject: 'TVS RP-3200 Star thermal receipt printer driver configuration',
    description: 'Added a third billing counter for the upcoming festive rush. We installed the TVS thermal printer but text formatting on the cut receipt is truncating columns.',
    createdAt: '2026-10-19 11:00 AM',
    updatedAt: '2026-10-19 03:30 PM',
    assignedAgent: 'Vikram Joshi (Senior Support Engineer)',
    attachments: ['receipt_sample.jpg'],
    internalNotes: [
      {
        id: 'inote-4',
        author: 'Vikram Joshi',
        note: 'Resolved via ESC/POS 80mm column width configuration. Hardware verified on test receipts.',
        timestamp: '2026-10-19 03:25 PM'
      }
    ],
    resolutionNotes: 'Configured ESC/POS 3-inch 80mm driver settings in Sarita Retail Hardware Manager and tested 3 sample invoices. Printing aligned perfectly.',
    timeline: [
      {
        id: 'msg-1',
        sender: 'Suresh Shah',
        senderType: 'customer',
        message: 'Need help adjusting the paper width from 48-column to 40-column in the POS hardware settings.',
        timestamp: '2026-10-19 11:00 AM'
      },
      {
        id: 'msg-2',
        sender: 'Vikram Joshi',
        senderType: 'support_agent',
        message: 'Remote support completed. Configured ESC/POS 3-inch 80mm driver settings in Sarita Retail Hardware Manager and tested 3 sample invoices. Printing aligned perfectly.',
        timestamp: '2026-10-19 03:30 PM'
      }
    ]
  }
];

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'kb-1',
    slug: 'setup-analyzer-lis-interfacing',
    title: 'How to Configure Bidirectional Laboratory Analyzer Interfacing (LIS)',
    category: 'Sarita HealthCare',
    product: 'Sarita HealthCare',
    readTime: '6 min read',
    summary: 'Step-by-step instructions for connecting laboratory diagnostic instruments via RS-232 serial COM ports or TCP/IP socket listeners.',
    content: `Laboratory machine interfacing eliminates human transcription errors and significantly accelerates diagnostic report turnaround times. Sarita HealthCare LIS Bridge supports bidirectional communication using standard ASTM E1381/E1394 and HL7 v2.x protocols.`,
    steps: [
      'Navigate to Hospital Admin > Diagnostic Setup > Machine Interfacing Master.',
      'Select the analyzer model from the verified driver list (e.g., Sysmex, Beckman Coulter, Roche, Mindray).',
      'Configure the communication channel: For Serial connections specify Baud Rate (typically 9600), Data Bits (8), Parity (None), and Stop Bits (1). For Ethernet analyzers, set the static IP and dedicated listener port.',
      'Map machine test codes to Sarita HealthCare investigation codes in the Parameter Mapping table.',
      'Start the Sarita LIS Bridge Service from Windows Services and review live connection heartbeat logs.'
    ],
    relatedArticleIds: ['kb-2', 'kb-4']
  },
  {
    id: 'kb-2',
    slug: 'discharge-summary-and-billing-reconciliation',
    title: 'Discharge Summary Clearance & Interim Bill Reconciliation Guide',
    category: 'Sarita HealthCare',
    product: 'Sarita HealthCare',
    readTime: '5 min read',
    summary: 'Best practices for accelerating IPD patient discharge clearance while ensuring full reconciliation of medicines, investigations, and advances.',
    content: `A seamless discharge workflow improves bed turnover and patient satisfaction. Sarita HealthCare unifies clinical discharge summaries with financial clearance into a coordinated checklist.`,
    steps: [
      'Consultant Physician records digital discharge note, medication advice, and follow-up date at the Doctor Consultation Desk.',
      'Nursing station triggers "Intimation of Discharge" which locks further routine medication requests from ward stock.',
      'In-house pharmacy reconciles pending returns and finalizes medicines dispensed at the bedside.',
      'Billing counter reviews the consolidated IPD statement, verifying package caps, insurance pre-authorization deductions, and deposit advances.',
      'Collect balance settlement via cash, card, or TPA ledger and print final discharge clearance slip.'
    ],
    relatedArticleIds: ['kb-1']
  },
  {
    id: 'kb-3',
    slug: 'advance-authorization-license-tracking',
    title: 'Managing Advance Authorization Import Quotas and Export Obligations',
    category: 'Sarita Nimble',
    product: 'Sarita Nimble',
    readTime: '7 min read',
    summary: 'How to track duty-free raw material import allocations against finished goods export shipments in Sarita Nimble.',
    content: `Advance Authorization allows duty-free import of inputs physically incorporated into export products. Tracking duty obligation fulfillment is critical to prevent penal interest and DGFT compliance notices.`,
    steps: [
      'Open Masters > Government Schemes > Advance Authorization Master.',
      'Enter the DGFT License Number, Date of Issue, CIF Value in Foreign Currency/INR, and designated export obligation period.',
      'Add items allowed for duty-free import with designated quantity norms (Standard Input Output Norms - SION).',
      'When creating Commercial Invoices in Sarita Nimble, select the applicable Advance License from the dropdown.',
      'The system automatically deducts exported quantities from the license ledger and generates the export obligation fulfillment statement.'
    ],
    relatedArticleIds: ['kb-5']
  },
  {
    id: 'kb-4',
    slug: 'daily-deposit-pigmy-agent-reconciliation',
    title: 'Daily Pigmy Deposit Agent Collection Ledger & Reconciliation',
    category: 'Sarita BankWare',
    product: 'Sarita BankWare',
    readTime: '4 min read',
    summary: 'A standard operating procedure for tallying field collection agent scroll receipts against credit society counter cash.',
    content: `Daily pigmy collection is vital for cooperative credit societies. Sarita BankWare ensures rigorous agent-wise accountability with automated commission calculations.`,
    steps: [
      'Open Operations > Daily Deposit > Agent Collection Handover.',
      'Select the agent code and import the collection file or enter manual scroll receipt numbers.',
      'Verify the total collected amount against physical cash tendered at the cashier counter.',
      'Click "Post to Member Accounts" to credit member daily deposit ledgers simultaneously.',
      'Sarita BankWare computes the agent commission according to configured society percentage rules.'
    ],
    relatedArticleIds: ['kb-2']
  },
  {
    id: 'kb-5',
    slug: 'thermal-receipt-printer-esc-pos-configuration',
    title: 'Configuring ESC/POS Thermal Printers for High-Speed Retail Checkout',
    category: 'Sarita Retail',
    product: 'Sarita Retail',
    readTime: '4 min read',
    summary: 'Adjusting paper width, auto-cutter triggers, and character formatting for thermal billing printers.',
    content: `Fast thermal receipt printing ensures rapid counter operations. Sarita Retail includes built-in ESC/POS commands that work without reliance on slow generic Windows printer drivers.`,
    steps: [
      'Navigate to POS Settings > Hardware Configuration > Receipt Printer.',
      'Choose the interface type: USB Virtual COM, Direct Serial, or Network IP.',
      'Select Paper Width (2-inch 58mm or 3-inch 80mm).',
      'Enable "Auto Cash Drawer Trigger" and "Paper Auto Cut" options if hardware supported.',
      'Print a Test Bill to verify barcode readability and tax breakdown alignment.'
    ],
    relatedArticleIds: ['kb-3']
  }
];
