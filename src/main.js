import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element-ui 框架
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

// 引入iconfont字体图标
import './assets/fonts/iconfont.css'

// 引入初始化css
import './assets/css/reset.css'

// 引入echarts图表
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
Vue.component('chart', ECharts)

Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
