import { Context } from '@nuxt/types'

export default function ({ store }: Context) {
  if (store.state.user.id) { return }
  return store.dispatch('user/requestUserInfo')
}
