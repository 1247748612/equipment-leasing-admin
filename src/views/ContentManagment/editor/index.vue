<!-- 组件说明 -->
<template>
  <span>
    <div v-html="value" />
    <crud-editor v-model="value" />
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ColumnOptions } from '@/components/Crud/interfaces/table.interface'
import { CrudEditor } from '@/components/Crud'

@Component({
  name: 'Tinymce',
  components: {
    CrudEditor
  }
})
export default class Tinymce extends Vue {
  value: any = ''
}

</script>
<style lang='scss' scoped>
//@import url()

</style>
