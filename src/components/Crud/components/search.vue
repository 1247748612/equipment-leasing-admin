<!-- 组件说明 -->
<template>
  <div class="crud-actions-wrapper">
    <el-collapse
      v-model="activeNames"
    >
      <el-collapse-item>
        <template slot="title">
          <i class="header-icon el-icon-search" />
          <span class="title">
            搜索
          </span>
        </template>
        <div class="content-wrap">
          <slot />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit, PropSync, Inject } from 'vue-property-decorator'
import { ColumnOptions, TableColumns, TopActions } from '@/components/Crud/interfaces/table.interface'
import CrudForm from '../form.vue'

@Component({
  name: 'CrudSearch'
})
export default class CrudSearch extends Vue {
  activeNames:any[] = []

  created() {
  }
}

</script>
<style lang='scss' scoped>
//@import url()
.crud-actions-wrapper {
  margin-bottom: 10px;
}

.header-icon {
  font-size: 20px;
  color: #409eff;
  margin-left: 10px;
}

.title {
  font-size: 16px;
  padding-left: 8px;
  color: #409eff;
}

.content-wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}
</style>
