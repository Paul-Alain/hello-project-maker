import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/logements")({
  head: () => ({
    meta: [
      { title: "Nos Logements — Résidence Premium Living" },
      { name: "description", content: "Découvrez nos appartements de standing : studios, T3, T4 et penthouse. Luxe, confort et élégance au cœur de la ville." },
      { property: "og:title", content: "Nos Logements — Résidence Premium Living" },
      { property: "og:description", content: "Appartements de standing disponibles à la location." },
    ],
  }),
  component: Logements,
});

const apartments = [
  {
    id: 1,
    name: "Le Panoramique",
    type: "T4",
    area: 145,
    price: 2450,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400",
    ],
    features: ["Terrasse panoramique 40m²", "Cuisine équipée premium", "Parking sous-sol", "2 salles de bain", "Cave", "Climatisation"],
    description: "Notre joyau architectural. Un appartement spacieux avec une terrasse offrant une vue imprenable sur la ville, idéal pour recevoir en grand.",
    available: true,
  },
  {
    id: 2,
    name: "L'Élégant",
    type: "T3",
    area: 95,
    price: 1850,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498a?auto=format&fit=crop&q=80&w=400",
    ],
    features: ["Baignoire îlot", "Dressing walk-in", "Vue sur jardin", "Parking", "Balcon", "Domotique"],
    description: "L'alliance parfaite entre espace et intimité. Profitez d'un dressing spacieux et d'une baignoire îlot pour des moments de détente absolus.",
    available: true,
  },
  {
    id: 3,
    name: "Le Cosy",
    type: "Studio",
    area: 45,
    price: 950,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1600573472550-0f8b0a377a66?auto=format&fit=crop&q=80&w=400",
    ],
    features: ["Mezzanine", "Espace bureau intégré", "Balcon 8m²", "Rangement optimisé", "Kitchenette premium"],
    description: "Un studio astucieusement aménagé avec mezzanine et espace bureau. Parfait pour les jeunes professionnels qui recherchent style et fonctionnalité.",
    available: true,
  },
  {
    id: 4,
    name: "Le Duplex",
    type: "T4",
    area: 160,
    price: 3200,
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=400",
    ],
    features: ["Double hauteur sous plafond", "Cheminée", "Jardin privatif", "Garage double", "Salle de cinéma", "Cave à vin"],
    description: "Une maison dans la maison. Ce duplex offre des volumes exceptionnels avec cheminée et jardin privatif pour une vie familiale recherchée.",
    available: false,
  },
  {
    id: 5,
    name: "Le Penthouse",
    type: "T5",
    area: 220,
    price: 4500,
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498a?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498a?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1600566752355-35792bed522a?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&q=80&w=400",
    ],
    features: ["Rooftop privé 80m²", "Piscine", "Ascenseur privatif", "3 places parking", "Cave", "Buanderie"],
    description: "L'expérience ultime en haut de gamme. Un penthouse avec rooftop privé et piscine, accessible par ascenseur privatif. L'excellence absolue.",
    available: true,
  },
  {
    id: 6,
    name: "Le Jardin",
    type: "T2",
    area: 75,
    price: 1400,
    image: "https://images.unsplash.com/photo-1600566752355-35792bed522a?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bed522a?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1600573472591-ee6981cf81f0?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=400",
    ],
    features: ["Jardin privatif 30m²", "Terrasse couverte", "Cuisine ouverte", "Parking", "Rangement", "Baies vitrées"],
    description: "Un appartement-jardin rare en ville. Profitez d'un extérieur privatif avec terrasse couverte, parfait pour les amoureux de la nature en plein cœur urbain.",
    available: true,
  },
];

function Logements() {
  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-20 bg-emerald-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">Nos Appartements</span>
            <h1 className="font-serif text-5xl md:text-6xl text-cream mt-3 mb-4">
              Logements d'Exception
            </h1>
            <p className="text-cream/60 max-w-2xl mx-auto text-lg">
              Du studio intimiste au penthouse somptueux, chaque appartement est pensé pour votre confort et votre bien-être.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-background border-b border-border sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-muted-foreground">Filtrer par :</span>
            {["Tous", "Studio", "T2", "T3", "T4", "T5"].map((filter) => (
              <button
                key={filter}
                className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                  filter === "Tous"
                    ? "bg-emerald-deep text-cream border-emerald-deep"
                    : "bg-background text-foreground border-border hover:border-emerald-deep"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Apartments Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((apt) => (
              <div key={apt.id} className="group bg-card rounded-sm border border-border overflow-hidden hover:shadow-xl transition-shadow duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={apt.image}
                    alt={apt.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-emerald-deep/90 text-cream text-xs font-semibold rounded-sm">
                      {apt.type}
                    </span>
                    {!apt.available && (
                      <span className="px-3 py-1 bg-gold/90 text-charcoal text-xs font-semibold rounded-sm">
                        Loué
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-foreground">{apt.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{apt.area} m²</p>
                  <p className="text-gold font-semibold mt-2">{apt.price.toLocaleString()} €/mois</p>
                  <p className="text-muted-foreground text-sm mt-3 line-clamp-2">{apt.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {apt.features.slice(0, 3).map((f, i) => (
                      <span key={i} className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        {f}
                      </span>
                    ))}
                    {apt.features.length > 3 && (
                      <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        +{apt.features.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Link
                      to="/contact"
                      className={`flex-1 text-center px-4 py-2.5 rounded-sm text-sm font-semibold transition-colors ${
                        apt.available
                          ? "bg-emerald-deep text-cream hover:bg-emerald-rich"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      {apt.available ? "Prendre rendez-vous" : "Liste d'attente"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
