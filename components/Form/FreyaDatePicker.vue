<template lang="pug">
  b-datepicker(
    v-bind="$attrs"
    v-on="$listeners"
    open-on-focus trap-focus
    :monthNames="months"
    :dayNames="days"
    :min-date="min"
    :max-date="max"
  )
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import { BDatepicker } from 'buefy/dist/components/datepicker'

export default Vue.extend({
  name: 'FreyaDatePicker',
  components: { BDatepicker },
  props:{
    max: { type: Date, default: undefined },
    min: { type: Date, default: undefined }
  },
  computed: {
    months () {
      return ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
    },
    days () {
      // return (this.$t('global.days') as string).split(',')
      return ['D', 'L', 'Ma', 'Me', 'J', 'V', 'S']
    }
  }
})
</script>

<style lang="scss">
</style>
