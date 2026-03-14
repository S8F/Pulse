/**
 * "My Updates" screen — shows the empty state matching the Figma design.
 * The API has no author-based filter, so this screen displays the
 * empty state with a CTA to create the user's first update.
 */

import { Link } from '@tanstack/react-router'
import { Plus, User } from 'lucide-react'
import { Button } from '../../atoms'
import { EmptyState } from '../../organisms'

export function MyUpdates() {
  return (
    <div className="h-full overflow-auto bg-surface-raised">
      <div className="px-4 sm:px-8 py-6">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">My Updates</h2>
          <p className="text-foreground-muted">View and manage your status updates</p>
        </div>

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
      </div>
    </div>
  )
}
