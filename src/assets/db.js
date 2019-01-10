import PouchDB from "pouchdb"
import PouchAuth from "pouchdb-authentication"
import PouchFind from "pouchdb-find"
PouchDB.plugin(PouchAuth)
PouchDB.plugin(PouchFind)
// let synced = false

export default {
  remote: new PouchDB(process.env.VUE_APP_COUCHDB_URI, { skip_setup: true }),
  local: new PouchDB("chat"),
  async sync() {
    await this.local.bulkDocs([
      // user roles
      {
        _id: "_design/privileges",
        validate_doc_update:
          "function(newDoc, oldDoc, userCtx) {if (userCtx.roles.indexOf('_admin') === -1 && newDoc.user !== userCtx.name) {throw({forbidden : 'doc.user must be the same as your username.'})}}"
      },

      // user->created_at index
      {
        _id: "_design/user_date_idx",
        language: "query",
        views: {
          user_date_idx: {
            map: {
              fields: {
                user: "asc",
                created_at: "desc"
              }
            },
            reduce: "_count",
            options: {
              def: {
                fields: ["user", "created_at"]
              }
            }
          }
        }
      },

      // topic->created_at index
      {
        _id: "_design/topic_date_idx",
        language: "query",
        views: {
          topic_date_idx: {
            map: {
              fields: {
                topic: "asc",
                created_at: "desc"
              }
            },
            reduce: "_count",
            options: {
              def: {
                fields: ["topic", "created_at"]
              }
            }
          }
        }
      }
    ])

    return this.local
      .sync(this.remote, { live: true, retry: true })
      .on("change", change => {
        if (change.deleted) {
          // TODO:
        } else {
          // TODO: update/add comment
        }
        // console.log(`change: ${change}`)
      })
    // .on("error", console.error)
  }
}
