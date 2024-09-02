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

      <div>
        <form onSubmit={handleSubmit}>
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
          <FormButton name="login-button" className="button-primary">
            Login
          </FormButton>
          <div>{errors.message && <span>{errors.message}</span>}</div>
        </form>
      </div>
    </>
  )
}
