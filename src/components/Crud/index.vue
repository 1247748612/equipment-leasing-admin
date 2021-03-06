<template>
  <div
    v-loading.lock="tableLoading"
    class="crud-container"
  >
    <template
      v-for="column in tableSlotColumns"
      :slot="column.prop"
      slot-scope="scope"
    >
      <slot
        v-if="column.columnSlot"
        :name="column.prop"
        v-bind="scope"
      />
    </template>
    <crud-top-actions
      v-model="formDialogShow"
      :show-props.sync="showProps"
      :columns="showColumns"
      :options="options.topActions"
      :title="options.title"
      @add-btn="addBtn"
      @hightlight-btn="hightlightBtn"
      @refresh="refresh"
      @loading-btn="loadingBtn"
      v-on="$listeners"
    >
      <template #search>
        <crud-search
          v-if="searchColumns.length"
        >
          <crud-form
            :columns="searchColumns"
            :label-width="options.labelWidth"
            label-position="top"
            form-status="search"
            :rules="options.searchRules"
            @trigger-event="triggerEvent"
            v-on="$listeners"
          >
            <template
              v-for="column in searchSlotColumns"
              :slot="column.prop + 'Search'"
              slot-scope="scope"
            >
              <slot
                :name="column.prop + TEXT.SLOT_FORM_SUFFIX"
                v-bind="scope"
              />
            </template>
          </crud-form>
        </crud-search>
      </template>
    </crud-top-actions>
    <crud-generate-table
      v-bind="$attrs"
      :table-options="options.tableOptions"
      :columns="filterColumns"
      :menu-column="options.menuColumn"
      v-on="tableListeners"
      @edit-click="editBtn"
      @del-click="delBtn"
      @custom-click="customBtn"
    >
      <template
        v-for="column in showColumns"
        :slot="column.prop"
        slot-scope="scope"
      >
        <slot
          v-if="column.columnSlot"
          :name="column.prop"
          v-bind="scope"
        />
      </template>
    </crud-generate-table>
    <el-row
      :gutter="20"
      type="flex"
      justify="end"
      style="margin-top: 20px"
    >
      <el-col :span="24">
        <crud-pagination
          :pagination.sync="paginate"
          v-on="$listeners"
        />
      </el-col>
    </el-row>
    <crud-dialog
      :visible.sync="formDialogShow"
      :dialog-attribute="options.dialogOptions"
    >
      <crud-form
        v-model="formData"
        :columns="showColumns"
        :label-width="options.labelWidth"
        :form-status="formStatus"
        v-bind="$attrs"
        @trigger-event="triggerEvent"
        v-on="$listeners"
      >
        <template
          v-for="column in formSlotColumns"
          :slot="column.prop + 'Form'"
          slot-scope="scope"
        >
          <slot
            :name="column.prop + TEXT.SLOT_FORM_SUFFIX"
            v-bind="scope"
          />
        </template>
      </crud-form>
    </crud-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide, Watch, PropSync } from 'vue-property-decorator'
import { ColumnOptions, TableColumns, TableOptions, FormStatus } from '@/components/Crud/interfaces/table.interface'
import { ROW_DEL_NAME, ROW_EDIT_NAME } from './constatns/text.constant'
import { EventMixin } from './mixins/event'
import loadComponents from './components/index'
import CrudDialog from './dialog.vue'
import CrudForm from './form.vue'
@Component({
  name: 'CrudTable',
  components: {
    ...(loadComponents()),
    CrudDialog,
    CrudForm
  }
})
export default class CrudTable extends EventMixin {
  @Provide() hasIdentifier(identifier: string | undefined | null) {
    if (!identifier || this.permission.includes(identifier)) {
      return true
    }
    return false
  }
  @PropSync('pagination', { default: () => ({}) }) paginate!: any

  formSlotColumns: any = []
  tableSlotColumns: any = []
  searchSlotColumns: any = []
  searchColumns: any = []
  currentRow: any[] = [] // 选中行

