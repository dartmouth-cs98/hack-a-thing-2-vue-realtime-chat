exports.up = async knex => {
  await knex.schema.createTable("posts", table => {
    table.increments()

    table.enu("type", ["post", "comment"], { useNative: true })
    table.text("topic").references("topics.name")
    table.float("token_score")
    table.text("creator").references("users.name")

    table.text("body").notNullable()
    table.specificType("body_vector", "tsvector").index(undefined, "gin")

    table.timestamps(true, true)

    table.index(["type", "topic", "created_at", "token_score", "creator"])
  })

  await knex.raw(`
    CREATE FUNCTION posts_prehook() RETURNS TRIGGER AS $$
      BEGIN
        NEW.body_Vector := to_tsvector(NEW.body);
        RETURN NEW;
      END;
    $$ LANGUAGE plpgsql;
    
    CREATE TRIGGER posts_trigger BEFORE INSERT ON topics
      FOR EACH ROW EXECUTE PROCEDURE posts_prehook();
  `)
}

exports.down = async knex => {
  await knex.raw(`
    DROP TRIGGER posts_trigger ON topics;
    DROP FUNCTION posts_prehook();
  `)

  await knex.schema.dropTable("posts")
}
