<template lang="pug">
  div
</template>

<script lang="ts">
import Vue from 'vue'
import { AuthState } from '~/store/auth'

const isGoodToGo = (route: string, permissions: string[]) =>
  permissions.reduce((acc: boolean, current: string) => acc || (new RegExp(current)).test(route || ''), false)

export default Vue.extend({
  name: 'MainIndex',
  middleware: [
    ({ store, query, redirect, app: { localePath, $toast, i18n } }) => {
      const permissions = (store.state.auth as AuthState).permissions

      if (isGoodToGo('videoconferencing', permissions.NAV)) {
        return redirect(localePath({ name: 'meeting', query: query }))
      }

      if (store.state.auth.token) {
        $toast.open({
          type: 'is-danger',
          message: i18n.tc(permissions.NAV.length ? 'auth.error' : 'auth.fleet-denied')
        })
      }
      return redirect(localePath({ name: 'login' }))
    }
  ]
})
</script>
