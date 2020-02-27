<template>
  <div class="menu-container">
    <h3>{{ $route.meta.title || '默认标题' }}</h3>
    <avue-crud
      ref="crud"
      v-model="defaultForm"
      class=""
      :option="option"
      :data="menuData"
      @row-update="updateRow"
      @row-del="deleteRow"
      @row-save="saveRow"
      @row-dblclick="dblclickRow"
    >
      <!-- 自定义图标 -->
      <template
        slot="icon"
        slot-scope="scope"
      >
        <svg-icon
          :name="scope.row.icon"
          width="20"
          height="20"
        />
      </template>

      <!-- 自定义图标From -->
      <template
        slot="iconForm"
        slot-scope="scope"
      >
        <div class="icon-from-style">
          <el-input
            v-model="scope.row.icon"
            class="icon-input"
            placeholder="请输入图标名"
          />
          <svg-icon
            v-if="scope.row.icon"
            :name="scope.row.icon"
            width="20"
            height="20"
          />
          <el-tag v-else>
            还未输入
          </el-tag>
        </div>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { deleteMenus, updateMenus, createMenus } from '@/api/menus'

@Component({
  name: 'MenuManager'
})
export default class Menu extends Vue {
  // 单选框选项
  radioDicData = [
    {
      label: '否',
      value: 0
    },
    {
      label: '是',
      value: 1
    }
  ]

  // CRUD默认参数
  defaultForm = { parentId: 0 }

  option: object = {
    refreshBtn: false,
    title: '菜单管理',
    translate: false,
    stripe: true,
    align: 'center',
    page: false,
    // menuWidth: 240,
    saveBtnTitle: '添加菜单',
    group: [
      {
        icon: 'el-icon-info',
        label: '菜单信息',
        prop: 'menuSetting',
        column: [
          {
            label: '菜单名',
            prop: 'title',
            rules: [{
              required: true,
              message: '请输入菜单名',
              trigger: 'blur'
            }]
          }, {
            label: '图标',
            prop: 'icon',
            width: 50,
            formslot: true
          }
        ]
      },
      {
        icon: 'el-icon-info',
        label: '路由信息',
        prop: 'routerSetting',
        column: [
          {
            label: '路由名',
            prop: 'name',
            rules: [{
              message: '请输入路由名',
              trigger: 'blur'
            }]
          }, {
            label: '路由路径',
            prop: 'path',
            rules: [{
              message: '请正确输入路由路径',
              trigger: 'blur'
            }],
            tip: '路径可为外链(要添加http://前缀)'
          }, {
            label: '跳转路由',
            prop: 'redirect',
            rules: [{
              // required: true,
              message: '请正确输入跳转路由路径(noRedirect不跳转)',
              trigger: 'blur'
            }]
          }, {
            label: '组件路径',
            prop: 'componentPath',
            rules: [{
              // required: true,
              message: '请正确输入组件路径',
              trigger: 'blur'
            }],
            tip: '若上级菜单为根菜单,并且还有子菜单请填写为Layout'
          }
        ]
      },
      {
        icon: 'el-icon-info',
        label: '展示配置',
        prop: 'showSetting',
        column: [
          {
            label: '在侧边栏隐藏',
            prop: 'hidden',
            type: 'radio',
            dicData: this.radioDicData,
            labelPosition: 'top',
            span: 5,
            button: true,
            value: 0
          }, {
            label: '总是显示根路由',
            prop: 'alwaysShow',
            type: 'radio',
            dicData: this.radioDicData,
            labelPosition: 'top',
            span: 5,
            button: true,
            value: 0
          }, {
            label: '面包屑显示',
            prop: 'breadcrumb',
            type: 'radio',
            dicData: this.radioDicData,
            labelPosition: 'top',
            span: 5,
            button: true,
            value: 1
          }, {
            label: '缓存页面',
            prop: 'noCache',
            type: 'radio',
            dicData: this.radioDicData,
            labelPosition: 'top',
            span: 5,
            button: true,
            value: 1
          }, {
            label: '固定在面包屑最前面',
            prop: 'affix',
            type: 'radio',
            dicData: this.radioDicData,
            // labelWidth: 150,
            labelPosition: 'top',
            span: 4,
            button: true,
            value: 1
          }
        ]
      }
    ],
    column: [
      {
        label: '菜单id',
        prop: 'id',
        hide: true,
        display: false
      },
      {
        label: '上级菜单',
        prop: 'parentId',
        hide: true,
        type: 'tree',
        dicData: this.parentMenuDicData,
        value: 0
      }, {
        label: '菜单名',
        prop: 'title',
        display: false
      }, {
        label: '图标',
        prop: 'icon',
        width: 50,
        display: false,
        slot: true
      }, {
        label: '路由名',
        prop: 'name',
        hide: true,
        display: false

      }, {
        label: '路由路径',
        prop: 'path',
        display: false
      }, {
        label: '跳转路由',
        prop: 'redirect',
        hide: true,
        display: false

      }, {
        label: '排序',
        prop: 'rank',
        type: 'number',
        value: 1
      }, {
        label: '组件路径',
        prop: 'componentPath',
        display: false

      }, {
        label: '在侧边栏隐藏',
        prop: 'hidden',
        type: 'radio',
        dicData: this.radioDicData,
        display: false
      }, {
        label: '总是显示根路由',
        prop: 'alwaysShow',
        type: 'radio',
        dicData: this.radioDicData,
        display: false
      }, {
        label: '在面包屑显示',
        prop: 'breadcrumb',
        type: 'radio',
        dicData: this.radioDicData,
        display: false
      }, {
        label: '缓存页面',
        prop: 'noCache',
        type: 'radio',
        dicData: this.radioDicData,
        display: false
      }, {
        label: '固定在面包屑最前面',
        prop: 'affix',
        type: 'radio',
        dicData: this.radioDicData,
        display: false
      }
    ]
  }

