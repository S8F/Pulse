/**
 * TanStack Query hooks for all data fetching and mutations.
 * Centralises query key definitions, read hooks (useStatuses, useTeams, etc.),
 * and mutation hooks with automatic cache invalidation on success.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createStatus,
  deleteStatus,
  fetchStatus,
  fetchStatuses,
  updateStatus,
} from '../api/statuses'
import { fetchTeamSummary, fetchTeams } from '../api/teams'
import type { CreateStatusPayload, UpdateStatusPayload } from '../types'

// ─── Query Keys ───

export const queryKeys = {
  statuses: {
    all: ['statuses'] as const,
    list: (filters: { page?: number; status?: string; team?: string; search?: string }) =>
      ['statuses', 'list', filters] as const,
    detail: (id: string) => ['statuses', 'detail', id] as const,
  },
  teams: ['teams'] as const,
  teamSummary: ['team-summary'] as const,
}

// ─── Query Hooks ───

export function useStatuses(filters: {
  page?: number
  limit?: number
  status?: string
  team?: string
  search?: string
}) {
  return useQuery({
    queryKey: queryKeys.statuses.list(filters),
    queryFn: () => fetchStatuses(filters),
  })
}

export function useStatus(id: string) {
  return useQuery({
    queryKey: queryKeys.statuses.detail(id),
    queryFn: () => fetchStatus(id),
  })
}

export function useTeams() {
  return useQuery({
    queryKey: queryKeys.teams,
    queryFn: fetchTeams,
  })
}

export function useTeamSummary() {
  return useQuery({
    queryKey: queryKeys.teamSummary,
    queryFn: fetchTeamSummary,
  })
}

// ─── Mutation Hooks ───

export function useCreateStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateStatusPayload) => createStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.statuses.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.teamSummary })
    },
  })
}

export function useUpdateStatus(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateStatusPayload) => updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.statuses.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.statuses.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.teamSummary })
    },
  })
}

export function useDeleteStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.statuses.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.teamSummary })
    },
  })
}
