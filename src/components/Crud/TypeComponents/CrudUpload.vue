<!-- 组件说明 -->
<template>
  <span>
    <template v-if="!form">
      <el-image
        style="width: 100px; height: 100px"
        :src="value"
        :fit="fit"
        :preview-src-list="[value]"
      />
    </template>
    <template v-else>
      <!-- action="http://127.0.0.1:8080/api-dev/upload" -->
      <el-upload
        class="avatar-uploader"
        :http-request="httpRequest"
        action="qweqw"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="modelValue"
          :src="modelValue"
          class="avatar"
        >
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        />
      </el-upload>
    </template>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ColumnOptions } from '@/components/Crud/interfaces/table.interface'
import { CrudTypeMixin } from './mixins/model'
import { upload } from '@/api/system'

@Component({
  name: 'CrudUpload'
})
export default class CrudUpload extends CrudTypeMixin {
  get fit() {
    return (this.attributes && this.attributes.fit) || 'cover'
  }

  handleAvatarSuccess(...rest: any) {
    console.log(rest, 'beforeAvatarUpload')
  }
  beforeAvatarUpload(...rest: any) {
    console.log(rest, 'beforeAvatarUpload')
  }
  httpRequest(params: any) {
    const form = new FormData()
    form.append('file', params.file)
    upload(form).then((res) => {
      if (res.data) {
        this.modelValue = res.data.url
        console.log('上传之后', res.data)
      }
    })
    console.log('上传文件', params)
  }
}

</script>
<style lang='scss'>
//@import url()
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>
