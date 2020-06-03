import { CrudTableOptions, PaginationOptions } from '@/components/Crud/interfaces/table.interface'
import { Vue } from 'vue-property-decorator'
import lodash from 'lodash'
import { ColumnOptions, TableOptions } from '../../../components/Crud/interfaces/table.interface'

export class RoleTableOptions extends Vue {
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
      name: [
        {
          required: true,
          message: '必须填写角色名',
          trigger: 'blur'
        }
      ]
    }
    this.tableOptions.rules = this.assign(rules, data)
  }

  setColumns(data: any = []) {
    // _id: any;

    // @prop()
    // id?: number;

    // @prop({ ref: 'Role', default: null })
    // creatorId: Ref<Role>;

    // @IsNotEmpty({ message: '必须填写角色名' })
    // @IsString({ message: '' })
    // @prop({ required: true })
    // name: string;

    // @prop({ default: '' })
    // explanation?: string;
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
        prop: 'name',
        label: '角色名',
        span: 24
      },
      {
        type: 'string',
        prop: 'explanation',
        label: '说明/描述'
      },
      {
        type: 'date',
        prop: 'createdAt',
        label: '创建时间',
        format: 'YYYY年M月D日 H:mm:ss',
        form: false
      },
      {
        type: 'date',
        prop: 'updatedAt',
        label: '更新时间',
        format: 'YYYY年M月D日 H:mm:ss',
        form: false
      },
      {
        type: 'tree',
        prop: 'menus',
        label: '菜单',
        form: false,
        attributes: {
          column: {
            props: {
              label: (data: any) => {
                return data.meta.title
              },
              'highlight-current': true
            }
          }
        }
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
      labelWidth: 'auto', // 对应
      topActions: {
        addBtn: {
          identifier: 'role_add'
        }
      },
      menuColumn: {
        editBtn: {
          identifier: 'role_edit'
        },
        delBtn: {
          identifier: 'role_del'
        },
        columnAttributes: {
          fixed: 'right',
          width: '150px'
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
