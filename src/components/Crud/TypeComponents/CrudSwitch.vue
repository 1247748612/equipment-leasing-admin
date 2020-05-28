<!-- 组件说明 -->
<template>
  <i>
    <template v-if="!form">
      <el-tag :type="value ? 'success' : 'danger'">
        {{ (attributes && attributes[value]) || value }}
      </el-tag>
    </template>
    <template v-else>
      <el-switch
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
  name: 'CrudSwitch'
})
export default class CrudSwitch extends CrudTypeMixin {
}

</script>
<style lang='scss' scoped>
//@import url()

</style>
