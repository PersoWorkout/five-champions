import Player from '#src/players/models/players'
import PlayersRepository from '#src/players/repositories/players_repository'
import { inject } from '@adonisjs/core'

export interface CreatePlayerDTO {
  surname: string
  email: string
  password: string
}

@inject()
export class AuthService {
  constructor(private readonly repository: PlayersRepository) {}

  async login(email: string, password: string) {
    return this.repository.login(email, password)
  }

  async create(payload: CreatePlayerDTO) {
    const player = await Player.create(payload)
    return this.repository.insert(player)
  }
}
