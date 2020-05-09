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
      @row-update="updateRow"
      @row-del="deleteRow"
      @row-save="saveRow"
      @row-dblclick="dblclickRow"
      @on-load="getUsers"
      @refresh-change="getUsers"
    >
      <!-- 自定义图标 -->
      <template
        slot="roles"
        slot-scope="scope"
      >
        <p
          v-for="role in scope.row.roles"
          :key="role.id"
        >
          <el-tag size="small">
            {{ role.name }}
          </el-tag>
        </p>
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
          分配角色
        </el-button>
      </template>

      <template slot="empty">
        <avue-empty
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          desc="暂无数据"
        >
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
      @close="selectRolesData = []"
    >
      <el-select
        v-model="selectRolesData"
        style="width: 100%"
        multiple
        placeholder="请选择"
      >
        <el-option
          v-for="item in roleOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <div class="tree-button">
        <el-button
          type="primary"
          @click="assignRoles"
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
import { deleteMenus, updateMenus, createMenus } from '@/api/menus'
import { getUsers, deleteUsers, createUsers, updateUsers } from '@/api/users'
import { getRolesList, updateUserRoles } from '../../../api/roles'
@Component({
  name: 'MenuManager'
})
export default class Menu extends Vue {
  private isShowDialog = false // 角色分配dialog
  private defaultForm = { pid: null } // CURD默认参数
  private data = [] // CURD默认展示数据
  private roleOptions = [] // 角色分配选项
  private selectRolesData = [] // 角色分配选中数据
  // 用户角色默认项
  private userRoles = {
    userId: 0,
    roleId: 0
  }

  private page = {
    total: 200,
    pageSize: 10,
    currentPage: 1,
    background: true
  }

  private option = {
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
        label: '用户id',
        prop: 'id',
        display: false,
        hide: true
      },
      {
        label: '用户名',
        prop: 'name',
        span: 24,
        rules: [{
          required: true,
          message: '必须填写用户名用做登录用',
          trigger: 'blur'
        }, {
          min: 5,
          max: 10,
          message: '长度在 5 到 10 个字符',
          trigger: 'blur'
        }]
      }, {
        label: '用户密码',
        prop: 'password',
        type: 'password',
        hide: true,
        span: 24
      }, {
        label: '用户昵称',
        prop: 'nickname',
        span: 24,
        rules: [{
          required: true,
          message: '昵称必须填写'
        }]
      }, {
        label: '创建日期',
        prop: 'createdDate',
        type: 'datetime',
        display: false,
        format: 'yyyy年M月d日 H:m'
      }, {
        label: '电话号码',
        prop: 'telephone',
        span: 24,
        rules: [{
          validator: (rule: any, value: any, callback: Function) => {
            const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
            if (!myreg.test(value) && value) {
              callback(new Error('请输入正确的手机号'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]
      }, {
        label: '用户头像',
        prop: 'icon',
        type: 'upload',
        listType: 'picture-img',
        action: '/upload/img',
        propsHttp: {
          res: 'data'
        },
        width: 80,
        span: 24
      }, {
        label: '创建者id',
        prop: 'createdId',
        display: false,
        hide: true
      }, {
        label: '最后登录ip',
        prop: 'lastLoginIp',
        display: false
      }, {
        label: '最后登录时间',
        prop: 'lastLoginTime',
        type: 'datetime',
        display: false,
        format: 'yyyy年M月d日 H:m'
      }, {
        label: '角色',
        prop: 'roles',
        display: false,
        slot: true
      }, {
        label: '状态',
        prop: 'status',
        type: 'switch',
        labelPosition: 'top',
        value: 0,
        dicData: [
          {
            label: '使用',
            value: 0
          },
          {
            label: '禁用',
            value: 1
          }
        ],
        addDisplay: false
      }
    ]
  }

  // 没有数据时的新增
  handleAdd() {
    const crud: any = this.$refs.crud
    crud.rowAdd()
  }

  // 打开角色分配dialog
  openDialog(row: any) {
    console.log('打开dialog', row)
    if (!this.roleOptions.length) {
      this.getRoles()
    }
    this.selectRolesData = row.roles.map((item: any) => item.id)
    this.isShowDialog = true
    if (row.id) {
      this.userRoles.userId = row.id
    }
  }

  // 删除行
  deleteRow(row: any, index: number) {
    this.$confirm(`此操作将会删除${row.name}, 是否继续?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async() => {
      const params = [row.id]
      try {
        const { message, data } = await deleteUsers(params)
        this.$message.success(message)
        this.getUsers()
      } catch {
        this.$message.error('删除失败')
      }
    })
  }

  // 保存行数据
  async saveRow(row: any, done: Function, loading: Function) {
    if (!row.password) {
      this.$message.error('新增必须填写密码')
      loading()
      return
      // done()
    }
    try {
      const { message, data } = await createUsers(row)
      this.$message.success(message)
    } catch {
      this.$message.error('保存失败')
    }
    this.getUsers()
    done()
  }

  // 编辑行数据
  async updateRow(row: any, index: number, done: Function, loading: boolean) {
    loading = true
    try {
      const { code, message, data } = await updateUsers(row)
      this.$message.success(message)
      if (code === 203) {
        location.reload()
        return
      }
      this.getUsers()
    } catch (error) {
      this.$message.error('更新失败')
    }
    done()
  }

  // 角色分配
  assignRoles() {
    const submitData = this.selectRolesData.map((item) => {
      return {
        ...this.userRoles,
        roleId: item
      }
    })
    updateUserRoles(submitData).then(({ message, data }) => {
      this.$message.success(message)
      this.isShowDialog = false
      this.getUsers()
    }).catch((error: any) => {
      this.$message.error('分配失败')
      console.log(error)
    })
  }

  // 双击
  async dblclickRow(row: any, column: any) {
  }

  // 获取所有用户
  async getUsers(page?: any) {
    try {
      const params = {
        rows: (page && page.pageSize) || this.page.pageSize,
        page: (page && page.currentPage) || this.page.currentPage
      }
      const { message, data } = await getUsers(params)
      this.data = data.records
      this.page.total = data.total
      console.log(data, this.page, 'getUsers')
    } catch (error) {
      this.$message.error('获取用户数据失败')
      console.log(error, '错误')
    }
  }

  // 获取所有角色
  async getRoles() {
    try {
      const { message, data } = await getRolesList()
      this.roleOptions = data
      console.log(data, 'getUsers')
    } catch (error) {
      this.$message.error('获取角色失败')
      console.log('error', '错误')
    }
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
    padding: 30px 40px 0;
    display: flex;
    justify-content: center;
  }

</style>
