import { CustomerAccount } from '../types';

export const INITIAL_CUSTOMERS: CustomerAccount[] = [
  {
    id: 'CUST-2024-001',
    name: 'Dr. Ramesh Patel',
    email: 'rpatel@apexmed.example.in',
    phone: '+91 98250 12345',
    organization: 'Apex Multispeciality Hospital',
    organizationId: 'ORG-APEX-001',
    accountReference: 'ACT-APEX-992',
    product: 'Sarita HealthCare',
    status: 'Active',
    createdAt: '2024-03-15',
    lastLogin: '2026-10-22 10:30 AM'
  },
  {
    id: 'CUST-2023-014',
    name: 'Mehul Shah',
    email: 'mshah@aerotexglobal.example.com',
    phone: '+91 98980 54321',
    organization: 'AeroTex Global Exporters',
    organizationId: 'ORG-AEROTEX-002',
    accountReference: 'ACT-AEROTEX-104',
    product: 'Sarita Nimble',
    status: 'Active',
    createdAt: '2023-11-20',
    lastLogin: '2026-10-21 04:15 PM'
  },
  {
    id: 'CUST-2022-009',
    name: 'Pravinbhai Patel',
    email: 'pravin@kabilporecredit.example.in',
    phone: '+91 98241 87654',
    organization: 'Kabilpore Co-Op Credit Society',
    organizationId: 'ORG-KABILPORE-003',
    accountReference: 'ACT-KABILPORE-022',
    product: 'Sarita BankWare',
    status: 'Active',
    createdAt: '2022-08-10',
    lastLogin: '2026-10-20 02:40 PM'
  },
  {
    id: 'CUST-2026-031',
    name: 'Suresh Shah',
    email: 'suresh@citylife.example.in',
    phone: '+91 98250 11992',
    organization: 'CityLife Retail Mart',
    organizationId: 'ORG-CITYLIFE-004',
    accountReference: 'ACT-CITYLIFE-088',
    product: 'Sarita Retail',
    status: 'Pending Approval',
    createdAt: '2026-10-22',
    lastLogin: undefined
  },
  {
    id: 'CUST-2021-002',
    name: 'Kishore Gandhi',
    email: 'kgandhi@suspended.example.in',
    phone: '+91 98252 33445',
    organization: 'Surat Traders Union',
    organizationId: 'ORG-SURAT-005',
    accountReference: 'ACT-SURAT-005',
    product: 'Sarita Nimble',
    status: 'Suspended',
    createdAt: '2021-05-18',
    lastLogin: '2026-08-12 11:00 AM'
  }
];

export const DEFAULT_ADMIN = {
  id: 'ADM-001',
  name: 'Rajesh Vaghela',
  email: 'admin@saritainfotech.com',
  role: 'Super Administrator' as const,
  department: 'Operations & Engineering Management'
};
