<template>
  <div>
    <panel>
      <template #head>
        <h3>修改密码</h3>
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
            <el-form-item label="原密码" prop="pwd">
              <el-input type="password" v-model="accountAdd.pwd"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new">
              <el-input type="password" v-model="accountAdd.new"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="affirm">
              <el-input type="password" v-model="accountAdd.affirm"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/index.vue'
import local from '@/utils/local.js'
import { pwdReg } from '../../utils/validate.js'
import { checkOldPwd, editPassword } from '../../api/account.js'

export default {
  components: {
    panel
  },
  data() {
    // 自定义校验规则
    const validatePass = async (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        const data = await checkOldPwd({ oldPwd: this.accountAdd.pwd })
        if (data.code === '00') {
          callback()
        } else {
          callback(new Error('原密码错误,请重新输入!'))
        }
      }
    }
    const validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!pwdReg.test(value)) {
        callback(new Error('只能输入6-20个字母、数字、下划线'))
      } else {
        if (this.accountAdd.affirm !== '') {
          this.$refs.ruleForm.validateField('affirm')
        }
        callback()
      }
    }
    // 确认密码
    const checkValidatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空'))
      } else if (value !== this.accountAdd.new) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    return {
      accountAdd: {
        pwd: '',
        new: '',
        affirm: ''
      },
      rules: {
        pwd: [{ validator: validatePass, trigger: 'blur' }],
        new: [{ validator: validatePass1, trigger: 'blur' }],
        affirm: [{ validator: checkValidatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { code } = await editPassword({ newPwd: this.accountAdd.new })
          if (code === 0) {
            this.$refs[formName].resetFields()
            local.remove('tk')
            setTimeout(() => {
              this.$router.push('/login')
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
