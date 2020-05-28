import { Vue, Prop, PropSync, Model } from 'vue-property-decorator'
import { ColumnOptions, FormStatus, TableColumns, TableOptions } from '@/components/Crud/interfaces/table.interface'
import * as TEXT from '../constatns/text.constant'

export class EventMixin extends Vue {
  @Prop({ required: true })
  columns!: TableColumns
  @Prop({ default: {} })
  options!: TableOptions
  @Prop({ default: () => [], type: Array })
  permission!: string[]
  @Model('input') defaultForm!: any

  showColumns: any = [] // 原始columns
  showProps: any = [] // 展示的props
  formData: any = {} // form菜单默认数据
  formDialogShow: boolean = false // 表单弹窗状态
  formStatus: FormStatus = FormStatus.ADD
  tableLoading: boolean = false // table的loading

  get filterColumns() {
    return this.showColumns.filter((column: ColumnOptions) => {
      return this.showProps.includes(column.prop)
    })
  }

  get menuColumn() {
    return this.options.menuColumn
  }

  get TEXT() {
    return TEXT
  }
}
