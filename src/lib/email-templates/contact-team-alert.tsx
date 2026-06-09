import * as React from 'react'
import { Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { EmailShell, card, h1, lead, rowLabel, rowValue } from './brand'

interface ContactTeamAlertProps {
  name?: string
  email?: string
  phone?: string
  message?: string
}

const Email = ({
  name = '—',
  email = '',
  phone = '',
  message = '',
}: ContactTeamAlertProps) => (
  <EmailShell preview="Nouveau message client — Panorama P">
    <Text style={h1}>Nouveau message client</Text>
    <Text style={lead}>
      Un client vient d'envoyer un message via le site Panorama P.
    </Text>

    <Section style={card}>
      <Text style={rowLabel}>Nom</Text>
      <Text style={rowValue}>{name}</Text>
      {email ? (<>
        <Text style={rowLabel}>Email</Text>
        <Text style={rowValue}>{email}</Text>
      </>) : null}
      {phone ? (<>
        <Text style={rowLabel}>Téléphone</Text>
        <Text style={rowValue}>{phone}</Text>
      </>) : null}
      <Text style={rowLabel}>Message</Text>
      <Text style={{ ...rowValue, whiteSpace: 'pre-line' as const }}>{message || '—'}</Text>
    </Section>
  </EmailShell>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) =>
    `Nouveau message — ${d?.name ?? 'client'}`,
  displayName: 'Alerte message client',
  previewData: {
    name: 'Marie K.',
    email: 'marie@example.com',
    phone: '+237 6 90 00 00 00',
    message: 'Bonjour, avez-vous une chambre disponible la semaine prochaine ?',
  },
} satisfies TemplateEntry

export default Email