<template lang="pug">
  nuxt-child
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MeetingIndex',
  middleware: [
    ({ redirect, app: { localePath } }) => {
      return redirect(localePath({ name: 'meeting-schedule_meeting' }))
    }
  ]
})
</script>
