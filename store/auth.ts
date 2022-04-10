/* eslint-disable camelcase */
import { GetterTree, ActionTree, MutationTree } from 'vuex'
// @ts-ignore
import { RootState } from './index'

export const state = () => ({
  token: '',
  timeout: new Date().toISOString(),
  permissions: {
    NAV: []
  }
})

export type AuthState = ReturnType<typeof state>

export const getters: GetterTree<AuthState, RootState> = {
  timeout: state => (new Date(state.timeout))
}

export const mutations: MutationTree<AuthState> = {
  SET_TOKEN (state, token = '') {
    state.token = token
  },
  SET_TIMEOUT (state, timeout = new Date(Date.now() + (1000 * 60 * 60))) {
    state.timeout = timeout.toISOString()
  },
  SET_PERMISSIONS (state, permissions = { NAV: [] as string[] }) {
    state.permissions = permissions
  }
}

export const actions: ActionTree<AuthState, RootState> = {
  reset ({ commit }) {
    commit('SET_TOKEN')
    commit('SET_TIMEOUT', new Date())
    commit('SET_PERMISSIONS', undefined)
  },
  async logout ({ dispatch }) {
    try {
      await this.$auth.logout()
    } finally {
      await dispatch('reset')
    }
  },
  async setRights ({ commit }) {
    commit('SET_PERMISSIONS', await this.$auth.getRights())
  },
  async login ({ commit, dispatch }, payload: { email: string, password: string, stayConnected: boolean }) {
    const expiration = payload.stayConnected ? 3600 * 24 * 14 : 3600 * 24 // 14days or default
    const { access_token, expires_in } = await this.$auth.login(payload.email, payload.password, expiration)
    commit('SET_TOKEN', access_token)
    commit('SET_TIMEOUT', new Date(Date.now() + expires_in * 1000))

    await dispatch('setRights')
  }
}
