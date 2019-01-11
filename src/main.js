import Vue from "vue"
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import infiniteScroll from "vue-infinite-scroll"
import App from "./App.vue"
import router from "./router"
import store from './store'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(infiniteScroll)

// fucking godsend: https://stackoverflow.com/a/52663166
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!window.localStorage.getItem("loggedIn")) next({ path: "/login" })
    // TODO: figure out why this doesn't block me from traveling to /login while logged in
    else if (to.path.indexOf("login") !== -1) next({ path: "/topics/general" })
    else next()
  } else next() // does not require auth, make sure to always call next()!
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
