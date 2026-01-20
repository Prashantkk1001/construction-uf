import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import AdminRedirect from "./pages/AdminRedirect";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,  // 5 min
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* ✅ BrowserRouter - Clean basename */}
      <BrowserRouter basename="/">
        <Navbar />

        <main className="min-h-[calc(100vh-80px)]">
          <Routes>
            {/* ✅ PUBLIC USER ROUTES */}
            <Route index element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:section?" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-login" element={<AdminRedirect />} />

            {/* ✅ ADMIN EXTERNAL REDIRECT - Exact match */}
            {/* <Route 
              path="/admin-login" 
              element={
                <Navigate to="https://rkconstruction-af.vercel.app" replace />
              } 
            />

            {/* ✅ 404 CATCH-ALL - Always LAST */}
            <Route path="*" element={<NotFound />} />
          </Routes> */
        </main>

        <Footer />
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
