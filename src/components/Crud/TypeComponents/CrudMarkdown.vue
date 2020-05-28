<!-- 组件说明 -->
<template>
  <div>
    <template v-if="form !== true">
      <el-link @click="visible = true">
        点击查看
      </el-link>
      <el-dialog :visible.sync="visible">
        <!-- <div v-html="value" /> -->
        <markdown v-model="modelValue" />
      </el-dialog>
    </template>
    <template v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
import { upload } from '@/api/system'
import { CrudTypeMixin } from './mixins/model'
import markdown from '../markdown.vue'

@Component({
  name: 'CrudMarkdown',
  components: {
    markdown
  }
})
export default class CrudMarkdown extends CrudTypeMixin {
  // @Model() value: any = ''
  visible: boolean = false // 查看原文

  uploadImage(blobInfo: any, success: Function, failure: Function) {
    const formData = new FormData()
    formData.append('file', blobInfo.blob(), blobInfo.filename())
    upload(formData).then((res) => {
      success(res.data.url)
      console.log(res, '上传成功')
    })
  }

  toRead() {
    console.log('去看')
  }

  mounted() {
    console.log(this.$refs.editor, 'editor')
  }
}

</script>
<style lang='scss'>
//@import url()
  .tox-menu {
    z-index: 999999999 !important;
  }
</style>
