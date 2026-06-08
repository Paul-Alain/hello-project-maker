-- ══════════════════════════════════════════════════════
-- MIGRATION — Assigner automatiquement une unité
-- à chaque nouvelle réservation sans logement_unit_id
-- ══════════════════════════════════════════════════════

-- Corriger les réservations existantes sans unité
UPDATE public.reservations r
SET logement_unit_id = (
  SELECT lu.id 
  FROM public.logement_units lu
  JOIN public.logements l ON l.id = lu.logement_id
  WHERE l.type = r.logement_type
  AND lu.available = true
  ORDER BY lu.sort_order
  LIMIT 1
)
WHERE r.logement_unit_id IS NULL
AND r.logement_type IS NOT NULL;
