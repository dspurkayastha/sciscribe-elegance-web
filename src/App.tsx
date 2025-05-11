
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import CustomCursor from "./components/ui/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Payment from "./pages/Payment";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import Feedback from "./pages/Feedback";
import ThankYou from "./pages/ThankYou";
import AdminLogin from "./pages/admin/Login";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./pages/admin/Index";
import AdminContactPage from "./pages/admin/Contact";
import AdminFeedbackPage from "./pages/admin/Feedback";
import AdminNotesPage from "./pages/admin/Notes";
import AdminSettingsPage from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="sciscribe-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <CustomCursor />
          <Routes>
            <Route path="/" element={<Index />} />
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
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/contact" element={<AdminContactPage />} />
            <Route path="/admin/feedback" element={<AdminFeedbackPage />} />
            <Route path="/admin/notes" element={<AdminNotesPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
