<!-- 组件说明 -->
<template>
  <div>
    <crud-table
      :data="tableData"
      :columns="tableOptions.columns"
      :options="tableOptions.options"
      :pagination.sync="pagination"
      :permission="tableOptions.permission"
      @filter-change="filterChange"
      @sort-change="sortChange"
      @search="search"
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
  filterParams: any = {}

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
      page: this.pagination.page,
      ...this.filterParams
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

  search(formData: any, loading: Function) {
    formData = JSON.parse(JSON.stringify(formData))
    const params: any = {
      search: null,
      useRegex: formData.useRegex
    }
    Reflect.deleteProperty(formData, 'useRegex')
    params.search = Object.keys(formData).join(',')
    this.filterParams = { ...this.filterParams, ...params, ...formData }
    this.loadData(loading)
    console.log(formData, params, loading)
  }

  filterChange(args: Array<any>, loading: Function) {
    const params: any = {}
    args.forEach((item: any) => {
      Object.keys(item).forEach((key) => {
        params[key] = item[key].length ? item[key].join(',') : null
      })
    })
    this.filterParams = { ...this.filterParams, ...params }
    this.loadData(loading)
    console.log(args)
  }

  /// http://localhost:8080/api-dev/user/pagination?limit=10&page=1&search=username%7CKV%7Csdfwer%7CRE%7CphoneNumber%7CKV%7Cwerwer&useRegex=true
  sortChange(args: any, loading: Function) {
    const params: any = {
    }
    params.sort = args.order ? `${args.prop}_${args.order}` : args.order
    // args.forEach((item: any) => {
    //   params.sort = `${item}`
    //   // params.sort[item.prop] = item.order
    // })

    this.filterParams = { ...this.filterParams, ...params }
    this.loadData(loading)

    console.log(args, params, '排序')
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
    const columnOptions = {
      type: {
        columnAttributes: {
          filters: [
            {
              text: '正常',
              value: 0
            },
            {
              text: '异常',
              value: 1
            }
          ],
          'column-key': 'type',
          'filter-multiple': false
        }
      },
      method: {
        columnAttributes: {
          filters: [
            {
              text: 'GET',
              value: 'GET'
            },
            {
              text: 'POST',
              value: 'POST'
            },
            {
              text: 'DELETE',
              value: 'DELETE'
            },
            {
              text: 'PUT',
              value: 'PUT'
            },
            {
              text: 'PATCH',
              value: 'PATCH'
            }
          ]
        }
      }
    }
    this.concatColumnOptions(columnOptions)
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
