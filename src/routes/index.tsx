import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Résidence — Premium Living" },
      { name: "description", content: "Résidence de standing offrant des appartements d'exception au cœur de la ville. Luxe, confort et élégance réunis." },
      { property: "og:title", content: "Résidence — Premium Living" },
      { property: "og:description", content: "Découvrez nos appartements de standing et vivez l'exceptionnel au quotidien." },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1920')",
          }}
        />
        <div className="absolute inset-0 bg-charcoal/60" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" ref={ref}>
          <div className="inline-block px-4 py-1.5 border border-gold/50 rounded-full mb-6">
            <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">
              Résidence de Standing
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream font-semibold leading-[0.95] mb-6">
            L'Art de Vivre
            <span className="block text-gold italic">Autrement</span>
          </h1>
          <p className="text-cream/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Des appartements d'exception où chaque détail a été pensé pour votre bien-être,
            au cœur des plus beaux quartiers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/logements"
              className="px-8 py-4 bg-gold text-charcoal font-semibold tracking-wide uppercase text-sm rounded-sm hover:bg-gold-muted transition-all duration-300"
            >
              Découvrir nos logements
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border border-cream/30 text-cream font-semibold tracking-wide uppercase text-sm rounded-sm hover:bg-cream/10 transition-all duration-300"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-cream/40 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gold/50 animate-pulse" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-emerald-deep py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "24", label: "Appartements" },
              { value: "5★", label: "Note moyenne" },
              { value: "12+", label: "Années d'expérience" },
              { value: "98%", label: "Clients satisfaits" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-serif text-4xl md:text-5xl text-gold font-semibold">{stat.value}</div>
                <div className="text-cream/60 text-sm mt-2 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Apartments */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">Nos Sélections</span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-3 mb-4">
              Logements d'Exception
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chaque appartement est un univers à part entière, conçu pour offrir une expérience de vie incomparable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Le Panoramique",
                type: "T4 — 145 m²",
                price: "À partir de 2 450 €/mois",
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
                features: ["Terrasse panoramique", "Cuisine équipée", "Parking inclus"],
              },
              {
                name: "L'Élégant",
                type: "T3 — 95 m²",
                price: "À partir de 1 850 €/mois",
                image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
                features: ["Baignoire îlot", "Dressing", "Vue sur jardin"],
              },
              {
                name: "Le Cosy",
                type: "Studio — 45 m²",
                price: "À partir de 950 €/mois",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
                features: ["Mezzanine", "Espace bureau", "Balcon"],
              },
            ].map((apt, i) => (
              <Link key={i} to="/logements" className="group block">
                <div className="relative overflow-hidden rounded-sm bg-card shadow-sm hover:shadow-xl transition-shadow duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={apt.image}
                      alt={apt.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gold/90 text-charcoal text-xs font-semibold rounded-sm">
                        {apt.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-foreground group-hover:text-emerald-deep transition-colors">
                      {apt.name}
                    </h3>
                    <p className="text-gold text-sm font-semibold mt-1">{apt.price}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {apt.features.map((f, j) => (
                        <span key={j} className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/logements"
              className="inline-flex items-center gap-2 text-emerald-deep font-semibold hover:text-gold transition-colors text-sm tracking-wide uppercase"
            >
              Voir tous les logements
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">Services Premium</span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-3 mb-6">
                Le Confort d'un Hôtel,
                <span className="block text-emerald-deep">La Liberté d'un Chez-Vous</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Profitez d'une gamme complète de services pensés pour simplifier votre quotidien et
                transformer votre séjour en une expérience mémorable.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: "🛎️", title: "Concierge 24/7", desc: "À votre service jour et nuit" },
                  { icon: "🏋️", title: "Salle de sport", desc: "Équipement haut de gamme" },
                  { icon: "🧹", title: "Ménage", desc: "Service hebdomadaire inclus" },
                  { icon: "🚗", title: "Parking", desc: "Places sécurisées disponibles" },
                ].map((service, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{service.title}</h4>
                      <p className="text-muted-foreground text-xs mt-0.5">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-deep text-cream text-sm font-semibold tracking-wide uppercase rounded-sm hover:bg-emerald-rich transition-colors"
              >
                Tous nos services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800"
                alt="Services Résidence"
                className="rounded-sm shadow-2xl w-full object-cover h-[500px]"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-6 bg-gold p-6 rounded-sm shadow-lg max-w-[200px]">
                <div className="font-serif text-3xl text-charcoal font-semibold">24/7</div>
                <div className="text-charcoal/80 text-sm mt-1">Service concierge disponible à toute heure</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">Témoignages</span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-3">
              Ce Qu'ils En Disent
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sophie Martin",
                role: "Résidente depuis 2021",
                text: "Un cadre de vie exceptionnel. La qualité des finitions et l'attention portée aux détails font toute la différence.",
                rating: 5,
              },
              {
                name: "Lucas Dubois",
                role: "Résident depuis 2022",
                text: "Le service concierge est impeccable. C'est rare de trouver un endroit aussi bien pensé pour le confort quotidien.",
                rating: 5,
              },
              {
                name: "Émilie Rousseau",
                role: "Résidente depuis 2020",
                text: "Je recommande vivement. L'emplacement est idéal et les équipements sont de premier choix.",
                rating: 5,
              },
            ].map((t, i) => (
              <div key={i} className="bg-card p-8 rounded-sm border border-border">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground/80 italic leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-deep rounded-full flex items-center justify-center">
                    <span className="text-cream text-sm font-semibold">{t.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600573472591-ee6981cf81f0?auto=format&fit=crop&q=80&w=1920')",
          }}
        />
        <div className="absolute inset-0 bg-emerald-deep/80" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <h2 className="font-serif text-4xl md:text-5xl text-cream mb-6">
            Prêt à Vivre l'Exceptionnel ?
          </h2>
          <p className="text-cream/70 text-lg mb-10">
            Prenez rendez-vous pour une visite personnalisée et découvrez votre futur chez-vous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-gold text-charcoal font-semibold tracking-wide uppercase text-sm rounded-sm hover:bg-gold-muted transition-all duration-300"
            >
              Réserver une visite
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border border-cream/30 text-cream font-semibold tracking-wide uppercase text-sm rounded-sm hover:bg-cream/10 transition-all duration-300"
            >
              Nous appeler
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
