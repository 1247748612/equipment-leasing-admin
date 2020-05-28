<!-- 组件说明 -->
<template>
  <i>
    <template v-if="!form">
      {{ value }}
    </template>
    <template v-else>
      <el-input-number
        v-model="modelValue"
        :placeholder="placeholder"
        v-bind="column.attributes"
      />
    </template>
  </i>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ColumnOptions } from '@/components/Crud/interfaces/table.interface'
import { CrudTypeMixin } from './mixins/model'

@Component({
  name: 'CrudNumber'
})
export default class CrudNumber extends CrudTypeMixin {
  get min() {
    const attributes = this.attributes
    return (attributes && attributes.min) || 1
  }
}

</script>
<style lang='scss' scoped>
//@import url()

</style>
