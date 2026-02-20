import { lazy, Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import CustomCursor from "./components/ui/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";
import Document from "./pages/_document";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import GoogleTagManager from "./components/analytics/GoogleTagManager";
import SEOHead from "./components/seo/SEOHead";
import CookieConsentBanner from "@/components/ui/CookieConsentBanner";

// Analytics wrapper component
function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { logPageView } = useAnalytics();

  useEffect(() => {
    logPageView(location.pathname);
  }, [location, logPageView]);

  return <>{children}</>;
}

// Lazy load non-critical components
const Index = lazy(() => import("./pages/Index"));
const SummerOffer = lazy(() => import("./pages/SummerOffer"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const Payment = lazy(() => import("./pages/Payment"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Refund = lazy(() => import("./pages/Refund"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Feedback = lazy(() => import("./pages/Feedback"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
const AdminDashboard = lazy(() => import("./pages/admin/Index"));
const AdminContactPage = lazy(() => import("./pages/admin/Contact"));
const AdminFeedbackPage = lazy(() => import("./pages/admin/Feedback"));
const AdminNotesPage = lazy(() => import("./pages/admin/Notes"));
const AdminSettingsPage = lazy(() => import("./pages/admin/Settings"));

// Configure query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Loading fallback component
const PageLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="lg" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <Document>
      <ThemeProvider defaultTheme="system" storageKey="sciscribe-theme">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <CustomCursor />
              <CookieConsentBanner />
              <GoogleTagManager />
              <Suspense fallback={<PageLoading />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/summer-offer" element={<SummerOffer />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/refund" element={<Refund />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/thank-you" element={<ThankYou />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/contacts" element={<AdminContactPage />} />
                  <Route path="/admin/feedback" element={<AdminFeedbackPage />} />
                  <Route path="/admin/notes" element={<AdminNotesPage />} />
                  <Route path="/admin/settings" element={<AdminSettingsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Document>
  </HelmetProvider>
);

export default App;
