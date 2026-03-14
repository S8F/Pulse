/**
 * Application shell with persistent sidebar navigation.
 * On desktop the sidebar is always visible; on screens below the md
 * breakpoint it collapses into a slide-over drawer toggled by a
 * hamburger button in a fixed mobile header bar.
 */

import { Link, useMatchRoute } from '@tanstack/react-router'
import { Activity, Home, Menu, Settings, Users, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '../../../lib/cn'
import { Button } from '../../atoms'

const navItems = [
  { path: '/', label: 'Feed', icon: Home },
  { path: '/my-updates', label: 'My Updates', icon: Activity },
  { path: '/team', label: 'Team', icon: Users },
  { path: '/settings', label: 'Settings', icon: Settings },
] as const

interface NavItemProps {
  path: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  active: boolean
  onClick?: () => void
}

function NavItem({ path, label, icon: Icon, active, onClick }: NavItemProps) {
  return (
    <li>
      <Link
        to={path}
        onClick={onClick}
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
          active ? 'bg-primary-50 text-primary-700' : 'text-foreground hover:bg-surface-raised',
        )}
      >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </Link>
    </li>
  )
}

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const matchRoute = useMatchRoute()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  // Close sidebar on Escape key
  useEffect(() => {
    if (!sidebarOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSidebar()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [sidebarOpen, closeSidebar])

  const navContent = (
    <>
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h1 className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary-600" />
          <span className="text-xl font-semibold text-foreground">Pulse</span>
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={closeSidebar}
          className="md:hidden"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active =
              item.path === '/'
                ? !!matchRoute({ to: '/', fuzzy: false })
                : !!matchRoute({ to: item.path, fuzzy: true })

            return (
              <NavItem
                key={item.path}
                path={item.path}
                label={item.label}
                icon={item.icon}
                active={active}
                onClick={closeSidebar}
              />
            )
          })}
        </ul>
      </nav>
    </>
  )

  return (
    <div className="flex h-screen bg-surface-raised">
      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-30 flex md:hidden  items-center gap-3 bg-surface border-b border-border px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </Button>
        <Activity className="w-5 h-5 text-primary-600" />
        <span className="text-lg font-semibold text-foreground">Pulse</span>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={closeSidebar}
          onKeyDown={(e) => {
            if (e.key === 'Escape') closeSidebar()
          }}
          role="presentation"
        />
      )}

      {/* Sidebar — desktop: static, mobile: slide-over */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border flex flex-col transition-transform duration-200 md:static md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {navContent}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-14 md:pt-0">{children}</main>
    </div>
  )
}
