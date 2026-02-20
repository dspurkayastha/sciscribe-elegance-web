import { test, expect } from '@playwright/test';

test.describe('Fluid Manuscript Aesthetic', () => {
    test('homepage loads iridescent background and high contrast text', async ({ page }) => {
        await page.goto('http://localhost:3000/');

        // Wait for the WebGL canvas to be hydrated (canvas inside the wrapper)
        await page.waitForSelector('canvas', { state: 'attached' });

        // Verify Hero typography exists and is visible
        const heroText = page.locator('h1', { hasText: 'Elevate Your' });
        await expect(heroText).toBeVisible();

        // Take a snapshot
        await page.screenshot({ path: 'test-results/hero-section.png', fullPage: false });
    });

    test('services page displays elegant big typography instead of cards', async ({ page }) => {
        await page.goto('http://localhost:3000/services');

        // Wait for content to animate in
        await page.waitForTimeout(1000); // Allow framer-motion to settle

        // Ensure "01" and "02" are visible as elegant typography
        const step1 = page.locator('span:text("01")').first();
        await expect(step1).toBeVisible();

        // Scroll down slightly to trigger fluid morphing in the background and reveal step 2
        await page.evaluate(() => window.scrollBy(0, 800));
        await page.waitForTimeout(1000);

        const step2 = page.locator('span:text("02")').nth(1);
        await expect(step2).toBeVisible();

        // Snapshot of Services section
        await page.screenshot({ path: 'test-results/services-typography.png', fullPage: false });
    });
});
