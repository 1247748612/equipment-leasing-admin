<template>
  <div
    class="menu-container"
  >
    <h3>{{ $route.meta.title || '默认标题' }}</h3>
    <avue-crud
      ref="crud"
      class=""
      :option="option"
      :data="data"
      :page.sync="page"
      @on-load="getDicts"
      @row-update="updateRow"
      @row-del="deleteRow"
      @row-save="saveRow"
      @row-dblclick="dblclickRow"
      @refresh-change="getDicts"
      @selection-change="(selection) => selectionData = selection"
    >
      <!-- 自定义菜单左 -->
      <template slot="menuLeft">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-delete"
          @click="deleteSelectionDict"
        >
          删除已选
        </el-button>
      </template>

      <!-- 自定义类型列 -->
      <template
        slot="typeId"
        slot-scope="scope"
      >
        {{ getTypeName(scope.row.typeId) }}
      </template>

      <!-- 自定义类型From -->
      <template
        slot="typeIdForm"
        slot-scope="scope"
      >
        <el-select
          v-model="scope.row.typeId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in dictTypesOptions"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
          />
        </el-select>
      </template>

      <template slot="empty">
        <avue-empty
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          desc="暂无数据"
        >
          <br>
          <el-button
            type="primary"
            @click="handleAdd"
          >
            新增数据
          </el-button>
        </avue-empty>
      </template>
    </avue-crud>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { deleteDicts, createDicts, updateDicts, getDicts, getDictTypesList } from '@/api/dicts'

@Component({
  name: 'DictionaryManager'
})
export default class Menu extends Vue {
  private data = [] // Crud默认展示数据
  private dictTypesOptions: any = [] // 单选框提供选项
  // 菜单树参数

  // 分页
  private page = {
    total: 200,
    pageSize: 10,
    page: 1,
    background: true
  }

  private selectionData = []

  private option: object = {
    selection: true,
    dialogWidth: '30%',
    title: '用户管理',
    translate: false,
    stripe: true,
    align: 'center',
    // menuWidth: 200,
    saveBtnTitle: '添加菜单',
    column: [
      {
        label: '字典id',
        prop: 'id',
        display: false,
        hide: true
      },
      {
        label: '类型id',
        prop: 'typeId',
        formslot: true,
        slot: true,
        span: 24,
        rules: [
          { required: true, message: '必须选择类型', trigger: 'blur' }
        ]
      },
      {
        label: '名称',
        prop: 'name',
        span: 24,
        rules: [
          { required: true, message: '必须输入名称', trigger: 'blur' }
        ]
      }, {
        label: '对应值',
        span: 24,
        prop: 'value',
        placeholder: '请输入对应的值',
        rules: [
          { required: true, message: '必须填写值', trigger: 'blur' }
        ]
      },
      {
        label: '描述',
        prop: 'explanation',
        span: 24
      }
    ]
  }
  // 获取typeName
  getTypeName(id: any) {
    for (let item of this.dictTypesOptions) {
      if (item.id === id) {
        return item.typeName
      }
    }
  }

  // 没有数据时的新增
  handleAdd() {
    const crud: any = this.$refs.crud
    crud.rowAdd()
  }

  // 删除此行数据
  deleteRow(row?: any, index?: number) {
    this.$confirm(`此操作将会删除${row.name}, 是否继续?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async() => {
      const params = [row.id]
      try {
        const { message, data } = await deleteDicts(params)
        this.$message.success(message)
        this.getDicts()
      } catch {
        this.$message.success('删除失败')
      }
    })
  }

  // 多选删除
  deleteSelectionDict() {
    if (!this.selectionData.length) {
      this.$message.warning('请先选择要删除的行')
      return
    }
    this.$confirm(`此操作将会删除选中的行, 是否继续?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async() => {
      const params = this.selectionData.map((item: any) => item.id)
      try {
        const { message, data } = await deleteDicts(params)
        this.$message.success(message)
        this.getDicts()
      } catch {
        this.$message.error('删除失败')
      }
    })
    console.log(this.selectionData)
  }

  // 保存新增信息
  async saveRow(row: any, done: Function, loading: Function) {
    try {
      const { message, data } = await createDicts(row)
      this.$message.success(message)
      this.getDicts()
    } catch {
      this.$message.error('保存失败')
    }
    done()
  }

  // 编辑保存执行方法
  async updateRow(row: any, index: number, done: Function, loading: boolean) {
    loading = true
    try {
      const { message, data } = await updateDicts(row)
      this.$message.success(message)
      this.getDicts()
    } catch (error) {
      this.$message.error('更新失败')
    }
    done()
  }

  // 双击行
  async dblclickRow(row: any, column: any) {
  }

  // 获取字典
  async getDicts(page?: any) {
    try {
      const params = {
        rows: (page && page.pageSize) || this.page.pageSize,
        page: (page && page.page) || this.page.page
      }
      const { data } = await getDicts(params)
      this.data = data.records
      this.page.total = data.total
    } catch (error) {
      this.$message.error('获取角色数据失败')
      console.log(error, '错误')
    }
  }

  // 获取所有字典类型
  async getDictTypesList() {
    try {
      const { message, data } = await getDictTypesList()
      console.log(this.dictTypesOptions)
      console.log(data, 'getDictTypesList')
      this.dictTypesOptions = data
    } catch (error) {
      this.$message.error('获取角色失败')
      console.log('error', '错误')
    }
  }

  created() {
    this.getDictTypesList()
  }
}

</script>

<style lang="scss" scope>
  .icon-from-style {
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-input {
      margin-right: 50px;
    }
  }
  .menu-container {
    margin: 0 20px;
    .header {

    }
  }
  .tree-button {
    padding: 10px 40px 0;
    display: flex;
    justify-content: center;
  }

</style>
