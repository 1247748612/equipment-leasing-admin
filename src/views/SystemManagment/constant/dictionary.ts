import { CrudTableOptions, PaginationOptions } from '@/components/Crud/interfaces/table.interface'
import { Vue } from 'vue-property-decorator'
import lodash from 'lodash'
import { ColumnOptions, TableOptions } from '../../../components/Crud/interfaces/table.interface'

export class DictionaryTypeTableOptions extends Vue {
  tableOptions: CrudTableOptions = {
    columns: []
  }
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
          message: '必须填写字典名',
          trigger: 'blur'
        },
        {
          validator: function(rule: any, value: any, callback: any) {
            if (value.match(/[a-z/-_]+/)) {
              callback()
            } else {
              callback(new Error('字典名需为字母,可以包括中划线下划线'))
            }
            console.log(rule, value, callback)
          },
          trigger: 'blur'
        }
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
        label: '字典名',
        prop: 'name',
        columnSlot: true
      },
      {
        type: 'string',
        label: '字典描述',
        prop: 'description'
      },
      ...data
    ]
    this.tableOptions.columns = columns
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
      title: '字典管理',
      labelWidth: 'auto', // 对应
      topActions: {
        addBtn: {
          identifier: 'dictionary_type_add'
        }
      },
      menuColumn: {
        editBtn: {
          identifier: 'dictionary_type_edit'
        },
        delBtn: {
          identifier: 'dictionary_type_del'
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
        height: '76vh'
      }
    }
    this.tableOptions.options = this.assign(options, data)
  }

  setPagination(paginateData: PaginationOptions = {
    limit: 10,
    page: 1
  }) {
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
    this.setPagination()
    return this.tableOptions
  }
}

export class DictionaryTableOptions extends Vue {
  tableOptions: CrudTableOptions = {
    columns: []
  }
  pagination!: PaginationOptions

  assign(oldData: any, newData: any) {
    if (lodash.isObject(oldData)) {
      return lodash.defaultsDeep(oldData, newData)
    }
    return oldData
  }

  setRules(data: any = []) {
    const rules = {
      label: [
        { required: true, message: '字典标签必须填写', trigger: 'blur' }
      ],
      value: [
        { required: true, message: '字典值必须填写', trigger: 'blur' }
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
        label: '字典类型id',
        prop: 'typeId',
        span: 24,
        attributes: {
          disabled: true
        },
        columnSlot: true
      },
      {
        type: 'string',
        label: '标签',
        prop: 'label'
      },
      {
        type: 'string',
        label: '值',
        prop: 'value'
      },
      {
        type: 'string',
        label: '字典描述',
        prop: 'description',
        span: 24
      },
      ...data
    ]
    this.tableOptions.columns = columns
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
      title: '字典管理',
      labelWidth: 'auto', // 对应
      topActions: {
        addBtn: {
          identifier: 'dictionary_add'
        }
      },
      menuColumn: {
        editBtn: {
          identifier: 'dictionary_edit'
        },
        delBtn: {
          identifier: 'dictionary_del'
        },
        columnAttributes: {
          label: '菜单操作',
          width: '160'
        }
      },
      dialogOptions: {
        'append-to-body': true
      },
      tableOptions: {
        'highlight-current-row': true,
        stripe: true,
        border: true
      }
    }
    this.tableOptions.options = this.assign(options, data)
  }

  setPagination(paginateData: PaginationOptions = {
    limit: 10,
    page: 1
  }) {
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
    this.setPagination()
    return this.tableOptions
  }
}
