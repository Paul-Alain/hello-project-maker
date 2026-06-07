-- MIGRATION 1 — Structure de base
CREATE TYPE public.app_role AS ENUM (
  'admin', 'user', 'proprietaire', 'gestionnaire',
  'technicien', 'reception', 'menage', 'comptable'
);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN new.updated_at = now(); RETURN new; END; $$;

CREATE TABLE public.logements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'studio',
  title_fr text NOT NULL,
  title_de text, title_en text,
  description_fr text, description_de text, description_en text,
  price numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'FCFA',
  price_unit text NOT NULL DEFAULT 'nuit',
  equipments text[] NOT NULL DEFAULT '{}',
  images text[] NOT NULL DEFAULT '{}',
  available boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.logements TO anon, authenticated;
GRANT ALL ON public.logements TO service_role;
ALTER TABLE public.logements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view logements" ON public.logements FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff manage logements" ON public.logements FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'proprietaire') OR public.has_role(auth.uid(),'gestionnaire'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'proprietaire') OR public.has_role(auth.uid(),'gestionnaire'));
CREATE TRIGGER logements_updated_at BEFORE UPDATE ON public.logements FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL, location text,
  rating int NOT NULL DEFAULT 5,
  message_fr text NOT NULL, message_de text, message_en text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff manage testimonials" ON public.testimonials FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'proprietaire') OR public.has_role(auth.uid(),'gestionnaire'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'proprietaire') OR public.has_role(auth.uid(),'gestionnaire'));

CREATE TABLE public.reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL, phone text NOT NULL, email text,
  user_id uuid REFERENCES auth.users(id),
  logement_type text, logement_unit_id uuid,
  arrival_date date NOT NULL, departure_date date NOT NULL,
  arrival_time text NOT NULL DEFAULT '14:00',
  departure_time text NOT NULL DEFAULT '11:00',
  guests int NOT NULL DEFAULT 1,
  channel text NOT NULL DEFAULT 'website',
  status text NOT NULL DEFAULT 'nouvelle',
  payment_status text NOT NULL DEFAULT 'non_paye',
  total_amount numeric NOT NULL DEFAULT 0,
  advance_amount numeric NOT NULL DEFAULT 0,
  message text, notes text,
  checkin_at timestamptz, checkout_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.reservations TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.reservations TO authenticated;
GRANT ALL ON public.reservations TO service_role;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create reservation" ON public.reservations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE TRIGGER reservations_updated_at BEFORE UPDATE ON public.reservations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL, phone text, email text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'nouveau',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create message" ON public.messages FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text, phone_number text, avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Staff can view all profiles" ON public.profiles FOR SELECT TO authenticated
  USING (has_role(auth.uid(),'admin'::app_role) OR has_role(auth.uid(),'proprietaire'::app_role) OR has_role(auth.uid(),'gestionnaire'::app_role));
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone_number, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'phone_number', NEW.raw_user_meta_data ->> 'avatar_url')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- app_config + bootstrap_admin
CREATE TABLE public.app_config (
  id boolean PRIMARY KEY DEFAULT true,
  admin_bootstrapped boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT app_config_singleton CHECK (id)
);
GRANT SELECT ON public.app_config TO authenticated;
GRANT ALL ON public.app_config TO service_role;
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read app config" ON public.app_config FOR SELECT TO authenticated USING (true);
INSERT INTO public.app_config (id, admin_bootstrapped) VALUES (true, false);

CREATE OR REPLACE FUNCTION public.bootstrap_admin(_user_id uuid)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _consumed boolean;
BEGIN
  SELECT admin_bootstrapped INTO _consumed FROM public.app_config WHERE id = true FOR UPDATE;
  IF _consumed IS TRUE THEN RETURN false; END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    UPDATE public.app_config SET admin_bootstrapped = true, updated_at = now() WHERE id = true;
    RETURN false;
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (_user_id, 'admin') ON CONFLICT (user_id, role) DO NOTHING;
  UPDATE public.app_config SET admin_bootstrapped = true, updated_at = now() WHERE id = true;
  RETURN true;
