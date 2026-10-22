import { DemoAppointment } from '../types';

export const INITIAL_DEMO_APPOINTMENTS: DemoAppointment[] = [
  {
    id: 'DMR-2026-0041',
    name: 'Dr. Sanjay Mehta',
    organization: 'Lifeline Surgical Hospital',
    businessEmail: 'sanjay.mehta@lifelinesurgical.example.in',
    phone: '+91 98251 99887',
    productInterest: 'Sarita HealthCare',
    organizationSize: '50-200+ users (Hospital / Enterprise)',
    preferredDate: '2026-10-25',
    preferredTimeSlot: '11:30 AM - 12:30 PM IST',
    timeZone: 'Asia/Kolkata (IST)',
    message: 'We are expanding from 60 beds to 140 beds. Need to review OT scheduling, LIS integration, and ABDM interoperability roadmap.',
    status: 'Confirmed',
    assignedSalesRep: 'Anand Verma (Lead Healthcare Consultant)',
    meetingLink: 'https://meet.saritainfotech.com/demo/dmr-2026-0041',
    internalNotes: [
      {
        id: 'note-1',
        author: 'Anand Verma',
        note: 'Hospital has an existing legacy FoxPro system. Wants zero downtime migration for patient histories.',
        timestamp: '2026-10-22 11:30 AM'
      }
    ],
    createdAt: '2026-10-21 02:15 PM',
    updatedAt: '2026-10-22 11:30 AM'
  },
  {
    id: 'DMR-2026-0042',
    name: 'Kunal Singhania',
    organization: 'Singhania Weaving & Prints',
    businessEmail: 'kunal@singhaniafabrics.example.com',
    phone: '+91 97277 33445',
    productInterest: 'Sarita Nimble',
    organizationSize: '11-50 users (Medium Facility)',
    preferredDate: '2026-10-26',
    preferredTimeSlot: '02:30 PM - 03:30 PM IST',
    timeZone: 'Asia/Kolkata (IST)',
    message: 'Exporting rayon and synthetic fabrics to Dubai and Europe. Need automated RoDTEP calculations and DGFT Advance Authorisation tracking.',
    status: 'Awaiting Confirmation',
    assignedSalesRep: 'Sunil Varma (EXIM Solutions)',
    internalNotes: [
      {
        id: 'note-2',
        author: 'Sunil Varma',
        note: 'Lead originated through Apex Infotech channel partner registration. Territory deal locked.',
        timestamp: '2026-10-22 04:00 PM'
      }
    ],
    createdAt: '2026-10-22 03:45 PM',
    updatedAt: '2026-10-22 03:45 PM'
  },
  {
    id: 'DMR-2026-0043',
    name: 'Hasmukhbhai Shah',
    organization: 'Navjeevan Urban Credit Co-Op Society',
    businessEmail: 'chairman@navjeevancredit.example.in',
    phone: '+91 94280 66554',
    productInterest: 'Sarita BankWare',
    organizationSize: '11-50 users (Medium Facility)',
    preferredDate: '2026-10-27',
    preferredTimeSlot: '10:00 AM - 11:00 AM IST',
    timeZone: 'Asia/Kolkata (IST)',
    message: 'Managing 12 daily deposit collection agents and 4,500 active members. Looking for real-time mobile collection app integration.',
    status: 'Confirmed',
    assignedSalesRep: 'Pooja Mehta (Banking Solutions Specialist)',
    meetingLink: 'https://meet.saritainfotech.com/demo/dmr-2026-0043',
    internalNotes: [
      {
        id: 'note-3',
        author: 'Pooja Mehta',
        note: 'Requested audit module preview for Gujarat Cooperative Societies Act compliance.',
        timestamp: '2026-10-22 01:20 PM'
      }
    ],
    createdAt: '2026-10-21 09:10 AM',
    updatedAt: '2026-10-22 01:20 PM'
  },
  {
    id: 'DMR-2026-0044',
    name: 'Gaurav Agarwal',
    organization: 'Agarwal Super Mart (3 Outlets)',
    businessEmail: 'gaurav@agarwalmart.example.in',
    phone: '+91 98290 11223',
    productInterest: 'Sarita Retail',
    organizationSize: '1-10 users (Single Location)',
    preferredDate: '2026-10-28',
    preferredTimeSlot: '04:00 PM - 05:00 PM IST',
    timeZone: 'Asia/Kolkata (IST)',
    message: 'Need high-speed barcode checkout and centralized batch inventory across 3 supermarket outlets in Indore.',
    status: 'New Request',
    assignedSalesRep: 'Unassigned (Sales Queue)',
    internalNotes: [],
    createdAt: '2026-10-22 05:30 PM',
    updatedAt: '2026-10-22 05:30 PM'
  },
  {
    id: 'DMR-2026-0040',
    name: 'Dr. Ananya Roy',
    organization: 'Surat Eye & Laser Institute',
    businessEmail: 'info@surateyeinstitute.example.in',
    phone: '+91 98981 44556',
    productInterest: 'Sarita HealthCare',
    organizationSize: '11-50 users (Medium Facility)',
    preferredDate: '2026-10-20',
    preferredTimeSlot: '11:00 AM - 12:00 PM IST',
    timeZone: 'Asia/Kolkata (IST)',
    message: 'Ophthalmology day-care workflows and optical shop inventory.',
    status: 'Completed',
    assignedSalesRep: 'Anand Verma (Lead Healthcare Consultant)',
    meetingLink: 'https://meet.saritainfotech.com/demo/dmr-2026-0040',
    internalNotes: [
      {
        id: 'note-4',
        author: 'Anand Verma',
        note: 'Demo conducted successfully. Commercial proposal submitted for 35 concurrent user licenses.',
        timestamp: '2026-10-20 01:00 PM'
      }
    ],
    outcomeNotes: 'Client satisfied with E-Prescription and Optometry exam templates. Proposal ₹3,20,000 sent.',
    createdAt: '2026-10-18 10:00 AM',
    updatedAt: '2026-10-20 01:00 PM'
  }
];

export const AVAILABLE_TIME_SLOTS = [
  '10:00 AM - 11:00 AM IST',
  '11:30 AM - 12:30 PM IST',
  '02:30 PM - 03:30 PM IST',
  '04:00 PM - 05:00 PM IST',
  '05:30 PM - 06:30 PM IST'
];
