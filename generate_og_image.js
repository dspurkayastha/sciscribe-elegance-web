import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({
        viewport: { width: 1200, height: 630 }
    });

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          width: 1200px;
          height: 630px;
          background-color: #020817;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* Abstract glowing nebula background */
        .bg-glow-1 {
          position: absolute;
          top: -20%; left: -10%;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%);
          border-radius: 50%;
        }
        .bg-glow-2 {
          position: absolute;
          bottom: -30%; right: -20%;
          width: 800px; height: 800px;
          background: radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%);
          border-radius: 50%;
        }

        /* Ambient noise overlay */
        .noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
        }

        /* Stacked abstract journal cards */
        .journal-stack {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .card {
          position: absolute;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border-radius: 12px;
        }
        .card-1 {
          width: 500px; height: 700px;
          transform: rotate(-15deg) translate(-250px, 50px);
          border-left: 1px solid rgba(14,165,233,0.3);
        }
        .card-2 {
          width: 550px; height: 750px;
          transform: rotate(10deg) translate(300px, 0px);
          border-right: 1px solid rgba(20,184,166,0.2);
        }

        /* Foreground Content */
        .content {
          position: relative;
          z-index: 10;
          text-align: center;
          background: rgba(2, 8, 23, 0.6);
          padding: 60px 80px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          box-shadow: 0 0 80px rgba(0,0,0,0.8);
        }

        h1 {
          font-family: 'Playfair Display', serif;
          font-size: 85px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #ffffff;
          margin-bottom: 20px;
          background: linear-gradient(to right, #ffffff, #e2e8f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        h2 {
          font-size: 32px;
          font-weight: 300;
          letter-spacing: 0.03em;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 30px;
        }

        .divider {
          width: 100px;
          height: 3px;
          background: linear-gradient(to right, #0ea5e9, #14b8a6);
          margin: 0 auto 30px auto;
          border-radius: 2px;
        }

        .url {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
        }
      </style>
    </head>
    <body>
      <div class="bg-glow-1"></div>
      <div class="bg-glow-2"></div>
      
      <div class="journal-stack">
        <div class="card card-1"></div>
        <div class="card card-2"></div>
      </div>

      <div class="noise"></div>

      <div class="content">
        <h1>SciScribe Solutions</h1>
        <h2>Expert Medical &amp; Scientific Writing</h2>
        <div class="divider"></div>
        <div class="url">sciscribesolutions.com</div>
      </div>
    </body>
    </html>
  `;

    await page.setContent(html);

    // Wait for web fonts to load
    await page.evaluate(async () => {
        await document.fonts.ready;
    });

    const outputPath = path.join(process.cwd(), 'public', 'images', 'og-image.png');
    await page.screenshot({ path: outputPath });

    console.log('Successfully generated programmatic OG image at', outputPath);
    await browser.close();
})();
