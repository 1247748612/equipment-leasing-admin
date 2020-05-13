<template>
  <div
    class="menu-container"
  >
    <h3>{{ $route.meta.title || '默认标题' }}</h3>
    <avue-crud
      ref="crud"
      :option="option"
      :data="data"
      :page.sync="page"
      @on-load="getLogInfos"
      @refresh-change="getLogInfos"
    >
      <!-- 自定义菜单左 -->
      <!-- <template slot="menuLeft">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-delete"
          @click="deleteSelectionDict"
        >
          删除已选
        </el-button>
      </template> -->
    </avue-crud>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { getLogInfos } from '@/api/logInfos'
import { getDictTypesOptions } from '@/utils/utils'

@Component({
  name: 'SystemLogManager'
})
export default class Menu extends Vue {
  private data = [] // Crud默认展示数据
  // 菜单树参数

  // 分页
  private page = {
    total: 200,
    pageSize: 10,
    page: 1,
    background: true
  }

  private option: object = {
    translate: false,
    stripe: true,
    menu: false,
    addBtn: false,
    align: 'center',
    // menuWidth: 200,
    saveBtnTitle: '添加菜单',
    column: [
      {
        label: '日志id',
        prop: 'id',
        hide: true
      },
      {
        label: '用户id',
        prop: 'userId',
        hide: true
      }, {
        label: '用户昵称',
        prop: 'userNick'
      },
      {
        label: '操作对象',
        prop: 'operand'
      }, {
        label: '操作说明',
        prop: 'operatecontent'
      }, {
        label: '详细说明',
        prop: 'details',
        hide: true
      }, {
        label: '登陆ip',
        prop: 'lastLoginIp'
      }, {
        label: '日志类型',
        prop: 'type'
      }, {
        label: '错误信息',
        prop: 'exmsg',
        hide: true
      }, {
        label: '创建日期',
        prop: 'createdAt',
        type: 'datetime',
        format: 'yyyy年M月d日 H:m'
      }, {
        label: '控制器信息',
        prop: 'controller',
        hide: true
      }, {
        label: '调用方法信息',
        prop: 'method',
        hide: true
      }, {
        label: '请求参数',
        prop: 'parameters',
        hide: true
      }
    ]
  }

  // 获取角色信息
  async getLogInfos(page?: any) {
    try {
      const params = {
        rows: (page && page.pageSize) || this.page.pageSize,
        page: (page && page.page) || this.page.page
      }
      const { data } = await getLogInfos(params)
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
