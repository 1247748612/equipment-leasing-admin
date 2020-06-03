<!-- 组件说明 -->
<template>
  <div>
    <crud-table
      v-model="defaultFormData"
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
      <template
        v-slot:typeId
      >
        {{ dictionaryType.name }}
      </template>
    </crud-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { DictionaryTableOptions } from '../constant/dictionary'
import { delDictionary, createDictionaryType, updateDictionaryType, dictionaryTypeList, updateDictionary, createDictionary, dictionaryTypeListAll } from '@/api/dictionarys'
import { componentPathOption } from '@/utils/utils'
import { CrudTableOptions, PaginationOptions, MenuColumn, ColumnOptions, TableOptions } from '@/components/Crud/interfaces/table.interface'
import { UserModule } from '@/store/modules/user'
import { CrudTable } from '@/components/Crud'

@Component({
  name: 'DictionaryType',
  components: {
    CrudTable
  }
})
export default class DictionaryType extends DictionaryTableOptions {
  @Prop({ type: Object, default: () => ({}) }) dictionaryType!: any
  dialogTitle = '字典项'
  formDialogShow: boolean = false // 菜单分配弹窗
  tableData: any[] = [] // 展示数据
  dictionaryTypeList: any

  get defaultFormData() {
    return { typeId: this.dictionaryType._id }
  }

  typeIdName(typeId: string) {
    console.log(typeId, this.dictionaryTypeList, '我看看说明typeId')
    if (!this.dictionaryTypeList) {
      return typeId
    }
    for (let dictionary of this.dictionaryTypeList) {
      console.log(dictionary)
      if (dictionary._id === typeId) {
        return dictionary.name
      }
      return typeId
    }
  }

  selectionChange(selection: any) {
    console.log('选择项触发', selection)
  }

  editBtn(row: any, loading: Function, done: Function) {
    loading()
    updateDictionary(row._id, row).then((res) => {
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
    createDictionary(row).then((res) => {
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
    const message = `是否要删除${row.label}字典标签`
    this.$confirm(message, '确认信息', {
      distinguishCancelAndClose: true,
      confirmButtonText: '删除',
      cancelButtonText: '放弃'
    })
      .then(() => {
        loading()
        delDictionary({
          dictionaryIds: [row._id]
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

  @Watch('dictionaryType.name')
  watchDictionaryName() {
    this.tableData = []
    this.loadData()
  }

  async loadData(loading?: Function) {
    console.log('loadData更新')
    if (!this.dictionaryType.name) {
      return
    }
    loading && loading()
    const params = {
      limit: this.pagination.limit,
      page: this.pagination.page
    }

    const typeName = this.dictionaryType.name
    dictionaryTypeList(typeName, params).then((res) => {
      this.tableData = res.data
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
          identifier: 'dictionary_add',
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

  async created() {
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
