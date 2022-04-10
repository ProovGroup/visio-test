import { Plugin } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Authentication, LoginResponse, LogoutResponse } from './types'
import { ErrorResponse } from '~/interfaces/Response'
import { Environment } from '~/interfaces/Environment'
import { RightsResponse } from '~/plugins/auth/types'

const $auth: Plugin = ({ $axios, $config, store, app: { $toast, i18n } }, inject) => {
  const params = {
    response_type: 'id_token token',
    scope: 'openid',
    client_id: ($config as Environment).authClientID
  }

  const client = $axios.create({
    baseURL: ($config as Environment).authAPI,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }) as NuxtAxiosInstance

  // Auth token interceptor
  client.onRequest((config) => {
    const token = store.state.auth.token
    if (token) { config.headers.Authorization = token }
  })

  client.onError((e) => {
    const [loginError = { type: 'message.error' }] = (e.response?.data as ErrorResponse)?.errors || []
    $toast.open({
      type: 'is-danger',
      message: i18n.t(loginError.type) as string
    })
  })

  const auth: Authentication = {
    login (login, password, expiration) {
      const data = new URLSearchParams()
      data.append('login', login)
      data.append('password', password)
      return client.$post<LoginResponse>('/user/login', data,
        { params: { ...params, expiration } })
    },
    logout () {
      return client.$post<LogoutResponse>('/user/logout')
    },
    getRights: () => client.$get<RightsResponse>('/user/rights')
  }

  inject('auth', auth)
}

export default $auth