  get tableListeners() {
    const eventNameList = ['row-dblclick', 'current-change', 'refresh']
    var vm = this
    return Object.assign(
      {},
      this.$listeners,
      {
        'row-dblclick': this.dblclick,
        'current-change': this.currentChange,
        'filter-change': (...args: any) => {
          this.paginate.page = 1
          this.eventLoadingBtn('filter-change', args)
        },
        'sort-change': (...args: any) => {
          this.eventLoadingBtn('sort-change', args[0])
        }
      }
    )
  }

  refresh() {
    if (this.$listeners['load-data']) {
      this.$emit('load-data', this.changeLoadingStatus)
    } else {
      this.$emit('refresh', this.changeLoadingStatus)
    }
  }

  loadingBtn(event: Function) {
    event && event(this.changeLoadingStatus)
  }

  eventLoadingBtn(eventName: string, args: any) {
    this.$emit(eventName, args, this.changeLoadingStatus)
  }

  // 高亮按钮
  hightlightBtn(event: Function) {
    if (this.currentRow && this.currentRow.length) {
      const row = this.currentRow[0]
      event && event(row, this.addBtn) // return 高亮行 和 新增按钮
    } else {
      this.$message.error('请先点击任意一行')
    }
  }

  // 高亮行获取
  currentChange(...event: any) {
    this.currentRow = event
    event.push(this.addBtn)
    this.$emit('current-change', ...event)
  }

  /*
    双击事件 并返回打开dialog Function
   */
  dblclick(...event: any) {
    console.log('dbclick')
    event.push(this.addBtn)
    this.$emit('row-dblclick', ...event)
  }

  /**
   * 新增按钮
   */
  addBtn(data?: any) {
    this.formData = data || this.defaultForm || {}
    this.formDialogShow = true
    this.formStatus = FormStatus.ADD
  }

  /**
   * 编辑按钮
   */
  editBtn(scope: any) {
    this.formData = scope.row
    this.formDialogShow = true
    this.formStatus = FormStatus.EDIT
  }

  /**
   * 删除按钮
   */
  delBtn(scope: any) {
    this.triggerEvent('del-event', scope.row)
  }

  customBtn(scope: any, button: any) {
    button.event && button.event(scope, this.changeLoadingStatus)
  }

  @Watch('columns', { immediate: true })
  initTable() {
    console.log('columns', '更新')
    if (!this.columns || (this.columns && !this.columns.length)) return
    this.showProps = []
    // 新的columns
    this.showColumns = this.columns
    // 多层传递的ColumnSlot
    this.tableSlotColumns = this.showColumns.filter((column: any) => {
      return column.columnSlot === true
    })
    // searchColumns
    this.searchColumns = []
    // searchSlotsColumns
    this.searchSlotColumns = []

    this.showColumns.forEach((column: any) => {
      column.search && this.searchColumns.push({
        ...column,
        form: true,
        span: column.searchSpan || 8
      })
      column.searchSlot && this.searchSlotColumns.push({
        ...column,
        span: column.searchSpan || 8
      })
    })

    // 多层传递的ColumnSlot
    this.formSlotColumns = this.showColumns.filter((column: any) => {
      return column.formSlot === true
    })
    // 获取要展示的props
    this.columns.forEach((column: any) => {
      if (column.show !== false) {
        this.showProps.push(column.prop)
      }
    })
  }

  // 改变dialog展示状态
  hideFormDialogShow() {
    this.formDialogShow = false
  }

  // 改变loading状态
  changeLoadingStatus() {
    this.tableLoading = !this.tableLoading
  }

  // 触发事件
  triggerEvent(eventName: string, formData: any) {
    console.log(eventName, formData)
    this.$emit(eventName, formData, this.changeLoadingStatus, this.hideFormDialogShow)
  }

  created() {
    this.$emit('load-data', this.changeLoadingStatus)
  }
}

</script>
<style lang="scss">
  .el-loading-mask {
    z-index: 6666!important;
  }
</style>
<style lang='scss' scoped>
  .crud-container {
    padding: 20px;
    box-sizing: border-box;
  }
</style>
