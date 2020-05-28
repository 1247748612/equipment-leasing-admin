<!-- 组件说明 -->
<template>
  <div>
    <crud-table
      ref="crud"
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
      @refresh="refresh"
      @row-dblclick="dblclick"
    >
      <template
        v-slot:icon="scope"
      >
        <svg-icon :name="scope.row.icon" />
      </template>
      <template
        v-slot:iconForm="{formData, propName}"
      >
        <div class="input-wrap">
          <el-input
            v-model="formData[propName]"
            placeholder="请输入图标"
          />
          <svg-icon :name="formData[propName]" />
        </div>
      </template>
    </crud-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { deleteMenu, createMenu, updateMenu } from '@/api/menus'
import { componentPathOption } from '@/utils/utils'
import { CrudTableOptions } from '@/components/Crud/interfaces/table.interface'
import { UserModule } from '../../../store/modules/user'
import { CrudTable } from '@/components/Crud'
import SvgIcon from 'vue-svgicon'
import { MenuTableOptions } from '../constant/menu'

@Component({
  name: 'Menu',
  components: {
    CrudTable
  }
})
export default class Menu extends MenuTableOptions {
  get tableData() {
    console.log(UserModule.menus, 'menus')
    this.setColumnOptions({
      pid: UserModule.menus
    })
    return UserModule.menus
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
    updateMenu(row._id, row).then(async(res) => {
      console.log(res)
      done()
      this.$message.success(res.message as any)
      await UserModule.UserMenu()
      loading()
    }).catch((err) => {
      console.log(err)
      this.$message.error(err.errMessage)
      loading()
    })
  }

  addBtn(row: any, loading: Function, done: Function) {
    loading()
    row = this.contactMeta(row)
    createMenu(row).then(async(res) => {
      console.log(res)
      loading()
      done()
      this.$message.success(res.message as any)
      await UserModule.UserMenu()
    }).catch((err) => {
      console.log(err)
      this.$message.error(err.errMessage)
      loading()
    })
    console.log(row)
  }

  delBtn(row: any, loading: Function, done: Function) {
    const message = `是否要删除${row.title}${row.type === 0 ? '菜单' : '按钮'}`
    this.$confirm(message, '确认信息', {
      distinguishCancelAndClose: true,
      confirmButtonText: '删除',
      cancelButtonText: '放弃'
    })
      .then(() => {
        deleteMenu({
          menuIds: [row._id]
        }).then((res) => {
          this.$message.success(res.message)
          UserModule.UserMenu()
        }).catch((err) => {
          this.$message.error(err.error)
        })
      })
  }

  dblclick(...args: any) {
    const open = args[3]
    open({ pid: args[0]._id })
  }

  async refresh(loading: Function) {
    loading && loading()
    await UserModule.UserMenu()
    loading && loading()
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
    this.setOptions(
      {
        componentPath: componentPathOption(),
        topActions
      }
    )
  }

  created() {
    this.loadOptions()
    this.setPermission(UserModule.permission)
    this.setColumnOptions({
      pid: this.tableData,
      componentPath: componentPathOption()
    })
  }
}

</script>
<style lang='scss' scoped>
//@import url()
  .input-wrap {
    display: flex;
  }
</style>
