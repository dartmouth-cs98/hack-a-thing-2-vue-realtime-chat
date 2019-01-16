<template>
  <div class="d-flex align-items-center justify-content-center h-100">
    <b-form @submit="onSubmit" class="w-25">
      <b-input-group size="lg" :append="postfix">
        <b-form-input placeholder="What's your name?" v-model="username"></b-form-input>
      </b-input-group>
    </b-form>
  </div>
</template>

<script>
import fp from "fingerprintjs2"
import db from "../assets/db"

export default {
  data: () => ({
    postfix: window.localStorage.getItem("postfix"),
    username: "",
    password: ""
  }),
  mounted() {
    if (!window.localStorage.getItem("postfix"))
      setTimeout(() => {
        fp.get(components => {
          // TODO: just send the raw username string
          this.password = fp.x64hash128(
            components.map(pair => pair.value).join(),
            31
          )
          const postfix = `#${parseInt(seed, 16) % 10000}`

          window.localStorage.setItem("postfix", (this.postfix = postfix))
        })
      }, 50)
  },
  methods: {
    // current login behaviour is to simply sign up with user's given username.
    // TODO: check if a username already exists in browser
    async onSubmit(e) {
      e.preventDefault()

      // check if user already exists in the server
      try {
        window.localStorage.setItem("username", this.username + this.postfix)
        await db.remote.signUp(
          window.localStorage.getItem("username"),
          window.localStorage.getItem("fp")
        )
      } catch (err) {
        if (err.name != "conflict") {
          alert(err.message)
          return
        }
      }

      // login
      try {
        await db.remote.logIn(
          window.localStorage.getItem("username"),
          window.localStorage.getItem("fp")
        )
        window.localStorage.setItem("loggedIn", true)

        this.$router.push("/topics/general")
      } catch (err) {
        if (err.name == "forbidden") {
          // wrong password. TODO: what do?
        }
      }
    }
  }
}
</script>
