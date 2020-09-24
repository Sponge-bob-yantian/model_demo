<template>
  <div>
    <panel>
      <template #head>
        <div class="info">
          <h3>管理员信息</h3>
          <el-button type="primary" size="mini" @click="upload">修改头像</el-button>
        </div>
      </template>

      <template #content>
        <div class="content">
          <span>管理员ID:</span>
          &emsp;{{ info.id }}
          <el-divider></el-divider>
          <span>账号:</span>
          &emsp;{{ info.account }}
          <el-divider></el-divider>
          <span>用户组:</span>
          &emsp;{{ info.userGroup }}
          <el-divider></el-divider>
          <span>创建时间:</span>
          &emsp;{{ info.ctime|fmtDate }}
          <el-divider></el-divider>
          <div class="pic">
            <span>管理员头像:</span>&emsp;
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/users/avatar_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/index.vue'
import local from '@/utils/local.js'
import { getAccountInfo, picEdit } from '@/api/account.js'
export default {
  data() {
    return {
      info: {},
      imageUrl: '',
      save: ''
    }
  },
  components: {
    panel
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const data = await getAccountInfo()
      this.info = {
        id: data.accountInfo.id,
        account: data.accountInfo.account,
        userGroup: data.accountInfo.userGroup,
        ctime: data.accountInfo.ctime,
        imgUrl: data.accountInfo.imgUrl
      }
      local.set('imgUrl', this.info.imgUrl)
      // console.log(data.accountInfo.imgUrl)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.save = res.imgUrl
    },

    async beforeAvatarUpload(file) {
      var arr = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      const isJPG = arr.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/jpeg/png/webp 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async upload() {
      const data = await picEdit({
        imgUrl: this.save
      })
      if (data.code === 0) {
        // console.log(data)
        location.reload()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  font-size: 14px;
  letter-spacing: 2px;
  span {
    display: inline-block;
    width: 100px;
    text-align: right;
    margin-right: 20px;
  }
}
.info {
  display: flex;
  justify-content: space-between;
}
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-left: 10px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.pic {
  display: flex;
}
</style>
