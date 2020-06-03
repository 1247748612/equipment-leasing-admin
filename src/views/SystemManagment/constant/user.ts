import { CrudTableOptions, PaginationOptions } from '@/components/Crud/interfaces/table.interface'
import { Vue } from 'vue-property-decorator'
import lodash from 'lodash'
import { ColumnOptions, TableOptions } from '../../../components/Crud/interfaces/table.interface'

export class UserTableOptions extends Vue {
  tableOptions: CrudTableOptions = {}
  pagination!: PaginationOptions

  assign(oldData: any, newData: any) {
    if (lodash.isObject(oldData)) {
      console.log(newData)
      return lodash.defaultsDeep(oldData, newData)
    }
    return oldData
  }

  setRules(data: any = {}) {
    const rules = {
      username: [
        { required: true, message: '用户名必须填写', trigger: 'blur' },
        { min: 6, message: '最少6位', trigger: 'blur' },
        { max: 12, message: '最多12位', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '用户名必须填写', trigger: 'blur' },
        { min: 6, message: '最少6位', trigger: 'blur' },
        { max: 12, message: '最多12位', trigger: 'blur' }
      ],
      nickname: [
        { required: true, message: '昵称必须填写', trigger: 'blur' }
      ],
      phoneNumber: [
        { required: true, message: '手机号必须填写', trigger: 'blur' },
        { min: 11, message: '手机号最少11位', trigger: 'blur' },
        { max: 11, message: '手机号最多11位', trigger: 'blur' }
      ]
    }
    this.tableOptions.rules = this.assign(rules, data)
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
        label: '创建者id',
        prop: 'creatorId',
        show: false,
        form: false
      },
      {
        type: 'string',
        prop: 'nickname',
        label: '昵称',
        span: 24
      },
      {
        type: 'string',
        prop: 'username',
        label: '登录用户名',
        span: 24,
        search: true
      },
      {
        type: 'string',
        prop: 'password',
        show: false,
        label: '登录密码',
        span: 24,
        editForm: false
      },
      {
        type: 'string',
        prop: 'phoneNumber',
        search: true,
        label: '手机号',
        attributes: {
          form: {
            type: 'tel'
          }
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
          'min-width': 120
        },
        span: 24
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
        form: false
      },
      {
        type: 'string',
        label: '角色',
        prop: 'roles',
        columnSlot: true,
        form: false,
        columnAttributes: {
          width: '140'
        }
      },
      {
        type: 'date',
        prop: 'createdAt',
        label: '创建时间',
        format: 'YYYY年M月D日 H:mm:ss',
        form: false,
        show: false
      },
      {
        type: 'date',
        prop: 'updatedAt',
        label: '更新时间',
        format: 'YYYY年M月D日 H:mm:ss',
        form: false,
        show: false
      },
      {
        type: 'switch',
        prop: 'status',
        label: '状态',
        attributes: {
          form: {
            'active-text': '启用',
            'inactive-text': '禁用'
          },
          column: {
            true: '启用',
            false: '禁用'
          }
        },
        value: true
      },
      {
        type: 'switch',
        prop: 'useRegex',
        label: '是否模糊搜索',
        attributes: {
          form: {
            'active-text': '启用',
            'inactive-text': '禁用'
          },
          column: {
            true: '启用',
            false: '禁用'
          }
        },
        value: true,
        form: false,
        show: false,
        search: true
      }
    ]
    this.tableOptions.columns = this.assign(columns, data)
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
    const options: TableOptions = {
      title: '用户管理',
      labelWidth: 'auto', // 对应
      topActions: {
        addBtn: {
          identifier: 'user_add'
        }
      },
      searchRules: {
        username: [
          { required: true, message: '必须填写', trigger: 'blur' }
        ]
      },
      menuColumn: {
        editBtn: {
          identifier: 'user_edit'
        },
        delBtn: {
          identifier: 'user_del'
        },
        columnAttributes: {
          label: '菜单操作',
          width: '160'
        }
      },
      tableOptions: {
        'highlight-current-row': true,
        stripe: true,
        border: true,
        height: '76vh',
        'row-key': '_id'
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
