import { Head, useForm } from '@inertiajs/react'
import { FormInputGroup } from '~/components/form/input_group'
import { FormButton } from '~/components/form/ui/button'

export default function Register() {
  const { data, setData, post, errors } = useForm({
    surname: '',
    email: '',
    password: '',
    password_confirmation: '',
    message: '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post('/auth/register')
  }

  return (
    <>
      <Head title="Register" />

      <main className="card-container">
        <article className="card">
          <header>
            <img src="/public/assets/logo.png" alt="logo.png" />
          </header>

          <form onSubmit={handleSubmit} className="auth-form">
            <section className="form-input-container">
              <FormInputGroup
                name="surname"
                title="Surname"
                inputType="text"
                placeholder="User10"
                value={data.surname}
                onChange={(e) => setData('surname', e.target.value)}
                error={errors.surname}
              />
              <FormInputGroup
                name="email"
                title="Email"
                inputType="email"
                placeholder="user@example.com"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                error={errors.email}
              />
              <FormInputGroup
                name="password"
                title="Password"
                inputType="password"
                placeholder="********"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                error={errors.password}
              />
              <FormInputGroup
                name="password-confirmation"
                title="Confirmation"
                inputType="password"
                placeholder="********"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                error={errors.password_confirmation}
              />
            </section>

            <FormButton name="register-button" className="button-primary">
              Register
            </FormButton>
            <div>{errors.message && <small className="error">{errors.message}</small>}</div>
          </form>
        </article>
      </main>
    </>
  )
}
