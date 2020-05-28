<!-- 组件说明 -->
<template>
  <div>
    <template v-if="!form">
      <el-link @click="visible = true">
        点击查看
      </el-link>
      <el-dialog :visible.sync="visible">
        <div v-html="value" />
      </el-dialog>
    </template>
    <template v-else>
      <editor
        v-model="modelValue"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
import Editor from '../editor.vue'
import { upload } from '@/api/system'
import { CrudTypeMixin } from './mixins/model'

@Component({
  name: 'CrudEditor',
  components: {
    editor: Editor
  }
})
export default class CrudEditor extends CrudTypeMixin {
  // @Model() value: any = ''
  visible: boolean = false // 查看原文

  toRead() {
    console.log('去看')
  }

  mounted() {
    console.log(this.$refs.editor, 'editor')
  }
}

</script>
<style lang='scss'>
</style>
