<!-- 组件说明 -->
<template>
  <span>
    <mavon-editor
      ref="mavon"
      @imgAdd="uploadImage"
      @input="$emit('input', $event)"
    />
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Ref } from 'vue-property-decorator'
import { upload } from '@/api/system'

@Component({
  name: 'CrudMarkdown',
  components: {
  }
})
export default class CrudMarkdown extends Vue {
  @Ref() mavon!: any

  uploadImage(pos: any, file: any) {
    // 第一步.将图片上传到服务器.
    var formdata = new FormData()
    formdata.append('file', file)
    upload(formdata).then((res) => {
      // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
      this.mavon.$img2Url(pos, res.data.url)
    })
  }

  mounted() {
  }
}

</script>
<style lang='scss'>
//@import url()
  .tox-menu {
    z-index: 999999999 !important;
  }
</style>
