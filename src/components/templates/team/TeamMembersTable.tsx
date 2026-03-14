/**
 * Scrollable table that lists every team member alongside their
 * team name, last update timestamp, current status chip, and an
 * action column. Uses the DataTable molecule for consistent styling.
 */

import { Link } from '@tanstack/react-router'
import { formatRelativeTime } from '../../../lib/formatRelativeTime'
import type { TeamMember } from '../../../types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../molecules'
import { StatusChip } from '../../organisms'

interface TeamMembersTableProps {
  members: TeamMember[]
}

export function TeamMembersTable({ members }: TeamMembersTableProps) {
  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-surface-raised">
              <TableHead>Name</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Last Update</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <span className="font-medium text-foreground">{member.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-foreground-muted">{member.teamName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-foreground-muted text-sm">
                    {member.lastUpdate ? formatRelativeTime(member.lastUpdate) : 'No updates'}
                  </span>
                </TableCell>
                <TableCell>
                  {member.lastStatus ? (
                    <StatusChip status={member.lastStatus} />
                  ) : (
                    <span className="text-foreground-subtle text-sm">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Link to="/" className="text-primary-600 hover:text-primary-700 text-sm">
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
