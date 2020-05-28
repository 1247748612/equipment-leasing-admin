<!-- 组件说明 -->
<template>
  <div>
    <crud-table
      :options="tableOptions.options"
      :columns="tableOptions.columns"
      :rules="tableOptions.rules"
      :permission="tableOptions.permission"
      :data="tableData"
      @edit-event="editBtn"
      @add-event="addBtn"
      @del-event="delBtn"
      @load-data="loadData"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ColumnOptions, MenuColumn } from '@/components/Crud/interfaces/table.interface'
import { upload } from '@/api/system'
import { ArticleTableOptions } from '../constant/article'
import CrudTable from '@/components/Crud/index.vue'
import { createArticle, getArticleAll, deleteArticles, updateArticle } from '@/api/articles'
import { UserModule } from '../../../store/modules/user'

@Component({
  name: 'Article',
  components: {
    CrudTable
  }
})
export default class Article extends ArticleTableOptions {
  value: any = ''
  tableData: any = []

  editBtn(row: any, loading: Function, done: Function) {
    loading()
    updateArticle(row._id, row).then((res) => {
      done()
      loading()
      this.loadData()
      this.$message.success(res.message as any)
    }).catch((err) => {
      console.log(err)
      this.$message.error(err.errMessage)
      loading()
    })
  }

  addBtn(row: any, loading: Function, done: Function) {
    loading()
    createArticle(row).then((res) => {
      done()
      loading()
      this.loadData()
      this.$message.success(res.message)
    }).catch((err) => {
      console.log(err)
      this.$message.error(err.errMessage)
      loading()
    })
  }

  delBtn(row: any, loading: Function, done: Function) {
    const message = `是否要删除${row.title}`
    this.$confirm(message, '确认信息', {
      distinguishCancelAndClose: true,
      confirmButtonText: '删除',
      cancelButtonText: '放弃'
    })
      .then(() => {
        loading()
        deleteArticles({
          articleIds: [row._id]
        }).then((res) => {
          this.$message.success(res.message.toString())
          this.loadData()
          loading()
        }).catch((err) => {
          this.$message.error(err.errMessage)
          loading()
        })
      })
  }

  async loadData(loading?: Function) {
    loading && loading()
    const params = {
      // limit: this.pagination.limit,
      // page: this.pagination.page
    }

    getArticleAll(params).then((res) => {
      // this.tableData = res.data.data
      this.tableData = res.data
      // this.pagination.total = res.data.pagination && res.data.pagination.total
      this.$message.success(res.message)
      loading && loading()
    }).catch((err) => {
      loading && loading()
      console.log(err)
    })
  }

  created() {
    this.getTableOptions()
    const menuColumn: MenuColumn = {
      otherBtn: [
        {
          text: '预览',
          attributes: {
            type: 'text',
            size: 'small'
          },
          event: ({ row }: { row: any }) => {
            this.$router.push({ path: `/previewArticle/${row._id}` })
          }
        }
      ]
    }
    this.setOptions({
      menuColumn
    })
    this.setPermission(UserModule.permission)
  }
}

</script>
<style lang='scss' scoped>
//@import url()
</style>
