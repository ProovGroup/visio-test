<template lang="pug">
  validation-provider(v-slot="{ errors, ...vee }" :name="name || label" v-bind="[$attrs, $props]" slim)
    b-field(
      :label="requiredLabel"
      :type="{ 'is-danger': errors.length }"
      :message="messages(errors)"
    )
      slot(v-bind="{ errors, ...vee }")
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationProvider } from 'vee-validate'
// @ts-ignore
import { BField } from 'buefy/dist/components/field'

export default Vue.extend({
  name: 'FreyaField',
  components: { ValidationProvider, BField },
  props: {
    name: { type: String, default: '' },
    label: { type: String, default: '' },
    message: { type: String, default: '' },
    errorMessage: { type: String, default: '' },
    rules: { type: [String, Object], default: '' }
  },
  computed: {
    requiredLabel (): string | undefined {
      if (!this.label) { return undefined }
      if (typeof this.rules === 'string') {
        return (this.rules).includes('required') ? this.label + ' *' : this.label
      } else if ((this.rules as any)?.required) {
        return this.label ? this.label + ' *' : ''
      } else {
        return this.label
      }
    }
  },
  methods: {
    messages (errors: string[]): any[] {
      const hasError = errors.length > 0
      return [
        { [this.message]: !hasError },
        ...this.errorMessage
          ? [{ [this.errorMessage]: hasError }]
          : errors.map(e => ({ [e]: hasError }))
      ]
    }
  }
})
</script>

<style lang="scss">
  .field {
    &:not(:last-child) {
      margin-bottom: 1.25rem
    }
  }
</style>
