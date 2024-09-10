import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'groups_players'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('group_id').references('id').inTable('groups')
      table.uuid('player_id').references('id').inTable('players')
      table.primary(['group_id', 'player_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
