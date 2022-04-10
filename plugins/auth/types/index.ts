/* eslint-disable camelcase */
// @ts-ignore
import { SuccessResponse } from '~/interfaces/Response'

export interface LoginResponse {
  token_type: string,
  access_token: string,
  expires_in: number,
  id_token: string | number
}

export interface LogoutResponse extends SuccessResponse {}

export interface RightsResponse {
  NAV: string[]
}

export interface Authentication {
  login: (login: string, password: string, expiration?: number) => Promise<LoginResponse>
  logout: () => Promise<LogoutResponse>
  getRights: () => Promise<RightsResponse>
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: Authentication
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $auth: Authentication
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $auth: Authentication
  }
}
