import PouchDB from "pouchdb"
import PouchAuth from "pouchdb-authentication"
PouchDB.plugin(PouchAuth)

export default {
  remote: new PouchDB(process.env.VUE_APP_COUCHDB_URI, { skip_setup: true }),
  local: new PouchDB("chat")
}
