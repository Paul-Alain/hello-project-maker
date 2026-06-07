UPDATE public.logements
SET images = ARRAY['chambre-11', 'int-chambre-orange', 'int-chambre-bleue']
WHERE type = 'chambre';

UPDATE public.logements
SET images = ARRAY['salon-10', 'studio-confort', 'studio-salon-led']
WHERE type = 'studio';

UPDATE public.logements
SET images = ARRAY['appartement-vue-salon', 'appartement-confort', 'int-salon-rotin']
WHERE type = 'appartement';