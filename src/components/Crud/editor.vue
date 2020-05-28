<!-- 组件说明 -->
<template>
  <editor
    :init="init"
    api-key="7p382beof14jgyxgzfy3wwst7oltguc0tpyjhh4ird7hn4ds"
    v-bind="$attrs"
    @input="$emit('input', $event)"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
import Editor from '@tinymce/tinymce-vue'
import { upload } from '@/api/system'

@Component({
  name: 'CrudEditor',
  components: {
    editor: Editor
  }
})
export default class CrudEditor extends Vue {
  init = {
    // eslint-disable-next-line
    'height': '500px',
    language: 'zh_CN',
    paste_data_images: true,
    plugins: 'advcode tinycomments print preview paste importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
    imagetools_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author',
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    content_css: '//www.tiny.cloud/css/codepen.min.css',
    link_list: [
      { title: '默认', value: 'http://www.baidu.com' }
    ],
    image_list: [
      { title: '头像', value: 'https://www.google.com/logos/google.jpg' }
    ],
    image_class_list: [
      { title: 'None', value: '' },
      { title: 'Some class', value: 'class-name' }
    ],
    importcss_append: true,
    // automatic_uploads: false,
    images_upload_handler: this.uploadImage,
    file_picker_callback: function(c: Function, value: any, meta: any) {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        c('https://www.google.com/logos/google.jpg', { text: 'My text' })
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        c('https://www.google.com/logos/google.jpg', { alt: 'My alt text' })
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        c('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' })
      }
    },
    templates: [
      { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
      { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
      { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    image_caption: true,
    quickbars_image_toolbar: 'alignleft aligncenter alignright',
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link insertdatetime codesample emoticons'
  }

  uploadImage(blobInfo: any, success: Function, failure: Function) {
    const formData = new FormData()
    formData.append('file', blobInfo.blob(), blobInfo.filename())
    upload(formData).then((res) => {
      success(res.data.url)
      console.log(res, '上传成功')
    })
  }
}

</script>
<style lang='scss'>
//@import url()
  .tox-menu {
    z-index: 999999999 !important;
  }
</style>
