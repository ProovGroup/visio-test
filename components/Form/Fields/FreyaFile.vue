<template lang="pug">
  .file.has-name.is-right.is-fullwidth
    label.file-label
      input.file-input(ref="fileInput" type="file" name="upload" @change="handler" v-bind="$attrs")
      span.file-cta
        span.file-label Importer
      template(v-if="!simple")
        span.file-name(v-if="filenames" v-text="filenames")
        span.file-name.placeholder(v-else v-text="placeholder")
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'FreyaFile',
  model: {
    prop: 'files',
    event: 'change'
  },
  props: {
    files: { type: FileList as PropType<FileList>, default: undefined },
    placeholder: { type: String, default: '' },
    simple: { type: Boolean, default: false }
  },
  data () {
    return {
    }
  },
  computed: {
    filenames (): string {
      const { files } = this
      if (!files) { return '' }
      const names = [] as string[]
      for (let i = 0; i < files.length; i += 1) {
        names.push(files[i].name)
      }
      return names.join(', ')
    }
  },
  watch: {
    files (newValue) {
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
      // since input files can't perform v-model (security reason)
      // if value is empty, we reset the file input
      !newValue && ((this.$refs.fileInput as HTMLInputElement).value = '')
    }
  },
  methods: {
    handler (e: any) {
      const files = e.target.files || e.dataTransfer.files as FileList
      files.length && this.$emit('change', files)
    }
  }
})
</script>

<style scoped lang="scss">
  .placeholder {
    color: blue;
  }
</style>
