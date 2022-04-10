<template lang="pug">
  #jaas-container(v-if="this.videoCanBeLaunched === true")
  span(v-else) Use the link provided to the SMS instead of access directly!
</template>

<script>
import Vue from 'vue'
import { loadScript } from 'vue-plugin-load-script'
import auth from "~/middleware/auth";

export default Vue.extend({
  name: 'Room',
  middleware: [auth],
  data () {
    return {
      api: undefined
    }
  },
  computed: {
    videoCanBeLaunched () {
      return (this.$route.query.room !== undefined && this.$route.query.token !== undefined)
    }
  },
  async mounted() {
    await loadScript('https://8x8.vc/external_api.js')


    console.log(this.$route.query)

    if (this.$route.query.room === undefined || this.$route.query.token === undefined) {
      return
    }

    this.api = new JitsiMeetExternalAPI("8x8.vc", {
      roomName: this.$route.query.room,
      parentNode: document.querySelector('#jaas-container'),
      jwt: this.$route.query.token
    });
  }
})
</script>

<style lang="css">
#jaas-container {
  height: 100vh;
}
</style>
