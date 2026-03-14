/**
 * Route for creating a new status update.
 * Loads the team list, renders the StatusForm in create mode,
 * and navigates back to the feed on successful submission.
 */

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { Button } from '../components/atoms'
import { StatusForm } from '../components/templates/status/StatusForm'
import { useCreateStatus, useTeams } from '../hooks/useQueries'
import type { ApiError } from '../types'

export const Route = createFileRoute('/create')({
  component: CreateComponent,
})

function CreateComponent() {
  const navigate = useNavigate()
  const teamsQuery = useTeams()
  const createMutation = useCreateStatus()

  if (teamsQuery.isPending) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (teamsQuery.isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-foreground-muted">
        <p>Failed to load teams.</p>
        <Button onClick={() => teamsQuery.refetch()}>Retry</Button>
      </div>
    )
  }

  return (
    <StatusForm
      teams={teamsQuery.data}
      onSubmit={(data) => {
        createMutation.mutate(data, {
          onSuccess: () => navigate({ to: '/' }),
        })
      }}
      isSubmitting={createMutation.isPending}
      serverErrors={(createMutation.error as unknown as ApiError)?.details}
    />
  )
}
