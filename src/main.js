import Vue from 'vue'
import App from './App.vue'
import router from './router'; // 导入路由配置
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router, // 将路由配置添加到 Vue 实例中
  vuetify,
  render: h => h(App)
}).$mount('#app')