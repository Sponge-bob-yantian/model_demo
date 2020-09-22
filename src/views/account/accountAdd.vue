<template>
  <div>
    <panel>
      <template #head>
        <h3>添加账号</h3>
      </template>

      <template #content>
        <div>
          <el-form
            :model="accountAdd"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="uname">
              <el-input v-model="accountAdd.uname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input type="password" v-model="accountAdd.pwd"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select
                v-model="accountAdd.group"
                placeholder="请选择用户权限"
              >
                <el-option label="普通管理员" value="普通管理员"></el-option>
                <el-option label="超级管理员" value="超级管理员"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >提交</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '../../components/panel/index.vue'
import { addAccount } from '@/api/account.js'
export default {
  components: {
    panel
  },
  data() {
    return {
      accountAdd: {
        uname: '',
        pwd: '',
        group: ''
      },
      rules: {
        uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { code } = await addAccount({
            account: this.accountAdd.uname,
            password: this.accountAdd.pwd,
            userGroup: this.accountAdd.group
          })
          if (code === 0) {
            this.$refs[formName].resetFields()
            setTimeout(() => {
              this.$router.push('/account/list')
            }, 1000)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  .el-input {
    width: 300px;
  }
  .el-select {
    width: 300px;
  }
}
</style>
