<!-- 组件说明 -->
<template>
  <div>
    <crud-table
      :data="tableData"
      :columns="tableOptions.columns"
      :options="tableOptions.options"
      :pagination="pagination"
      :rules="tableOptions.rules"
      :permission="tableOptions.permission"
      @selection-change="selectionChange"
      @edit-event="editBtn"
      @add-event="addBtn"
      @del-event="delBtn"
      @load-data="loadData"
      @row-dblclick="dblclick"
    >
      <template v-slot:name="scope">
        <el-link
          type="primary"
          @click="openDictionaryDialog(scope.row)"
        >
          {{ scope.row.name }}
        </el-link>
      </template>
    </crud-table>
    <crud-dialog
      :dialog-attribute="dialogAttribute"
      :visible.sync="dictionaryDialogShow"
    >
      <dictionary-type
        :dictionary-type="currentDictionaryType"
      />
    </crud-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { DictionaryTableOptions, DictionaryTypeTableOptions } from '../constant/dictionary'
import { dictionaryTypePagination, delDictionaryType, createDictionaryType, updateDictionaryType, dictionaryTypeList } from '@/api/dictionarys'
import { componentPathOption } from '@/utils/utils'
import { CrudTableOptions, PaginationOptions, MenuColumn, ColumnOptions } from '@/components/Crud/interfaces/table.interface'
import { UserModule } from '@/store/modules/user'
import { CrudTable, CrudDialog } from '@/components/Crud'
import DictionaryType from './dictionary.vue'

@Component({
  name: 'Dictionary',
  components: {
    CrudTable,
    CrudDialog,
    DictionaryType
  }
})
export default class Dictionary extends DictionaryTypeTableOptions {
  dialogTitle = '字典类型'
  dictionaryDialogShow: boolean = false
  tableData: any[] = [] // 展示数据
  currentDictionaryType: any = {}
  dialogAttribute: any = {
    width: '80%'
  }

  selectionChange(selection: any) {
    console.log('选择项触发', selection)
  }

  openDictionaryDialog(row: any) {
    console.log(this.currentDictionaryType, '打开dictionary')
    this.currentDictionaryType = row
    this.dictionaryDialogShow = true
  }

  editBtn(row: any, loading: Function, done: Function) {
    loading()
    updateDictionaryType(row._id, row).then((res) => {
      done()
      loading()
      this.loadData()
      this.$message.success(res.message as any)
    }).catch((err) => {
      console.log(err)
      this.$message.error(err.errMessage)
      loading()
    })
  }

  addBtn(row: any, loading: Function, done: Function) {
    loading()
    createDictionaryType(row).then((res) => {
      done()
      loading()
      this.loadData()
      this.$message.success(res.message)
    }).catch((err) => {
      console.log(err)
      this.$message.error(err.errMessage)
      loading()
    })
  }

  delBtn(row: any, loading: Function, done: Function) {
    const message = `是否要删除${row.name}类型字典`
    this.$confirm(message, '确认信息', {
      distinguishCancelAndClose: true,
      confirmButtonText: '删除',
      cancelButtonText: '放弃'
    })
      .then(() => {
        loading()
        delDictionaryType({
          dictionaryTypeIds: [row._id]
        }).then((res) => {
          this.$message.success(res.message.toString())
          this.loadData()
          loading()
        }).catch((err) => {
          this.$message.error(err.errMessage)
          loading()
        })
      })
  }

  dblclick(...args: any) {
    const open = args[3]
    open()
  }

  async loadData(loading?: Function) {
    loading && loading()
    const params = {
      limit: this.pagination.limit,
      page: this.pagination.page
    }

    dictionaryTypePagination(params).then((res) => {
      this.tableData = res.data.data
      this.pagination.total = res.data.pagination && res.data.pagination.total
      this.$message.success(res.message)
      loading && loading()
    }).catch((err) => {
      loading && loading()
      console.log(err)
    })
  }

  loadOptions() {
    this.getTableOptions()
    const topActions = {
      otherBtn: [
        {
          text: '复制新增',
          attributes: {
            type: 'primary',
            size: 'small'
          },
          eventName: 'hightlight-btn',
          event: (row: any, open: Function) => {
            Reflect.deleteProperty(row, '_id')
            open(row)
          }
        }
      ]
    }
    const menuColumn: MenuColumn = {
    }
    this.setPermission(UserModule.permission)
    this.setOptions({ topActions, menuColumn })
    console.log(this.tableOptions)
  }

  created() {
    this.loadOptions()
  }
}

</script>
<style lang='scss' scoped>
//@import url()
  .input-wrap {
    display: flex;
  }
</style>
