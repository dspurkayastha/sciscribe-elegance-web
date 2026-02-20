import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

import SideNav from '@/components/layout/SideNav';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { FluidIridescentBackground } from '@/components/backgrounds/FluidBackgroundWrapper';

export const metadata: Metadata = {
    title: 'SciScribe | Expert Medical & Scientific Writing',
    description: 'Premium medical writing, scientific editing, and publication support services.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <body className={`${inter.className} bg-black text-white`} suppressHydrationWarning>
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
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
