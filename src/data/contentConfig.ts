/**
 * Central Content Configuration File
 * Easily update public status labels, disclaimers, and review flags without modifying page layouts.
 */

export const CONTENT_CONFIG = {
  company: {
    name: 'Sarita Infotech Pvt. Ltd.',
    shortName: 'Sarita Infotech',
    establishedYear: 2000,
    yearsOfExperience: '23+',
    tagline: 'Software Solutions Built Around Your Business',
    supportPhone: '+91 79900 29373',
    inquiryEmail: 'inquiry@saritainfotech.com',
    supportEmail: 'support@saritainfotech.com',
    headquarters: {
      addressLine1: '127, First Floor, SquareOne Commercial',
      addressLine2: 'Althan Bhimrad Road, Nr. Dhiraj Sons, Althan',
      city: 'Surat',
      state: 'Gujarat',
      postalCode: '395017',
      country: 'India',
      fullAddress: '127, First Floor, SquareOne Commercial, Althan Bhimrad Road, Nr. Dhiraj Sons, Althan, Surat - 395017 (Gujarat), India'
    },
    socialLinks: {
      linkedin: 'https://www.linkedin.com/company/1591018/',
      twitter: 'https://twitter.com/saritainfotech',
      facebook: 'https://www.facebook.com/SaritaInfotechPrivatelimited',
      youtube: 'https://www.youtube.com/@anupagrawal2813',
      whatsapp: 'https://api.whatsapp.com/send?phone=917990029373&text=Hello.%20I%20am%20interested%20in%20Sarita%20Infotech%20software%20solutions.'
    }
  },

  // Central Interoperability Labels & Roadmap Statuses for Sarita HealthCare
  healthcareInteroperability: {
    abdm: {
      statusLabel: 'ABDM Integration — Status to Be Confirmed',
      badgeColor: 'amber',
      notice: 'This prototype references Ayushman Bharat Digital Mission (ABDM) milestone capabilities for architectural demonstration. Production deployment requires formal testing and certification with the National Health Authority (NHA).',
      potentialWorkflows: [
        'Ayushman Bharat Health Account (ABHA) creation and verification',
        'ABHA address linking to hospital patient UHID records',
        'Consent-based electronic health record discovery & exchange',
        'Health Information Provider (HIP) and Health Information User (HIU) interoperability readiness'
      ]
    },
    nhcx: {
      statusLabel: 'NHCX Integration — Status to Be Confirmed',
      badgeColor: 'blue',
      notice: 'National Health Claims Exchange (NHCX) claim processing workflows are mapped according to NHA technical specifications. Live connectivity is subject to insurance clearinghouse protocol verification and sandbox testing.',
      intendedWorkflows: [
        'Patient policy eligibility and insurance verification',
        'Digitized pre-authorisation request submission and status tracking',
        'Automated query resolution and electronic document exchange',
        'Claims finalization, adjudication status updates, and settlement notifications'
      ]
    }
  },

  // Prototype Disclaimer notices
  prototypeDisclaimer: {
    isPrototype: true,
    badgeText: 'Demonstration Prototype',
    footerNote: 'This website is a redesign prototype developed for Sarita Infotech Pvt. Ltd. Interactive forms, ticket tracking, and partner portal modules simulate realistic behavior using frontend mock data. Real deployment will connect to secure backend APIs and authorized databases.',
    unverifiedFeatureNote: 'Demonstration Feature — Functional specifications are subject to confirmation with the Sarita Infotech engineering team prior to production release.'
  }
};
