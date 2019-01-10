- install couchdb & start it up
- create admin account
- create a database
- enable cors
- change `couch_http_auth:timeout` to 604800
- add the following design documents (minus comments) to the database:
```javascript
// user roles
{
  "_id": "_design/privileges",
  "validate_doc_update": "function(newDoc, oldDoc, userCtx) {if (userCtx.roles.indexOf('_admin') === -1 && newDoc.user !== userCtx.name) {throw({forbidden : 'doc.user must be the same as your username.'})}}"
}

// user->created_at index
{
  "_id": "_design/user_date_idx",
  "language": "query",
  "views": {
    "user_date_idx": {
      "map": {
        "fields": {
          "user": "asc",
          "created_at": "desc"
        }
      },
      "reduce": "_count",
      "options": {
        "def": {
          "fields": [
            "user",
            "created_at"
          ]
        }
      }
    }
  }
}

// topic->created_at index
{
  "_id": "_design/topic_date_idx",
  "language": "query",
  "views": {
    "topic_date_idx": {
      "map": {
        "fields": {
          "topic": "asc",
          "created_at": "desc"
        }
      },
      "reduce": "_count",
      "options": {
        "def": {
          "fields": [
            "topic",
            "created_at"
          ]
        }
      }
    }
  }
}
```
