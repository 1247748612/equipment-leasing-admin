import { Vue, Prop, PropSync } from 'vue-property-decorator'
import { ColumnOptions } from '@/components/Crud/interfaces/table.interface'

export class CrudTypeMixin extends Vue {
  @PropSync('formValue', { default: '' }) modelValue!: any
  @Prop({ default: false, type: Boolean }) form!: boolean
  @Prop({ default: '' }) value!: any
  @Prop({ required: true }) column!: ColumnOptions

  get attributes() {
    if (this.column.attributes) {
      if (this.form) {
        return this.column.attributes.form || this.column.attributes
      } else {
        return this.column.attributes.column || this.column.attributes
      }
    } else {
      return {}
    }
  }

  get placeholder() {
    const attributes = this.attributes
    return (attributes && attributes.placeholder) || `请输入${this.column.label}`
  }

  get valueAttributes() {
    return this.column.valueAttributes
  }
}
