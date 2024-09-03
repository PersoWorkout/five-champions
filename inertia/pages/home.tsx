import { Head } from '@inertiajs/react'
import { BasicLayout } from '~/components/layouts/basic_layout'

export default function Home(props: { version: number }) {
  return (
    <>
      <Head title="Homepage" />

      <BasicLayout>
        <main>
          <div className="title">AdonisJS {props.version} x Inertia x React</div>

          <span>
            Learn more about AdonisJS and Inertia.js by visiting the{' '}
            <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
          </span>
        </main>
      </BasicLayout>
    </>
  )
}
