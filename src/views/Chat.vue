<template>
  <div>
    <!-- TODO: sidebar: https://github.com/BlackrockDigital/startbootstrap-simple-sidebar/blob/master/index.html -->
    <!-- area to type in -->
    <b-form @submit="onSubmit"> <b-form-input v-model="message" /> </b-form>
    <!-- messages -->
    <b-list-group>
      <Message v-for="msg in messages" v-bind:key="msg._id" v-bind:msg="msg" />
    </b-list-group>
  </div>
</template>

<script>
import Message from "@/components/Message.vue"
import db from "@/assets/db"

export default {
  data() {
    return {
      messages: [],
      message: "",
      topic: this.$route.params.topic,
      user: window.localStorage.getItem("username"),
      busy: false,
      oldest: new Date(8640000000000000) + "" // max date
    }
  },
  async mounted() {
    document.title = "#" + this.topic
    await this.loadMore()
  },
  components: {
    Message
  },
  methods: {
    async loadMore() {
      this.busy = true

      const results = await db.local.find({
        selector: {
          topic: this.topic,
          created_at: { $lt: this.oldest }
        },
        limit: 25
      })

      if (results.docs.length) {
        this.oldest = results.docs[results.docs.length - 1].created_at
        for (let i = 0; i < results.docs.length; i++)
          this.messages.push(results.docs[i])
      }

      this.busy = false
    },
    async onSubmit() {
      const now = new Date() + ""

      await db.local.post({
        user: this.user,
        topic: this.topic,
        body: this.message,
        created_at: now,
        updated_at: now
      })
    }
  }
}
</script>
