import { CrudTableOptions, PaginationOptions, ColumnOptions } from '@/components/Crud/interfaces/table.interface'
import { Vue } from 'vue-property-decorator'
import lodash from 'lodash'

export class LoggingTableOptions extends Vue {
  tableOptions: CrudTableOptions = {}
  pagination!: PaginationOptions

  assign(oldData: any, newData: any) {
    if (lodash.isObject(oldData)) {
      return lodash.defaultsDeep(oldData, newData)
    }
    return oldData
  }

  setPagination(paginateData: PaginationOptions = {
    limit: 10,
    page: 1
  }) {
    this.pagination = paginateData
  }

  setColumns(data: ColumnOptions[] = []) {
    const columns: ColumnOptions[] = [
      {
        type: 'string',
        label: '_id',
        prop: '_id',
        show: false
      },
      {
        type: 'string',
        label: '标题',
        prop: 'title',
        search: true,
        columnAttributes: {
          // 'min-width': '100',
          'show-overflow-tooltip': true,
          fixed: 'left'
        }
      },
      {
        type: 'radio',
        label: '类型',
        prop: 'type',
        columnAttributes: {
          align: 'center',
          headerAlign: 'center',
          width: '70'
        },
        valueAttributes: {
          0: {
            type: 'success'
          },
          1: {
            type: 'danger'
          }
        },
        options: [
          {
            label: '正常',
            value: 0
          },
          {
            label: '异常',
            value: 1
          }
        ]
      },
      {
        type: 'string',
        label: '访问地址',
        prop: 'url',
        columnAttributes: {
          'show-overflow-tooltip': true
        }
      },
      {
        type: 'string',
        label: '访问ip',
        prop: 'ip'
      },
      {
        type: 'string',
        label: '用户信息',
        prop: 'userId',
        show: false
      },
      {
        type: 'string',
        label: '请求方式',
        prop: 'method',
        columnAttributes: {
          align: 'center',
          headerAlign: 'center',
          width: '100',
          'column-key': 'method'
        }
      },
      {
        type: 'string',
        label: 'controller类名',
        prop: 'controllerName',
        show: false
      },
      {
        type: 'string',
        label: '接口方法名',
        prop: 'funcName',
        show: false
      },
      {
        type: 'string',
        label: '传递参数',
        prop: 'body',
        columnAttributes: {
          'show-overflow-tooltip': true
        }
      },
      {
        type: 'string',
        label: '异常栈',
        prop: 'stack',
        columnAttributes: {
          'show-overflow-tooltip': true
        }
      },
      {
        type: 'date',
        prop: 'createdAt',
        label: '创建时间',
        format: 'YYYY年M月D日 H:mm:ss',
        form: false,
        columnAttributes: {
          'show-overflow-tooltip': true,
          sortable: 'custom'
        }
      },
      {
        type: 'date',
        prop: 'updatedAt',
        label: '更新时间',
        format: 'YYYY年M月D日 H:mm:ss',
        show: false,
        form: false
      }
    ]
    this.tableOptions.columns = [...columns, ...data]
  }

  concatColumnOptions(data: any) {
    const keys = Object.keys(data)
    if (!keys.length) {
      return
    }
    this.tableOptions.columns = (this.tableOptions.columns as any).map((column: any) => {
      if (keys.includes(column.prop)) {
        return lodash.defaultsDeep(column, data[column.prop])
      } else {
        return column
      }
    })
    console.log(this.tableOptions.columns, 'setColumnOptions')
  }

  setOptions(data: any = {}) {
    const options = {
      topActions: {
        addBtn: false
      },
      labelWidth: 'auto', // 对应
      menuColumn: false,
      tableOptions: {
        index: true,
        // selection: true,
        stripe: true,
        height: '76vh',
        border: true
      }
    }
    this.tableOptions.options = this.assign(options, data)
  }

  setPermission(data: any = []) {
    const permission: any[] = data
    this.tableOptions.permission = permission
  }

  getTableOptions() {
    this.setColumns()
    this.setOptions()
    this.setPermission()
    this.setPagination()
    return this.tableOptions
  }
}
