<template>
  <div>
    <div v-html="articleData.content" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getArticle } from '@/api/articles'

@Component({
  name: 'PreviewArticle'
})
export default class PreviewArticle extends Vue {
  @Prop() id!: string
  articleData = {}

  getArticle() {
    getArticle(this.id).then((res) => {
      this.articleData = res.data
      console.log(res, '单独文章')
    }).catch((err) => {
      console.log(err, '单独文章报错')
    })
  }

  created() {
    this.getArticle()
  }
}
</script>
