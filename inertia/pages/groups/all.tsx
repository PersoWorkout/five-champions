import { GetGroupsType } from '#src/groups/presenter/get_groups_presenter'
import { Head, Link } from '@inertiajs/react'
import { GroupBox } from '~/components/groups/group_box'
import { BasicLayout } from '~/components/layouts/basic_layout'

interface GetAllGroupsProps {
  data: Array<GetGroupsType>
}

export default function GetAllGroups({ data }: GetAllGroupsProps) {
  return (
    <>
      <Head title="Groups" />

      <BasicLayout>
        <main>
          <header>
            <h2>My Groups</h2>
            <Link href="/groups/create">
              <button className="button-secondary">Add</button>
            </Link>
          </header>

          <div className="box-container">
            {data.map((group) => (
              <GroupBox key={group.id} group={group} />
            ))}
          </div>
        </main>
      </BasicLayout>
    </>
  )
}
