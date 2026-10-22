const puppeteer = require('puppeteer-core');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:3000';

async function testMobileAndTablet() {
  console.log('📱 Testing Mobile & Tablet Responsiveness...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  const viewports = [
    { name: 'Mobile (iPhone 13)', width: 390, height: 844 },
    { name: 'Tablet (iPad Mini)', width: 768, height: 1024 }
  ];

  const testRoutes = [
    '/',
    '/products',
    '/products/healthcare',
    '/products/nimble',
    '/support',
    '/support/ticket/SIT-2489',
    '/partners/dashboard',
    '/request-demo',
    '/contact'
  ];

  for (const vp of viewports) {
    console.log(`\nTesting Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    await page.setViewport({ width: vp.width, height: vp.height });

    for (const route of testRoutes) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0' });
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      console.log(`  Route ${route}: ${overflow ? 'OVERFLOW DETECTED ❌' : 'NO OVERFLOW ✅'}`);
    }
  }

  // Test Mobile Navigation Drawer
  console.log('\nTesting Mobile Menu Toggle on Homepage...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
  const menuBtn = await page.$('button[aria-label="Toggle navigation menu"]');
  if (menuBtn) {
    await menuBtn.click();
    await new Promise(r => setTimeout(r, 400));
    const drawerOpen = await page.evaluate(() => {
      return document.body.innerText.includes('Explore All Products') || document.body.innerText.includes('Sarita HealthCare');
    });
    console.log('Mobile menu drawer opened:', drawerOpen ? 'PASSED ✅' : 'FAILED ❌');
  } else {
    console.log('Mobile menu toggle button not found with aria-label!');
  }

  await browser.close();
  console.log('\nResponsiveness check finished. Console errors:', errors.length);
}

testMobileAndTablet().catch(err => {
  console.error('Mobile test failed:', err);
  process.exit(1);
});
