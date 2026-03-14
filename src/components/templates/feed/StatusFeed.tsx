/**
 * Main feed screen that composes the search bar, filter dropdowns,
 * a scrollable list of status update cards, and pagination controls.
 * Receives pre-fetched data and filter state from the parent route.
 */

import { Link } from '@tanstack/react-router'
import { Plus, SearchX } from 'lucide-react'
import { useState } from 'react'
import type { PaginatedResponse, StatusUpdate, Team } from '../../../types'
import { Button } from '../../atoms'
import { SearchBar } from '../../molecules'
import { EmptyState, Pagination } from '../../organisms'
import { FeedItemCard } from './FeedItemCard'
import { FilterControls } from './FilterControls'

interface StatusFeedProps {
  data: PaginatedResponse<StatusUpdate> | undefined
  teams: Team[]
  statusFilter: string
  teamFilter: string
  search: string
  onStatusFilterChange: (value: string) => void
  onTeamFilterChange: (value: string) => void
  onSearchChange: (value: string) => void
  onPageChange: (page: number) => void
}

export function StatusFeed({
  data,
  teams,
  statusFilter,
  teamFilter,
  search,
  onStatusFilterChange,
  onTeamFilterChange,
  onSearchChange,
  onPageChange,
}: StatusFeedProps) {
  const [searchInput, setSearchInput] = useState(search)

  const handleSearchChange = (value: string) => {
    setSearchInput(value)
    onSearchChange(value)
  }

  const hasActiveFilters = statusFilter !== '' || teamFilter !== '' || search !== ''

  const clearFilters = () => {
    setSearchInput('')
    onSearchChange('')
    onStatusFilterChange('')
    onTeamFilterChange('')
  }

  const updates = data?.data ?? []
  const pagination = data?.pagination

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-surface border-b border-border px-4 sm:px-8 py-6">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Status Feed</h2>
              <p className="text-foreground-muted mt-1 hidden sm:block">
                Latest updates from your team
              </p>
            </div>
            <Button asChild>
              <Link to="/create">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Update</span>
              </Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="flex-1">
              <SearchBar value={searchInput} onChange={handleSearchChange} />
            </div>
            <FilterControls
              statusFilter={statusFilter}
              teamFilter={teamFilter}
              teams={teams}
              onStatusChange={onStatusFilterChange}
              onTeamChange={onTeamFilterChange}
            />
          </div>
        </div>
      </div>

      {/* Feed Items */}
      <div className="flex-1 overflow-auto px-4 sm:px-8 py-6">
        <div className="max-w-4xl space-y-4">
          {updates.map((update) => (
            <FeedItemCard key={update.id} update={update} />
          ))}

          {updates.length === 0 && (
            <EmptyState
              icon={SearchX}
              title="No results found"
              description={
                hasActiveFilters
                  ? 'No updates match your current filters. Try adjusting or clearing them.'
                  : 'No status updates have been posted yet.'
              }
              action={
                hasActiveFilters ? (
                  <Button onClick={clearFilters}>Clear Filters</Button>
                ) : (
                  <Button asChild>
                    <Link to="/create">Create First Update</Link>
                  </Button>
                )
              }
            />
          )}
        </div>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="bg-surface border-t border-border px-4 sm:px-8 py-4">
          <div className="max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-foreground-muted">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}{' '}
              updates
            </p>
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}
