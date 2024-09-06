import { CreateGroupsInvitationPageProps } from '#src/groups/controllers/create_group_invitation_controller'
import { Head, useForm } from '@inertiajs/react'
import { ChangeEvent, FormEvent, SelectHTMLAttributes } from 'react'
import { FormButton } from '~/components/form/ui/button'
import { BasicLayout } from '~/components/layouts/basic_layout'
import { AskablePlayersDropdown } from '~/components/players/askable_players_dropdown'

export default function CreateGroupsInvitationPage({
  players,
  groupId,
}: CreateGroupsInvitationPageProps) {
  const { data, setData, post, errors } = useForm({
    playerId: '0',
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post(`/groups/${groupId}/invitations/${data.playerId}`)
  }

  function handlePlayerSelectionChange(e: ChangeEvent<HTMLSelectElement>) {
    setData('playerId', e.target.value)
  }

  return (
    <>
      <Head title="Create group invitation" />

      <BasicLayout>
        <main className="card-container">
          <article className="card">
            <header>
              <h3>Invite a new player</h3>
            </header>
            <form onSubmit={handleSubmit}>
              <AskablePlayersDropdown data={players} onChange={handlePlayerSelectionChange} />
              <FormButton name="create-invitation-button" className="button-primary">
                Send
              </FormButton>
            </form>
          </article>
        </main>
      </BasicLayout>
    </>
  )
}
