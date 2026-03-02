import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import DiarioCoyoacan from "./pages/DiarioCoyoacan";
import Hemeroteca from "./pages/Hemeroteca";
import Noticias from "./pages/Noticias";
import AdminNewsletter from "./pages/AdminNewsletter";
import HospedajeMundial2026 from './pages/HospedajeMundial2026';
import WorldCup2026En from './pages/WorldCup2026En';
import { HelmetProvider } from 'react-helmet-async';

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={DiarioCoyoacan} />
      <Route path={"/diario"} component={DiarioCoyoacan} />
      <Route path={"/hemeroteca"} component={Hemeroteca} />
      <Route path={"/archivo"} component={Hemeroteca} />
      <Route path={"/noticias"} component={Noticias} />
      <Route path={"/hospedaje-mundial-2026"} component={HospedajeMundial2026} />
      <Route path={"/en"} component={WorldCup2026En} />
      <Route path={"/world-cup-2026"} component={WorldCup2026En} />
      <Route path={"/admin/newsletter"} component={AdminNewsletter} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
