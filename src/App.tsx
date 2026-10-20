import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/sonner";
import { CompanyProvider } from "./context/CompanyContext";
import { Index } from "./pages/Index";
import { AppLayout } from "./components/layout/AppLayout";
import { CompanyIntelligence } from "./pages/CompanyIntelligence";
import { SkillIntelligence } from "./pages/SkillIntelligence";
import { NotFound } from "./pages/NotFound";

// Configure TanStack QueryClient exactly as specified
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,    // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <CompanyProvider>
          <BrowserRouter>
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-screen bg-white">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <Routes>
                {/* Home route displaying the company catalog */}
                <Route path="/" element={<Index />} />

                {/* Company nested routes */}
                <Route path="/company" element={<AppLayout />}>
                  <Route index element={<Navigate to="intelligence" replace />} />
                  <Route path="intelligence" element={<CompanyIntelligence />} />
                  <Route path="skills" element={<SkillIntelligence />} />
                </Route>

                {/* Catch-all for unmatched routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CompanyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
