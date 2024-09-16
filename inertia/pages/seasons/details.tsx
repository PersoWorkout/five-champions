import { Head, useForm } from '@inertiajs/react'
import { FormInputGroup } from '~/components/form/input_group'
import { FormButton } from '~/components/form/ui/button'

interface Props {
  season: {
    id: string
    name: string
    closingDate: string
    groupId: string
  }
}

export default function SeasonDetailPage({ season }: Props) {
  const { data, put, setData, errors } = useForm({
    name: season.name,
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    put(`/groups/${season.groupId}/seasons/${season.id}`)
  }

  return (
    <>
      <Head title="Season detail" />
      <main className="card-container">
        <article className="card">
          <header>
            <h2>Season: {season.name}</h2>
          </header>
          <section>
            <form onSubmit={handleSubmit}>
              <FormInputGroup
                title="Name"
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.currentTarget.value)}
                error={errors.name}
              />
              <FormButton className="button-primary" name="edit-season-button">
                Edit
              </FormButton>
            </form>
          </section>
        </article>
      </main>
    </>
  )
}
