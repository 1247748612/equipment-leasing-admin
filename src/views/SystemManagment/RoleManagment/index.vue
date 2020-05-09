<template>
  <div class="menu-container">
    <h3>{{ $route.meta.title || '默认标题' }}</h3>
    <avue-crud
      ref="crud"
      v-model="defaultForm"
      class=""
      :option="option"
      :data="data"
      :page.sync="page"
      @on-load="getRoles"
      @row-update="updateRow"
      @row-del="deleteRow"
      @row-save="saveRow"
      @row-dblclick="dblclickRow"
      @refresh-change="getRoles"
    >
      <template
        slot="menus"
        slot-scope="scope"
      >
        <el-tree
          accordion
          :data="scope.row.menus"
          :props="menusTreeProp"
        />
      </template>

      <template
        slot="menu"
        slot-scope="scope"
      >
        <el-button
          slot="reference"
          icon="el-icon-lock"
          size="small"
          type="text"
          @click="openDialog(scope.row)"
        >
          分配菜单
        </el-button>
      </template>

      <template slot="empty">
        <avue-empty
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          desc="暂无数据"
        >
          <br>
          <el-button
            type="primary"
            @click="handleAdd"
          >
            新增数据
          </el-button>
        </avue-empty>
      </template>
    </avue-crud>

    <el-dialog
      width="20%"
      title="菜单分配"
      :visible.sync="isShowDialog"
    >
      <el-tree
        ref="tree"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
        :data="parentMenuDicData"
        :props="menusTreeProp"
      />
      <div class="tree-button">
        <el-button
          type="primary"
          @click="assignMenus"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { getRoles, deleteRoles, createRoles, updateUserRoles, updateRoles } from '@/api/roles'
import { updateMenuAuthorizations } from '@/api/menus'
import { ReturnResponseData } from '../../../api/types'

@Component({
  name: 'MenuManager'
})
export default class Menu extends Vue {
  private isShowDialog = false // dialog 展示用
  // 角色菜单默认项
  private roleMenus = {
    roleId: 1,
    menuId: 1
  }
  private defaultForm = { pid: null } // Crud默认参数
  private data = [] // Crud默认展示数据
  // 菜单树参数
  private menusTreeProp = {
    label: 'title'
  }

  private page = {
    total: 200,
    pageSize: 10,
    currentPage: 1,
    background: true
  }

  private option: object = {
    dialogWidth: '30%',
    title: '菜单管理',
    translate: false,
    stripe: true,
    align: 'center',
    page: false,
    // menuWidth: 200,
    saveBtnTitle: '添加菜单',
    column: [
      {
        label: '角色id',
        prop: 'id',
        display: false,
        hide: true
      },
      {
        label: '角色名',
        prop: 'name',
        span: 24,
        rules: [{
          required: true
        }]
      }, {
        label: '描述',
        prop: 'explanation',
        span: 24
      }, {
        label: '创建日期',
        prop: 'createdDate',
        type: 'datetime',
        display: false,
        format: 'yyyy年M月d日 H:m'
      }, {
        label: '创建者id',
        prop: 'creatorId',
        hide: true,
        display: false
      }, {
        label: '可访问菜单',
        prop: 'menus',
        type: 'tree',
        slot: true,
        display: false,
        span: 24
      }
    ]
  }

  // 获取上级菜单选项
  get parentMenuDicData() {
    return UserModule.menus
  }

  // 打开菜单分配的dialog
  openDialog(row: any) {
    this.isShowDialog = true
    if (row.menus) {
      this.$nextTick(() => {
        (this.$refs.tree as any).setCheckedNodes(row.menus)
      })
    }
    if (row.id) {
      this.roleMenus.roleId = row.id
    }
  }

  // 没有数据时的新增
  handleAdd() {
    const crud: any = this.$refs.crud
    crud.rowAdd()
  }

  // 删除此行数据
  deleteRow(row: any, index: number) {
    this.$confirm(`此操作将会删除${row.name}, 是否继续?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async() => {
      const params = [row.id]
      try {
        const { message, data } = await deleteRoles(params)
        this.$message.success(message)
        this.getRoles()
      } catch {
        this.$message.error('删除失败')
      }
    })
  }

  // 保存新增信息
  async saveRow(row: any, done: Function, loading: Function) {
    try {
      const { message, data } = await createRoles(row)
      this.$message.success(message)
      this.getRoles()
    } catch {
      this.$message.error('保存失败')
    }
    done()
  }

  // 编辑保存执行方法
  async updateRow(row: any, index: number, done: Function, loading: boolean) {
    loading = true
    try {
      const { message, data } = await updateRoles(row)
      this.$message.success(message)
      this.getRoles()
    } catch (error) {
      this.$message.error('更新失败')
    }
    done()
  }

  // 分配菜单权限
  async assignMenus() {
    const node = (this.$refs.tree as any).getCheckedNodes()
    if (!node) {
      this.$message.error('分配菜单失败, 你没有选择')
    }

    const menuData: any = []
    node.forEach((item: any) => {
      menuData.push({
        ...this.roleMenus,
        menuId: item.id
      })
    })

    try {
      const { message, data } = await updateMenuAuthorizations(menuData)
      this.$message.success(message)
      location.reload()
    } catch (error) {
      this.$message.error('菜单分配失败')
    }
  }

  // 双击行
  async dblclickRow(row: any, column: any) {
    // this.defaultForm.pid = row.id
    // this.$refs['crud'].rowAdd()
  }

  // 获取角色信息
  async getRoles(page?: any) {
    try {
      const params = {
        rows: (page && page.pageSize) || this.page.pageSize,
        page: (page && page.currentPage) || this.page.currentPage
      }
      const { data } = await getRoles(params)
      this.data = data.records
      this.page.total = data.total
    } catch (error) {
      this.$message.error('获取角色数据失败')
      console.log(error, '错误')
    }
  }

  created() {
  }
}
</script>

<style lang="scss" scope>
  .icon-from-style {
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-input {
      margin-right: 50px;
    }
  }
  .menu-container {
    margin: 0 20px;
    .header {

    }
  }
  .tree-button {
    padding: 10px 40px 0;
    display: flex;
    justify-content: center;
  }

</style>
