<!-- 组件说明 -->
<template>
  <i>
    <template v-if="!form">
      {{ value }}
    </template>
    <template v-else>
      <el-input
        v-model="modelValue"
        :placeholder="placeholder"
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
  name: 'CrudString'
})
export default class CrudString extends CrudTypeMixin {
}

</script>
<style lang='scss' scoped>
//@import url()

</style>
