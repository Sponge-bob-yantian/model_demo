<template>
  <div class="head">
    <div class="left">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="item in breadcrumbList"
          :key="item.title"
          :to="{ path: item.path }"
        >{{ item.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown :hide-on-click="false" @command="handleCommand">
        <span>
          <span>
            欢迎你,
            <span class="el-dropdown-link">{{this.name}}</span>
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="mine">个人中心</el-dropdown-item>
          <el-dropdown-item command="exit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="demo-basic-circle" @click="getInfo">
        <div class="block">
          <el-avatar :size="30" :fit="fit" :src="imgUrl"></el-avatar>
        </div>
      </div>
      <!-- <img src="../../assets/img/photo.jpeg" alt /> -->
    </div>
  </div>
</template>

<script>
import local from '@/utils/local.js'

export default {
  data() {
    return {
      circleUrl: require('../../assets/img/photo.jpeg'),
      breadcrumbList: [],
      info: {},
      name: '',
      imgUrl: '',
      fit: 'fill'
    }
  },
  created() {
    this.showRouter()
    this.name = local.get('admin')
    this.imgUrl = local.get('imgUrl')
  },
  methods: {
    showRouter() {
      const arr = [{ title: '首页', path: '/dashboard' }]
      this.$route.matched.forEach((item) => {
        if (item.meta && item.meta.title) {
          arr.push({
            title: item.meta.title,
            path: item.path
          })
        }
      })
      this.breadcrumbList = arr
    },
    getInfo() {
      this.$router.push('/info')
    },
    handleCommand(command) {
      if (command === 'mine') {
        this.getInfo()
      } else if (command === 'exit') {
        local.clear()
        this.$router.push('/login')
      }
    }
  },
  watch: {
    '$route.path'() {
      this.showRouter()
    }
  }
}
</script>

<style lang="less" scoped>
.head {
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right {
    display: flex;
    align-items: center;
    width: 200px;
    img {
      width: 36px;
      height: 36px;
      margin-left: 10px;
      border-radius: 50%;
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demo-basic-circle {
  margin-left: 20px;
  cursor: pointer;
}
</style>
