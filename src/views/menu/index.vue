<template>
  <div class="menu-container">
    <avue-crud
      ref="crud"
      :option="option"
      :data="data"
      @row-update="updateRow"
    >
      <!-- 自定义菜单左 -->
      <template slot="menuLeft">
        <el-button
          type="primary"
          size="small"
        >
          自定义按钮
        </el-button>
      </template>

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

@Component({
  name: 'Menu'
})
export default class Menu extends Vue {
  parentMenuDicData = [
    {
      label: '一级1',
      value: 1,
      children: [
        {
          label: '一级2',
          value: 2
        }, {
          label: '一级3',
          value: 3
        }
      ]
    }, {
      label: '一级2',
      value: 2
    }, {
      label: '一级3',
      value: 3,
      children: [
        {
          label: '一级2',
          value: 2
        }, {
          label: '一级3',
          value: 3
        }
      ]
    }, {
      label: '一级4',
      value: 4
    }, {
      label: '一级5',
      value: 5
    }, {
      label: '一级6',
      value: 6
    }, {
      label: '一级7',
      value: 7
    }, {
      label: '一级8',
      value: 8
    }, {
      label: '一级9',
      value: 9
    }, {
      label: '一级10',
      value: 10
    }
  ]
  radioDicData = [
    {
      label: '是',
      value: 0
    },
    {
      label: '否',
      value: 1
    }
  ]
  data = [
    {
      id: 1,
      parentId: 0,
      title: '菜单名',
      icon: 'dashboard',
      name: '路由名',
      path: '/menu',
      redirect: 'noRedirect',
      componentPath: '@/views/menu/index.vue',
      hidden: 0,
      alwaysShow: 0,
      breadcrumb: 0,
      noCache: 0,
      affix: 0,
      children: [
        {
          id: 6,
          parentId: 0,
          title: '菜单名',
          icon: 'dashboard',
          name: '路由名',
          path: '/menu',
          redirect: 'noRedirect',
          componentPath: '@/views/menu/index.vue',
          hidden: 0,
          alwaysShow: 0,
          breadcrumb: 0,
          noCache: 0,
          affix: 0,
          children: [
            {
              id: 2,
              parentId: 0,
              title: '菜单名',
              icon: 'dashboard',
              name: '路由名',
              path: '/menu',
              redirect: 'noRedirect',
              componentPath: '@/views/menu/index.vue',
              hidden: 0,
              alwaysShow: 0,
              breadcrumb: 0,
              noCache: 0,
              affix: 0,
              children: [

              ]
            },
            {
              id: 3,
              parentId: 0,
              title: '菜单名',
              icon: 'dashboard',
              name: '路由名',
              path: '/menu',
              redirect: 'noRedirect',
              componentPath: '@/views/menu/index.vue',
              hidden: 0,
              alwaysShow: 0,
              breadcrumb: 0,
              noCache: 0,
              affix: 0,
              children: [
                {
                  id: 4,
                  parentId: 0,
                  title: '菜单名',
                  icon: 'dashboard',
                  name: '路由名',
                  path: '/menu',
                  redirect: 'noRedirect',
                  componentPath: '@/views/menu/index.vue',
                  hidden: 0,
                  alwaysShow: 0,
                  breadcrumb: 0,
                  noCache: 0,
                  affix: 0,
                  children: [

                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
  option: object = {
    translate: false,
    border: true,
    align: 'center',
    title: '菜单管理',
    page: false,
    saveBtnTitle: '添加菜单',
    menuType: 'button',
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
            slot: true,
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
              required: true,
              message: '请输入路由名',
              trigger: 'blur'
            }]
          }, {
            label: '路由路径',
            prop: 'path',
            rules: [{
              required: true,
              message: '请正确输入路由路径',
              trigger: 'blur'
            }]
          }, {
            label: '跳转路由',
            prop: 'redirect',
            rules: [{
              required: true,
              message: '请正确输入跳转路由路径(noRedirect不跳转)',
              trigger: 'blur'
            }]
          }, {
            label: '组件路径',
            prop: 'componentPath',
            rules: [{
              required: true,
              message: '请正确输入组件路径',
              trigger: 'blur'
            }]
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
            type: 'switch',
            dicData: this.radioDicData,
            labelPosition: 'top',
            span: 5
          }, {
            label: '总是显示根路由',
            prop: 'alwaysShow',
            type: 'switch',
            dicData: this.radioDicData,
            labelPosition: 'top',
            span: 5
          }, {
            label: '在面包屑显示',
            prop: 'breadcrumb',
            type: 'switch',
            dicData: this.radioDicData,
            labelPosition: 'top',
            span: 5
          }, {
            label: '缓存页面',
            prop: 'noCache',
            type: 'switch',
            dicData: this.radioDicData,
            labelPosition: 'top',
            span: 5
          }, {
            label: '固定在面包屑最前面',
            prop: 'affix',
            type: 'switch',
            dicData: this.radioDicData,
            // labelWidth: 150,
            labelPosition: 'top',
            span: 4
          }
        ]
      }
    ],
    column: [
      {
        label: '菜单id',
        prop: 'id',
        display: false
      },
      {
        label: '父菜单',
        prop: 'parentId',
        type: 'tree',
        dicData: this.parentMenuDicData
      }, {
        label: '菜单名',
        prop: 'title',
        display: false
      }, {
        label: '图标',
        prop: 'icon',
        width: 50,
        display: false
      }, {
        label: '路由名',
        prop: 'name',
        display: false

      }, {
        label: '路由路径',
        prop: 'path',
        display: false
      }, {
        label: '跳转路由',
        prop: 'redirect',
        display: false
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

  handleAdd() {
    const crud: any = this.$refs.crud
    crud.rowAdd()
  }

  updateRow(row: any, column: any, cell: any, event: any) {
    console.log(row, column, cell, event)
  }

  created() {
    let index = 0
    // while (index < 20) {
    //   index += 1
    //   this.data.push(this.data[0])
    // }
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
</style>
