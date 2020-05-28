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
      <template
        v-slot:roles="scope"
      >
        <el-tag
          v-for="role in scope.row.roles"
          :key="role._id"
        >
          {{ role.name }}
          <br>
        </el-tag>
      </template>
    </crud-table>
    <crud-dialog
      :title="dialogTitle"
      :visible.sync="formDialogShow"
    >
      <crud-form
        v-if="formDialogShow"
        v-model="defaultFormData"
        :columns="assignRoleColumns"
        @save="assignRoles"
      />
    </crud-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserTableOptions } from '../constant/user'
import { userPagination, createUser, updateUser, deleteUser } from '@/api/users'
import { componentPathOption } from '@/utils/utils'
import { CrudTableOptions, PaginationOptions, MenuColumn, ColumnOptions } from '@/components/Crud/interfaces/table.interface'
import { UserModule } from '@/store/modules/user'
import { CrudTable, CrudDialog, CrudForm } from '@/components/Crud'
import { getRoleList, assigningRoles, assigningMenus } from '@/api/roles'

@Component({
  name: 'User',
  components: {
    CrudTable,
    CrudDialog,
    CrudForm
  }
})
export default class User extends UserTableOptions {
  dialogTitle = '分配角色'
  formDialogShow: boolean = false // 菜单分配弹窗
  rolesOptions = []
  defaultFormData: any = {
    roleIds: [],
    userId: ''
  }
  tableData: any[] = [] // 展示数据

  get assignRoleColumns() {
    const columns: ColumnOptions[] = [
      {
        label: '角色分配',
        type: 'select',
        prop: 'roleIds',
        span: 24,
        attributes: {
          multiple: true,
          props: {
            label: 'name',
            value: '_id'
          }
        },
        options: this.rolesOptions
      }]
    return columns
  }

  // 分配角色使用
  roleList() {
    getRoleList().then((res) => {
      this.rolesOptions = res.data || []
    }).catch((err) => {
      console.log(err, 'data')
    })
  }

  assignRoles(formData: any, done?: Function) {
    assigningRoles(formData).then((res) => {
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

  contactMeta(data: any) {
    const meta = ['title', 'icon', 'affix', 'noCache', 'breadcrumb', 'hidden', 'alwaysShow']
    const result: any = {
      meta: {
      }
    }
    Object.keys(data).forEach((key: any) => {
      if (meta.includes(key)) {
        result.meta[key] = data[key]
      } else {
        result[key] = data[key]
      }
    })
    return result
  }

  editBtn(row: any, loading: Function, done: Function) {
    loading()
    row = this.contactMeta(row)
    updateUser(row._id, row).then((res) => {
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
    createUser(row).then((res) => {
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
    const message = `是否要删除${row.nickname}用户`
    this.$confirm(message, '确认信息', {
      distinguishCancelAndClose: true,
      confirmButtonText: '删除',
      cancelButtonText: '放弃'
    })
      .then(() => {
        loading()
        deleteUser({
          userIds: [row._id]
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

    userPagination(params).then((res) => {
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
    this.setPagination({
      limit: 10,
      page: 1
    })
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
      otherBtn: [
        {
          text: '分配角色',
          attributes: {
            type: 'text',
            size: 'small',
            identifier: 'assign_role'
          },
          event: ({ row }: { row: any}) => {
            const roleIds: any[] = row.roles
              ? row.roles.map((role: any) => role._id) : []
            this.defaultFormData['roleIds'] = roleIds
            this.defaultFormData['userId'] = row._id
            this.formDialogShow = true
          }
        }
      ]
    }
    this.setPermission(UserModule.permission)
    this.setOptions({ topActions, menuColumn })
    console.log(this.tableOptions)
  }

  created() {
    this.loadOptions()
    this.roleList()
  }
}

</script>
<style lang='scss' scoped>
//@import url()
  .input-wrap {
    display: flex;
  }
</style>
