import { Context } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Environment } from '~/interfaces/Environment'

export default ({ $axios, $config }: Context, locale: string) => {
  const requester = $axios.create({
    baseURL: ($config as Environment).i18nAPI,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }) as NuxtAxiosInstance
  return requester.$get(`${locale}.json`)
}
