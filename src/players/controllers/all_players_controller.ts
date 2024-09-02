import { HttpContext } from '@adonisjs/core/http'
import Player from '../models/players.js'

export default class AllPlayersController {
  async render({ inertia }: HttpContext) {
    const players = await Player.all()
    console.log(players)
    return inertia.render('players/all', { data: players })
  }
}
