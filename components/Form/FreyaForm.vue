<template lang="pug">
  validation-observer(tag="div" ref="observer" v-slot="{ handleSubmit, invalid }")
    form(@submit.prevent="handleSubmit(submit)")
      p.mb-4(v-if="!!$slots.header")
        slot(name="header")
      freya-field(
        v-for="(field, index) in cFields"
        :key="`${field.name}-${index}`"
        v-slot="{ errors }"
        :label="field.label"
        :rules="field.rules")
        b-checkbox(v-if="field.type === 'checkbox'"
          v-model="cData[field.name]"
          type="is-primary"
          v-text="field.placeholder || defaultPlaceholder"
          v-bind="field.extra")
        freya-date-picker(v-else-if="field.type === 'date'"
          v-model="cData[field.name]"
          :placeholder="field.placeholder || defaultPlaceholder"
          :class="[errors.length && 'is-danger']"
          v-bind="field.extra")
        freya-file(v-else-if="field.type === 'file'"
          v-model="cData[field.name]"
          :class="[errors.length && 'is-danger']"
          :placeholder="field.placeholder || defaultPlaceholder"
          v-bind="field.extra")
        input.input(v-else-if="field.type === 'number'"
          :type="field.type"
          v-model.number="cData[field.name]"
          :placeholder="field.placeholder || defaultPlaceholder"
          :class="[errors.length && 'is-danger']"
          v-bind="field.extra")
        b-select(v-else-if="field.type === 'select'"
          v-model="cData[field.name]"
          :class="[errors.length && 'is-danger']"
          :placeholder="field.placeholder || defaultPlaceholder"
          @input="field.eventHandler()"
          v-bind="field.extra" expanded)
          option(
            v-for="(option, index) in field.extra.options" :key="`option-${option.label}-${index}`"
            :value="option.value"
          ) {{ option.label }}
        b-input(v-else
          :type="field.type"
          v-model="cData[field.name]"
          :class="[errors.length && 'is-danger']"
          :placeholder="field.placeholder || defaultPlaceholder"
          v-bind="field.extra" expanded)
      p.mb-4(v-if="!!$slots.endForm")
        slot(name="endForm")
      .has-text-centered.mb-3
        button.button(
          v-if="hideButton"
          :class="[submitClass, loading && 'is-loading']"
          name="submit" type="submit"
          :disabled="loading || notInitialized"
          v-text="submitText")
      p(v-if="!!$slots.footer")
        slot(name="footer")
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ValidationObserver } from 'vee-validate'
// @ts-ignore
import { BSelect } from 'buefy/src/components/select'
// @ts-ignore
import { BInput } from 'buefy/src/components/input'
import FreyaField from '~/components/Form/FreyaField.vue'
import { FormTemplate } from '~/interfaces/Form'
import FreyaDatePicker from '~/components/Form/FreyaDatePicker.vue'
import FreyaFile from '~/components/Form/Fields/FreyaFile.vue'

export default Vue.extend({
  name: 'FreyaForm',
  components: { FreyaField, FreyaFile, ValidationObserver, BSelect, BInput, FreyaDatePicker },
  model: {
    prop: 'data',
    event: 'input'
  },

  props: {
    data: { type: Object, required: true },
    fields: { type: Array as PropType<FormTemplate[]>, required: true },
    submitText: { type: String, default: 'Submit' },
    submitClass: { type: String, default: 'is-primary is-medium' },
    defaultPlaceholder: { type: String, default: '' },
    loading: { type: Boolean, default: false },
    notInitialized: { type: Boolean, default: false},
    hideButton: { type: Boolean, default: true }

  },
  computed: {
    cFields (): FormTemplate[] {
      return this.fields.filter(f => f?.hide !== true)
    },
    cData: {
      get (): any {
        return this.data
      },
      set (value: any) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    },
    reset () {
      this.cData = {}
      this.$nextTick(() => {
        // @ts-ignore
        this.$refs.observer.reset()
      })
    }
  }
})
</script>

<style scoped lang="scss">
  p {
    margin-bottom: 30px;
  }
  p:not(:first-child) {
    margin-top: 30px;
  }

</style>
