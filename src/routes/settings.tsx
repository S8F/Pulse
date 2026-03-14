/**
 * Route for the application settings page.
 * Renders the SettingsPage component (no data fetching required).
 */

import { createFileRoute } from '@tanstack/react-router'
import { SettingsPage } from '../components/templates/settings/SettingsPage'

export const Route = createFileRoute('/settings')({
  component: SettingsComponent,
})

function SettingsComponent() {
  return <SettingsPage />
}
