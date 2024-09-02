import { EditPlayerDTO } from '#src/players/services/auth_service'
import Player from '#src/players/models/players'

export default class PlayersRepository {
  login(email: string, password: string) {
    return Player.verifyCredentials(email, password)
  }

  insert(payload: Player) {
    return payload.save()
  }

  getByEmail(email: string) {
    return Player.findBy({ email })
  }

  getBySurname(surname: string) {
    return Player.findBy({ surname })
  }

  getById(id: string) {
    return Player.find(id)
  }

  async edit(player: Player, payload: EditPlayerDTO) {
    player.merge({
      surname: payload.surname || player.surname,
      email: payload.email || player.email,
    })

    await player.save()

    return player
  }
}
