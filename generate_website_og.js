import { chromium } from 'playwright';
import path from 'path';

(async () => {
  console.log('Launching browser to capture live website OG image...');
  const browser = await chromium.launch();

  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 }
  });

  // Force framer-motion to skip enter animations so elements don't get stuck at opacity: 0
  await page.emulateMedia({ reducedMotion: 'reduce' });

  await page.goto('http://localhost:3000', { waitUntil: 'load' });

  // Inject CSS to hide the SideNav, floating buttons, and remove the left offset padding
  await page.addStyleTag({
    content: `
    /* Disable all CSS transitions and animations as a fallback */
    * {
      transition: none !important;
      animation-duration: 0s !important;
      animation-delay: 0s !important;
    }

    /* Hide SideNav */
    nav { display: none !important; }
    
    /* Hide all fixed overlays (Consultation button, Cookie consent) */
    .fixed { display: none !important; }
    
    /* Remove the left padding offset on the main wrapper so content perfectly centers */
    .pl-32 { padding-left: 0 !important; }
    @media (min-width: 768px) {
      .md\\:pl-48 { padding-left: 0 !important; }
    }
    
    /* Hide the scroll indicator */
    .absolute.bottom-12 { display: none !important; }

    /* Force opacity on Framer Motion elements just in case */
    [style*="opacity: 0"] {
        opacity: 1 !important;
        transform: none !important;
    }
  ` });

  // Explicitly wait for the Hero Section H1 to be visible
  await page.waitForSelector('h1', { state: 'visible', timeout: 10000 });

  // Give the fluid background 1.5 seconds to render its canvas
  await page.waitForTimeout(1500);

  const outputPath = path.join(process.cwd(), 'public', 'images', 'og-image.png');
  await page.screenshot({ path: outputPath });

  console.log(`Successfully captured live website as OG Image at: ${outputPath}`);
  await browser.close();
})();
