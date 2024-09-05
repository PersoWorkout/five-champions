import Player from '#src/players/models/players'
import { Head, useForm, usePage } from '@inertiajs/react'
import { FormInputGroup } from '~/components/form/input_group'
import { FormButton } from '~/components/form/ui/button'

export default function MePage() {
  const page = usePage()

  const user = page.props.user as Player

  const { data, put, setData, errors } = useForm({
    surname: user.surname,
    email: user.email,
    messages: '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    put('/players/edit')
  }

  return (
    <>
      <Head title="Me" />

      <div className="container">
        <h1>Informations</h1>
        <form onSubmit={handleSubmit}>
          <FormInputGroup
            name="surname"
            title="Surname"
            placeholder="user10"
            inputType="text"
            value={data.surname}
            onChange={(e) => setData('surname', e.target.value)}
            error={errors.surname}
          />

          <FormInputGroup
            name="email"
            title="Email"
            placeholder="user@example.com"
            inputType="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            error={errors.email}
          />

          <FormButton name="save-button" className="button-primary">
            Save
          </FormButton>
          <div>{errors.messages && <span>{errors.messages}</span>}</div>
        </form>
      </div>
    </>
  )
}
