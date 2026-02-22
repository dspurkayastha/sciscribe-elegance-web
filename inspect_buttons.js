import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    const buttons = await page.$$eval('button', elements =>
        elements.map(el => {
            // Find what element it really is
            return {
                tag: el.tagName,
                text: el.innerText.trim(),
                html: el.outerHTML,
                className: el.className
            };
        })
    );

    console.log('Buttons found:', buttons.length);
    buttons.forEach(b => {
        console.log(`\n--- Button Text: "${b.text}" ---`);
        console.log(`Tag: ${b.tag}`);
        console.log(`Class: ${b.className}`);
        // console.log(`HTML: ${b.html.substring(0, 100)}...`);
    });

    await browser.close();
})();
