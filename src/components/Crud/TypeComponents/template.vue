<!-- 组件说明 -->
<template>
  <span>
    {{ value }}
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ColumnOptions } from '@/components/Crud/interfaces/table.interface'

@Component({
  name: 'CustomTempalte'
})
export default class CustomTemplate extends Vue {
  @Prop({ required: true }) value!: any
  @Prop({ required: true }) column!: ColumnOptions
}

</script>
<style lang='scss' scoped>
//@import url()

</style>
