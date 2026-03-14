/**
 * Unified create / edit form for status updates.
 * Handles client-side validation (required fields, minimum body length),
 * displays inline errors below each field, and surfaces server-side
 * 400 validation errors passed via the serverErrors prop.
 */

import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { CreateStatusPayload, StatusCategory, StatusUpdate, Team } from '../../../types'
import { Button, Input, Textarea } from '../../atoms'
import { AppSelect, FormField } from '../../molecules'
import { StatusSelector } from './StatusSelector'

interface StatusFormProps {
  initialData?: StatusUpdate
  teams: Team[]
  onSubmit: (data: CreateStatusPayload) => void
  isSubmitting?: boolean
  serverErrors?: Record<string, string>
}

interface FormData {
  project: string
  status: StatusCategory
  body: string
  blockers: string
  statusDate: string
  teamId: string
}

interface FormErrors {
  project?: string
  body?: string
  teamId?: string
  statusDate?: string
}

export function StatusForm({
  initialData,
  teams,
  onSubmit,
  isSubmitting = false,
  serverErrors,
}: StatusFormProps) {
  const navigate = useNavigate()
  const isEditing = !!initialData

  const [formData, setFormData] = useState<FormData>({
    project: initialData?.project ?? '',
    status: initialData?.status ?? 'on_track',
    body: initialData?.body ?? '',
    blockers: initialData?.blockers ?? '',
    statusDate: initialData?.statusDate ?? new Date().toISOString().split('T')[0],
    teamId: initialData?.teamId ?? '',
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.project.trim()) {
      newErrors.project = 'Please enter a project name'
    }
    if (!formData.body.trim() || formData.body.trim().length < 10) {
      newErrors.body = 'Update must be at least 10 characters'
    }
    if (!formData.teamId) {
      newErrors.teamId = 'Please select a team'
    }
    if (!formData.statusDate) {
      newErrors.statusDate = 'Please select a date'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    onSubmit({
      project: formData.project,
      status: formData.status,
      body: formData.body,
      blockers: formData.blockers || null,
      statusDate: formData.statusDate,
      teamId: formData.teamId,
    })
  }

  const handleCancel = () => {
    navigate({ to: '/' })
  }

  const getFieldError = (field: string) => {
    return errors[field as keyof FormErrors] ?? serverErrors?.[field]
  }

  return (
    <div className="h-full overflow-auto bg-surface-raised">
      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {isEditing ? 'Edit Status Update' : 'Create Status Update'}
          </h2>
          <p className="text-foreground-muted">Share your progress with the team</p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Team */}
            <FormField label="Team" required error={getFieldError('teamId')} htmlFor="teamId">
              <AppSelect
                value={formData.teamId}
                onValueChange={(value) => {
                  setFormData({ ...formData, teamId: value })
                  setErrors({ ...errors, teamId: undefined })
                }}
                options={teams.map((team) => ({ value: team.id, label: team.name }))}
                placeholder="Select a team"
                error={!!getFieldError('teamId')}
              />
            </FormField>

            {/* Project */}
            <FormField label="Project" required error={getFieldError('project')} htmlFor="project">
              <Input
                id="project"
                value={formData.project}
                onChange={(e) => {
                  setFormData({ ...formData, project: e.target.value })
                  setErrors({ ...errors, project: undefined })
                }}
                placeholder="Enter project name"
                error={!!getFieldError('project')}
              />
            </FormField>

            {/* Status */}
            <StatusSelector
              value={formData.status}
              onChange={(status) => setFormData({ ...formData, status })}
              error={getFieldError('status')}
            />

            {/* Update Body */}
            <FormField label="Update" required error={getFieldError('body')} htmlFor="body">
              <Textarea
                id="body"
                value={formData.body}
                onChange={(e) => {
                  setFormData({ ...formData, body: e.target.value })
                  setErrors({ ...errors, body: undefined })
                }}
                placeholder="What have you been working on?"
                rows={4}
                error={!!getFieldError('body')}
              />
              <div className="flex items-center justify-end mt-1">
                <span className="text-xs text-foreground-subtle">{formData.body.length}/500</span>
              </div>
            </FormField>

            {/* Blockers */}
            <FormField label="Blockers" htmlFor="blockers">
              <Textarea
                id="blockers"
                value={formData.blockers}
                onChange={(e) => setFormData({ ...formData, blockers: e.target.value })}
                placeholder="Any blockers or dependencies?"
                rows={3}
              />
            </FormField>

            {/* Status Date */}
            <FormField
              label="Status Date"
              required
              error={getFieldError('statusDate')}
              htmlFor="statusDate"
            >
              <Input
                type="date"
                id="statusDate"
                value={formData.statusDate}
                onChange={(e) => {
                  setFormData({ ...formData, statusDate: e.target.value })
                  setErrors({ ...errors, statusDate: undefined })
                }}
                error={!!getFieldError('statusDate')}
              />
            </FormField>

            {/* Form Actions */}
            <div className="flex items-center gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : isEditing ? 'Save Changes' : 'Submit Update'}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
