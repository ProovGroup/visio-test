<template lang="pug">
  section.columns.is-centered
    .column.is-two-fifths-tablet.is-one-third-widescreen.is-one-quarter-fullhd
      .box
        h4.title.is-4 {{ $t('title.login') }}
        validation-observer(ref="observer" v-slot="{ handleSubmit, invalid }" slim)
          form(@submit.prevent="handleSubmit(login)")
            wp-field(:label="$t('user.email')" rules="required|email")
              b-input(type="email" v-model="loginForm.email" :placeholder="$t('placeholder.input')")
            wp-field(:label="$t('user.password')" rules="required")
              b-input(type="password" v-model="loginForm.password" :placeholder="$t('placeholder.input')" password-reveal)
            wp-field
              b-checkbox(v-model="loginForm.stayConnected") {{ $t('login.stay-connected') }}
            wp-field
              b-button.has-text-weight-semibold(
                type="is-primary" native-type="submit" size="is-medium"
                :loading="loading" :disabled="invalid"
              ) {{ $t('global.login') }}
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationObserver } from 'vee-validate'
// @ts-ignore
import { BButton } from 'buefy/dist/components/button'
// @ts-ignore
import { BCheckbox } from 'buefy/dist/components/checkbox'
// @ts-ignore
import { BInput } from 'buefy/dist/components/input'

import WpField from '~/components/Form/FreyaField.vue'
import {split} from "lodash-es";

export default Vue.extend({
  name: 'ClaimLogin',
  components: { ValidationObserver, WpField, BButton, BCheckbox, BInput },
  layout: 'default',
  data () {
    return {
      loginForm: {} as { email: string, password: string, stayConnected: boolean },
      loading: false
    }
  },
  mounted () {
    this.$store.dispatch('auth/reset')
  },
  methods: {
    async login () {
      this.loading = true
      const { email, password, stayConnected = false } = this.loginForm
      try {
        await this.$store.dispatch('auth/login', { email, password, stayConnected })

        if (this.$route.query.redirect !== undefined) {
          const redirect = split(this.$route.query.redirect as string, "_")[0]

          if (this.$route.query.query !== undefined) {
            await this.$router.push({
              path: this.localePath({name: redirect}),
              query: JSON.parse(this.$route.query.query as string)
            })
          } else {
            await this.$router.push({path: this.localePath({name: redirect})})
          }
        } else {
          await this.$router.push({path: this.localePath({name: 'index'})})
        }
      } catch {
        this.loading = false
      }
    }
  }
})
</script>
<style scoped>

</style>
