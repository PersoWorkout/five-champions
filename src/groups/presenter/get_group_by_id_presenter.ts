import { GroupInvitationStatus } from '#src/groups/enums/group_invitation_status'
import Group from '../models/group.js'

export type GetGroupByIdType = {
  group: {
    id: string
    name: string
    createdAt: string
    creator: {
      id: string
      surname: string
    }
    players: Array<{
      id: string
      surname: string
      status: number
      invitationId: string | null
    }>
    seasons: Array<{
      id: string
      name: string
      closed: boolean
    }>
  }
}

export class GetGroupByIdPresenter {
  toJson(group: Group) {
    return {
      group: {
        id: group.id,
        name: group.name,
        createdAt: group.createdAt.toFormat('dd/MM/yyyy HH:mm'),
        creator: {
          id: group.creator.id,
          surname: group.creator.surname,
        },
        players: group.groupPlayer
          .map((groupPlayer) => ({
            id: groupPlayer.playerId,
            surname: groupPlayer.player.surname,
            status: GroupInvitationStatus.Accepted,
            invitationId: null as string | null,
          }))
          .concat(
            group.groupInvitation.map((groupInvitation) => ({
              id: groupInvitation.playerId,
              surname: groupInvitation.player.surname,
              status: groupInvitation.status,
              invitationId: groupInvitation.id,
            }))
          ),
        seasons: group.seasons.map((season) => ({
          id: season.id,
          name: season.name,
          closed: season.closingDate ? true : false,
        })),
      },
    } as GetGroupByIdType
  }
}
