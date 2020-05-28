import { CrudTableOptions, PaginationOptions, ColumnOptions } from '@/components/Crud/interfaces/table.interface'
import { Vue } from 'vue-property-decorator'
import lodash from 'lodash'

export class ArticleTableOptions extends Vue {
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
      title: [
        { required: true, message: '标题必须填写', trigger: 'blur' }
      ],
      content: [
        { required: true, message: '内容不能为空', trigger: 'blur' }
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
        label: '文章标题',
        prop: 'title',
        span: 24
      },
      {
        type: 'editor',
        label: '文章内容',
        prop: 'content',
        span: 24
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
    const options = {
      title: '用户管理',
      labelWidth: 'auto', // 对应
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
      dialogOptions: {
        'append-to-body': true,
        width: '70%'
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
