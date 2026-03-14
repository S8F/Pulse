/**
 * "My Updates" screen showing the current user's own status updates.
 * Renders a list of FeedItemCards or an empty state with a CTA
 * to create the first update if no updates exist.
 */

import { Link } from '@tanstack/react-router'
import { Plus, User } from 'lucide-react'
import type { StatusUpdate } from '../../../types'
import { Button } from '../../atoms'
import { EmptyState } from '../../organisms'
import { FeedItemCard } from '../feed/FeedItemCard'

interface MyUpdatesProps {
  updates: StatusUpdate[]
}

export function MyUpdates({ updates }: MyUpdatesProps) {
  return (
    <div className="h-full overflow-auto bg-surface-raised">
      <div className="px-4 sm:px-8 py-6">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">My Updates</h2>
          <p className="text-foreground-muted">View and manage your status updates</p>
        </div>

        {updates.length === 0 ? (
          <EmptyState
            icon={User}
            title="No updates yet"
            description="You haven't posted any status updates yet. Create your first update to get started."
            action={
              <Button asChild>
                <Link to="/create">
                  <Plus className="w-4 h-4" />
                  Create Update
                </Link>
              </Button>
            }
          />
        ) : (
          <div className="space-y-4">
            {updates.map((update) => (
              <FeedItemCard key={update.id} update={update} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
