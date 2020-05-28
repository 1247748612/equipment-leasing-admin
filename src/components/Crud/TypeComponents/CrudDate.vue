<!-- 组件说明 -->
<template>
  <div>
    <span>
      {{ formatTime }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ColumnOptions } from '@/components/Crud/interfaces/table.interface'
import { CrudTypeMixin } from './mixins/model'
import dayjs from 'dayjs'

@Component({
  name: 'CrudDate'
})
export default class CrudDate extends CrudTypeMixin {
  get formatTime() {
    return dayjs(this.value).format(this.column.format)
  }
}

</script>
<style lang='scss' scoped>
//@import url()

</style>
