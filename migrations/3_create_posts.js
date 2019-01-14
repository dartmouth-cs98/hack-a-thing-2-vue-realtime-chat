exports.up = knex =>
  knex.schema
    .createTable("posts", table => {
      table.increments()
      table.integer("parent_id").references("posts.id")
      table
        .integer("topic_id")
        .notNullable()
        .references("topics.id")
      table.float("token_score")
      table.specificType("path", "INT[]")
      table.specificType("htap", "INT[]")
      table.text("body").notNullable()
      table
        .integer("user_id")
        .notNullable()
        .references("users.id")
        .index()
      table.timestamps(true, true)

      table.index(["topic_id"])
      table.primary([])
    })
    .then(
      // TODO: how am I going to handle people passing in path/htap on updates?
      // TODO: how am I going to handle updates *without* path/htap changes?
      knex.raw(`
      CREATE FUNCTION post_prehook() RETURNS TRIGGER AS $$
        BEGIN
          NEW.body_vector := to_tsvector(NEW.body);
          IF NEW.path IS NULL OR NEW.htap IS NULL THEN
            NEW.path = ARRAY[NEW.id];
            NEW.htap = ARRAY[-NEW.id];
          ELSE
            NEW.path = NEW.path || NEW.id;
            NEW.htap = NEW.htap || -NEW.id;
          END IF;
          RETURN NEW;
        END;
      $$ LANGUAGE plpgsql;
      
      CREATE TRIGGER post_trigger BEFORE INSERT OR UPDATE ON posts
        FOR EACH ROW EXECUTE PROCEDURE post_prehook();
    `)
    )

exports.down = knex => knex.schema.dropTable("posts")
