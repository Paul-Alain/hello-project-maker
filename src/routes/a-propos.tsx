import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À Propos — Résidence Premium Living" },
      { name: "description", content: "Depuis plus de 12 ans, Résidence redéfinit l'art de vivre en ville avec des appartements d'exception et des services premium." },
      { property: "og:title", content: "À Propos — Résidence Premium Living" },
      { property: "og:description", content: "Notre histoire, notre vision et notre engagement envers l'excellence." },
    ],
  }),
  component: APropos,
});

function APropos() {
  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-20 bg-emerald-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">Notre Identité</span>
            <h1 className="font-serif text-5xl md:text-6xl text-cream mt-3 mb-4">
              À Propos de Nous
            </h1>
            <p className="text-cream/60 max-w-2xl mx-auto text-lg">
              Une vision audacieuse du logement de standing, fondée sur l'excellence et le souci du détail.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800"
                alt="Notre résidence"
                className="rounded-sm shadow-2xl w-full object-cover h-[500px]"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 bg-emerald-deep p-8 rounded-sm shadow-lg max-w-[250px]">
                <div className="font-serif text-4xl text-gold font-semibold">2012</div>
                <div className="text-cream/80 text-sm mt-2">Année de création de la Résidence</div>
              </div>
            </div>
            <div>
              <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">Notre Histoire</span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-3 mb-6">
                Une Vision Depuis 2012
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Fondée en 2012, Résidence est née d'une conviction simple : le logement de standing ne devrait pas seulement être un lieu de vie, mais une véritable expérience au quotidien.
                </p>
                <p>
                  Notre fondateur, passionné d'architecture et de design d'intérieur, a imaginé des espaces où le luxe ne se mesure pas à la grandeur des surfaces, mais à la qualité de chaque détail.
                </p>
                <p>
                  Depuis plus d'une décennie, nous avons accueilli des centaines de résidents qui ont fait de nos appartements leur foyer. Chaque retour d'expérience nourrit notre engagement continu envers l'excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">Nos Valeurs</span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-3">
              Ce Qui Nous Anime
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                letter: "E",
                title: "Excellence",
                description: "Nous ne transigeons jamais sur la qualité. Chaque matériau, chaque finition est choisi avec le plus grand soin.",
              },
              {
                letter: "A",
                title: "Attention",
                description: "L'écoute et la personnalisation sont au cœur de notre approche. Chaque résident est unique, chaque besoin est important.",
              },
              {
                letter: "R",
                title: "Responsabilité",
                description: "Engagés envers l'environnement, nous privilégions les matériaux durables et les solutions éco-responsables.",
              },
              {
                letter: "T",
                title: "Transmission",
                description: "Nous transmettons notre savoir-faire et notre passion pour créer des lieux de vie qui durent dans le temps.",
              },
            ].map((value, i) => (
              <div key={i} className="bg-card p-8 rounded-sm border border-border text-center">
                <div className="w-16 h-16 bg-emerald-deep text-cream font-serif text-3xl font-bold rounded-full flex items-center justify-center mx-auto mb-6">
                  {value.letter}
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">Notre Équipe</span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-3">
              Les Visages de Résidence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Alexandre Moreau",
                role: "Fondateur & Directeur",
                initial: "A",
              },
              {
                name: "Camille Lefebvre",
                role: "Directrice de Résidence",
                initial: "C",
              },
              {
                name: "Nicolas Petit",
                role: "Responsable Conciergerie",
                initial: "N",
              },
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 bg-emerald-deep rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="font-serif text-4xl text-cream font-bold">{member.initial}</span>
                </div>
                <h3 className="font-serif text-xl text-foreground">{member.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-emerald-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "12+", label: "Années d'expérience" },
              { value: "500+", label: "Résidents satisfaits" },
              { value: "24", label: "Appartements de standing" },
              { value: "15", label: "Professionnels dédiés" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-serif text-5xl md:text-6xl text-gold font-semibold">{stat.value}</div>
                <div className="text-cream/60 text-sm mt-2 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Rejoignez l'Aventure
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Venez découvrir par vous-même ce qui fait la particularité de la Résidence. Nous serons ravis de vous accueillir.
          </p>
          <Link
            to="/contact"
            className="inline-flex px-8 py-4 bg-emerald-deep text-cream font-semibold tracking-wide uppercase text-sm rounded-sm hover:bg-emerald-rich transition-all duration-300"
          >
            Planifier une visite
          </Link>
        </div>
      </section>
    </>
  );
}
