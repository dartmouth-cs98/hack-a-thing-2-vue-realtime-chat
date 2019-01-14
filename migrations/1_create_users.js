exports.up = knex =>
  knex.schema.createTable("users", table => {
    table.increments()
    table
      .string("name", 15)
      .notNullable()
      .unique()
    table.string("password").notNullable()
    table.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTable("users")
