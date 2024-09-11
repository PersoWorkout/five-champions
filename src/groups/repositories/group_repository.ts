import { GroupInvitationStatus } from '#src/groups/enums/group_invitation_status'
import Group from '#src/groups/models/group'
import db from '@adonisjs/lucid/services/db'

interface CreateGroupDTO {
  name: string
  playerId: string
}

export default class GroupRepository {
  getGroupsByPlayer(playerId: string) {
    return Group.query()
      .whereIn('id', db.from('groups_players').where({ player_id: playerId }).select('group_id'))
      .orWhereIn(
        'id',
        db
          .from('groups_invitations')
          .where({ player_id: playerId })
          .andWhereNot({ status: GroupInvitationStatus.Rejected })
          .select('group_id')
      )
      .preload('groupPlayer', (groupPlayer) => {
        groupPlayer.preload('player', (player) => {
          player.select(['id', 'surname'])
        })
      })
      .preload('creator', (creator) => {
        creator.select(['id', 'surname'])
      })
      .orderBy('createdAt')
  }

  getDetails(playerId: string, groupId: string) {
    return Group.query()
      .where({ id: groupId })
      .preload('groupPlayer', (groupPlayer) => {
        groupPlayer.where({ playerId })
      })
      .preload('creator', (creator) => {
        creator.select(['id', 'surname'])
      })
      .preload('groupPlayer', (groupPlayer) => {
        groupPlayer.preload('player', (player) => {
          player.select(['id', 'surname'])
        })
      })
      .preload('groupInvitation', (groupInvitation) => {
        groupInvitation
          .where({ groupId })
          .andWhere({ status: GroupInvitationStatus.Pending })
          .preload('player', (player) => {
            player.select(['id', 'surname'])
          })
      })
      .first()
  }

  getById(id: string) {
    return Group.findBy({ id })
  }

  async create(payload: CreateGroupDTO) {
    const group = await Group.create({ ...payload })
    return group.save()
  }
}
