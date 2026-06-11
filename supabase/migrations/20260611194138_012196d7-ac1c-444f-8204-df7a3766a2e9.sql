
CREATE TABLE public.public_review_links (
  id boolean PRIMARY KEY DEFAULT true,
  token text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT public_review_links_singleton CHECK (id = true)
);
GRANT ALL ON public.public_review_links TO service_role;
ALTER TABLE public.public_review_links ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER public_review_links_set_updated_at
  BEFORE UPDATE ON public.public_review_links
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
