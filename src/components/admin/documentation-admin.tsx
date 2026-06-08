import {
  LayoutDashboard,
  CalendarDays,
  Building2,
  MessageSquare,
  Star,
  BookOpen,
  ClipboardList,
  UserCheck,
  BarChart3,
  Filter,
  Lightbulb,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/**
 * Documentation interne du tableau de bord administrateur.
 * Destinée aux nouveaux gestionnaires : explique le parcours d'une réservation,
 * l'attribution des logements, les métriques clés et chaque onglet.
 */
export function DocumentationAdmin() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-gold" />
            <CardTitle className="font-display text-2xl">
              Guide du gestionnaire
            </CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Bienvenue&nbsp;! Ce guide vous explique, étape par étape, le
            fonctionnement du tableau de bord d'administration de Panorama&nbsp;P.
            Prenez quelques minutes pour le parcourir : vous y trouverez tout ce
            qu'il faut savoir pour gérer les réservations, attribuer les
            logements et suivre l'activité.
          </p>
        </CardHeader>
      </Card>

      {/* ============ Parcours d'une réservation ============ */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <ClipboardList className="h-5 w-5 text-gold" />
            <CardTitle>1. Parcours d'une réservation client</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            Une réservation peut arriver de <strong>deux façons</strong> :
          </p>

          <div className="rounded-lg border border-border/60 bg-secondary/30 p-4">
            <p className="font-semibold">A. Le client réserve depuis le site</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
              <li>
                Le client se rend sur la page <em>Réservation</em> et choisit
                seulement un <strong>type de logement</strong> (Chambre ou
                Studio), ses dates et le nombre de voyageurs.
              </li>
              <li>
                La réservation est créée avec le statut{" "}
                <Badge variant="outline">en attente de validation</Badge> et <strong>sans
                unité physique attribuée</strong> (aucun numéro de chambre /
                studio précis).
              </li>
              <li>
                Vous recevez une notification dans l'icône cloche en haut à
                droite.
              </li>
            </ol>
          </div>

          <div className="rounded-lg border border-border/60 bg-secondary/30 p-4">
            <p className="font-semibold">B. Vous créez la réservation manuellement</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
              <li>
                Onglet <em>Réservations</em> → bouton{" "}
                <strong>« Nouvelle réservation »</strong>.
              </li>
              <li>
                Renseignez le client, le type de logement, les dates, les
                voyageurs et — si vous le souhaitez — l'unité précise.
              </li>
              <li>
                Si vous laissez <em>« Attribution automatique »</em>, le système
                choisira la première unité libre du type demandé.
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* ============ Attribution des logements ============ */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-gold" />
            <CardTitle>2. Attribution des logements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            Chaque <strong>type</strong> de logement (Chambre, Studio) contient
            plusieurs <strong>unités physiques</strong> numérotées
            (Chambre&nbsp;1, 2, 3… / Studio&nbsp;1, 2, 3…). Le client ne choisit
            jamais une unité&nbsp;: c'est <strong>vous, gestionnaire,</strong>{" "}
            qui décidez.
          </p>

          <div className="space-y-2">
            <p className="font-semibold">Deux manières d'attribuer&nbsp;:</p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                <strong>Manuellement</strong> — ouvrez la réservation (icône
                crayon) et sélectionnez l'unité voulue dans le menu déroulant{" "}
                <em>« Unité »</em>.
              </li>
              <li>
                <strong>Automatiquement</strong> — laissez{" "}
                <em>« Attribution automatique »</em>. Le système&nbsp;:
                <ol className="mt-1 list-decimal space-y-1 pl-5">
                  <li>liste toutes les unités du type demandé,</li>
                  <li>
                    élimine celles qui sont indisponibles ou inactives,
                  </li>
                  <li>
                    élimine celles qui ont déjà une réservation chevauchant les
                    dates,
                  </li>
                  <li>
                    attribue la <strong>première unité libre</strong> dans
                    l'ordre d'affichage (Chambre&nbsp;1 avant Chambre&nbsp;2,
                    etc.).
                  </li>
                </ol>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-gold/30 bg-gold/5 p-3 text-muted-foreground">
            💡 <strong>Astuce&nbsp;:</strong> dans l'onglet{" "}
            <em>Calendrier</em>, les réservations <strong>non attribuées</strong>{" "}
            (venant du site) s'affichent visuellement sur la première unité du
            type pour que vous puissiez les voir d'un coup d'œil. Elles ne
            seront réellement attribuées qu'après votre validation.
          </div>
        </CardContent>
      </Card>

      {/* ============ Métriques ============ */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-gold" />
            <CardTitle>3. Les métriques du Tableau de bord</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Le tableau de bord vous donne, en un coup d'œil, l'activité commerciale
            de la résidence&nbsp;: combien de clients sont logés, combien d'argent
            a été facturé, combien a été encaissé, et ce qu'il reste à encaisser.
          </p>
        </CardHeader>
        <CardContent className="space-y-6 text-sm leading-relaxed">
          {/* Bloc 1 */}
          <div className="rounded-lg border border-border/60 bg-secondary/30 p-4 space-y-2">
            <p className="font-semibold flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-gold" />
              Bloc 1 — Clients logés ou confirmés ce mois
            </p>
            <p className="text-muted-foreground">
              Affiche le nombre de clients <strong>par type de logement</strong>
              {" "}(Chambres, Studios, Appartement) pour le mois en cours.
            </p>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li>
                <strong>Sont comptés</strong>&nbsp;: les réservations avec le
                statut <Badge variant="outline">Confirmée</Badge> ou{" "}
                <Badge variant="outline">Logé ✓</Badge> dont la date d'arrivée
                tombe dans le mois en cours.
              </li>
              <li>
                <strong>Ne sont pas comptés</strong>&nbsp;: les{" "}
                <Badge variant="outline">En attente de validation</Badge> ni
                les <Badge variant="outline">Annulées</Badge>.
              </li>
            </ul>
          </div>

          {/* Bloc 2 */}
          <div className="rounded-lg border border-border/60 bg-secondary/30 p-4 space-y-3">
            <p className="font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-gold" />
              Bloc 2 — Analyse par type de logement
            </p>
            <p className="text-muted-foreground">
              Ce bloc vous permet de croiser <strong>la période</strong>, le
              <strong> statut</strong> et <strong>ce que vous voulez voir</strong>
              {" "}(argent, nombre, encaissé, restant).
            </p>

            <div className="space-y-2">
              <p className="font-semibold flex items-center gap-2">
                <Filter className="h-4 w-4 text-gold" /> Filtre Période
              </p>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                <li>
                  <strong>Par mois / année</strong> — vous sélectionnez un
                  mois précis (ex&nbsp;: juin 2026).
                </li>
                <li>
                  <strong>Période personnalisée</strong> — vous choisissez
                  n'importe quel intervalle de dates (ex&nbsp;: du 5 au 20 du mois).
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-semibold flex items-center gap-2">
                <Filter className="h-4 w-4 text-gold" /> Filtre Statut
              </p>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                <li>
                  <strong>Tous (hors annulés)</strong> — toutes les
                  réservations actives. Vue globale par défaut.
                </li>
                <li>
                  <strong>Confirmées</strong> — réservations confirmées dont
                  la période de réservation n'est pas encore acquise. C'est le revenu à venir.
                </li>
                <li>
                  <strong>Logé ✓</strong> — réservations confirmées dont la période de réservation est acquise
                </li>
                <li>
                  <strong>Annulées</strong> — réservations annulées (montants
                  ramenés à 0).
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-semibold flex items-center gap-2">
                <Filter className="h-4 w-4 text-gold" /> Filtre Afficher
              </p>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                <li>
                  <strong>Chiffre d'affaires</strong> — total des montants
                  facturés prévus sur la période.
                </li>
                <li>
                  <strong>Nombre de réservations</strong> — combien de
                  réservations par type de logement.
                </li>
                <li>
                  <strong>Encaissé</strong> — argent déjà reçu (avances et
                  paiements enregistrés).
                </li>
                <li>
                  <strong>Solde restant</strong> — ce qu'il reste à encaisser
                  = <em>Chiffre d'affaires − Encaissé</em>.
                </li>
              </ul>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* ============ Onglets ============ */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-5 w-5 text-gold" />
            <CardTitle>4. À quoi sert chaque onglet&nbsp;?</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <TabDoc
            icon={<LayoutDashboard className="h-4 w-4 text-gold" />}
            title="Tableau de bord"
          >
            Vue d'ensemble&nbsp;: indicateurs clés, arrivées/départs du jour,
            activité récente. À consulter en premier chaque matin.
          </TabDoc>

          <Separator />

          <TabDoc
            icon={<CalendarDays className="h-4 w-4 text-gold" />}
            title="Réservations"
          >
            Liste complète des réservations. Vous pouvez&nbsp;: filtrer par
            statut, créer une nouvelle réservation, ouvrir le détail, modifier
            (attribuer une unité, changer les dates), confirmer, annuler ou
            faire le check-in / check-out.
          </TabDoc>

          <Separator />

          <TabDoc
            icon={<CalendarDays className="h-4 w-4 text-gold" />}
            title="Calendrier"
          >
            Planning visuel par unité (Chambre&nbsp;1, 2, 3, Studio&nbsp;1…).
            Chaque barre = une réservation. Utile pour repérer les conflits,
            les trous d'occupation, et planifier les attributions.
          </TabDoc>

          <Separator />

          <TabDoc
            icon={<MessageSquare className="h-4 w-4 text-gold" />}
            title="Messages"
          >
            Boîte de réception centralisée des demandes clients. Répondez
            directement depuis l'interface.
          </TabDoc>

          <Separator />

          <TabDoc
            icon={<Star className="h-4 w-4 text-gold" />}
            title="Avis"
          >
            Avis laissés par les clients. Vous pouvez modérer (publier /
            masquer) et répondre publiquement.
          </TabDoc>

          <Separator />

          <TabDoc
            icon={<BookOpen className="h-4 w-4 text-gold" />}
            title="Documentation"
          >
            Le guide que vous lisez en ce moment. Revenez-y à tout moment en
            cas de doute.
          </TabDoc>
        </CardContent>
      </Card>

      {/* ============ Workflow recommandé ============ */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <UserCheck className="h-5 w-5 text-gold" />
            <CardTitle>5. Routine quotidienne recommandée</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-relaxed">
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Ouvrir le <strong>Tableau de bord</strong> pour prendre connaissance de l'activité à jour.
            </li>
            <li>
              Aller dans <strong>Réservations</strong> — traiter les
              <Badge variant="outline" className="mx-1">En attente de validation</Badge>
              (attribuer une unité, confirmer).
            </li>
            <li>
              Vérifier le <strong>Calendrier</strong> pour détecter d'éventuels
              chevauchements.
            </li>
            <li>
              Répondre aux <strong>Messages</strong> non lus.
            </li>
            <li>
              Consulter les nouveaux <strong>Avis</strong> et y répondre.
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

function TabDoc({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 font-semibold">
        {icon}
        {title}
      </div>
      <p className="pl-6 text-muted-foreground">{children}</p>
    </div>
  );
}