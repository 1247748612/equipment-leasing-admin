<!-- 组件说明 -->
<template>
  <div>
    <template v-if="!form">
      {{ selectionValue }}
    </template>
    <template v-else>
      <el-select
        v-model="modelValue"
        v-bind="delPropsAttrs"
      >
        <el-option
          v-for="item in column.options"
          :key="item[props['value']]"
          :label="item[props['label']]"
          :value="item[props['value']]"
        />
      </el-select>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ColumnOptions } from '@/components/Crud/interfaces/table.interface'
import { CrudTypeMixin } from './mixins/model'

@Component({
  name: 'CrudSelect'
})
export default class CrudSelect extends CrudTypeMixin {
  get selectionValue() {
    if (!this.column.options) {
      return this.value
    }
    for (let item of this.column.options) {
      if (item.value === this.value) {
        return item.label
      }
    }
    return this.value
  }

  get props() {
    if (this.attributes.props) {
      return this.attributes.props
    } else {
      return {
        label: 'label',
        value: 'value'
      }
    }
  }

  get delPropsAttrs() {
    const attrs = JSON.parse(JSON.stringify(this.attributes))
    if (this.attributes['props']) {
      Reflect.deleteProperty(attrs, 'props')
    }
    return attrs
  }

  created() {
  }
}

</script>
<style lang='scss' scoped>
//@import url()

</style>
