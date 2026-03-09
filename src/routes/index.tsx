import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Pulse</h1>
        <p className="mt-2 text-foreground-muted">
          Your starting point. Check <code className="text-sm">figma-output/</code> for the Figma
          Make output.
        </p>
      </div>
    </div>
  )
}
