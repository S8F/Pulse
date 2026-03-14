/**
 * Team Overview dashboard screen.
 * Displays a grid of summary metric cards (total updates, on-track,
 * blocked, needs review) followed by a table of team members.
 * Shows an empty state when no updates have been posted.
 */

import { Link } from '@tanstack/react-router'
import { AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react'
import type { TeamSummary } from '../../../types'
import { Button } from '../../atoms'
import { EmptyState, MetricCard } from '../../organisms'
import { TeamMembersTable } from './TeamMembersTable'

interface TeamOverviewProps {
  summary: TeamSummary | undefined
}

export function TeamOverview({ summary }: TeamOverviewProps) {
  if (!summary || summary.totalUpdatesThisWeek === 0) {
    return (
      <div className="h-full overflow-auto px-4 sm:px-8 py-6">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Team Overview</h2>
          <p className="text-foreground-muted">Track team progress at a glance</p>
        </div>
        <EmptyState
          icon={FileText}
          title="No updates yet"
          description="Your team hasn't posted any status updates yet. Be the first to share your progress!"
          action={
            <Button asChild>
              <Link to="/create">Create First Update</Link>
            </Button>
          }
        />
      </div>
    )
  }

  const metrics = [
    {
      label: 'Total Updates',
      value: summary.totalUpdatesThisWeek,
      subLabel: 'this week',
      icon: FileText,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      label: 'On Track',
      value: summary.onTrackCount,
      subLabel: 'projects',
      icon: CheckCircle,
      color: 'text-success-600',
      bgColor: 'bg-success-50',
    },
    {
      label: 'Blocked',
      value: summary.blockedCount,
      subLabel: 'projects',
      icon: AlertCircle,
      color: 'text-danger-600',
      bgColor: 'bg-danger-50',
    },
    {
      label: 'Needs Review',
      value: summary.needsReviewCount,
      subLabel: 'projects',
      icon: Clock,
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
    },
  ]

  return (
    <div className="h-full overflow-auto">
      <div className="px-4 sm:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Team Overview</h2>
          <p className="text-foreground-muted">Track team progress at a glance</p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        {/* Team Members Table */}
        <TeamMembersTable members={summary.members} />
      </div>
    </div>
  )
}
