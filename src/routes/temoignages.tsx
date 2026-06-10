import { createFileRoute } from "@tanstack/react-router";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export const Route = createFileRoute("/temoignages")({
  head: () => ({
    meta: [
      { title: "Témoignages – Avis clients | Panorama P" },
      {
        name: "description",
        content:
          "Découvrez les avis de nos voyageurs sur la résidence meublée Panorama P à Bafoussam.",
      },
      { property: "og:title", content: "Témoignages – Panorama P" },
      { property: "og:description", content: "Les avis de nos voyageurs." },
    ],
    links: [{ rel: "canonical", href: "/temoignages" }],
  }),
  component: TemoignagesPage,
});

function TemoignagesPage() {
  return (
    <>
      <TestimonialsSection />
    </>
  );
}
