import Player from '#src/players/models/players'
import PlayersRepository from '#src/players/repositories/players_repository'
import { inject } from '@adonisjs/core'

export interface CreatePlayerDTO {
  surname: string
  email: string
  password: string
}

export interface EditPlayerDTO {
  surname: string | null
  email: string | null
}

@inject()
export class AuthService {
  constructor(private readonly repository: PlayersRepository) {}

  async login(email: string, password: string) {
    return this.repository.login(email, password)
  }

  async create(payload: CreatePlayerDTO) {
    const playerByEmail = await this.repository.getByEmail(payload.email)
    if (playerByEmail) {
      return null
    }

    const player = await Player.create(payload)

    return this.repository.insert(player)
  }

  async edit(playerId: string, payload: EditPlayerDTO) {
    const user = await this.repository.getById(playerId)

    if (!user) {
      return null
    }

    if (payload.email) {
      const existingEmail = await this.repository.getByEmail(payload.email)
      if (existingEmail && String(existingEmail.id) !== playerId) return null
    }

    return this.repository.edit(user, payload)
  }
}
