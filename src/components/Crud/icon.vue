<template>
  <i
    class="icon-wrap"
  >
    <template v-if="iconType === 1">
      <svg-icon :name="name" />
    </template>
    <template v-else-if="iconType === 0">
      <i
        :class="name"
        class="iconfont"
        :style="style"
      />
    </template>
    <template v-else-if="iconType === 3">
      <i
        class="el-icon-plus"
        :style="style"
      />
    </template>
  </i>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'ShowIcon',
  components: {
  }
})
export default class ShowIcon extends Vue {
  @Prop({ type: String }) name!: string
  @Prop({ type: String }) color!: string

  get style() {
    if (this.color) {
      return { color: this.color }
    } else {
      return {}
    }
  }

  get iconType() {
    if (this.name === '') {
      return 3
    }
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

  // i {
  //   color: #fff;
  // }
</style>
