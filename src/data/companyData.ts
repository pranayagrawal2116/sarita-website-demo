import { CONTENT_CONFIG } from './contentConfig';

export const COMPANY_INFO = {
  ...CONTENT_CONFIG.company,
  vision: 'To build reliable, deeply functional enterprise software that simplifies business complexities and elevates customer operations.',
  mission: 'As an enterprise, we exist to aspire and enable organizations in fulfilling their goals, leaving them with greater power, effectiveness, excellence, self-confidence, and peace of mind.',
  coreValues: [
    {
      title: 'Practical Innovation',
      description: 'We develop software tailored directly to real business operations rather than theoretical architectures.'
    },
    {
      title: 'Customer Commitment',
      description: 'Long-term partnerships built over two decades of responsive maintenance and tailored customizations.'
    },
    {
      title: 'Domain Depth',
      description: 'Specialized functional understanding across hospitals, international trade, cooperative credit, and retail.'
    },
    {
      title: 'Operational Transparency',
      description: 'Clear deliverables, honest timelines, and dedicated on-site or remote implementation support.'
    }
  ],
  stats: [
    { value: '23+', label: 'Years of Experience', note: 'Mastering customized business applications' },
    { value: '200+', label: 'Enterprise Implementations', note: 'Across India & international trade partners' },
    { value: '4', label: 'Flagship Software Suites', note: 'Healthcare, EXIM, Banking, Retail' },
    { value: '99.4%', label: 'Support SLA Adherence', note: 'Demonstration service benchmark' }
  ],
  milestones: [
    {
      year: '2000',
      title: 'Foundation of Sarita Infotech',
      description: 'Inception in Surat, Gujarat, delivering custom business application software.'
    },
    {
      year: '2005',
      title: 'Launch of Sarita Nimble',
      description: 'Introduced specialised export/import documentation and incentive management system.'
    },
    {
      year: '2011',
      title: 'Sarita HealthCare Expansion',
      description: 'Rolled out comprehensive HMIS solutions for multispeciality and eye hospitals across Western India.'
    },
    {
      year: '2017',
      title: 'Sarita BankWare Modernization',
      description: 'Advanced banking and credit society modules with digitized daily collection & loan processing.'
    },
    {
      year: '2024+',
      title: 'Digital Health Interoperability & Cloud Portals',
      description: 'Architecting ABDM milestone capabilities, NHCX claim frameworks, and cloud partner management portals.'
    }
  ]
};
