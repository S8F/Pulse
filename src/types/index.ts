/**
 * Domain types for the Pulse API.
 * All interfaces mirror the response shapes defined in api-spec.md.
 * These are the single source of truth for type safety across the app.
 */

export type StatusCategory = 'on_track' | 'blocked' | 'needs_review' | 'done'

export interface StatusUpdate {
  id: string
  authorId: string
  authorName: string
  authorAvatar: string
  teamId: string
  teamName: string
  project: string
  status: StatusCategory
  body: string
  blockers: string | null
  statusDate: string
  createdAt: string
  updatedAt: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface Team {
  id: string
  name: string
  memberCount: number
}

export interface TeamMember {
  id: string
  name: string
  teamName: string
  lastUpdate: string | null
  lastStatus: StatusCategory | null
}

export interface TeamSummary {
  totalUpdatesThisWeek: number
  onTrackCount: number
  blockedCount: number
  needsReviewCount: number
  members: TeamMember[]
}

export interface ApiError {
  error: string
  details?: Record<string, string>
}

export interface CreateStatusPayload {
  teamId: string
  project: string
  status: StatusCategory
  body: string
  blockers?: string | null
  statusDate: string
}

export type UpdateStatusPayload = Partial<CreateStatusPayload>
