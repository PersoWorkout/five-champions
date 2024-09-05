import { Head, useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { FormInputGroup } from '~/components/form/input_group'
import { FormButton } from '~/components/form/ui/button'
import { BasicLayout } from '~/components/layouts/basic_layout'

export default function CreateGroupPage() {
  const { post, data, setData, errors } = useForm({
    name: '',
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post('/groups')
  }

  return (
    <>
      <Head title="Groups" />

      <BasicLayout>
        <main>
          <header>
            <h2>Create Group</h2>
          </header>

          <form onSubmit={handleSubmit}>
            <FormInputGroup
              name="name"
              title="Name"
              placeholder="My team"
              value={data.name}
              onChange={(e) => setData('name', e.currentTarget.value)}
              error={errors.name}
            />

            <FormButton className="button-primary" name="create-group-button">
              Create
            </FormButton>
          </form>
        </main>
      </BasicLayout>
    </>
  )
}
