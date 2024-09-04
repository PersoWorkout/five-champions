import { HttpContext } from '@adonisjs/core/http'
import Group from '../models/group.js'
import Player from '#src/players/models/players'
import db from '@adonisjs/lucid/services/db'
import GroupsPlayers from '../models/groups_players.js'

export default class CreateGroupController {
  async handle({ request, response }: HttpContext) {
    var { name } = request.all()

    const player = await Player.findBy({ email: 'yaskoshot@example.com' })
    if (!player) {
      return response.notFound()
    }

    const group = await Group.create({ name, playerId: player.id })
    await group.save()

    const groupPlayer = await GroupsPlayers.create({ groupId: group.id, playerId: player.id })
    await groupPlayer.save()

    const groupsCount = await db.from('groups').count('* as total')

    console.log(groupsCount[0].total)

    return response.ok({ data: { group, groupPlayer } })
  }
}
