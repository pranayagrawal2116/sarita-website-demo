const puppeteer = require('puppeteer-core');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('🚀 Starting Comprehensive Sarita Infotech Prototype QA Suite...\n');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const passedTests = [];
  const failedTests = [];

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passedTests.push(message);
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failedTests.push(message);
    }
  }

  try {
    // 1. PUBLIC WEBSITE & HEADER VERIFICATION
    console.log('--- 1. Testing Public Website & Header Links ---');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
    const title = await page.title();
    assert(title.includes('Sarita Infotech'), `Homepage title verified: "${title}"`);

    // Verify top utility bar links exist for Customer, Partner, and Admin
    const customerLink = await page.$('a[href="/customer/login"], a[href="/customer/dashboard"]');
    assert(customerLink !== null, 'Header contains Customer Portal link');
    const partnerLink = await page.$('a[href="/partners/login"], a[href="/partners/dashboard"]');
    assert(partnerLink !== null, 'Header contains Partner Portal link');
    const adminLink = await page.$('a[href="/admin/login"], a[href="/admin/dashboard"]');
    assert(adminLink !== null, 'Header contains Admin Console link');

    // 2. PRODUCT PAGES & ABDM/NHCX QUALIFICATION
    console.log('\n--- 2. Testing Healthcare Page & Truth-in-Advertising Qualification ---');
    await page.goto(`${BASE_URL}/products/healthcare`, { waitUntil: 'networkidle0' });
    const content = await page.content();
    assert(content.includes('Status to Be Confirmed'), 'ABDM/NHCX claims explicitly qualified as "Status to Be Confirmed"');
    assert(content.includes('Hospital Management Information System'), 'Sarita HealthCare positioning rendered clearly');

    // 3. PUBLIC DEMO REQUEST & SCHEDULING FLOW
    console.log('\n--- 3. Testing Public Demo Request & Appointment Scheduling ---');
    await page.goto(`${BASE_URL}/request-demo`, { waitUntil: 'networkidle0' });
    await page.type('#demo-name', 'Dr. Vikramaditya Rathore');
    await page.type('#demo-organization', 'Rathore Super-Speciality Hospital');
    await page.type('#demo-email', 'director@rathorehospital.example.in');
    await page.type('#demo-phone', '+91 98250 88990');
    await page.select('#demo-product', 'healthcare');
    await page.select('#demo-timeslot', '11:30 AM - 12:30 PM IST');
    await page.click('#demo-submit-btn');

    await page.waitForSelector('.bg-emerald-100', { timeout: 5000 });
    const demoSuccessText = await page.evaluate(() => document.body.innerText);
    assert(demoSuccessText.includes('Demonstration Slot Requested'), 'Public demo request submission confirmed');
    assert(demoSuccessText.includes('DMR-2026-'), 'Generated demo reference ID DMR-2026-xxxx');
    assert(demoSuccessText.includes('Awaiting Admin Slot Confirmation'), 'Status set to Awaiting Admin Slot Confirmation');

    // 4. CUSTOMER AUTH GUARD & ACCESS CONTROL
    console.log('\n--- 4. Testing Customer Portal Auth Guard & Data Protection ---');
    // Clear localStorage to simulate fresh unauthenticated session
    await page.evaluate(() => localStorage.clear());

    // Test unauthenticated access to /customer/dashboard
    await page.goto(`${BASE_URL}/customer/dashboard`, { waitUntil: 'networkidle0' });
    const redirectedUrl = page.url();
    assert(redirectedUrl.includes('/customer/login'), `Unauthenticated /customer/dashboard redirected to login: ${redirectedUrl}`);

    // Test Pending Approval Account login using #autofill-pending
    await page.click('#autofill-pending');
    await page.click('#customer-login-btn');
    await new Promise((r) => setTimeout(r, 600));

    const pendingScreenText = await page.evaluate(() => document.body.innerText);
    assert(pendingScreenText.includes('Account Status: Pending Approval'), 'Pending customer blocked with "Pending Approval" security shield');
    assert(pendingScreenText.includes('Security Rule Enforced'), 'Security rule explainer displayed to pending user');

    // Clear session for active user test
    await page.evaluate(() => localStorage.clear());

    // Test Active Customer login (Dr. Ramesh Patel - Apex Hospital) using #autofill-active-hospital
    await page.goto(`${BASE_URL}/customer/login`, { waitUntil: 'networkidle0' });
    await page.click('#autofill-active-hospital');
    await page.click('#customer-login-btn');
    await new Promise((r) => setTimeout(r, 800));

    const customerDashText = await page.evaluate(() => document.body.innerText);
    assert(customerDashText.includes('Apex Multispeciality Hospital'), 'Active customer dashboard loaded with organization name');
    assert(customerDashText.includes('ACT-APEX-992'), 'Customer account reference ACT-APEX-992 displayed');

    // 5. CUSTOMER ORGANIZATION DATA ISOLATION & INTERNAL NOTES CONCEALMENT
    console.log('\n--- 5. Testing Customer Organization Data Isolation & Note Concealment ---');
    await page.goto(`${BASE_URL}/customer/tickets`, { waitUntil: 'networkidle0' });
    const customerTicketsText = await page.evaluate(() => document.body.innerText);
    assert(customerTicketsText.includes('SIT-2489'), 'Apex Hospital sees its ticket SIT-2489');
    assert(!customerTicketsText.includes('SIT-2490'), 'Apex Hospital CANNOT see AeroTex ticket SIT-2490 in table (Isolated)');

    // Attempt direct URL breach into AeroTex ticket SIT-2490
    await page.goto(`${BASE_URL}/customer/tickets/SIT-2490`, { waitUntil: 'networkidle0' });
    const forbiddenText = await page.evaluate(() => document.body.innerText);
    assert(forbiddenText.includes('Confidential Ticket Access Denied'), 'Direct ticket URL breach blocked with "Confidential Ticket Access Denied"');

    // Open authorized ticket SIT-2489 and verify internal notes are concealed
    await page.goto(`${BASE_URL}/customer/tickets/SIT-2489`, { waitUntil: 'networkidle0' });
    const authorizedTicketText = await page.evaluate(() => document.body.innerText);
    assert(authorizedTicketText.includes('Sysmex XN-350'), 'Ticket subject visible to authorized customer');
    assert(!authorizedTicketText.includes('Confidential Internal Notes'), 'Admin internal notes card strictly hidden from customer view');
    assert(!authorizedTicketText.includes('Customer hospital has AMC Platinum SLA'), 'Author/agent private notes concealed from customer');

    // Customer posts a reply
    await page.type('#customer-reply-text', 'Thank you team, we tested the staging patch and the bed allocation table is functioning.');
    await page.click('#customer-reply-btn');
    await new Promise((r) => setTimeout(r, 600));
    const updatedTicketText = await page.evaluate(() => document.body.innerText);
    assert(updatedTicketText.includes('we tested the staging patch'), 'Customer reply added to ticket conversation timeline');

    // 6. CUSTOMER NEW TICKET CREATION
    console.log('\n--- 6. Testing Customer New Ticket Creation ---');
    await page.goto(`${BASE_URL}/customer/tickets/new`, { waitUntil: 'networkidle0' });
    const newTicketPageText = await page.evaluate(() => document.body.innerText);
    assert(newTicketPageText.includes('Apex Multispeciality Hospital'), 'Pre-filled authenticated user organization on new ticket form');
    await page.type('#ticket-subject', 'Database backup cron job sync timeout during midnight archiving');
    await page.type('#ticket-description', 'During automated DB maintenance at 00:00, the secondary failover replica took 14 minutes to sync.');
    await page.click('button[type="submit"]');
    await new Promise((r) => setTimeout(r, 800));
    const afterNewTicketUrl = page.url();
    assert(afterNewTicketUrl.includes('/customer/tickets/'), `New ticket created and navigated to detail: ${afterNewTicketUrl}`);

    // 7. ADMIN CENTRAL MANAGEMENT SYSTEM
    console.log('\n--- 7. Testing Admin Management Console & Confidential Notes ---');
    // Test unauthenticated admin redirect
    await page.goto(`${BASE_URL}/admin/dashboard`, { waitUntil: 'networkidle0' });
    const adminRedirectUrl = page.url();
    assert(adminRedirectUrl.includes('/admin/login'), `Unauthenticated /admin/dashboard redirected to login: ${adminRedirectUrl}`);

    // Admin Login using autofill button
    await page.click('#admin-autofill-btn');
    await page.click('#admin-login-btn');
    await new Promise((r) => setTimeout(r, 800));

    const adminDashboardText = await page.evaluate(() => document.body.innerText);
    assert(adminDashboardText.includes('Unified Administrative Workspace'), 'Admin Unified Workspace loaded');
    assert(adminDashboardText.includes('Rajesh Vaghela'), 'Admin identity verified in sidebar');

    // Admin Views Ticket Triage & Internal Notes
    await page.goto(`${BASE_URL}/admin/tickets/SIT-2489`, { waitUntil: 'networkidle0' });
    const adminTicketText = await page.evaluate(() => document.body.innerText);
    assert(adminTicketText.includes('Confidential Internal Notes'), 'Admin CAN view Confidential Internal Notes card');
    assert(adminTicketText.includes('Internal Only'), 'Visual badge confirming note is Internal Only');

    // Admin adds a confidential internal note
    await page.type('#admin-note-input', 'QA automated verification confirmed database index patch is stable.');
    await page.click('#admin-note-submit-btn');
    await new Promise((r) => setTimeout(r, 600));
    const afterNoteText = await page.evaluate(() => document.body.innerText);
    assert(afterNoteText.includes('QA automated verification confirmed'), 'New confidential internal note recorded by admin');

    // 8. ADMIN DEMO QUEUE & CONFLICT PREVENTION
    console.log('\n--- 8. Testing Admin Demo Management & Conflict Engine ---');
    await page.goto(`${BASE_URL}/admin/demos`, { waitUntil: 'networkidle0' });
    const adminDemosText = await page.evaluate(() => document.body.innerText);
    assert(adminDemosText.includes('Software Demo Appointments'), 'Admin Demo Queue rendered');

    // Open first demo detail
    const firstDemoLink = await page.$('table a[href^="/admin/demos/"]');
    if (firstDemoLink) {
      await firstDemoLink.click();
      await new Promise((r) => setTimeout(r, 800));
      const demoDetailText = await page.evaluate(() => document.body.innerText);
      assert(demoDetailText.includes('Back to Demos Queue'), 'Admin Demo Booking detail view rendered');
      assert(demoDetailText.includes('Assigned Consultant') || demoDetailText.includes('Confirm Slot'), 'Admin demo controls available');
    }

    // 9. ADMIN CUSTOMER DIRECTORY & APPROVAL
    console.log('\n--- 9. Testing Admin Customer Directory & Actions ---');
    await page.goto(`${BASE_URL}/admin/customers`, { waitUntil: 'networkidle0' });
    const customersPageText = await page.evaluate(() => document.body.innerText);
    assert(customersPageText.includes('Customer Accounts & Organizations'), 'Admin customer accounts directory loaded');
    assert(customersPageText.includes('CityLife Retail'), 'CityLife Retail found in accounts list');

    // Open customer detail
    const firstCustomerDetail = await page.$('table a[href^="/admin/customers/"]');
    if (firstCustomerDetail) {
      await firstCustomerDetail.click();
      await new Promise((r) => setTimeout(r, 600));
      const custDetailText = await page.evaluate(() => document.body.innerText);
      assert(custDetailText.includes('Software License & Support Tier'), 'Customer Organization Profile & AMC Tier rendered');
    }

    // 10. ADMIN PARTNERS, REPORTS & SETTINGS
    console.log('\n--- 10. Testing Admin Partners, Reports & System Settings ---');
    await page.goto(`${BASE_URL}/admin/partners`, { waitUntil: 'networkidle0' });
    const partnersText = await page.evaluate(() => document.body.innerText);
    assert(partnersText.includes('Channel Partners & Deal Registration'), 'Admin Channel Partners & Deal Registration loaded');

    await page.goto(`${BASE_URL}/admin/reports`, { waitUntil: 'networkidle0' });
    const reportsText = await page.evaluate(() => document.body.innerText);
    assert(reportsText.includes('Operational Analytics & Reports'), 'Admin Reports & Quality Intelligence loaded');

    await page.goto(`${BASE_URL}/admin/settings`, { waitUntil: 'networkidle0' });
    const settingsText = await page.evaluate(() => document.body.innerText);
    assert(settingsText.includes('Administration & Operational Settings'), 'Admin Settings page loaded');
    assert(settingsText.includes('Support SLA Response Targets'), 'SLA Configuration section rendered');

    // SUMMARY
    console.log('\n=========================================');
    console.log(`🎉 QA SUITE COMPLETE: ${passedTests.length} PASSED, ${failedTests.length} FAILED`);
    console.log('=========================================');

    if (failedTests.length > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTests();
