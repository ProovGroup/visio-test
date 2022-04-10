import Vue from 'vue'
import Buefy, { ToastProgrammatic } from 'buefy'

Vue.use(Buefy, {
  defaultToastDuration: 5000
})

const toast = (_ctx, inject) => {
  inject('toast', ToastProgrammatic)
}

export default toast
