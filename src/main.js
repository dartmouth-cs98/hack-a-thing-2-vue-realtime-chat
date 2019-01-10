import Vue from "vue"
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import App from "./App.vue"
import router from "./router"

Vue.config.productionTip = false
Vue.use(BootstrapVue)

// fucking godsend: https://stackoverflow.com/a/52663166
// TODO: prevent visiting login when already logged in
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!window.localStorage.getItem("loggedIn")) {
      next({ path: "/login" })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
