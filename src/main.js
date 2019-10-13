import Vue from 'vue'
import FinanceApp from './FinanceApp.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(FinanceApp),
}).$mount('#app')
