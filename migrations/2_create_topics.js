exports.up = knex =>
  knex.schema
    .createTable("topics", table => {
      table.increments()
      table
        .string("name", 20)
        .notNullable()
        .unique()
      table.specificType("name_vector", "tsvector").index(undefined, "gin")
      table.timestamps(true, true)
    })
    .then(
      knex.raw(`
        CREATE FUNCTION topic_prehook() RETURNS TRIGGER AS $$
          BEGIN
            NEW.name_vector := to_tsvector(NEW.name);
            RETURN NEW;
          END;
        $$ LANGUAGE plpgsql;
        
        CREATE TRIGGER topic_trigger BEFORE INSERT ON topics
          FOR EACH ROW EXECUTE PROCEDURE topic_prehook();
      `)
    )

exports.down = knex =>
  knex
    .raw(
      `
      DROP TRIGGER topic_trigger ON topics;
      DROP FUNCTION topic_prehook();
	  `
    )
    .then(knex.schema.dropTable("topics"))
