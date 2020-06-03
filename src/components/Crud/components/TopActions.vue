<!-- 组件说明 -->
<template>
  <div class="crud-actions-wrapper">
    <el-card
      :header="$attrs.title || '增删改查表格'"
      :body-style="{padding: '5px 10px'}"
    >
      <header class="card-wrap">
        <div class="search-wrap">
          <slot name="search" />
        </div>
        <div class="actions-wrap">
          <div class="data-actions">
            <el-button
              v-if="options.addBtn !== false && hasIdentifier(addBtn.identifier)"
              size="small"
              :type="addBtn.type ? addBtn.type : 'primary'"
              v-bind="addBtn.attributes"
              @click.stop="$emit('add-btn')"
            >
              新增
            </el-button>
            <template v-if="options.otherBtn">
              <el-button
                v-for="(button, index) in otherButton"
                :key="index"
                :type="button.type"
                v-bind="button.attributes"
                @click.stop="$emit(button.eventName || 'common-event', button.event)"
              >
                {{ button.text }}
              </el-button>
            </template>
          </div>
          <div class="table-actions">
            <el-button
              size="mini"
              round
              icon="el-icon-refresh"
              class="p1"
              @click="$emit('refresh')"
            />
            <span style="padding: 0 5px;" />
            <el-popover
              v-model="operationVisible"
              placement="bottom"
              width="350"
              title="表格展示项"
            >
              <el-select
                v-model="optionsValue"
                multiple
                size="medium"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="column in columns"
                  :key="column.prop"
                  :label="column.label"
                  :value="column.prop"
                />
              </el-select>
              <el-button
                slot="reference"
                size="mini"
                round
                icon="el-icon-s-operation"
              />
            </el-popover>
          </div>
        </div>
      </header>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit, PropSync, Inject } from 'vue-property-decorator'
import { ColumnOptions, TableColumns, TopActions } from '@/components/Crud/interfaces/table.interface'

@Component({
  name: 'CrudTopActions',
  components: {
  }
})
export default class CrudTopActions extends Vue {
  @Prop({ required: true }) columns!: TableColumns & Array<any>
  @Prop({ default: () => ({}) }) options!: TopActions
  @PropSync('showProps', { required: true, type: Array }) optionsValue!: any[]
  @Inject() readonly hasIdentifier!: Function

  get addBtn() {
    console.log(this.options)
    return this.options.addBtn || {}
  }

  get otherButton() {
    return this.options.otherBtn ? this.options.otherBtn.filter((button) => {
      console.log(button.identifier, 'otherButton')
      return this.hasIdentifier(button.identifier)
    }) : []
  }

  // show为false要展示的prop
  operationVisible: boolean = false

  created() {
  }
}

</script>
<style lang='scss'>
//@import url()
.card-wrap {
  .actions-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: auto;
  }
}
</style>
