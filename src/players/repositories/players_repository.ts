import Player from '#src/players/models/players'

export default class PlayersRepository {
  login(email: string, password: string) {
    return Player.verifyCredentials(email, password)
  }

  insert(payload: Player) {
    return payload.save()
  }
}
