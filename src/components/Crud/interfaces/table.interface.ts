/*
  type 类型 表单
  label: 展示名
  prop 对应 参数key
  show 表格展示
  form 表单展示
  formSlot 表单列自定义
  columnSlot: 表格列自定义
  value: 表单默认值
  format: 如果为date 为时间格式化参数
  data: 为配置数据 如el-tree e-option
*/

export enum FormStatus {
  ADD = 'add',
  EDIT = 'edit',
  Search = 'search',
  Custom = 'custom'
}

/*
  string input
  select select
  date date
 */
export interface ColumnOptions {
  type: string, // 类型
  label: string, // 对应表头
  prop: string, // key
  show?: boolean, // 表格是否展示 默认true
  form?: boolean, // 表单是否展示 默认 true
  search?: boolean // 是否搜索
  searchSlot?: boolean // 是否搜索
  searchSpan?: number // 和span一样
  formSlot?: boolean, // 表单slot ex. v-slot:iconForm
  columnSlot?: boolean, // 表格slot ex. v-slot:icon
  format?: string, // 格式化
  value?: any, // 默认值
  options?: any // 多选框,select的参数
  attributes?: {
    [key: string]: any
    props?: {
      label?: string // label
      value?: any // value
    } // 如 select 设置label 和 value属性
    form?: { // 类型对应form组件的element参数
      [key: string]: any
    },
    column?: { // 类型对应表格组件的element参数
      [key: string]: any
    }
  },
  addForm?: Boolean, // 新增 是否包含 默认true包含
  editForm?: Boolean, // 编辑 是否包含 默认 true 包含
  valueAttributes?: any, // radio switch类型的 值 对应 attributes
  columnAttributes?: any // 对应表格的column的element参数
  span?: number // el-col的span 默认值为12
}

// 菜单项的配置
export interface MenuColumn {
  delBtn?: ButtonOptions | boolean
  editBtn?: ButtonOptions | boolean
  columnAttributes?: { // 对应菜单column字段属性
    [key: string]: any
  } // 表格参数
  otherBtn?: ButtonOptions[]
}

export interface ButtonOptions {
  text?: string // 按钮文字
  type?: string // 按钮类型
  identifier?: string // 按钮权限标识符
  attributes?: {
    [key: string]: any
  } // el-button的参数
  /**
   * 可监听事件名
   * add-btn // 按钮新增
   * hightlight-btn // 高亮行状态返回
   */
  eventName?: string
  event?: Function // 按钮事件
}

// 表格顶部配置
export interface TopActions {
  addBtn?: ButtonOptions | boolean
  otherBtn?: Array<ButtonOptions>
}

export interface PaginationOptions {
  page: number // 当前页
  limit: number // 当前页展示数量
  total?: number // 展示熟练
  background?: boolean, // 是否要背景
  [key: string]: any
  // 参考pagination的参数
}

export interface TableOptions {
  title?: string // 标题
  searchRules?: any // 搜索表单的规则
  labelWidth?: string // el-form-item label的宽度
  menuColumn?: MenuColumn | boolean, // 为false则不展示菜单项
  topActions?: TopActions | boolean, // 顶部按钮配置
  dialogOptions?: { // 对应dialog的属性
    width?: string | number // 默认'60%'
    'close-on-press-escape'?: boolean // 默认false
    [key: string]: any
  }
  tableOptions?: { // 对应table的属性
    index?: boolean, // 索引
    selection?: boolean, // 多选
    [key: string]: any
  }
}

export interface TableColumns extends Array<any>{
  [key: number]: ColumnOptions
}

export interface CrudTableOptions {
  columns?: TableColumns,
  options?: TableOptions,
  pagination?: PaginationOptions,
  permission?: string[] // 权限表
  hideFormItem?: {
    [key: string]: { // prop字段
      // key 是prop字段的值
      [key: string]: any[] // value: 展示的prop
    }
  }
  rules?: { // TableOptions对应el-form表单的rules
    [key: string]: any
  }
}
