import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入elemnt-ui组件
import './utils/element-components';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
