import { createFileRoute } from '@tanstack/react-router'
import { MyUpdates } from '../components/templates/updates/MyUpdates'

export const Route = createFileRoute('/my-updates')({
  component: MyUpdatesComponent,
})

function MyUpdatesComponent() {
  return <MyUpdates />
}
