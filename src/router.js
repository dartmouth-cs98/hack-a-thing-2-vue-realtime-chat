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
      redirect: "/topics/general"
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/topic",
      redirect: "/topics/general"
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
