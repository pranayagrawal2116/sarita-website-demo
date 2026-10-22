# Sarita Infotech Pvt. Ltd. — Enterprise Website & Portal Redesign Demo

A complete, modern, multi-page website prototype designed and developed for **Sarita Infotech Pvt. Ltd.** (Surat, Gujarat, India), an established enterprise business software company with 23+ years of engineering experience and 200+ deployments across healthcare, international trade, cooperative banking, and retail.

Existing Website: [https://www.saritainfotech.com/](https://www.saritainfotech.com/)

---

## 1. Project Objectives

1. **Credible Corporate Identity:** Establish a modern, enterprise software brand aesthetic (deep navy, professional blue, clean slate, subtle shadows, restrained teal accents).
2. **Flagship Product Showcase:** Dedicated interactive landing pages for **Sarita HealthCare (HMIS)**, **Sarita Nimble (EXIM Trade)**, **Sarita BankWare (Co-Op Banking)**, and **Sarita Retail**.
3. **Qualified Demo Inquiries:** Reusable, validated demo request modal and dedicated demo workflows with duplicate submission prevention and browser session persistence.
4. **Customer Support Portal:** Interactive ticketing system (Raise ticket, Track ticket by ID/email, conversation timeline with working reply simulator, and Support Agent triage desk).
5. **B2B Channel Partner Portal:** Dedicated partner gateway with one-click demo credentials, lead registration, stage updates, deal pipeline tracking, and sales collateral downloads.
6. **Digital Health Interoperability (ABDM & NHCX):** Architectural milestone mapping for Ayushman Bharat Digital Mission (ABHA UHID linking) and National Health Claims Exchange (NHCX) with central configuration status labels (`"Status to Be Confirmed"`).
7. **SEO & Performance:** Accessible semantic HTML, unique page titles and meta descriptions, OpenGraph tags, JSON-LD structured data, XML sitemap (`/sitemap.xml`), and robots exclusion (`/robots.txt`).

---

## 2. Technology Stack

- **Framework:** React 18 + TypeScript
- **Bundler & Dev Server:** Vite 6
- **Styling:** Tailwind CSS with custom design token system
- **Routing:** React Router v6 (with active page highlights, deep-linking, and legacy URL redirects)
- **Icons:** Lucide React + custom inline SVG brand marks
- **State Management:** React Context (`AppContext.tsx`) with browser LocalStorage persistence for tickets, partner leads, and demo records.

---

## 3. Site Architecture & Route Map

### Public Website
| Route | Description |
|---|---|
| `/` | Conversion-focused homepage with interactive HMIS dashboard preview, product cards, why Sarita, case studies, support/partner callouts, FAQ, and conversion CTAs. |
| `/products` | Portfolio matrix comparing all 4 enterprise suites and technical specifications. |
| `/products/healthcare` | Comprehensive HMIS landing page with interactive hospital dashboard mockup, OPD/IPD flows, OT, pharmacy, ABDM/NHCX interoperability section, and embedded demo form. |
| `/products/nimble` | Export & import trade software with interactive EXIM dashboard, single-entry documentation, duty drawback, and e-BRC tracking. |
| `/products/bankware` | Cooperative credit society core banking with pigmy deposit collection tally, member share capital, and statutory audit balance sheets. |
| `/products/retail` | High-speed barcode POS billing, batch-wise expiry tracking, and GSTR-1 sales tax reporting (marked for client verification). |
| `/services` | Enterprise service capabilities: Custom software development, data migration, and Annual Maintenance Contracts (AMC). |
| `/services/custom-software-development` | Dedicated custom software engineering page with deliverables, architecture models, and technology stacks. |
| `/industries` | Overview of specialized industries served. |
| `/industries/healthcare` | Tailored hospital solutions and clinical administration. |
| `/industries/trade` | Merchant exporter documentation and customs compliance. |
| `/industries/cooperative-banking` | Cooperative credit society operations. |
| `/industries/retail` | Retail store and multi-counter chain operations. |
| `/case-studies` | Filterable customer case studies based on real implementation patterns (Navsari Multispeciality Hospital, Textile Exporters, Urban Credit Societies). |
| `/about` | Company background (23+ years, 200+ clients, Surat HQ), operating values, milestones, and leadership placeholders. |
| `/resources` | Filterable knowledge guides, product brochures, sales decks, and ABDM interoperability specs. |
| `/contact` | Working inquiry form and verified Surat headquarters address, phone (+91 79900 29373), email (`inquiry@saritainfotech.com`), and WhatsApp direct chat. |
| `/request-demo` | Dedicated full-page demo scheduler with product preselection. |
| `/privacy-policy` | Data governance policy emphasizing on-premise client data sovereignty. |
| `/terms` | Prototype evaluation terms and intellectual property notices. |
| `*` | Branded 404 error page. |

### Customer Support Portal
| Route | Description |
|---|---|
| `/support` | Support center gateway with quick actions (Raise Ticket, Track Ticket, Knowledge Base, Agent Desk). |
| `/support/raise-ticket` | Ticket submission form with validation (Category, Priority, Site reference, Attachments simulation). |
| `/support/track-ticket` | Searchable ticket tracking table with multi-filter (Status, Product, Priority). |
| `/support/ticket/:id` | Detailed ticket view with conversation timeline, audit history, status changer, and working reply box. |
| `/support/knowledge-base` | Searchable knowledge base with category tags. |
| `/support/knowledge-base/:slug` | Step-by-step technical guides (Analyzer LIS interfacing, discharge clearance, Advance License ledgers, ESC/POS printer setup). |
| `/support/agent-dashboard` | Internal support-agent triage desk with KPI cards, engineer assignment, and live status changer. |

### B2B Channel Partner Portal
| Route | Description |
|---|---|
| `/partners` | Channel partner program overview, tier benefits, and partner commitments. |
| `/partners/login` | Secure-style partner login with **One-Click Demo Credentials Auto-Fill** (`devendra@apexsolutions.example.in`). |
| `/partners/request-access` | Partner network application form. |
| `/partners/dashboard` | Executive dashboard with metrics (leads, pipeline value, YTD commissions), recent leads, and quick actions. |
| `/partners/leads` | Lead management table with search, status filters, and live status updates (New, Under Review, Qualified, Proposal, Won, Lost). |
| `/partners/leads/new` | Deal registration form with territory protection. |
| `/partners/opportunities` | Deal pipeline stages with probability indicators and expected close dates. |
| `/partners/resources` | Downloadable brochures, sales presentations, and battlecards (with simulated file download). |
| `/partners/profile` | Partner organization details, tier certification, and assigned Sarita Infotech channel manager. |

---

## 4. Setup and Run Instructions

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### Installation
```bash
# Clone the repository
git clone https://github.com/pranayagrawal2116/sarita-website-demo.git

# Navigate into project directory
cd sarita-website-demo

# Install dependencies
npm install
```

### Running Locally (Development Mode)
```bash
npm run dev
```
The application will launch at `http://localhost:3000/`.

### Production Build
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 5. Central Content & Interoperability Configuration

All public labels, disclaimers, and integration milestones are centrally maintained in `src/data/contentConfig.ts`:

```typescript
// Central control for ABDM and NHCX public status labels
export const CONTENT_CONFIG = {
  healthcareInteroperability: {
    abdm: {
      statusLabel: 'ABDM Integration — Status to Be Confirmed',
      // ...
    },
    nhcx: {
      statusLabel: 'NHCX Integration — Status to Be Confirmed',
      // ...
    }
  }
};
```
To update the public copy once government sandbox testing or production certification is achieved, simply edit the label in this central file.

---

## 6. List of Mock Features Requiring Backend Integration

For this prototype, all state modifications (tickets, replies, partner leads, demo requests) are simulated client-side and saved to browser `LocalStorage`. Production release requires:

1. **Authentication & Authorization:** Secure OAuth 2.0 / OpenID Connect with multi-factor authentication (MFA) for the Partner Portal and Support Agent Desk.
2. **Persistent Database:** Relational database (PostgreSQL / Microsoft SQL Server) for multi-tenant lead management, ticket threads, and customer accounts.
3. **Secure File Storage:** S3/GCS compliant object storage with signed URLs for customer support logs and partner sales collateral downloads.
4. **Email / SMS Notifications:** Integration with transactional email gateways (e.g. SendGrid / AWS SES) and SMS/WhatsApp business APIs for ticket status alerts.
5. **Role-Based Access Control (RBAC):** Backend tenant isolation ensuring partners can only view their own registered leads and customers only view their own tickets.

---

## 7. List of Company Content Requiring Verification

The following items are populated with realistic demonstration content and should be reviewed by Sarita Infotech leadership before production:
1. **Executive Leadership Names:** Placeholders are provided in the `/about` page pending director confirmation.
2. **Sarita Retail Feature Matrix:** Marked with a clear review notice on `/products/retail` to confirm the exact feature set against the live software version.
3. **ABDM / NHCX Live Integration Status:** Qualified as *"Status to Be Confirmed"* pending formal sandbox audit records with the National Health Authority (NHA).

---

## 8. Summary of Tests Performed

- ✅ **Build & TypeScript:** `tsc -b && vite build` succeeded with zero errors.
- ✅ **Navigation & Routing:** Tested primary desktop mega-menu, mobile navigation drawer, and legacy URL redirects (`/Home/Index`, `/OurProducts/SaritaHealthCare`, etc.).
- ✅ **Interactive Mockups:** Tested tab transitions on Healthcare, Nimble, BankWare, and Retail dashboard components.
- ✅ **Support Workflow:** Tested ticket creation (`/support/raise-ticket`), verified appearance in ticket list (`/support/track-ticket`), navigated to detail (`/support/ticket/:id`), and posted replies in the live conversation thread.
- ✅ **Support Agent Console:** Verified KPI metrics, ticket assignment dropdown, and status updater.
- ✅ **Partner Portal Flow:** Tested one-click demo login, lead registration (`/partners/leads/new`), status updates (`/partners/leads`), and resource download simulations.
- ✅ **SEO Assets:** Verified `robots.txt` and `sitemap.xml` response via local HTTP requests.
