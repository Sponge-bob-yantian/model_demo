<template>
  <div class="login-box">
    <div class="login-inner">
      <h2>登录系统</h2>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="demo-loginForm">
        <el-form-item prop="uname">
          <el-input
            type="text"
            v-model="loginForm.uname"
            autocomplete="off"
            prefix-icon="iconfont icon-yonghu"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            :type="flagEye ? 'password' : 'text'"
            v-model="loginForm.pass"
            autocomplete="off"
            prefix-icon="iconfont icon-mima"
          >
            <i
              slot="suffix"
              class="iconfont"
              :class="flagEye ? 'icon-eyes' : 'icon-eyes-'"
              @click="changeEye"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="btns">
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/account.js'
import local from '@/utils/local.js'

export default {
  data() {
    return {
      loginForm: {
        uname: '',
        pass: ''
      },
      rules: {
        uname: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      },
      flagEye: true
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { code, msg, token } = await login({
            account: this.loginForm.uname,
            password: this.loginForm.pass
          })
          if (code === 0) {
            /* this.$message({
              message: msg,
              type: 'success',
              duration: 2000
            }) */
            local.set('admin', this.loginForm.uname)
            local.set('tk', token)
            setTimeout(() => {
              this.$router.push('/')
            }, 1000)
          } else if (code === 1) {
            this.$message({
              message: msg,
              type: 'error',
              duration: 2000
            })
          }
        } else {
          this.$message({
            message: '用户名或密码错误',
            type: 'error',
            duration: 2000
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    changeEye() {
      this.flagEye = !this.flagEye
    }
  }
}
</script>

<style lang="less" scoped>
.login-box {
  height: 100%;
  background-color: #2b3c4d;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-inner {
    width: 400px;
    // height: 500px;
    padding: 300px 100px 20px 100px;
    background: url('../../assets/img/apic27511.jpg') no-repeat;
    background-size: 100% 100%;
    background-attachment: fixed;
    h2 {
      color: rgb(31, 69, 104);
      font-size: 24px;
      text-align: center;
      letter-spacing: 5px;
      margin-bottom: 30px;
    }
    .btns {
      text-align: center;
    }
    .demo-loginForm {
      .el-input {
        position: relative;
        i {
          position: absolute;
          right: 30px;
        }
      }
    }
  }
}
/deep/ .el-input__inner {
  background-color: #2d3a4b;
}
</style>
