const PouchDB = require("pouchdb")
PouchDB.plugin(require("pouchdb-authentication"))

exports.remote = new PouchDB(process.env.COUCHDB_URI, { skip_setup: true })
exports.local = new PouchDB("chat")
