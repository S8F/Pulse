/**
 * API client for team-related endpoints.
 * Fetches the list of teams and the aggregated team summary
 * used by the team overview dashboard.
 */

import type { Team, TeamSummary } from '../types'

export async function fetchTeams(): Promise<Team[]> {
  const res = await fetch('/api/teams')
  if (!res.ok) {
    const body = await res.json()
    throw body
  }
  return res.json()
}

export async function fetchTeamSummary(): Promise<TeamSummary> {
  const res = await fetch('/api/team-summary')
  if (!res.ok) {
    const body = await res.json()
    throw body
  }
  return res.json()
}
