<template>
  <i
    class="icon-wrap"
  >
    <template v-if="iconType">
      <svg-icon :name="name" />
    </template>
    <template v-else>
      <i
        :class="name"
        class="iconfont"
      />
    </template>
  </i>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'SidebarIcon',
  components: {
  }
})
export default class SidebarIcon extends Vue {
  @Prop({ type: String }) name!: string

  get iconType() {
    if (this.name.startsWith('el') || this.name.startsWith('icon')) {
      return 0
    } else {
      return 1
    }
  }
}
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
  i {
    color: #fff;
  }
</style>
