/**
 * Route displaying the current user's own status updates.
 * Fetches updates from the API and renders loading, error,
 * or the MyUpdates component accordingly.
 */

import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { Button } from '../components/atoms'
import { MyUpdates } from '../components/templates/updates/MyUpdates'
import { useStatuses } from '../hooks/useQueries'

export const Route = createFileRoute('/my-updates')({
  component: MyUpdatesComponent,
})

function MyUpdatesComponent() {
  const { data, isPending, isError, refetch } = useStatuses({ limit: 50 })

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-foreground-muted">
        <p>Failed to load your updates.</p>
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

  return <MyUpdates updates={data.data} />
}
