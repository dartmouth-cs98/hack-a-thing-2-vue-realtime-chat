import Vue from "vue"
import Router from "vue-router"
import Login from "./views/Login.vue"
import Chat from "./views/Chat.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/topics/:topic",
      component: Chat,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
