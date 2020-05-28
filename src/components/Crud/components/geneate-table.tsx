import { Component, Vue, Prop, Inject, Watch } from 'vue-property-decorator'
import { ColumnOptions, TableColumns, MenuColumn } from '@/components/Crud/interfaces/table.interface'
import * as TypeComponents from '../TypeComponents'
import * as TEXT from '../constatns/text.constant'
import lodash from 'lodash'

@Component({
  name: 'CrudGenerateTable',
  components: {
    ...TypeComponents.default
  }
})
export default class CrudGenerateTable extends Vue {
  @Prop({ required: true })
  columns!: TableColumns
  @Prop({ default: () => [] })
  data!: any[]
  @Prop({ default: () => {} })
  tableOptions!: any
  @Prop({ default: () => {} })
  menuColumn!: MenuColumn
  @Inject() readonly hasIdentifier!: Function

  get delBtn(): any {
    return this.menuColumn.delBtn || {}
  }

  get editBtn(): any {
    return this.menuColumn.editBtn || {}
  }

  selectionColumnElement() {
    return <el-table-column type="selection" header-align="center" align="center" width="auto"></el-table-column>
  }
  indexColumnElement() {
    return <el-table-column type="index" align="center" header-align="center" width="auto"></el-table-column>
  }

  get menuColumnAttributes() {
    const attributes = this.menuColumn.columnAttributes || {}
    return lodash.defaultsDeep(attributes, {
      headerAlign: 'center',
      align: 'center',
      label: TEXT.MENU_COLUMN_LABEL
    })
  }

  menuColumnElement() {
    const scopedSlots = {
      default: this.btnElement
    }
    return (
      <el-table-column
        attrs={{ ...this.menuColumnAttributes }}
        scopedSlots={scopedSlots}
      >
      </el-table-column>
    )
  }

  get columnElements() {
    const tableColumns = []
    this.columns.forEach((column) => {
      const attributes = column.columnAttributes || {}
      const attrs = lodash.defaultsDeep(attributes, {
        headerAlign: 'center',
        align: 'center'
      })
      const columnElement =
        <el-table-column attrs={{ ...attrs }} label={column.label}
          {...this.tableColumnChild(column)}
        >
        </el-table-column>
      tableColumns.push(columnElement)
    })

    if (this.tableOptions.selection) {
      tableColumns.unshift(this.selectionColumnElement())
    }
    if (this.tableOptions.index) {
      tableColumns.unshift(this.indexColumnElement())
    }
    if (this.menuColumn) {
      tableColumns.push(this.menuColumnElement())
    }
    return tableColumns
  }

  btnElement(scope: any) {
    const buttonElements = []
    if (this.menuColumn.editBtn && this.hasIdentifier(this.editBtn.identifier)) {
      buttonElements.push(
        <el-button
          size="mini"
          type={this.editBtn.type || 'text'}
          onClick={() => { this.emit('edit-click', scope) }}
        >
          { this.editBtn.text || TEXT.ROW_EDIT_NAME }
        </el-button>
      )
    }

    if (this.menuColumn.delBtn && this.hasIdentifier(this.delBtn.identifier)) {
      buttonElements.push(
        <el-button
          size="mini"
          type={this.delBtn.type || 'text'}
          onClick={() => { this.emit('del-click', scope) }}
        >
          { this.delBtn.text || TEXT.ROW_DEL_NAME }
        </el-button>
      )
    }

    if (this.menuColumn.otherBtn) {
      (this.menuColumn.otherBtn as Array<any>).forEach((button: any) => {
        if (!this.hasIdentifier(button.identifier)) {
          return
        }
        buttonElements.push(
          <el-button
            attrs={{ ...button.attributes }}
            onClick={() => { this.emit('custom-click', scope, button) }}
          >
            { button.text }
          </el-button>
        )
      })
    }
    return buttonElements
  }

  emit(eventName: string, ...all: any) {
    this.$emit(eventName, ...all)
  }

  tableColumnChild(column: any) {
    if (column.columnSlot) {
      return {
        ...{
          scopedSlots: {
            default: (scope: any) => {
              const element: any = (this.$scopedSlots[column.prop] as any)({ row: scope.row })
              return element
            }
          }
        }
      }
    } else {
      return {
        ...{
          scopedSlots: {
            default: (scope: any) => {
              const TagName = `crud-${column.type}`
              return (
                <TagName
                  column={column}
                  value={scope.row[column.prop]}
                >
                </TagName>
              )
            }
          }
        }
      }
    }
  }

  render() {
    return (
      <el-table on={this.$listeners} attrs={this.tableOptions} data={this.data} style='width: 100%'>
        { this.columnElements }
      </el-table>
    )
  }

  mounted() {
    console.log(this.$listeners, '看看row-dblclick')
  }
}
