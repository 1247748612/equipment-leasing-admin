<!-- 组件说明 -->
<template>
  <span>
    {{ value }}
    <crud-markdown v-model="value" />
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ColumnOptions } from '@/components/Crud/interfaces/table.interface'
import { CrudMarkdown } from '@/components/Crud'

@Component({
  name: 'Markdown',
  components: {
    CrudMarkdown
  }
})
export default class Markdown extends Vue {
  value: any = ''
}

</script>
<style lang='scss' scoped>
//@import url()

</style>
