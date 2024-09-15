import { Head, useForm } from '@inertiajs/react'
import { FormInputGroup } from '~/components/form/input_group'
import { FormButton } from '~/components/form/ui/button'
import { BasicLayout } from '~/components/layouts/basic_layout'

export default function CreateSeasonPage({ groupId }: { groupId: string }) {
  const { post, data, setData, errors } = useForm({
    name: '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post(`/groups/${groupId}/seasons`)
  }
  return (
    <>
      <Head title="Create Season" />

      <BasicLayout>
        <main className="card-container">
          <article className="card">
            <header>
              <h2>Create Season</h2>
            </header>
            <section>
              <form onSubmit={handleSubmit}>
                <FormInputGroup
                  name="name"
                  title="Name"
                  placeholder="Season name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  error={errors.name}
                />

                <FormButton className="button-primary" name="create-season-button">
                  Create
                </FormButton>
              </form>
            </section>
          </article>
        </main>
      </BasicLayout>
    </>
  )
}
