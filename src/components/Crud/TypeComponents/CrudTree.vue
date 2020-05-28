<!-- 组件说明 -->
<template>
  <i>
    <template v-if="!form">
      <el-tree
        :data="value"
        v-bind="attributes"
      />
    </template>
    <template v-else>
      <el-tree
        ref="tree"
        :placeholder="placeholder"
        :data="column.options"
        v-bind="attributes"
        @check-change="checkChange"
      />
    </template>
  </i>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { ColumnOptions } from '@/components/Crud/interfaces/table.interface'
import { CrudTypeMixin } from './mixins/model'
import { ElTree } from 'element-ui/types/tree'
import { debounce } from 'lodash'

@Component({
  name: 'CrudTree'
})
export default class CrudTree extends CrudTypeMixin {
  @Ref() tree!: ElTree<any, any>
  nodeTimer: any = null

  checkChange() {
    if (this.nodeTimer) {
      return
    }
    this.nodeTimer = setTimeout(() => {
      clearTimeout(this.nodeTimer)
      this.nodeTimer = null
    }, 300)
    const nodes = this.tree.getCheckedNodes(false, true)
    this.modelValue = nodes
  }
}

</script>
<style lang='scss' scoped>
//@import url()

</style>
