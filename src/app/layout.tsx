import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import CustomCursor from '@/components/ui/CustomCursor';

const inter = Inter({ subsets: ['latin'] });

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

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
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <ThemeProvider defaultTheme="system" storageKey="sciscribe-theme">
                    <TooltipProvider>
                        <CustomCursor />
                        <Navbar />
                        <div className="pt-24 min-h-[calc(100vh-100px)]">
                            {children}
                        </div>
                        <Footer />
                        <Toaster />
                        <Sonner />
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
