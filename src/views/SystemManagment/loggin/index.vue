<!-- 组件说明 -->
<template>
  <div>
    <crud-table
      :data="tableData"
      :columns="tableOptions.columns"
      :options="tableOptions.options"
      :pagination.sync="pagination"
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
import { CrudTableOptions, PaginationOptions, TopActions } from '@/components/Crud/interfaces/table.interface'
import { logPagination, dellAllLog } from '@/api/logging'
import { CrudTable } from '@/components/Crud'
import { LoggingTableOptions } from '../constant/logging'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'Logging',
  components: {
    CrudTable
  }
})
export default class Logging extends LoggingTableOptions {
  tableData = [] // 获取的数据

  dellAllLog(loading: Function) {
    this.$confirm('是否删除所有日志', '确认信息', {
      distinguishCancelAndClose: true,
      confirmButtonText: '删除',
      cancelButtonText: '放弃'
    })
      .then(() => {
        loading()
        dellAllLog({}).then((res) => {
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
    const parmas = {
      limit: this.pagination.limit,
      page: this.pagination.page
    }
    loading && loading()
    logPagination(parmas).then((res) => {
      this.$message.success(res.message as any)
      this.tableData = res.data.data
      this.pagination.total = res.data.pagination && res.data.pagination.total
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
      otherBtn: [
        {
          text: '删除全部日志',
          type: 'danger',
          identifier: 'logging_del',
          event: this.dellAllLog,
          eventName: 'loading-btn',
          attributes: {
            size: 'small'
          }
        }
      ]
    }
    this.setOptions({ topActions })
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
