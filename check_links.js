import { chromium } from 'playwright';

console.log('Starting Playwright link crawler...');
const browser = await chromium.launch();
const page = await browser.newPage();

// Checking against the local dev server which holds our latest changes
const targetUrl = 'https://sciscribesolutions.com';
console.log(`\nNavigating to ${targetUrl}...`);

try {
    await page.goto(targetUrl, { waitUntil: 'networkidle' });
} catch (e) {
    console.error(`Failed to navigate to ${targetUrl}. Is the dev server running?`);
    process.exit(1);
}

// 1. Extract all anchors
const links = await page.$$eval('a', elements =>
    elements.map(el => ({
        text: el.innerText.trim() || el.getAttribute('aria-label') || 'No Text',
        href: el.href
    }))
);

console.log(`\nFound ${links.length} anchor (<a>) tags.`);

// Filter unique, valid HTTP(S) links
const uniqueHrefs = [...new Set(links.map(l => l.href).filter(h => h && h.startsWith('http')))];
console.log(`Checking ${uniqueHrefs.length} unique URLs for 404s/Errors...\n`);

const brokenLinks = [];
const okLinks = [];

for (const href of uniqueHrefs) {
    try {
        // Use relatively short timeout for external links to avoid hanging
        const response = await page.request.get(href, { timeout: 10000 });
        if (!response.ok()) {
            brokenLinks.push({ href, status: response.status() });
            console.log(`❌ Broken: ${href} (Status: ${response.status()})`);
        } else {
            okLinks.push(href);
            console.log(`✅ OK: ${href}`);
        }
    } catch (e) {
        brokenLinks.push({ href, error: e.message });
        console.log(`⚠️  Warning/Error fetching: ${href} (${e.message.split('\\n')[0]})`);
    }
}

// 2. Extract Buttons for visual verification
const buttons = await page.$$eval('button', elements =>
    elements.map(el => ({
        text: el.innerText.trim() || el.getAttribute('aria-label') || 'No Text',
        type: el.getAttribute('type') || 'submit/button',
        disabled: el.disabled
    }))
);

console.log(`\n--- SUMMARY ---`);
console.log(`Buttons Found: ${buttons.length}`);
buttons.forEach((b, i) => console.log(`  ${i + 1}. [${b.type}] ${b.text} ${b.disabled ? '(DISABLED)' : ''}`));

console.log(`\nBroken Links Found: ${brokenLinks.length}`);
if (brokenLinks.length > 0) {
    console.table(brokenLinks);
} else {
    console.log(`All links are working (2xx/3xx).`);
}

await browser.close();
