<!-- 组件说明 -->
<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogShow"
      v-bind="attribute"
      v-on="$listeners"
    >
      <slot />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Model, Provide, ProvideReactive } from 'vue-property-decorator'
import { ColumnOptions } from '@/components/Crud/interfaces/table.interface'

@Component({
  name: 'CrudDialog'
})
export default class CrudDialog extends Vue {
  @Prop({ default: '增删改查表单' }) title!: string
  @Prop({ default: () => ({}) }) dialogAttribute!: any
  @PropSync('visible', { required: true }) dialogShow!: boolean
  @Provide() closeDialog() {
    this.dialogShow = false
  }

  get attribute() {
    return Object.assign({}, this.dialogAttribute, {
      width: this.dialogAttribute.width || '60%',
      'close-on-press-escape': this.dialogAttribute['close-on-press-escape'] || false
    })
  }
}

</script>
<style lang='scss'>
//@import url()
  .el-dialog__wrapper {
    z-index: 1031 !important;
  }
  .v-modal {
    z-index: 1030 !important;
  }
</style>
