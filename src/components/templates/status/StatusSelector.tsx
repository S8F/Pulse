/**
 * Radio-button group for choosing a status category.
 * Renders four options (On Track, Blocked, Needs Review, Done)
 * styled with tailwind-variants, highlighting the active selection.
 */

import { tv } from 'tailwind-variants'
import type { StatusCategory } from '../../../types'
import { Label } from '../../atoms'

const statusOption = tv({
  base: 'flex items-center justify-center px-4 py-3 rounded-lg border-2 cursor-pointer transition-all',
  variants: {
    selected: {
      true: 'border-primary-600 bg-primary-50',
      false: 'border-border bg-surface hover:border-neutral-300',
    },
  },
})

const statusOptions: { value: StatusCategory; label: string }[] = [
  { value: 'on_track', label: 'On Track' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'needs_review', label: 'Needs Review' },
  { value: 'done', label: 'Done' },
]

interface StatusSelectorProps {
  value: StatusCategory
  onChange: (value: StatusCategory) => void
  error?: string
}

export function StatusSelector({ value, onChange, error }: StatusSelectorProps) {
  return (
    <div>
      <Label required className="mb-3">
        Status
      </Label>
      <div className="grid grid-cols-2 gap-3">
        {statusOptions.map((option) => (
          <label key={option.value} className={statusOption({ selected: value === option.value })}>
            <input
              type="radio"
              name="status"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span className={value === option.value ? 'text-primary-700' : 'text-foreground'}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-danger-600">{error}</p>}
    </div>
  )
}
