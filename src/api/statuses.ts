/**
 * API client for status update CRUD operations.
 * Provides typed fetch functions for listing, reading, creating,
 * updating, and deleting status updates via the /api/statuses endpoints.
 * Throws the server error body on non-OK responses for downstream handling.
 */

import type {
  CreateStatusPayload,
  PaginatedResponse,
  StatusUpdate,
  UpdateStatusPayload,
} from '../types'

interface StatusListParams {
  page?: number
  limit?: number
  status?: string
  team?: string
  search?: string
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json()
    throw body
  }
  return res.json()
}

export async function fetchStatuses(params: StatusListParams) {
  const searchParams = new URLSearchParams()
  if (params.page) searchParams.set('page', String(params.page))
  if (params.limit) searchParams.set('limit', String(params.limit))
  if (params.status) searchParams.set('status', params.status)
  if (params.team) searchParams.set('team', params.team)
  if (params.search) searchParams.set('search', params.search)

  return handleResponse<PaginatedResponse<StatusUpdate>>(
    await fetch(`/api/statuses?${searchParams}`),
  )
}

export async function fetchStatus(id: string) {
  return handleResponse<StatusUpdate>(await fetch(`/api/statuses/${encodeURIComponent(id)}`))
}

export async function createStatus(data: CreateStatusPayload) {
  return handleResponse<StatusUpdate>(
    await fetch('/api/statuses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  )
}

export async function updateStatus(id: string, data: UpdateStatusPayload) {
  return handleResponse<StatusUpdate>(
    await fetch(`/api/statuses/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  )
}

export async function deleteStatus(id: string) {
  const res = await fetch(`/api/statuses/${encodeURIComponent(id)}`, { method: 'DELETE' })
  if (!res.ok) {
    const body = await res.json()
    throw body
  }
}
