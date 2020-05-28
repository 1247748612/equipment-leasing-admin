<!-- 组件说明 -->
<template>
  <i>
    <template v-if="!form">
      {{ value }}
    </template>
    <template v-else>
      <el-cascader
        v-model="modelValue"
        :placeholder="placeholder"
        :options="column.options"
        filterable
        clearable
        v-bind="attributes"
      />
    </template>
  </i>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ColumnOptions } from '@/components/Crud/interfaces/table.interface'
import { CrudTypeMixin } from './mixins/model'

@Component({
  name: 'CrudCascader'
})
export default class CrudCascader extends CrudTypeMixin {
  created() {
    // this.modelValue = String(this.modelValue)
  }
}

</script>
<style lang='scss' scoped>
//@import url()

</style>
