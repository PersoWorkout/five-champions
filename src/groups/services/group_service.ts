import { inject } from '@adonisjs/core'
import GroupRepository from '#src/groups/repositories/group_repository'

@inject()
export class GroupService {
  constructor(private repository: GroupRepository) {}

  getAll(playerId: string) {
    return this.repository.getGroupsByPlayer(playerId)
  }

  getById(playerId: string, groupId: string) {
    return this.repository.getDetails(playerId, groupId)
  }

  create(name: string, playerId: string) {
    return this.repository.create({ name, playerId })
  }
}
