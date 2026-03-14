/**
 * Colour-coded badge that renders a status category label.
 * Uses tailwind-variants to map each status value (on_track, blocked,
 * needs_review, done) to distinct background, text, and border colours.
 * Shared across the feed cards and team members table.
 */

import { tv } from 'tailwind-variants'
import type { StatusCategory } from '../../types'

const statusChip = tv({
  base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
  variants: {
    status: {
      on_track: 'bg-success-100 text-success-700 border-success-200',
      blocked: 'bg-danger-100 text-danger-700 border-danger-200',
      needs_review: 'bg-warning-100 text-warning-700 border-warning-200',
      done: 'bg-primary-100 text-primary-700 border-primary-200',
    },
  },
})

const statusLabels: Record<StatusCategory, string> = {
  on_track: 'On Track',
  blocked: 'Blocked',
  needs_review: 'Needs Review',
  done: 'Done',
}

interface StatusChipProps {
  status: StatusCategory
}

export function StatusChip({ status }: StatusChipProps) {
  return <span className={statusChip({ status })}>{statusLabels[status]}</span>
}
