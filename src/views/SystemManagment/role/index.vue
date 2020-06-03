<!-- 组件说明 -->
<template>
  <div>
    <crud-table
      :data="tableData"
      :columns="tableOptions.columns"
      :options="tableOptions.options"
      :rules="tableOptions.rules"
      :permission="tableOptions.permission"
      :hide-form-item="tableOptions.hideFormItem"
      @selection-change="selectionChange"
      @edit-event="editBtn"
      @add-event="addBtn"
      @del-event="delBtn"
      @load-data="loadData"
      @row-dblclick="dblclick"
    >
      <template
        v-slot:roles="scope"
      >
        <el-tag
          v-for="role in scope.row.roles"
          :key="role._id"
        >
          {{ role.name }}
          <p />
        </el-tag>
      </template>
    </crud-table>
    <crud-dialog
      :title="dialogTitle"
      :dialog-attribute="dialogAttribute"
      :visible.sync="formDialogShow"
    >
      <crud-form
        v-model="defaultFormData"
        :columns="assignMenuColumns"
        @save="assignMenus"
      />
    </crud-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RoleTableOptions } from '../constant/role'
import { rolePagination, createRole, updateRole, assigningMenus, deleteRole } from '@/api/roles'
import { componentPathOption } from '@/utils/utils'
import { CrudTableOptions, PaginationOptions, MenuColumn, ColumnOptions } from '@/components/Crud/interfaces/table.interface'
import { UserModule } from '@/store/modules/user'
import { CrudTable, CrudDialog, CrudForm } from '@/components/Crud'

@Component({
  name: 'Role',
  components: {
    CrudTable,
    CrudDialog,
    CrudForm
  }
})
export default class Role extends RoleTableOptions {
  dialogTitle = '分配菜单'
  formDialogShow: boolean = false // 菜单分配弹窗
  defaultFormData: any = {
    roleId: null,
    menuIds: []
  }
  dialogAttribute: any = {
    'custom-class': 'dialog-class'
  }
  tableData: any[] = []
  menus: any = [] // 分配菜单时默认展开菜单

  get assignMenuColumns() {
    const keys = this.getMenuKeys(this.menus)
    console.log(keys, 'keys')
    const columns: ColumnOptions[] = [
      {
        label: '分配菜单',
        type: 'tree',
        prop: 'menuIds',
        span: 24,
        attributes: {
          multiple: true,
          props: {
            label: 'title'
          },
          'highlight-current': true,
          'show-checkbox': true,
          'node-key': '_id',
          'default-checked-keys': keys,
          'default-expanded-keys': keys
        },
        options: UserModule.menus
      }]
    return columns
  }

  assignMenus(formData: any, done?: Function) {
    formData = JSON.parse(JSON.stringify(formData))
    formData.menuIds = formData.menuIds.map((menu: any) => menu._id)
    assigningMenus(formData).then((res) => {
      this.$message.success(res.message)
      this.loadData()
      done && done()
    }).catch((err) => {
      this.$message.error(err.error)
    })
  }

  selectionChange(selection: any) {
    console.log('选择项触发', selection)
  }

  editBtn(row: any, loading: Function, done: Function) {
    loading()
    updateRole(row._id, row).then((res) => {
      console.log(res)
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
    createRole(row).then((res) => {
      console.log(res)
      done()
      loading()
      this.loadData()
      this.$message.success(res.message as any)
    }).catch((err) => {
      console.log(err)
      this.$message.error(err.errMessage)
      loading()
    })
    console.log(row)
  }

  delBtn(row: any, loading: Function, done: Function) {
    const message = `是否要删除${row.name}角色`
    this.$confirm(message, '确认信息', {
      distinguishCancelAndClose: true,
      confirmButtonText: '删除',
      cancelButtonText: '放弃'
    })
      .then(() => {
        loading()
        deleteRole({
          roleIds: [row._id]
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
    rolePagination(params).then((res) => {
      this.tableData = res.data.data
      this.pagination.total = res.data.pagination && res.data.pagination.total
      this.$message.success(res.message)
      loading && loading()
    }).catch((err) => {
      loading && loading()
      this.$message.error(err.errMessage)
      console.log(err)
    })
  }

  getMenuKeys(menus: any[]) {
    const keys: any = []
    if (!menus || (menus && !menus.length)) {
      return []
    }
    function deepMenus(mmenus: any) {
      for (let menu of mmenus) {
        console.log(menu)
        if (menu.children && menu.children.length) {
          deepMenus(menu.children)
        } else {
          keys.push(menu._id)
        }
      }
    }
    deepMenus(menus)
    return keys
  }

  loadOptions() {
    this.getTableOptions()
    this.setPagination({
      limit: 10,
      page: 1
    })
    const topActions = {
      otherBtn: [
        {
          text: '复制新增',
          identifier: 'role_add',
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
      otherBtn: [
        {
          text: '菜单分配',
          identifier: 'role_assign_menu',
          attributes: {
            type: 'text',
            size: 'small'
          },
          event: ({ row }: { row: any}) => {
            this.menus = row.menus
            console.log(this.menus)
            this.defaultFormData = {
              roleId: row._id
            }
            this.formDialogShow = true
          }
        }
      ]
    }
    this.setOptions({ topActions, menuColumn })
    this.setPermission(UserModule.permission)
  }

  created() {
    this.loadOptions()
  }
}

</script>
<style lang='scss'>
.dialog-class {
  .el-dialog__body {
    // display: inline-block;
    // width: 100%;
    // height: 40vh;
    // overflow: auto;
  }
}
//@import url()
</style>
