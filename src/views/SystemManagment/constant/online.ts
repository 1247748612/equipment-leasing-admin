import { CrudTableOptions, PaginationOptions } from '@/components/Crud/interfaces/table.interface'
import { Vue } from 'vue-property-decorator'
import lodash from 'lodash'
import { ColumnOptions, TableOptions } from '../../../components/Crud/interfaces/table.interface'

export class OnlineUserTableOptions extends Vue {
  tableOptions: CrudTableOptions = {}
  pagination!: PaginationOptions

  assign(oldData: any, newData: any) {
    if (lodash.isObject(oldData)) {
      console.log(newData)
      return lodash.defaultsDeep(oldData, newData)
    }
    return oldData
  }

  setRules(data: any = []) {
    const rules = {
    }
    this.tableOptions = this.assign(rules, data)
  }

  setColumns(data: ColumnOptions[] = []) {
    const columns: ColumnOptions[] = [
      {
        type: 'string',
        label: 'id',
        prop: '_id',
        show: false,
        form: false
      },
      {
        type: 'string',
        prop: 'nickname',
        label: '昵称',
        span: 24,
        columnAttributes: {
          width: 100
        }
      },
      {
        type: 'upload',
        prop: 'avatar',
        label: '头像',
        attributes: {
          column: {
            lazy: true,
            'preview-src-list': true,
            alt: '用户头像'
          }
        },
        columnAttributes: {
          'width': 120
        },
        span: 24
      },
      {
        type: 'string',
        prop: 'phoneNumber',
        label: '手机号',
        attributes: {
          form: {
            type: 'tel'
          }
        },
        columnAttributes: {
          width: 150
        }
      },
      {
        type: 'date',
        prop: 'lastLoginTime',
        label: '上次登录时间',
        format: 'YYYY年M月D日 H:mm:ss',
        form: false
      },
      {
        type: 'string',
        prop: 'lastLoginIp',
        label: '上次登录ip',
        form: false,
        columnAttributes: {
          width: 100
        }
      },
      {
        type: 'string',
        prop: 'token',
        label: 'token',
        form: false,
        columnAttributes: {
          'show-overflow-tooltip': true
        }
      }
    ]
    this.tableOptions.columns = this.assign(columns, data)
  }

  setColumnOptions(data: any) {
    const keys = Object.keys(data)
    if (!keys.length) {
      return
    }
    this.tableOptions.columns = (this.tableOptions.columns as any).map((column: any) => {
      if (keys.includes(column.prop)) {
        return {
          ...column,
          options: data[column.prop]
        }
      } else {
        return column
      }
    })
  }

  setOptions(data: any = {}) {
    const options: TableOptions = {
      title: '用户管理',
      labelWidth: 'auto', // 对应
      topActions: {
        addBtn: false
      },
      menuColumn: {
        editBtn: false,
        delBtn: false,
        columnAttributes: {
          label: '菜单操作',
          width: '80'
        }
      },
      tableOptions: {
        'highlight-current-row': true,
        stripe: true,
        border: true,
        height: '76vh'
      }
    }
    this.tableOptions.options = this.assign(options, data)
  }

  setPagination(paginateData: PaginationOptions) {
    this.pagination = paginateData
  }

  setPermission(data: any = []) {
    const permission: any[] = data
    this.tableOptions.permission = permission
  }

  getTableOptions() {
    this.setRules()
    this.setColumns()
    this.setOptions()
    this.setPermission()
    return this.tableOptions
  }
}
