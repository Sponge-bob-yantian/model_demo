<template>
  <div>
    <panel>
      <template #head>
        <h3>管理员信息</h3>
      </template>

      <template #content>
        <div>
          <span>管理员ID: &emsp;{{ info.id }}</span>
          <el-divider></el-divider>
          <span>账号: &emsp;{{ info.account }}</span>
          <el-divider></el-divider>
          <span>用户组: &emsp;{{ info.userGroup }}</span>
          <el-divider></el-divider>
          <span>创建时间: &emsp;{{ info.ctime|fmtDate }}</span>
          <el-divider></el-divider>
          <span>
            管理员头像: &emsp;
            <img :src="info.imgUrl" alt />
          </span>
        </div>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/index.vue'
import local from '@/utils/local.js'
import { getAccountInfo } from '@/api/account.js'
export default {
  data() {
    return {
      info: {}
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
    }
  }
}
</script>

<style lang="less" scoped></style>
