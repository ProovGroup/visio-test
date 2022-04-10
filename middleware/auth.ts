import { Context } from '@nuxt/types'
// @ts-ignore
import { AuthState } from '~/store/auth'

const authMiddleware = async ({ route, store, redirect, app: { localePath, $toast, i18n } }: Context) => {
  const permissions = (store.state.auth as AuthState).permissions
  const isGoodToGo = permissions.NAV.reduce<boolean>(
    (acc: boolean, current: any) => {
      return acc || (new RegExp(current)).test(route.name || '')
    },
    false
  )

  console.log(isGoodToGo)
  console.log(route)

  if (isGoodToGo) {
    // has right to go to route.name, check token/timeout
    if (!store.state.auth.token || store.getters['auth/timeout'] < new Date()) {
      await store.dispatch('auth/reset')
      if (!store.state.auth.token) {
        return redirect(localePath({ name: 'login', query: { redirect: route.name, query: JSON.stringify(route.query) } }))
      }
      return redirect(localePath({ name: 'login', query: { expired: 'true', redirect: route.name, query: JSON.stringify(route.query) } }))
    }
  } else if (store.state.auth.token) {
    // forbidden access, but user was logged
    await store.dispatch('auth/reset')
    $toast.open({
      type: 'is-danger',
      message: i18n.tc(permissions.NAV.length ? 'auth.error' : 'auth.lolivier-denied')
    })
    return redirect(localePath({ name: 'login', query: { unauthorized: 'true' } }))
  } else {
    // forbidden access, but user was NOT logged so we should redirect him after login
    await store.dispatch('auth/reset')
    return redirect(localePath({ name: 'login', query: { redirect: route.name, query: JSON.stringify(route.query) } }))
  }
}

export default authMiddleware
