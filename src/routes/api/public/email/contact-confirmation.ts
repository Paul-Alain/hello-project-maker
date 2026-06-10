import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { enqueueAppEmail } from "@/lib/email/enqueue.server";

const BodySchema = z.object({
  email: z.string().email().max(160),
  name: z.string().min(1).max(120),
});

export const Route = createFileRoute("/api/public/email/contact-confirmation")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed;

        try {
          parsed = BodySchema.parse(await request.json());
        } catch {
          return Response.json({ error: "Invalid input" }, { status: 400 });
        }

        // anti-abus simple (header check optionnel)
        const origin = request.headers.get("origin");
        if (origin && !origin.includes("panorama-p-residence.com")) {
          return Response.json({ error: "Forbidden" }, { status: 403 });
        }

        const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();

        const { data: match, error } = await supabaseAdmin
          .from("messages")
          .select("id, name, message, phone, email, created_at")
          .eq("email", parsed.email)
          .gte("created_at", since)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (error || !match) {
          return Response.json({ success: true, sent: false });
        }

        const safeMessage = (match.message ?? "").slice(0, 600);

        const result = await enqueueAppEmail({
          templateName: "contact-confirmation",
          recipientEmail: parsed.email,
          idempotencyKey: `contact-confirmation-${match.id}`,
          templateData: {
            name: parsed.name,
            message: safeMessage,
          },
        });

        const teamResult = await enqueueAppEmail({
          templateName: "contact-team-alert",
          recipientEmail: "residencespanoramap@gmail.com",
          idempotencyKey: `contact-team-${match.id}`,
          templateData: {
            name: match.name ?? parsed.name,
            email: parsed.email,
            phone: match.phone ?? "",
            message: safeMessage,
          },
        });

        return Response.json({
          success: true,
          sent: result.success,
          teamNotified: teamResult.success,
        });
      },
    },
  },
});
