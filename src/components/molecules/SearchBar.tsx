/**
 * SearchBar molecule.
 * Composes the Input atom with a leading search icon.
 * Generic — not tied to any specific feature or domain.
 */

import { Search } from 'lucide-react'
import { Input } from '../atoms'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      icon={<Search className="w-5 h-5" />}
    />
  )
}
