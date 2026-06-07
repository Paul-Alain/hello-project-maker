import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import React, { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Résidence — Premium Living" },
      { name: "description", content: "Résidence de standing offrant des appartements d'exception au cœur de la ville. Luxe, confort et élégance réunis." },
      { name: "author", content: "Résidence" },
      { property: "og:title", content: "Résidence — Premium Living" },
      { property: "og:description", content: "Résidence de standing offrant des appartements d'exception au cœur de la ville." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@residence" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/logements", label: "Logements" },
    { to: "/services", label: "Services" },
    { to: "/a-propos", label: "À propos" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-deep flex items-center justify-center rounded-sm">
              <span className="text-cream font-serif text-xl font-bold">R</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-xl font-semibold leading-tight ${scrolled ? "text-foreground" : "text-white"}`}>
                Résidence
              </span>
              <span className={`text-[10px] tracking-[0.25em] uppercase leading-tight ${scrolled ? "text-muted-foreground" : "text-white/70"}`}>
                Premium Living
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-gold ${
                  scrolled ? "text-foreground/80" : "text-white/80"
                }`}
                activeProps={{ className: "text-gold" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-gold text-charcoal text-sm font-semibold tracking-wide uppercase rounded-sm hover:bg-gold-muted transition-colors"
            >
              Visiter
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
            aria-label="Menu"
          >
            <div className={`w-6 h-0.5 transition-all ${scrolled ? "bg-foreground" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <div className={`w-6 h-0.5 mt-1.5 transition-all ${scrolled ? "bg-foreground" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-0.5 mt-1.5 transition-all ${scrolled ? "bg-foreground" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="text-foreground py-2 text-sm font-medium tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="px-5 py-2.5 bg-gold text-charcoal text-sm font-semibold tracking-wide uppercase rounded-sm text-center mt-2"
            >
              Visiter
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-deep text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gold flex items-center justify-center rounded-sm">
                <span className="text-charcoal font-serif text-xl font-bold">R</span>
              </div>
              <span className="font-serif text-2xl font-semibold text-cream">Résidence</span>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed">
              Un lieu de vie exceptionnel où le luxe rencontre le confort au cœur de la ville.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-gold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {["Accueil", "Logements", "Services", "À propos", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Accueil" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-cream/60 hover:text-gold text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-gold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-cream/60">
              <li>123 Avenue des Champs-Élysées</li>
              <li>75008 Paris, France</li>
              <li>+33 1 23 45 67 89</li>
              <li>contact@residence.fr</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-gold mb-4">Horaires</h4>
            <ul className="space-y-2 text-sm text-cream/60">
              <li>Lun - Ven : 9h - 19h</li>
              <li>Samedi : 10h - 17h</li>
              <li>Dimanche : Sur rendez-vous</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-cream/40 text-sm">
            © {currentYear} Résidence. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-cream/40">
            <span className="hover:text-gold cursor-pointer transition-colors">Mentions légales</span>
            <span className="hover:text-gold cursor-pointer transition-colors">Confidentialité</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
