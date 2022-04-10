<template lang="pug">
  .is-fullwidth
    header.is-flex.is-justify-content-space-between.mb-3
    slot
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FormContainer',
  props: {
    title: { type: String, default: '' }
  }
})
</script>

<style scoped lang="scss">

</style>
