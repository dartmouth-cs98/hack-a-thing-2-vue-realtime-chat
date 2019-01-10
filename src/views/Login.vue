<template>
  <div class="d-flex align-items-center justify-content-center h-100">
    <b-form @submit="onSubmit" class="w-25">
      <b-input-group size="lg" :append="postfix">
        <b-form-input placeholder="Enter your username" v-model="username">
        </b-form-input>
      </b-input-group>
    </b-form>
  </div>
</template>

<script>
import fp from "fingerprintjs2"

export default {
  data: () => ({
    postfix: window.localStorage.getItem("postfix"),
    username: ""
  }),
  mounted() {
    if (!this.postfix)
      setTimeout(() => {
        fp.get(components => {
          const seed = fp.x64hash128(
            components.map(pair => pair.value).join(),
            31
          )
          const postfix = `#${parseInt(seed, 16) % 10000}`
          window.localStorage.setItem("fp", seed)
          window.localStorage.setItem("postfix", postfix)
          this.postfix = postfix
        })
      }, 50)
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.username + this.postfix
    }
  }
}
</script>
