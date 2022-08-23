import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("status_event_id").unsigned().references("status_events.id")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
