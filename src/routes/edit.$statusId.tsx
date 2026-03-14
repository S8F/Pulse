/**
 * Route for editing an existing status update.
 * Extracts the status ID from the URL param, loads the current
 * data via useStatus, and renders the StatusForm in edit mode.
 * Navigates back to the feed on successful save.
 */

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { Button } from '../components/atoms'
import { StatusForm } from '../components/templates/status/StatusForm'
import { useStatus, useTeams, useUpdateStatus } from '../hooks/useQueries'
import type { ApiError } from '../types'

export const Route = createFileRoute('/edit/$statusId')({
  component: EditStatusComponent,
})

function EditStatusComponent() {
  const { statusId } = Route.useParams()
  const navigate = useNavigate()
  const statusQuery = useStatus(statusId)
  const teamsQuery = useTeams()
  const updateMutation = useUpdateStatus(statusId)

  if (statusQuery.isError || teamsQuery.isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-foreground-muted">
        <p>Failed to load status update.</p>
        <Button
          onClick={() => {
            statusQuery.refetch()
            teamsQuery.refetch()
          }}
        >
          Retry
        </Button>
      </div>
    )
  }

  if (statusQuery.isPending || teamsQuery.isPending) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <StatusForm
      initialData={statusQuery.data}
      teams={teamsQuery.data}
      onSubmit={(data) => {
        updateMutation.mutate(data, {
          onSuccess: () => navigate({ to: '/' }),
        })
      }}
      isSubmitting={updateMutation.isPending}
      serverErrors={(updateMutation.error as unknown as ApiError)?.details}
    />
  )
}
