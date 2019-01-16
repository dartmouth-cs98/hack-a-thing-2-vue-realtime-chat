exports.up = knex =>
  knex.schema.createTable("users", table => {
    table.text("name").primary()
    table.text("password").notNullable()

    table.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTable("users")
