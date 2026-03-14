/**
 * Individual status update card rendered inside the feed list.
 * Shows the author avatar, name, team, relative timestamp,
 * status chip, update body, and optional project label.
 */

import { formatRelativeTime } from '../../../lib/formatRelativeTime'
import type { StatusUpdate } from '../../../types'
import { Card, CardContent } from '../../molecules'
import { StatusChip } from '../../organisms'

interface FeedItemCardProps {
  update: StatusUpdate
}

export function FeedItemCard({ update }: FeedItemCardProps) {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <img
            src={update.authorAvatar}
            alt={update.authorName}
            className="w-10 h-10 rounded-full"
          />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
              <span className="font-medium text-foreground">{update.authorName}</span>
              <span className="text-foreground-subtle hidden sm:inline">·</span>
              <span className="text-foreground-muted text-sm">{update.teamName}</span>
              <span className="text-foreground-subtle text-sm">
                {formatRelativeTime(update.createdAt)}
              </span>
            </div>

            <div className="mb-3">
              <StatusChip status={update.status} />
            </div>

            <p className="text-foreground-muted leading-relaxed">{update.body}</p>

            {update.project && (
              <div className="mt-3 text-sm text-foreground-muted">Project: {update.project}</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
