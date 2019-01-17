exports.up = async knex => {
  await knex.schema.createTable("topics", table => {
    table.text("name").primary() // a.k.a. "path"
    table.specificType("name_vector", "tsvector").index(undefined, "gin")

    table.text("parent").references("topics.name")

    table.timestamps(true, true)
  })

  await knex.raw(`
    CREATE FUNCTION topics_prehook() RETURNS TRIGGER AS $$
      BEGIN
        NEW.name_vector := to_tsvector(NEW.name);
        RETURN NEW;
      END;
    $$ LANGUAGE plpgsql;
    
    CREATE TRIGGER topics_trigger BEFORE INSERT ON topics
      FOR EACH ROW EXECUTE PROCEDURE topics_prehook();
  `)
}

exports.down = async knex => {
  await knex.raw(`
    DROP TRIGGER topics_trigger ON topics;
    DROP FUNCTION topics_prehook();
  `)

  await knex.schema.dropTable("topics")
}
