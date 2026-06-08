import {
  LayoutDashboard,
  CalendarDays,
  Building2,
  MessageSquare,
  Star,
  UsersRound,
  BookOpen,
  ClipboardList,
  UserCheck,
  Sparkles,
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
                <Badge variant="outline">nouvelle</Badge> et <strong>sans
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
            <Sparkles className="h-5 w-5 text-gold" />
            <CardTitle>3. Les métriques du Tableau de bord</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed">
          <p>
            Sur l'onglet <em>Tableau de bord</em>, vous voyez en un clin d'œil
            la santé de l'activité&nbsp;:
          </p>
          <ul className="space-y-2">
            <li>
              <strong>Réservations actives</strong> — nombre de séjours en
              cours ou à venir (statuts <em>nouvelle, confirmée, checkin</em>).
            </li>
            <li>
              <strong>Arrivées du jour</strong> — clients qui s'enregistrent
              aujourd'hui. Préparez les clés et l'accueil.
            </li>
            <li>
              <strong>Départs du jour</strong> — clients qui partent. Pensez à
              l'état des lieux et au nettoyage.
            </li>
            <li>
              <strong>Taux d'occupation</strong> — pourcentage d'unités
              occupées sur la période visible.
            </li>
            <li>
              <strong>Chiffre d'affaires</strong> — total des paiements
              encaissés sur la période.
            </li>
            <li>
              <strong>Messages non lus</strong> — demandes clients en attente
              de réponse.
            </li>
          </ul>
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
            icon={<Building2 className="h-4 w-4 text-gold" />}
            title="Logements"
          >
            Gestion du catalogue&nbsp;: descriptions, photos, équipements,
            tarifs, ainsi que la liste des unités physiques (numéros) et leur
            disponibilité.
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
            icon={<UsersRound className="h-4 w-4 text-gold" />}
            title="Administration (propriétaire uniquement)"
          >
            Gestion de l'équipe&nbsp;: ajout de gestionnaires, attribution des
            rôles et permissions. Visible uniquement par le propriétaire.
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
              Ouvrir le <strong>Tableau de bord</strong> — vérifier arrivées /
              départs du jour.
            </li>
            <li>
              Aller dans <strong>Réservations</strong> — traiter les
              <Badge variant="outline" className="mx-1">nouvelle</Badge>
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