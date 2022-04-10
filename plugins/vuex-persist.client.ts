import { Plugin } from '@nuxt/types'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

const vuexPersist: Plugin = ({ isHMR, store, isDev }) => {
  if (isHMR) { return }
  createPersistedState({
    key: 'dashboard-lolivier',
    paths: ['auth'],
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3, sameSite: 'strict', secure: !isDev }),
      removeItem: key => Cookies.remove(key)
    }
  })(store)
}

export default vuexPersist
