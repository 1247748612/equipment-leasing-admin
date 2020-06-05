<!-- 组件说明 -->
<template>
  <div>
    <transition name="el-zoom-in-center">
      <div class="container">
        <el-row
          type="flex"
          justify="end"
        >
          <el-button
            type="danger"
            size="small"
            @click="changePasswordShow = true"
          >
            修改密码
          </el-button>
        </el-row>
        <el-row
          type="flex"
          justify="center"
        >
          <el-image
            :src="userInfo.avatar"
            :preview-src-list="[userInfo.avatar]"
            alt="头像"
            fit="cover"
            class="avatar"
          />
        </el-row>
        <el-row
          type="flex"
          justify="center"
        >
          <div class="info-item">
            <span class="label">昵称：</span>
            <span class="value">{{ userInfo.nickname }}</span>
          </div>
        </el-row>
        <el-row
          type="flex"
          justify="center"
        >
          <div class="info-item">
            <span class="label">用户名：</span>
            <span class="value">{{ userInfo.username }}</span>
          </div>
        </el-row>
        <el-row
          type="flex"
          justify="center"
        >
          <div class="info-item">
            <span class="label">角色：</span>
            <span class="value">
              <el-tag
                v-for="role in userInfo.roles"
                :key="role._id"
              >
                {{ role.name }}
              </el-tag>
            </span>
          </div>
        </el-row>
        <el-row
          type="flex"
          justify="center"
        >
          <div class="info-item">
            <span class="label">登录IP：</span>
            <span class="value">{{ userInfo.lastLoginIp }}</span>
          </div>
        </el-row>
        <el-row
          type="flex"
          justify="center"
        >
          <div class="info-item">
            <span class="label">登录时间：</span>
            <span class="value">{{ userInfo.lastLoginTime }}</span>
          </div>
        </el-row>
        <el-row
          type="flex"
          justify="center"
        >
          <div class="identifier">
            <span class="label">权限标识符列表</span>
            <span class="value">
              <el-tag
                v-for="identifier in userInfo.permissionIdentifierList"
                :key="identifier"
              >
                {{ identifier }}
              </el-tag>
            </span>
          </div>
        </el-row>
      </div>
    </transition>
    <crud-dialog :visible.sync="changePasswordShow">
      <crud-form
        :columns="columns"
        @save="changePassword"
      />
    </crud-dialog>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { CrudDialog, CrudForm } from '@/components/Crud'
import { changePassword } from '../../api/users'

@Component({
  name: 'Info',
  components: {
    CrudDialog,
    CrudForm
  }
})
export default class Info extends Vue {
  changePasswordShow = false

  columns = [
    {
      type: 'password',
      prop: 'password',
      label: '原密码',
      attributes: {
        type: 'password'
      },
      span: 24
    },
    {
      type: 'password',
      prop: 'newPassword1',
      label: '新密码',
      attributes: {
        type: 'password'
      },
      span: 24
    },
    {
      type: 'password',
      prop: 'newPassword2',
      label: '确认密码',
      attributes: {
        type: 'password'
      },
      span: 24
    }
  ]
  get userInfo() {
    return UserModule.info
  }

  changePassword(form, done) {
    const loading = this.$loading()
    console.log(form, loading)
    changePassword(form).then((res) => {
      loading.close()
      UserModule.LogOut()
      this.$message.success(res.message)
    }).catch((err) => {
      loading.close()
      this.$message.error(err.error)
      console.log(err)
    })
  }
}

</script>

<style lang='scss' scoped>
//@import url()
.container {
  margin: 0 auto;
  padding: 20px;
  max-width: 666px;
  .avatar {
    display: inline-block;
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
  .info-item {
    display: flex;
    width: 100%;
    font-size: 18px;
    padding: 5px;
    justify-content: center;
    align-items: center;
    .label {
      display: inline-block;
      text-align: left;
      width: 100px;
      color: #333;
      font-weight: bold;
    }
    .value {
      flex: 1;
      color: #333;
    }
  }
  .identifier{
    width: 100%;
    .label {
      width: 100%;
      display: block;
      text-align: center;
      font-size: 28px;
      padding: 10px;
    }
    .value {
      display: grid;
      grid-template-columns: repeat(auto-fit, 150px);
      grid-gap: 20px;
      justify-content: space-around;
    }
  }
}
</style>
