import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PWAInstallPrompt } from "@/components/features/PWAInstallPrompt";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import ProjectDetail from "./pages/ProjectDetail";
import DiscussionDetail from "./pages/DiscussionDetail";
import MyTasks from "./pages/MyTasks";
import Solutions from "./pages/Solutions";
import Work from "./pages/Work";
import About from "./pages/About";
import Documents from "./pages/Documents";
import Analytics from "./pages/Analytics";
import TimeTracking from "./pages/TimeTracking";
import Profile from "./pages/Profile";
import PhotoDemo from "./pages/PhotoDemo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("synergy-theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("synergy-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("synergy-theme", "light");
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/work" element={<Work />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/project/:projectId/discussion/:discussionId" element={<DiscussionDetail />} />
              <Route path="/my-tasks" element={<MyTasks />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/time-tracking" element={<TimeTracking />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/photo-demo" element={<PhotoDemo />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <PWAInstallPrompt />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
