<!-- 组件说明 -->
<template>
  <div>
    {{ $attrs.pagination }}
    <el-pagination
      v-bind="paginationAttr"
      :layout="layout"
      :background="background"
      :hide-on-single-page="hideOnSinglePage"
      :page-size.sync="paginationAttr['limit']"
      :current-page.sync="paginationAttr['page']"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator'
import { ColumnOptions } from '@/components/Crud/interfaces/table.interface'

@Component({
  name: 'CrudPagination'
})
export default class CrudPagination extends Vue {
  @PropSync('pagination', { default: () => ({}) }) paginationAttr!: any

  get layout() {
    return this.paginationAttr.layout || 'sizes, prev, pager, next, jumper, ->, total'
  }

  get background() {
    return this.paginationAttr.background || true
  }

  get hideOnSinglePage() {
    return this.paginationAttr['hide-on-single-page'] || true
  }

  sizeChange() {
    this.$emit('load-data')
  }

  currentChange() {
    this.$emit('load-data')
  }
}

</script>
<style lang='scss' scoped>
//@import url()

</style>
