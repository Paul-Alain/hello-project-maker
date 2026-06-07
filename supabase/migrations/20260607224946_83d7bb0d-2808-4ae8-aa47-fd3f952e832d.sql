UPDATE public.logements SET images = ARRAY['int-chambre-orange','int-chambre-bleue','chambre-2'] WHERE type = 'chambre';
UPDATE public.logements SET images = ARRAY['studio-confort','studio-salon-led','studio-vue-salon'] WHERE type = 'studio';
UPDATE public.logements SET images = ARRAY['appartement-confort','appartement-vue-salon','int-salon-rotin'] WHERE type = 'appartement';