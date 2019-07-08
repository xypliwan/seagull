import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/font/iconfont.css";
import './assets/styles/global.scss'

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import "./element-var.scss"

Vue.use(ElementUI);

import mixin from '@/utils/mixin'
Vue.mixin(mixin);

Vue.config.productionTip = false

new Vue({
  data:{
    loginVisible:false,
    tableTitileStyle:{
      'background-color': '#f5faf8',
      'color': '#666',
      'font-weight': 'bold',
      'font-size':'14px',
      'padding-top':'8px',
      'padding-bottom':'8px',
      'border-top':"2px solid #007947"
    },
    tableContentStyle:{
        'font-size':'13px',
        'color':'#777'
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
