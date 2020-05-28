<!-- 组件说明 -->
<template>
  <div>
    <crud-table
      :data="tableData"
      :columns="tableOptions.columns"
      :options="tableOptions.options"
      :permission="tableOptions.permission"
      @load-data="loadData"
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
import { CrudTableOptions, PaginationOptions, TopActions, MenuColumn } from '@/components/Crud/interfaces/table.interface'
import { CrudTable } from '@/components/Crud'
import { LoggingTableOptions } from '../constant/logging'
import { UserModule } from '@/store/modules/user'
import { onlineUser, outOnlineUser } from '@/api/users'
import { OnlineUserTableOptions } from '../constant/online'

@Component({
  name: 'OnlineUser',
  components: {
    CrudTable
  }
})
export default class OnlineUser extends OnlineUserTableOptions {
  tableData = [] // 获取的数据

  outOnlineUser({ row }: any, loading: Function) {
    console.log(arguments)
    this.$confirm(`是否强制下线${row.nickname}用户`, '确认信息', {
      distinguishCancelAndClose: true,
      confirmButtonText: '删除',
      cancelButtonText: '放弃'
    })
      .then(() => {
        loading()
        const data = {
          tokens: [row.token]
        }
        outOnlineUser(data).then((res) => {
          console.log(res)
          loading()
          this.$message.success(res.message)
          this.loadData(loading)
        }).catch((err) => {
          console.log(err)
          this.$message.error(err.message)
          loading()
        })
      })
  }

  loadData(loading?: Function) {
    loading && loading()
    onlineUser().then((res) => {
      this.$message.success(res.message as any)
      this.tableData = res.data
      loading && loading()
      console.log(res)
    }).catch((err) => {
      console.log(err)
      this.$message.success(err.errMessage as any)
      loading && loading()
    })
  }

  created() {
    this.getTableOptions()
    const topActions: TopActions = {
    }
    const menuColumn: MenuColumn = {
      otherBtn: [
        {
          text: '踢出',
          identifier: 'user_online_out',
          event: this.outOnlineUser,
          attributes: {
            size: 'small',
            type: 'text'
          }
        }
      ]
    }
    this.setOptions({ menuColumn })
    this.setPermission(UserModule.permission)
  }
}

</script>
<style lang='scss' scoped>
//@import url()
  .input-wrap {
    display: flex;
  }
</style>
