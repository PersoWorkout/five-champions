import Player from '#src/players/models/players'
import { GroupInvitationStatus } from '../enums/group_invitation_status.js'
import GroupsInvitations from '../models/groups_invitations.js'
import db from '@adonisjs/lucid/services/db'

export type CreateGroupInvitationType = {
  playerId: string
  groupId: string
  senderId: string
}

export class GroupInvitationRepository {
  getByPlayerId(playerId: string) {
    return GroupsInvitations.findManyBy({ playerId })
  }

  getByPlayerAndGroup(playerId: string, groupId: string) {
    return GroupsInvitations.findBy({ groupId, playerId })
  }

  getAskableUsers(groupId: string) {
    return Player.query()
      .whereNotIn(
        'id',
        db
          .from('groups_invitations')
          .where({ group_Id: groupId })
          .whereRaw(
            `(status = ${GroupInvitationStatus.Accepted} or status = ${GroupInvitationStatus.Pending})`
          )
          .select('player_id')
      )
      .andWhereNotIn(
        'id',
        db.from('groups_players').where({ group_id: groupId }).select('player_id')
      )
  }

  getById(id: string) {
    return GroupsInvitations.findBy({ id })
  }

  async create(payload: CreateGroupInvitationType) {
    const groupInvitation = await GroupsInvitations.create({
      ...payload,
      status: GroupInvitationStatus.Pending,
    })

    return groupInvitation.save()
  }

  updateStatus(invitation: GroupsInvitations, status: GroupInvitationStatus) {
    return invitation.merge({ status }).save()
  }
}
