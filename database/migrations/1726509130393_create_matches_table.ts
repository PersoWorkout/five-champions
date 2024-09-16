import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'matches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.dateTime('match_date').notNullable()
      table.uuid('season_id').references('id').inTable('seasons').notNullable()
      table.uuid('player_id').references('id').inTable('players').notNullable()
      table.uuid('mvp_player_id').references('id').inTable('players').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
