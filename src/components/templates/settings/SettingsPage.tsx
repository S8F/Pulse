/**
 * Settings page presenting a list of navigation cards for
 * Profile, Notifications, Privacy, and Language & Region.
 * Each card is a placeholder entry point for future sub-pages.
 */

import type { LucideIcon } from 'lucide-react'
import { Bell, Globe, Lock, User } from 'lucide-react'
import { Card, CardContent } from '../../molecules'

interface SettingItem {
  icon: LucideIcon
  label: string
  description: string
}

const settingItems: SettingItem[] = [
  { icon: User, label: 'Profile Settings', description: 'Update your personal information' },
  { icon: Bell, label: 'Notifications', description: 'Configure notification preferences' },
  { icon: Lock, label: 'Privacy', description: 'Manage privacy and security settings' },
  { icon: Globe, label: 'Language & Region', description: 'Set your language and timezone' },
]

export function SettingsPage() {
  return (
    <div className="h-full overflow-auto bg-surface-raised">
      <div className="px-4 sm:px-8 py-6">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Settings</h2>
          <p className="text-foreground-muted">Manage your account and preferences</p>
        </div>

        <div className="max-w-2xl space-y-4">
          {settingItems.map((item) => {
            const Icon = item.icon
            return (
              <Card
                key={item.label}
                className="hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-surface-raised rounded-lg">
                      <Icon className="w-6 h-6 text-icon" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">{item.label}</h3>
                      <p className="text-foreground-muted text-sm">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
