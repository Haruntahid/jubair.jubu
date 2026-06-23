import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { ThemeProvider } from "./hooks/useTheme";

// Admin
import AdminLogin from "@/pages/admin/AdminLogin";
import Dashboard from "@/pages/admin/Dashboard";
import AdminProfile from "@/pages/admin/AdminProfile";
import AdminSkills from "@/pages/admin/AdminSkills";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminExperience from "@/pages/admin/AdminExperience";
import AdminInbox from "@/pages/admin/AdminInbox";
import {
  AdminEducation,
  AdminCertifications,
  AdminTestimonials,
  AdminProcessSteps,
  AdminTestingApproaches,
  AdminTerminalCommands,
} from "@/pages/admin/AdminGeneric";
import AdminBlogPostsEnhanced from "@/pages/admin/AdminBlogPostsEnhanced";
import AdminSections from "@/pages/admin/AdminSections";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={Dashboard} />
      <Route path="/admin/profile" component={AdminProfile} />
      <Route path="/admin/sections" component={AdminSections} />
      <Route path="/admin/skills" component={AdminSkills} />
      <Route path="/admin/projects" component={AdminProjects} />
      <Route path="/admin/experience" component={AdminExperience} />
      <Route path="/admin/education" component={AdminEducation} />
      <Route path="/admin/certifications" component={AdminCertifications} />
      <Route path="/admin/testimonials" component={AdminTestimonials} />
      <Route path="/admin/blog-posts" component={AdminBlogPostsEnhanced} />
      <Route path="/admin/process-steps" component={AdminProcessSteps} />
      <Route
        path="/admin/testing-approaches"
        component={AdminTestingApproaches}
      />
      <Route
        path="/admin/terminal-commands"
        component={AdminTerminalCommands}
      />
      <Route path="/admin/inbox" component={AdminInbox} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
