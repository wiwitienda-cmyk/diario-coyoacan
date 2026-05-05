import React, { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import DiarioCoyoacan from "./pages/DiarioCoyoacan";
import { HelmetProvider } from 'react-helmet-async';

// Lazy load rutas secundarias para reducir bundle inicial
const Hemeroteca = lazy(() => import("./pages/Hemeroteca"));
const Noticias = lazy(() => import("./pages/Noticias"));
const AdminNewsletter = lazy(() => import("./pages/AdminNewsletter"));
const HospedajeMundial2026 = lazy(() => import('./pages/HospedajeMundial2026'));
const WorldCup2026En = lazy(() => import('./pages/WorldCup2026En'));
const NewsArticleDetail = lazy(() => import('./pages/NewsArticleDetail'));

// Fallback mínimo para lazy loading
const LazyFallback = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F0E8' }}>
    <p style={{ fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', color: '#722F37' }}>
      Cargando…
    </p>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<LazyFallback />}>
      <Switch>
        <Route path={"/"} component={DiarioCoyoacan} />
        <Route path={"/diario"} component={DiarioCoyoacan} />
        <Route path={"/hemeroteca"} component={Hemeroteca} />
        <Route path={"/archivo"} component={Hemeroteca} />
        <Route path={"/noticias/:slug"} component={NewsArticleDetail} />
        <Route path={"/noticias"} component={Noticias} />
        <Route path={"/hospedaje-mundial-2026"} component={HospedajeMundial2026} />
        <Route path={"/mundial-2026"} component={HospedajeMundial2026} />
        <Route path={"/en"} component={WorldCup2026En} />
        <Route path={"/world-cup-2026"} component={WorldCup2026En} />
        <Route path={"/admin/newsletter"} component={AdminNewsletter} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
