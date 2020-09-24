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

// 引入全局过滤器
import filters from './utils/filter.js'
// 引入echarts图表
// import ECharts from 'vue-echarts'
// import 'echarts/lib/chart/line'
// Vue.component('chart', ECharts)
import myCharts from './utils/MyCharts.js'
import echarts from 'echarts'
// 引入moment
import moment from 'moment'
Vue.prototype.$moment = moment
Vue.prototype.$echarts = echarts

filters(Vue)
Vue.use(myCharts)
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
