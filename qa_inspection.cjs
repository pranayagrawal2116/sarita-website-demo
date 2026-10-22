const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:3000';

const SCREENSHOT_DIR = path.join(__dirname, 'qa_screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runQA() {
  console.log('🚀 Launching Chrome for QA Inspection...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleLogs = [];
  const pageErrors = [];

  page.on('console', (msg) => {
    consoleLogs.push({ type: msg.type(), text: msg.text(), location: msg.location() });
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err.toString());
  });

  const pagesToTest = [
    { name: '01_homepage', url: '/' },
    { name: '02_products_index', url: '/products' },
    { name: '03_healthcare', url: '/products/healthcare' },
    { name: '04_nimble', url: '/products/nimble' },
    { name: '05_bankware', url: '/products/bankware' },
    { name: '06_retail', url: '/products/retail' },
    { name: '07_request_demo', url: '/request-demo' },
    { name: '08_support_portal', url: '/support' },
    { name: '09_raise_ticket', url: '/support/raise-ticket' },
    { name: '10_track_ticket', url: '/support/track-ticket' },
    { name: '11_ticket_details', url: '/support/ticket/SIT-2489' },
    { name: '12_agent_dashboard', url: '/support/agent-dashboard' },
    { name: '13_partner_landing', url: '/partners' },
    { name: '14_partner_login', url: '/partners/login' },
    { name: '15_partner_dashboard', url: '/partners/dashboard' },
    { name: '16_partner_leads', url: '/partners/leads' },
    { name: '17_about_page', url: '/about' },
    { name: '18_contact_page', url: '/contact' }
  ];

  const results = [];

  for (const item of pagesToTest) {
    console.log(`Checking ${item.name} (${item.url})...`);
    try {
      await page.goto(`${BASE_URL}${item.url}`, { waitUntil: 'networkidle0', timeout: 10000 });
      
      // Check for horizontal overflow
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      // Capture screenshot
      const shotPath = path.join(SCREENSHOT_DIR, `${item.name}.png`);
      await page.screenshot({ path: shotPath, fullPage: false });

      results.push({
        name: item.name,
        url: item.url,
        status: 'OK',
        horizontalOverflow: overflow
      });
    } catch (err) {
      console.error(`Error on ${item.name}:`, err.message);
      results.push({
        name: item.name,
        url: item.url,
        status: 'ERROR',
        error: err.message
      });
    }
  }

  // Test interactive flows
  console.log('\nTesting Interactive Flow 1: Demo Request Form Submission...');
  try {
    await page.goto(`${BASE_URL}/request-demo`, { waitUntil: 'networkidle0' });
    await page.type('#demo-name', 'Dr. Rajesh Sharma');
    await page.type('#demo-organization', 'Apex Multispeciality Hospital');
    await page.type('#demo-email', 'rsharma@apexmed.example.in');
    await page.type('#demo-phone', '+91 98250 12345');
    await page.click('#demo-submit-btn');
    await new Promise(r => setTimeout(r, 1200));
    const confirmed = await page.evaluate(() => document.body.innerText.includes('Demonstration Request Confirmed'));
    console.log('Demo request submission result:', confirmed ? 'PASSED ✅' : 'FAILED ❌');
  } catch (e) {
    console.error('Demo request test error:', e);
  }

  console.log('\nTesting Interactive Flow 2: Ticket Reply Simulator...');
  try {
    await page.goto(`${BASE_URL}/support/ticket/SIT-2489`, { waitUntil: 'networkidle0' });
    await page.type('textarea', 'QA Automated Verification Reply: Laboratory analyzer test confirmed.');
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 800));
    const replyFound = await page.evaluate(() => document.body.innerText.includes('QA Automated Verification Reply'));
    console.log('Ticket reply simulator result:', replyFound ? 'PASSED ✅' : 'FAILED ❌');
  } catch (e) {
    console.error('Ticket reply test error:', e);
  }

  console.log('\nTesting Interactive Flow 3: Partner Login & Authentication...');
  try {
    await page.goto(`${BASE_URL}/partners/login`, { waitUntil: 'networkidle0' });
    await page.click('#autofill-demo-btn');
    await page.click('#partner-login-btn');
    await new Promise(r => setTimeout(r, 1000));
    const currentUrl = page.url();
    const onDashboard = currentUrl.includes('/partners/dashboard');
    console.log('Partner login result:', onDashboard ? 'PASSED ✅ (Navigated to Dashboard)' : `FAILED ❌ (At ${currentUrl})`);
  } catch (e) {
    console.error('Partner login test error:', e);
  }

  console.log('\nTesting Interactive Flow 4: Modal Dialog Open on Product Page...');
  try {
    await page.goto(`${BASE_URL}/products/healthcare`, { waitUntil: 'networkidle0' });
    await page.click('#schedule-walkthrough-btn');
    await new Promise(r => setTimeout(r, 600));
    const modalFound = await page.$('#demo-modal');
    const modalText = await page.evaluate(() => document.querySelector('#demo-modal')?.innerText || '');
    const modalVisible = !!modalFound && modalText.includes('Request a Product Demo');
    console.log('Product Walkthrough Modal result:', modalVisible ? 'PASSED ✅' : 'FAILED ❌');
    if (modalVisible) {
      await page.click('#modal-close-btn');
      await new Promise(r => setTimeout(r, 300));
    }
  } catch (e) {
    console.error('Modal test error:', e);
  }

  console.log('\nTesting Interactive Flow 5: Brochure Modal & Download Spec...');
  try {
    await page.goto(`${BASE_URL}/products/healthcare`, { waitUntil: 'networkidle0' });
    await page.click('#download-brochure-btn');
    await new Promise(r => setTimeout(r, 600));
    const brochureModal = await page.$('#brochure-modal');
    const brochureText = await page.evaluate(() => document.querySelector('#brochure-modal')?.innerText || '');
    const brochureVisible = !!brochureModal && brochureText.includes('Product Brochure & Architecture Spec');
    console.log('Brochure Modal result:', brochureVisible ? 'PASSED ✅' : 'FAILED ❌');
    if (brochureVisible) {
      await page.click('#brochure-close-btn');
      await new Promise(r => setTimeout(r, 300));
    }
  } catch (e) {
    console.error('Brochure modal test error:', e);
  }

  console.log('\nTesting Interactive Flow 6: Register New Partner Lead (/partners/leads/new)...');
  try {
    await page.goto(`${BASE_URL}/partners/leads/new`, { waitUntil: 'networkidle0' });
    await page.type('#lead-prospect-name', 'Dr. Manish Trivedi');
    await page.type('#lead-organization', 'Surat Kidney Care Institute');
    await page.type('#lead-email', 'director@suratkidneycare.example.in');
    await page.type('#lead-phone', '+91 98251 11222');
    await page.click('#lead-submit-btn');
    await new Promise(r => setTimeout(r, 1000));
    const leadUrl = page.url();
    const leadsListed = await page.evaluate(() => document.body.innerText.includes('Surat Kidney Care Institute'));
    console.log('Partner Lead Registration result:', (leadUrl.includes('/partners/leads') && leadsListed) ? 'PASSED ✅ (Lead registered and displayed in pipeline)' : `FAILED ❌ (At ${leadUrl})`);
  } catch (e) {
    console.error('Partner lead test error:', e);
  }

  console.log('\nTesting Interactive Flow 7: Raise Support Ticket Flow (/support/raise-ticket)...');
  try {
    await page.goto(`${BASE_URL}/support/raise-ticket`, { waitUntil: 'networkidle0' });
    await page.type('#ticket-customer-name', 'Dr. Alok Verma');
    await page.type('#ticket-organization', 'Apex Cardiac Center');
    await page.type('#ticket-email', 'itdesk@apexcardiac.example.in');
    await page.type('#ticket-phone', '+91 98250 77777');
    await page.type('#ticket-subject', 'QA Verification: Discharge bill print margin alignment');
    await page.type('#ticket-description', 'The EPSON thermal receipt printer cuts the last 2 lines of the pharmacy receipt.');
    await page.click('#ticket-submit-btn');
    await new Promise(r => setTimeout(r, 1200));
    const ticketUrl = page.url();
    const isDetailView = ticketUrl.includes('/support/ticket/SIT-');
    const ticketText = await page.evaluate(() => document.body.innerText.includes('Discharge bill print margin alignment'));
    console.log('Raise Support Ticket result:', (isDetailView && ticketText) ? 'PASSED ✅ (Navigated to generated Ticket Detail view)' : `FAILED ❌ (At ${ticketUrl})`);
  } catch (e) {
    console.error('Raise support ticket test error:', e);
  }

  await browser.close();

  console.log('\n=== QA INSPECTION SUMMARY ===');
  console.log('Pages tested:', results.length);
  console.log('Console Errors:', pageErrors.length);
  if (pageErrors.length > 0) {
    console.log('Page errors found:', pageErrors);
  }
  const overflowPages = results.filter(r => r.horizontalOverflow);
  console.log('Horizontal Overflow Pages:', overflowPages.length, overflowPages.map(o => o.name));
}

runQA().catch(console.error);
