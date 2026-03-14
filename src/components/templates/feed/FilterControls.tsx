/**
 * Dropdown filter controls for the status feed.
 * Uses AppSelect molecules for status-category and team filters.
 */

import type { Team } from '../../../types'
import { AppSelect } from '../../molecules'

const ALL = '__all__'

const statusOptions = [
  { value: ALL, label: 'All Statuses' },
  { value: 'on_track', label: 'On Track' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'needs_review', label: 'Needs Review' },
  { value: 'done', label: 'Done' },
] satisfies { value: string; label: string }[]

interface FilterControlsProps {
  statusFilter: string
  teamFilter: string
  teams: Team[]
  onStatusChange: (value: string) => void
  onTeamChange: (value: string) => void
}

export function FilterControls({
  statusFilter,
  teamFilter,
  teams,
  onStatusChange,
  onTeamChange,
}: FilterControlsProps) {
  const teamOptions = [
    { value: ALL, label: 'All Teams' },
    ...teams.map((t) => ({ value: t.id, label: t.name })),
  ]

  return (
    <div className="flex items-center gap-3">
      <AppSelect
        value={statusFilter || ALL}
        onValueChange={(v) => onStatusChange(v === ALL ? '' : v)}
        options={statusOptions}
        placeholder="All Statuses"
      />

      <AppSelect
        value={teamFilter || ALL}
        onValueChange={(v) => onTeamChange(v === ALL ? '' : v)}
        options={teamOptions}
        placeholder="All Teams"
      />
    </div>
  )
}
