/**
 * App-level Select molecule.
 * Wraps the shadcn Select sub-parts (Root, Trigger, Content, Item, Value)
 * into a single-prop API so consumers don't assemble pieces individually.
 */

import { cn } from '../../lib/cn'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'

interface SelectOption {
  value: string
  label: string
}

interface AppSelectProps {
  value: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
  error?: boolean
}

export function AppSelect({
  value,
  onValueChange,
  options,
  placeholder = 'Select…',
  className,
  error,
}: AppSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        aria-invalid={error || undefined}
        className={cn(error && 'border-danger-500 ring-danger-500/20 ring-2', className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

/* Re-export raw sub-parts for advanced use cases */
export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
