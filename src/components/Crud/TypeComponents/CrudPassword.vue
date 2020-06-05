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
        clearable
        show-password
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
  name: 'CrudPassword'
})
export default class CrudPassword extends CrudTypeMixin {
}

</script>
<style lang='scss' scoped>
//@import url()

</style>