END; $$;
REVOKE ALL ON FUNCTION public.bootstrap_admin(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.bootstrap_admin(uuid) TO service_role;

-- Logement units
CREATE TABLE public.logement_units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logement_id uuid NOT NULL REFERENCES public.logements(id) ON DELETE CASCADE,
  label text NOT NULL,
  unit_number integer NOT NULL DEFAULT 1,
  available boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  op_status text NOT NULL DEFAULT 'actif',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.logement_units TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.logement_units TO authenticated;
GRANT ALL ON public.logement_units TO service_role;
ALTER TABLE public.logement_units ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view logement units" ON public.logement_units FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff manage logement units" ON public.logement_units FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin'::app_role) OR has_role(auth.uid(),'proprietaire'::app_role) OR has_role(auth.uid(),'gestionnaire'::app_role))
  WITH CHECK (has_role(auth.uid(),'admin'::app_role) OR has_role(auth.uid(),'proprietaire'::app_role) OR has_role(auth.uid(),'gestionnaire'::app_role));
CREATE TRIGGER set_logement_units_updated_at BEFORE UPDATE ON public.logement_units FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- is_staff
CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role::text = ANY (ARRAY['admin','proprietaire','gestionnaire']))
$$;
REVOKE EXECUTE ON FUNCTION public.is_staff(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_staff(uuid) TO authenticated, service_role;

-- reservations + messages staff/user policies
CREATE POLICY "Staff read reservations" ON public.reservations FOR SELECT TO authenticated
  USING (is_staff(auth.uid()) OR auth.uid() = user_id);
CREATE POLICY "Staff update reservations" ON public.reservations FOR UPDATE TO authenticated
  USING (is_staff(auth.uid())) WITH CHECK (is_staff(auth.uid()));
CREATE POLICY "Owner delete reservations" ON public.reservations FOR DELETE TO authenticated
  USING (has_role(auth.uid(),'admin'::app_role) OR has_role(auth.uid(),'proprietaire'::app_role));

CREATE POLICY "Staff read messages" ON public.messages FOR SELECT TO authenticated
  USING (is_staff(auth.uid()) OR auth.uid() = user_id);
CREATE POLICY "Staff update messages" ON public.messages FOR UPDATE TO authenticated
  USING (is_staff(auth.uid())) WITH CHECK (is_staff(auth.uid()));
CREATE POLICY "Owner delete messages" ON public.messages FOR DELETE TO authenticated
  USING (has_role(auth.uid(),'admin'::app_role) OR has_role(auth.uid(),'proprietaire'::app_role));

-- user_roles admin policies
CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(),'admin'::app_role) OR has_role(auth.uid(),'proprietaire'::app_role));
CREATE POLICY "Admins can update roles" ON public.user_roles FOR UPDATE TO authenticated
  USING (has_role(auth.uid(),'admin'::app_role) OR has_role(auth.uid(),'proprietaire'::app_role))
  WITH CHECK (has_role(auth.uid(),'admin'::app_role) OR has_role(auth.uid(),'proprietaire'::app_role));
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE TO authenticated
  USING (has_role(auth.uid(),'admin'::app_role) OR has_role(auth.uid(),'proprietaire'::app_role));

-- payments
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id uuid NOT NULL REFERENCES public.reservations(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  method text NOT NULL DEFAULT 'especes',
  recorded_by uuid, recorded_by_name text, note text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff manage payments" ON public.payments FOR ALL TO authenticated
  USING (is_staff(auth.uid())) WITH CHECK (is_staff(auth.uid()));

-- activity_log
CREATE TABLE public.activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid, user_name text,
  action text NOT NULL,
  object_type text, object_id text, summary text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.activity_log TO authenticated;
GRANT ALL ON public.activity_log TO service_role;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff read activity" ON public.activity_log FOR SELECT TO authenticated USING (is_staff(auth.uid()));
CREATE POLICY "Staff insert activity" ON public.activity_log FOR INSERT TO authenticated
  WITH CHECK (is_staff(auth.uid()) AND (user_id = auth.uid() OR user_id IS NULL));

-- residence_settings
CREATE TABLE public.residence_settings (
  id boolean PRIMARY KEY DEFAULT true,
  name text NOT NULL DEFAULT 'Résidence Panorama P',
  logo_url text,
  currency text NOT NULL DEFAULT 'FCFA',
  checkin_time text NOT NULL DEFAULT '14:00',
  checkout_time text NOT NULL DEFAULT '11:00',
  deposit_percent integer NOT NULL DEFAULT 30,
  cancellation_policy text, taxes text,
  email_notifications boolean NOT NULL DEFAULT true,
  language text NOT NULL DEFAULT 'fr',
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT residence_settings_singleton CHECK (id = true)
);
GRANT SELECT, INSERT, UPDATE ON public.residence_settings TO authenticated;
GRANT ALL ON public.residence_settings TO service_role;
ALTER TABLE public.residence_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff read settings" ON public.residence_settings FOR SELECT TO authenticated USING (is_staff(auth.uid()));
CREATE POLICY "Owner update settings" ON public.residence_settings FOR UPDATE TO authenticated
  USING (has_role(auth.uid(),'admin'::app_role) OR has_role(auth.uid(),'proprietaire'::app_role))
  WITH CHECK (has_role(auth.uid(),'admin'::app_role) OR has_role(auth.uid(),'proprietaire'::app_role));
CREATE POLICY "Owner insert settings" ON public.residence_settings FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(),'admin'::app_role) OR has_role(auth.uid(),'proprietaire'::app_role));
INSERT INTO public.residence_settings (id) VALUES (true);

