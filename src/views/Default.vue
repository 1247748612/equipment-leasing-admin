<template>
  <div class="default-container">
    <h1 style="text-align: center">
      {{ title }}默认页面
    </h1>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'DefaultPage'
})
export default class DefaultPage extends Vue {
  get title() {
    return this.$route.meta.title
  }
}
</script>
