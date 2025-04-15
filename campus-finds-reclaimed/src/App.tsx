
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import BrowseItems from "./pages/BrowseItems";
import ItemDetail from "./pages/ItemDetail";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lost" element={<ReportLost />} />
          <Route path="/found" element={<ReportFound />} />
          <Route path="/browse" element={<BrowseItems />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/forum" element={<Community />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
