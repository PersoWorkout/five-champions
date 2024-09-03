import { Head, useForm } from '@inertiajs/react'
import { FormInputGroup } from '~/components/form/input_group'
import { FormButton } from '~/components/form/ui/button'

export default function Login() {
  const { data, setData, post, errors } = useForm({
    email: '',
    password: '',
    message: '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post('/auth/login')
  }

  return (
    <>
      <Head title="Login" />

      <main className="card-container">
        <article className="card">
          <header>
            <img src="/public/assets/logo.png" alt="logo.png" />
          </header>

          <form onSubmit={handleSubmit} className="auth-form">
            <section className="form-input-container">
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
            </section>
            <FormButton name="login-button" className="button-primary">
              Login
            </FormButton>
            <div>{errors.message && <small className="error">{errors.message}</small>}</div>
          </form>
        </article>
      </main>
    </>
  )
}
