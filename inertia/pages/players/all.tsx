import { Head } from '@inertiajs/react'

interface AllPlayersProps {
  data: Array<{
    id: number
    surname: string
    isGuest: boolean
  }>
}

export default function AllPlayers(props: AllPlayersProps) {
  return (
    <>
      <Head title="Homepage" />

      <div className="container">{JSON.stringify(props)}</div>
    </>
  )
}
