/**
 * Root route (/) — renders the status feed.
 * Reads filter and pagination state from URL search params so that
 * the current view survives page refresh and can be shared via URL.
 */

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { Button } from '../components/atoms'
import { StatusFeed } from '../components/templates/feed/StatusFeed'
import { useStatuses, useTeams } from '../hooks/useQueries'

interface FeedSearch {
  page?: number
  status?: string
  team?: string
  search?: string
}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): FeedSearch => ({
    page: Number(search.page) || undefined,
    status: (search.status as string) || undefined,
    team: (search.team as string) || undefined,
    search: (search.search as string) || undefined,
  }),
  component: IndexComponent,
})

function IndexComponent() {
  const { page, status, team, search } = Route.useSearch()
  const navigate = useNavigate()

  const statusesQuery = useStatuses({ page: page ?? 1, status, team, search })
  const teamsQuery = useTeams()

  const updateSearch = (updates: Partial<FeedSearch>) => {
    navigate({
      to: '/',
      search: (prev) => {
        const next = { ...prev, ...updates }
        // Reset page when filters change
        if ('status' in updates || 'team' in updates || 'search' in updates) {
          next.page = undefined
        }
        // Remove empty values
        for (const key of Object.keys(next) as (keyof FeedSearch)[]) {
          if (!next[key]) delete next[key]
        }
        return next
      },
      replace: true,
    })
  }

  if (statusesQuery.isError || teamsQuery.isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-foreground-muted">
        <p>Something went wrong loading the feed.</p>
        <Button
          onClick={() => {
            statusesQuery.refetch()
            teamsQuery.refetch()
          }}
        >
          Retry
        </Button>
      </div>
    )
  }

  if (statusesQuery.isPending || teamsQuery.isPending) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <StatusFeed
      data={statusesQuery.data}
      teams={teamsQuery.data}
      statusFilter={status ?? ''}
      teamFilter={team ?? ''}
      search={search ?? ''}
      onStatusFilterChange={(value) => updateSearch({ status: value || undefined })}
      onTeamFilterChange={(value) => updateSearch({ team: value || undefined })}
      onSearchChange={(value) => updateSearch({ search: value || undefined })}
      onPageChange={(p) => updateSearch({ page: p > 1 ? p : undefined })}
    />
  )
}
