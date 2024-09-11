import {
  GroupInvitationRepository,
  type CreateGroupInvitationType,
} from '#src/groups/repositories/group_invitation_repository'
import GroupRepository from '#src/groups/repositories/group_repository'
import { inject } from '@adonisjs/core'
import { GroupInvitationStatus } from '../enums/group_invitation_status.js'
import { GroupsPlayersService } from './groups_players_service.js'

@inject()
export class GroupInvitationService {
  constructor(
    private repository: GroupInvitationRepository,
    private groupRepository: GroupRepository,
    private groupPlayersService: GroupsPlayersService
  ) {}

  getAskableUsers(groupId: string) {
    return this.repository.getAskableUsers(groupId)
  }

  async create(payload: CreateGroupInvitationType) {
    const { playerId, groupId } = payload

    const group = await this.groupRepository.getById(groupId)
    if (!group) {
      console.log('Group not found')
      return null
    }

    const existingEntry = await this.repository.getWaintingGroupInvitations(playerId, groupId)
    if (existingEntry) {
      console.log('Existing entry')
      return null
    }

    const groupInvitation = await this.repository.create(payload)

    return groupInvitation
  }

  async updateStatus(playerId: string, groupId: string, status: GroupInvitationStatus) {
    const invitation = await this.repository.getByPlayerAndGroup(playerId, groupId)
    if (!invitation) {
      return null
    }

    const result = await this.repository.updateStatus(invitation, status)

    if (status === GroupInvitationStatus.Accepted) {
      this.groupPlayersService.create(invitation.groupId, invitation.playerId)
    }

    return result
  }

  async delete(id: string) {
    const invitation = await this.repository.getById(id)
    if (!invitation) {
      return null
    }

    const result = await this.repository.delete(invitation)

    return result
  }
}
