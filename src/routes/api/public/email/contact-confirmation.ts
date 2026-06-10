import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { supabaseAdmin } from '@/integrations/supabase/client.server'
import { enqueueAppEmail } from '@/lib/email/enqueue.server'

const BodySchema = z.object({
  email: z.string().email().max(160),
  name: z.string().min(1).max(120),
})

// Sends the branded contact-confirmation email. To prevent abuse, the route
// verifies (with the service-role client) that a matching contact message was
// actually created recently before sending.
export const Route = createFileRoute('/api/public/email/contact-confirmation')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed
        try {
          parsed = BodySchema.parse(await request.json())
        } catch {
          return Response.json({ error: 'Invalid input' }, { status: 400 })
        }

        const since = new Date(Date.now() - 15 * 60 * 1000).toISOString()
        const { data: match } = await supabaseAdmin
          .from('messages')
          .select('id, name, message, phone')
          .eq('email', parsed.email)
          .gte('created_at', since)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (!match) {
          // No recent matching record — silently accept without sending.
          return Response.json({ success: true, sent: false })
        }

        const TEAM_EMAIL = 'residencespanoramap@gmail.com'
        const isTeamSender = parsed.email.trim().toLowerCase() === TEAM_EMAIL

        // Confirmation au client (skip si l'expéditeur EST l'équipe — évite le doublon)
        const result = isTeamSender
          ? { success: true as const }
          : await enqueueAppEmail({
              templateName: 'contact-confirmation',
              recipientEmail: parsed.email,
              idempotencyKey: `contact-${match.id}`,
              templateData: {
                name: parsed.name,
                message: (match.message ?? '').slice(0, 600),
              },
            })

        // Alerte équipe — idempotency key basée sur l'id du message (1 seule alerte par message).
        const teamResult = await enqueueAppEmail({
          templateName: 'contact-team-alert',
          recipientEmail: TEAM_EMAIL,
          idempotencyKey: `contact-team-${match.id}`,
          templateData: {
            name: match.name ?? parsed.name,
            email: parsed.email,
            phone: match.phone ?? '',
            message: match.message ?? '',
          },
        })

        return Response.json({
          success: true,
          sent: result.success,
          teamNotified: teamResult.success,
        })
      },
    },
  },
})
