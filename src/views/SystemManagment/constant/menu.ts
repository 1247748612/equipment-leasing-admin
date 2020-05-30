import { CrudTableOptions, PaginationOptions } from '@/components/Crud/interfaces/table.interface'
import { Vue } from 'vue-property-decorator'
import lodash from 'lodash'
import { ColumnOptions } from '../../../components/Crud/interfaces/table.interface'

export class MenuTableOptions extends Vue {
  tableOptions: CrudTableOptions = {}
  pagination!: PaginationOptions

  assign(oldData: any, newData: any) {
    if (lodash.isObject(oldData)) {
      return lodash.defaultsDeep(oldData, newData)
    }
    return oldData
  }

  setRules(data: any = []) {
    const rules = {
      icon: [
        {
          required: false,
          message: '必须填写图标',
          trigger: 'blur'
        }
      ],
      title: [
        {
          required: true,
          message: '必须填写标题名',
          trigger: 'blur'
        }
      ],
      path: [
        {
          required: true,
          message: '必须填写路由地址',
          trigger: 'blur'
        }
      ],
      name: [
        {
          required: true,
          message: '必须填写路由名',
          trigger: 'blur'
        }
      ],
      componentPath: [
        {
          required: true,
          message: '必须填写组件路径',
          trigger: 'blur'
        }
      ],
      permissionIdentifier: [
        {
          required: true,
          message: '必须填写路由地址',
          trigger: 'blur'
        },
        {
          validator: function(rule: any, value: any, callback: any) {
            if (value.match(/[a-z]+_[a-z]+/)) {
              callback()
            } else {
              callback(new Error('权限标识符必须为左右字母中间下划线'))
            }
            console.log(rule, value, callback)
          },
          trigger: 'blur'
        }
      ]
    }
    this.tableOptions.rules = this.assign(rules, data)
  }

  setHideFormItem() {
    const hideFormItem = {
      type: {
        0: [
          'permissionIdentifier'
        ],
        1: [
          'path',
          'icon',
          'sort',
          'name',
          'componentPath',
          'alwaysShow',
          'breadcrumb',
          'noCache',
          'affix',
          'hidden'
        ]
      }
    }
    this.tableOptions.hideFormItem = hideFormItem
  }

  setColumns(data: ColumnOptions[] = []) {
    const columns: ColumnOptions[] = [
      {
        type: 'string',
        label: '菜单id',
        prop: '_id',
        show: false,
        form: false
      },
      {
        type: 'cascader',
        label: '父id',
        prop: 'pid',
        show: false,
        attributes: {
          form: {
            props: {
              value: '_id',
              label: 'title',
              emitPath: false,
              checkStrictly: true
            }
          }
        }
      },
      {
        type: 'string',
        label: '创建者id',
        prop: 'creatorId',
        show: false,
        form: false
      },
      {
        type: 'radio',
        prop: 'type',
        label: '类型',
        span: 24,
        options: [
          {
            label: '菜单',
            value: 0
          },
          {
            label: '按钮',
            value: 1
          }
        ],
        columnAttributes: {
          width: '70'
        },
        value: 0
      },
      {
        type: 'string',
        prop: 'title',
        label: '标题名',
        span: 12,
        columnAttributes: {
          fixed: true,
          width: '120'
        }
      },
      {
        type: 'string',
        prop: 'name',
        label: '路由名',
        span: 12
      },
      {
        type: 'string',
        prop: 'path',
        label: '路由地址'
      },
      {
        type: 'select',
        prop: 'componentPath',
        label: '组件'
      },
      {
        type: 'string',
        prop: 'icon',
        label: '图标',
        columnSlot: true,
        formSlot: true,
        columnAttributes: {
          width: '50'
        }
      },
      {
        type: 'string',
        prop: 'permissionIdentifier',
        label: '权限标识符',
        columnAttributes: {
          width: '130'
        }
      },
      {
        type: 'number',
        prop: 'sort',
        label: '排序',
        value: 1
      },
      {
        type: 'switch',
        prop: 'alwaysShow',
        label: '总是显示',
        show: false,
        attributes: {
          column: {
            true: '显示',
            false: '隐藏'
          },
          form: {
            'active-text': '显示',
            'inactive-text': '隐藏'
          }
        },
        value: true
      },
      {
        type: 'switch',
        prop: 'breadcrumb',
        label: '在面包屑显示',
        show: false,
        attributes: {
          column: {
            true: '显示',
            false: '隐藏'
          },
          form: {
            'active-text': '显示',
            'inactive-text': '隐藏'
          }
        },
        value: true
      },
      {
        type: 'switch',
        prop: 'noCache',
        label: '缓存页面',
        show: false,
        attributes: {
          column: {
            true: '显示',
            false: '隐藏'
          },
          form: {
            'active-text': '显示',
            'inactive-text': '隐藏'
          }
        },
        value: true
      },
      {
        type: 'switch',
        prop: 'affix',
        label: '固定在面包屑前面',
        show: false,
        attributes: {
          column: {
            true: '显示',
            false: '隐藏'
          },
          form: {
            'active-text': '显示',
            'inactive-text': '隐藏'
          }
        },
        value: true
      },
      {
        type: 'switch',
        prop: 'hidden',
        label: '隐藏页面',
        show: false,
        attributes: {
          column: {
            true: '显示',
            false: '隐藏'
          },
          form: {
            'active-text': '显示',
            'inactive-text': '隐藏'
          }
        },
        value: true
      }
    ]
    this.tableOptions.columns = [...columns, ...data]
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
    console.log(this.tableOptions.columns, 'setColumnOptions')
  }

  setOptions(data: any = {}) {
    const options = {
      labelWidth: 'auto', // 对应
      menuColumn: {
        editBtn: {
          type: 'text',
          text: '编辑',
          identifier: 'menu_edit'
        },
        delBtn: {
          text: '删除',
          type: 'text',
          identifier: 'menu_del'
        },
        columnAttributes: {
          // label: '菜单操作',
          fixed: 'right',
          width: '100px'
        }
      },
      dialogOptions: {
        width: '80%',
        'close-on-press-escape': false
      },
      tableOptions: {
        height: '76vh',
        'highlight-current-row': true,
        stripe: true,
        border: true,
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
    this.setHideFormItem()
    return this.tableOptions
  }
}