<!-- 组件说明 -->
<template>
  <span>
    <template v-if="!form">
      <el-tag
        v-bind="concatAttributes"
        size="small"
      >
        {{ radioLabel }}
      </el-tag>
    </template>
    <template v-else>
      <el-radio-group
        v-if="column.options"
        v-model="radioValue"
        @change="changeRadio"
      >
        <el-radio
          v-for="option in column.options"
          :key="option.value"
          border
          :label="option.label"
        />
      </el-radio-group>
    </template>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ColumnOptions } from '@/components/Crud/interfaces/table.interface'
import { CrudTypeMixin } from './mixins/model'

@Component({
  name: 'CrudRadio'
})
export default class CrudRadio extends CrudTypeMixin {
  radioValue: any = ''
  tagAttributes = {}

  changeRadio(label: any) {
    const option = this.column.options.find((option: any) => option.label === label)
    if (option) {
      this.modelValue = option.value
    }
  }

  get radioLabel() {
    const option = this.column.options.find((option: any) => option.value === this.modelValue || option.value === this.value)
    if (option) {
      this.tagAttributes = option.attributes
      return option.label
    } else {
      return this.column.value
    }
  }

  get concatAttributes() {
    const attrs = {
      ...this.attributes,
      ...(this.valueAttributes ? this.valueAttributes[this.value] || {} : {})
    }
    if (!attrs.type) {
      attrs.type = 'primary'
    }
    return attrs
  }

  created() {
    const value = this.modelValue || this.column.value
    const option = this.column.options.find((option: any) => option.value === value)
    this.radioValue = option ? option.label : value
  }
}

</script>
<style lang='scss' scoped>
//@import url()

</style>
