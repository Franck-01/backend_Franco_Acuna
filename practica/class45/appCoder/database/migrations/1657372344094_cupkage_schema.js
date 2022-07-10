'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CupkageSchema extends Schema {
  up () {
    this.create('cupkages', (table) => {
      //schemas => algo similar a knex
      table.string("name", 80).notNullable().unique()
      table.string("description", 150)
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('cupkages')
  }
}

module.exports = CupkageSchema
