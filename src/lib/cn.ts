/**
 * Utility for merging Tailwind CSS class names.
 * Combines clsx (conditional joining) with tailwind-merge
 * (conflict resolution) so that later classes override earlier ones.
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
