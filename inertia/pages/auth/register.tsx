import { Head, useForm } from '@inertiajs/react'

export default function Register() {
  const { data, setData, processing, post, errors } = useForm({
    surname: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post('/register')
  }

  return (
    <>
      <Head title="Register" />

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="surname">Surname</label>
            <input
              name="surname"
              value={data.surname}
              onChange={(e) => setData('surname', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password_confirmation">Password confirmation</label>
            <input
              name="password_confirmation"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  )
}
