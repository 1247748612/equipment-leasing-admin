<!-- 组件说明 -->
<template>
  <div
    v-if="columns && columns.length"
    class="crud-form"
  >
    <el-form
      v-if="renderStatus"
      ref="form"
      :label-width="$attrs['label-width'] || 'auto'"
      label-position="right"
      size="small"
      :model="formData"
      :rules="$attrs.rules"
    >
      <el-row
        :gutter="20"
        style="max-height: 60vh; overflow-y: auto"
      >
        <el-col
          v-for="column in formColumns"
          :key="column.prop"
          :span="column.span || 12"
        >
          <el-form-item
            :label="column.label"
            :prop="column.prop"
          >
            <slot
              v-if="column.formSlot"
              :name="column.prop + 'Form'"
              :form-data="formData"
              :prop-name="column.prop"
            />
            <component
              :is="'crud-' + column.type"
              v-else
              :column="column"
              :form="true"
              :form-value.sync="formData[column.prop]"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        type="flex"
        justify="end"
        style="padding-right: 20px"
      >
        <el-form-item>
          <el-button
            v-if="formStatus !== 'custom'"
            type="primary"
            @click="submit"
          >
            {{ formStatus === 'add' ? TEXT.FORM_ADD_BTN_TEXT : TEXT.FORM_EDIT_BTN_TEXT }}
          </el-button>
          <el-button
            v-else
            type="primary"
            @click="trigger"
          >
            {{ TEXT.FORM_CUSTOM_BTN_TEXT }}
          </el-button>
          <el-button @click="resetFileds">
            {{ TEXT.FORM_RESET_BTN_TEXT }}
          </el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit, Provide, Inject, InjectReactive, Model } from 'vue-property-decorator'
import { ColumnOptions, TableColumns, FormStatus } from '@/components/Crud/interfaces/table.interface'
import { ElForm } from 'element-ui/types/form'
import * as TEXT from './constatns/text.constant'
import lodash from 'lodash'
import TypeComponents from './TypeComponents/index'
@Component({
  name: 'CrudForm',
  components: {
    ...(TypeComponents())
  }
})
export default class CrudForm extends Vue {
  // 所有columns
  @Prop({ required: true }) columns!: TableColumns
  // 默认form表单
  @Model('input', { default: () => ({}) }) defaultFormData!: object
  // 隐藏form-item字段
  @Prop({ type: Object, default: () => ({}) }) hideFormItem!: any
  @Prop({ type: String, default: 'custom' }) formStatus!: string
  @Inject({ default: () => {} }) closeDialog!: Function

  renderStatus: boolean = true // 重新渲染
  hideProp: any[] = [] // 要隐藏的字段
  unwatchList: any[] = [] // 要销毁的监听
  formData: any = {}// form表单数据

  $refs!: {
    form: ElForm
  }

  get TEXT() {
    return TEXT
  }

  get formColumns() {
    return this.columns.filter((column: ColumnOptions) => {
      if (FormStatus.ADD === this.formStatus && column.addForm === false) {
        return false
      } else if (FormStatus.EDIT === this.formStatus && column.editForm === false) {
        return false
      }
      return column.form !== false && !this.hideProp.includes(column.prop as any)
    })
  }

  @Watch('defaultFormData', { deep: true, immediate: true })
  initFormData() {
    const data: any = {}
    for (let column of this.columns) {
      if (column.formSlot) {
        continue
      }
      data[column.prop] = column.value !== undefined ? column.value : undefined
    }
    this.formData = { ...data, ...this.defaultFormData }
    this.renderStatus = false
    this.$nextTick(() => {
      this.renderStatus = true
    })
  }

  // 重置按钮
  resetFileds() {
    this.$refs.form.resetFields()
  }

  // 提交按钮
  submit() {
    const validate = this.$refs.form.validate()
    if (!validate) {
      this.submitEvent()
    } else {
      validate.then((res) => {
        this.submitEvent()
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  // 删除隐藏的prop
  delHideProp() {
    const formData = this.formData
    if (this.hideProp.length) {
      this.hideProp.forEach((key) => {
        Reflect.deleteProperty(formData, key)
      })
      return formData
    }
    return formData
  }

  // 配合表格一起使用
  submitEvent() {
    const formData = this.delHideProp()
    this.$emit('trigger-event', `${this.formStatus}-event`, formData)
  }

  // 单独使用form表单
  submitCustom() {
    const formData = this.delHideProp()
    this.$emit('save', formData, this.closeDialog)
  }

  // 触发事件
  trigger() {
    const validate = this.$refs.form.validate()
    if (!validate) {
      this.submitCustom()
    } else {
      validate.then((res) => {
        this.submitCustom()
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  // 监听要隐藏的prop
  watchProp() {
    const keys = Object.keys(this.hideFormItem)
    this.unwatchList = keys.map((key) => {
      return this.$watch(`formData.${key}`, (newVal) => {
        this.hideProp = this.hideFormItem[key][newVal as any] || []
      }, { immediate: true })
    })
  }

  created() {
    this.watchProp()
    // if (!this.columns) {

    // }
  }

  beforeDestroy() {
    this.unwatchList.forEach((watch) => {
      watch()
    })
  }
}

</script>
<style lang='scss' scoped>
//@import url()
  .crud-form {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
</style>

<style lang="scss">
  .el-col-offset-14 {
    .el-form-item {
      margin-top: 18px;
      margin-bottom: 0;
    }
  }
</style>
