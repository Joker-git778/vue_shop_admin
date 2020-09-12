import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入elemnt-ui组件
import './utils/element-components';
// 初始化css
import 'normalize.css/normalize.css';
// icon css
import './assets/font/iconfont.css';
// 全局css
import './assets/less/global.less';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
