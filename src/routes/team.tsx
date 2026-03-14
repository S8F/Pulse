/**
 * Route for the Team Overview dashboard.
 * Fetches the aggregated team summary from the API and renders
 * the metric cards and member table via the TeamOverview component.
 */

import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { Button } from '../components/atoms'
import { TeamOverview } from '../components/templates/team/TeamOverview'
import { useTeamSummary } from '../hooks/useQueries'

export const Route = createFileRoute('/team')({
  component: TeamComponent,
})

function TeamComponent() {
  const { data, isPending, isError, refetch } = useTeamSummary()

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-foreground-muted">
        <p>Failed to load team summary.</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return <TeamOverview summary={data} />
}