  // 获取用户菜单信息
  get menuData() {
    return UserModule.menus
  }

  // 获取上级菜单选项
  get parentMenuDicData() {
    const menus = [...UserModule.menus]
    const data = this.getParentTreeDicData(menus)
    data.unshift({
      label: '根菜单',
      value: 0
    })
    return data
  }

  // 递归获取上级菜单
  getParentTreeDicData(menus: any) {
    const item: any = { label: '', value: 0, children: [] }
    const itemChildren: any = []
    if (Array.isArray(menus)) {
      if (menus.length === 0) {
        return []
      }
      menus.forEach((item: any) => {
        itemChildren.push({
          label: item.title,
          value: item.id,
          children: this.getParentTreeDicData(item.children || {})
        })
      })
      return itemChildren
    } else if (menus.title) {
      item.label = menus.title
      item.value = menus.id
      return item
    } else {
      return []
    }
  }

  // 处理空数据时的新增按钮执行方法
  handleAdd() {
    const crud: any = this.$refs.crud
    crud.rowAdd()
  }

  // 行删除执行方法
  async deleteRow(row: any, index: number) {
    this.$confirm(`此操作将会删除${row.title}, 是否继续?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async() => {
      const params = [row.id]
      try {
        const { msg, data } = await deleteMenus(params)
        this.$message.success(msg)
      } catch {
        this.$message.error('删除失败')
      }
      location.reload()
    })
  }

  // 行更新执行方法
  async saveRow(row: any, done: Function, loading: Function) {
    try {
      const { msg, data } = await createMenus(row)
      this.$message.success(msg)
    } catch {
      this.$message.error('新增失败')
    }
    done()
    location.reload()
  }

  // 行更新执行方法
  async updateRow(row: any, index: number, done: Function, loading: Function) {
    try {
      const { msg, data } = await updateMenus(row)
      this.$message.success(msg)
      location.reload()
    } catch {
      this.$message.error('更新失败')
    }
    done()
  }

  // 行双击 打开新增页面指定上级菜单为当前双击的行菜单
  async dblclickRow(row: any, column: any) {
    this.defaultForm.parentId = row.id
    this.$refs['crud'].rowAdd()
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

</style>
