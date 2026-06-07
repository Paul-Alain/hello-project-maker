import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Nos Services — Résidence Premium Living" },
      { name: "description", content: "Services premium : conciergerie 24/7, salle de sport, parking, ménage et bien plus. Profitez du confort d'un hôtel dans votre résidence." },
      { property: "og:title", content: "Nos Services — Résidence Premium Living" },
      { property: "og:description", content: "Services premium pour un quotidien simplifié." },
    ],
  }),
  component: Services,
});

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Conciergerie 24/7",
    description: "Notre équipe de concierges est disponible à toute heure pour répondre à vos besoins : réservations, livraisons, recommandations et assistance personnalisée.",
    highlight: "Disponible jour & nuit",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Salle de Sport Premium",
    description: "Accès illimité à notre salle de sport équipée des dernières machines Technogym, espace yoga et sauna pour votre bien-être quotidien.",
    highlight: "Accès inclus",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Ménage Régulier",
    description: "Service de ménage hebdomadaire inclus dans votre forfait. Nos professionnels utilisent des produits écologiques pour un intérieur toujours impeccable.",
    highlight: "Hebdomadaire inclus",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: "Parking Sécurisé",
    description: "Places de parking en sous-sol avec accès contrôlé, bornes de recharge pour véhicules électriques et service de voiturier disponible sur demande.",
    highlight: "Recharge électrique",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Espaces Communs",
    description: "Profitez de nos espaces partagés : salon bibliothèque, terrasse panoramique, salle de réunion et espace coworking avec connexion fibre.",
    highlight: "Terrasse panoramique",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Sécurité & Surveillance",
    description: "Sécurité 24/7 avec personnel de gardiennage, vidéosurveillance, contrôle d'accès biométrique et interphone connecté à votre smartphone.",
    highlight: "Biométrie & vidéo",
  },
];

function Services() {
  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-20 bg-emerald-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">Prestations</span>
            <h1 className="font-serif text-5xl md:text-6xl text-cream mt-3 mb-4">
              Services Premium
            </h1>
            <p className="text-cream/60 max-w-2xl mx-auto text-lg">
              Le confort d'un palace, l'intimité d'un chez-vous. Tous nos services sont pensés pour simplifier votre quotidien.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="group bg-card p-8 rounded-sm border border-border hover:border-gold/30 hover:shadow-lg transition-all duration-500"
              >
                <div className="w-14 h-14 bg-emerald-deep/10 text-emerald-deep rounded-sm flex items-center justify-center mb-6 group-hover:bg-emerald-deep group-hover:text-cream transition-colors duration-500">
                  {service.icon}
                </div>
                <span className="text-gold text-xs font-semibold tracking-wide uppercase">{service.highlight}</span>
                <h3 className="font-serif text-2xl text-foreground mt-2 mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">Services Complémentaires</span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-3 mb-6">
                Des Services Sur Mesure
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Au-delà de nos services inclus, nous proposons une gamme de prestations sur demande pour répondre à vos besoins spécifiques.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Blanchisserie & pressing", desc: "Service de linge avec ramassage et livraison" },
                  { title: "Garde d'animaux", desc: "Dog walking et pet sitting sur demande" },
                  { title: "Cours de yoga privés", desc: "Sessions personnalisées avec instructeur certifié" },
                  { title: "Chef à domicile", desc: "Service de traiteur et cours de cuisine" },
                  { title: "Location de véhicules", desc: "Flotte de véhicules premium disponibles" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-background rounded-sm border border-border">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                      <p className="text-muted-foreground text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800"
                alt="Services sur mesure"
                className="rounded-sm shadow-2xl w-full object-cover h-[600px]"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -right-4 bg-gold p-6 rounded-sm shadow-lg">
                <div className="font-serif text-3xl text-charcoal font-semibold">20+</div>
                <div className="text-charcoal/80 text-sm">Services disponibles</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-deep">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-cream mb-4">
            Découvrez Tous Nos Services
          </h2>
          <p className="text-cream/60 mb-8">
            Contactez-nous pour un entretien personnalisé et découvrez comment nous pouvons adapter nos services à vos besoins.
          </p>
          <Link
            to="/contact"
            className="inline-flex px-8 py-4 bg-gold text-charcoal font-semibold tracking-wide uppercase text-sm rounded-sm hover:bg-gold-muted transition-all duration-300"
          >
            Prendre rendez-vous
          </Link>
        </div>
      </section>
    </>
  );
}
