import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'teams'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.string('name').notNullable()
      table.boolean('is_winner').nullable()
      table.uuid('match_id').references('id').inTable('matches').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
