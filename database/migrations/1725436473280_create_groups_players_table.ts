import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'groups_players'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('group_id').primary().references('id').inTable('groups')
      table.integer('player_id').primary().references('id').inTable('players')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
