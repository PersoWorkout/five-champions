import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Season extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare closingDate: Date

  @column()
  declare createdAt: Date

  @column()
  declare updatedAt: Date
}
