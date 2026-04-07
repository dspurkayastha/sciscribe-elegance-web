import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import Script from 'next/script';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

import SideNav from '@/components/layout/SideNav';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { FluidIridescentBackground } from '@/components/backgrounds/FluidBackgroundWrapper';
import CookieConsent from '@/components/layout/CookieConsent';
import JsonLd from '@/components/seo/JsonLd';
import PageViewTracker from '@/components/analytics/PageViewTracker';

// ── GA4 Measurement ID (will be updated with new Firebase project) ──
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-LBF34FLVPE';

export const metadata: Metadata = {
    metadataBase: new URL('https://www.sciscribesolutions.com'),
    title: {
        default: 'SciScribe Solutions | Expert Medical & Scientific Writing',
        template: '%s | SciScribe Solutions',
    },
    description: 'Premium medical writing, scientific editing, and publication support services for researchers, academics, and healthcare professionals worldwide.',
    keywords: [
        'medical writing', 'scientific editing', 'academic proofreading',
        'publication support', 'manuscript editing', 'peer review preparation',
        'grant writing', 'journal formatting', 'research paper editing',
        'scientific writing services', 'academic editing services',
    ],
    authors: [{ name: 'SciScribe Solutions' }],
    creator: 'SciScribe Solutions',
    publisher: 'SciScribe Solutions',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.sciscribesolutions.com',
        siteName: 'SciScribe Solutions',
        title: 'SciScribe Solutions | Expert Medical & Scientific Writing',
        description: 'Premium medical writing, scientific editing, and publication support services for researchers, academics, and healthcare professionals worldwide.',
        images: [
            {
                url: '/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'SciScribe Solutions',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SciScribe Solutions | Expert Medical & Scientific Writing',
        description: 'Premium medical writing, scientific editing, and publication support.',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://www.sciscribesolutions.com',
    },
    // verification: {
    //     google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
    // },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <head>
                {/* GA4 gtag.js — loads after page interactive */}
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                    strategy="afterInteractive"
                />
                <Script id="gtag-init" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('consent', 'default', {
                            'analytics_storage': 'denied'
                        });
                        gtag('config', '${GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                            send_page_view: true
                        });
                        // Check if user previously consented
                        if (localStorage.getItem('analytics_consent') === 'granted') {
                            gtag('consent', 'update', { 'analytics_storage': 'granted' });
                        }
                    `}
                </Script>

                {/* Ahrefs Web Analytics */}
                <Script
                    src="https://analytics.ahrefs.com/analytics.js"
                    data-key="BvdEqAh8YdrMHSmJn4iw2w"
                    async
                    strategy="afterInteractive"
                />

                {/* Structured Data */}
                <JsonLd />
            </head>
            <body className={`${inter.className} bg-[#020817] text-white selection:bg-sciscribe-blue/30 selection:text-white min-h-screen relative antialiased`} suppressHydrationWarning>
                <Suspense fallback={null}><PageViewTracker /></Suspense>
                <ThemeProvider defaultTheme="dark" storageKey="sciscribe-theme">
                    <TooltipProvider>
                        <SmoothScroll>
                            <FluidIridescentBackground />
                            <SideNav />
                            {/* Main content offset by the width of the left navigation rail */}
                            <div className="pl-32 md:pl-48 min-h-screen relative z-10 w-full text-white">
                                {children}
                            </div>
                            <Footer />
                        </SmoothScroll>
                        <Toaster />
                        <Sonner />
                        <CookieConsent />
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
