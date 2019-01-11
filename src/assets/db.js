// import PouchDB from "pouchdb"
// import PouchAuth from "pouchdb-authentication"
// import PouchFind from "pouchdb-find"
PouchDB.plugin(PouchAuth)
PouchDB.plugin(PouchFind)
// let synced = false

const remote = new PouchDB(process.env.VUE_APP_COUCHDB_URI, {
  skip_setup: true
})
const local = new PouchDB("chat")
// TODO: figure out where this should go!
;(async (remote, local) => {
  await local.bulkDocs([
    // user roles
    {
      _id: "_design/privileges",
      validate_doc_update:
        "function(newDoc, oldDoc, userCtx) {if (userCtx.roles.indexOf('_admin') === -1 && newDoc.user !== userCtx.name) {throw({forbidden : 'doc.user must be the same as your username.'})}}"
    },

    // user->created_at index
    {
      _id: "_design/topic_date_idx",
      language: "query",
      views: {
        topic_date_idx: {
          map: {
            fields: {
              topic: "asc",
              created_at: "desc"
            },
            partial_filter_selector: {}
          },
          reduce: "_count",
          options: {
            def: {
              fields: ["topic", "created_at"]
            }
          }
        }
      }
    },

    // topic->created_at index
    {
      _id: "_design/user_date_idx",
      language: "query",
      views: {
        user_date_idx: {
          map: {
            fields: {
              user: "asc",
              created_at: "desc"
            },
            partial_filter_selector: {}
          },
          reduce: "_count",
          options: {
            def: {
              fields: ["user", "created_at"]
            }
          }
        }
      }
    }
  ])

  local.sync(remote, { live: true, retry: true }).on("change", change => {
    if (change.deleted) {
      // TODO:
    } else {
      // TODO: update/add comment
    }
    // console.log(`change: ${JSON.stringify(change)}`)
  })
  // .on("error", console.error)
})(remote, local)

export default { remote, local }
