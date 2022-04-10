<template lang="pug">
  div
    .container.pt-4
      section.columns.is-centered
        .column.is-full-tablet.is-three-fifths-fullhd.is-two-thirds-widescreen
          form-container.box
            freya-form(v-model="data"
              ref="form"
              :fields="fieldsForm"
              :loading="loading"
              :default-placeholder="$t('global.placeholder')"
              :submitText="$t('mission.send-sms')"
              :submit="submit"
            )
              template(#header)
                span.title.is-5.mb-3.mt-3(v-t="'mission.insert-information'")
                span.has-text-grey-darker.is-pulled-right(v-t="'external.required-field'")
              template(#endForm)
                span.title.is-5(v-if="data.platformType") {{ $tc('mission.click-to-send') }}
              template(#footer)
                span.title.is-5(v-if="data.platformType" v-t="'mission.sending-description'")
</template>

<script lang="ts">
  import Vue from 'vue'
  import {FormTemplate} from "~/interfaces/Form";
  import FreyaForm from "~/components/Form/FreyaForm.vue";
  import FormContainer from "~/components/Form/FormContainer.vue";

  export default Vue.extend({
    name: 'ScheduleMeeting',
    components: {FreyaForm, FormContainer},
    data() {
      return {
        loading: false,
        data: {} as {
          platformType: number,
          date: Date,
        }
      }
    },
    computed: {
      fieldsForm (): FormTemplate[] {
        return [
          {
            name: 'platformType',
            rules: 'required',
            type: 'select',
            label: this.$t('mission-type.platform') as string,
            extra: {
              options: [{
                label: 'consultation numéro 1',
                value: 1
              },
                {
                  label: 'consultation numéro 2',
                  value: 2
                }
              ]
            }
          },
          {
            name: 'date',
            type: 'date',
            label: this.$t('sinister.date') as string
          },
        ]
      }
    },
    methods: {
      submit () {

      }
    }
  })
</script>