-- Realtime
ALTER TABLE public.reservations REPLICA IDENTITY FULL;
ALTER TABLE public.payments REPLICA IDENTITY FULL;
ALTER TABLE public.logement_units REPLICA IDENTITY FULL;

-- review_tokens
CREATE TABLE public.review_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id uuid NOT NULL REFERENCES public.reservations(id) ON DELETE CASCADE,
  token text NOT NULL UNIQUE,
  guest_name text NOT NULL,
  guest_email text, guest_phone text,
  used boolean NOT NULL DEFAULT false,
  used_at timestamptz,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '30 days'),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.review_tokens TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.review_tokens TO authenticated;
GRANT ALL ON public.review_tokens TO service_role;
ALTER TABLE public.review_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_token" ON public.review_tokens FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "staff_insert_token" ON public.review_tokens FOR INSERT TO authenticated WITH CHECK (is_staff(auth.uid()));
CREATE POLICY "staff_update_token" ON public.review_tokens FOR UPDATE TO authenticated USING (is_staff(auth.uid())) WITH CHECK (is_staff(auth.uid()));
CREATE POLICY "staff_delete_token" ON public.review_tokens FOR DELETE TO authenticated USING (is_staff(auth.uid()));
CREATE INDEX review_tokens_token_idx ON public.review_tokens(token);
CREATE INDEX review_tokens_reservation_idx ON public.review_tokens(reservation_id);

-- reviews
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id uuid REFERENCES public.reservations(id),
  review_token_id uuid REFERENCES public.review_tokens(id),
  guest_name text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  comment text,
  published boolean NOT NULL DEFAULT false,
  rejected boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create review" ON public.reviews FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read published reviews" ON public.reviews FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Staff read all reviews" ON public.reviews FOR SELECT TO authenticated USING (is_staff(auth.uid()));
CREATE POLICY "Staff update reviews" ON public.reviews FOR UPDATE TO authenticated USING (is_staff(auth.uid())) WITH CHECK (is_staff(auth.uid()));
CREATE POLICY "Owner delete reviews" ON public.reviews FOR DELETE TO authenticated
  USING (has_role(auth.uid(),'admin'::app_role) OR has_role(auth.uid(),'proprietaire'::app_role));
CREATE TRIGGER set_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Testimonials seed
INSERT INTO public.testimonials (name, location, rating, message_fr, sort_order) VALUES
('Ntimbi', 'Janvier 2026', 5, 'C''était un hôte formidable, très accueillant et professionnel. L''appartement est encore mieux qu''en photos. Propre, bien agencé et équipé. Emplacement accessible, sûr et calme. Je réserverai de nouveau. Idéal pour les vacances en famille.', 1),
('Larry', 'Avril 2026', 5, 'L''endroit idéal pour un séjour paisible et proche de la nature à Bafoussam, à un prix abordable. Vraiment recommandé !', 2),
('Michel', 'Janvier 2026', 5, 'La vue exceptionnelle a rendu notre séjour inoubliable ! Communication fluide avec l''hôte. Appartement impeccable et parfaitement équipé. Nous reviendrons avec des amis.', 3),
('Raoul', 'Janvier 2026', 5, 'Séjour exceptionnel ! Hébergement impeccable, confortable et décoré avec goût. Eau chaude, internet haut débit, parking gratuit sécurisé. Vue panoramique à couper le souffle. Hôte remarquable. Recommandé à 100% !', 4),
('Thierry', 'Février 2026', 5, 'Thanks to Rodrigue for hosting us so warmly. Recommended establishment. Beautiful view of the neighborhood. Loved it!', 6);

-- Logements seed
INSERT INTO public.logements (type, title_fr, price, currency, price_unit, equipments, sort_order) VALUES
('chambre', 'Chambre', 20000, 'FCFA', 'unité', ARRAY['Wi-Fi','Cuisine','Douche moderne','Télévision'], 1),
('studio', 'Studio', 30000, 'FCFA', 'unité', ARRAY['Wi-Fi','Cuisine','Douche moderne','Télévision'], 2),
('appartement', 'Appartement', 55000, 'FCFA', 'unité', ARRAY['Wi-Fi','Cuisine','Douche moderne','Télévision'], 3);
