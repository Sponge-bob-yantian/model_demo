<template>
  <el-container>
    <el-aside :width="isCollapse ? '64px':'200px'">
      <div class="logo-head">
        <div>
          <img src="../assets/img/logo-icon.jpg" alt @click="isCollapse = !isCollapse" />
        </div>
        <span v-show="!isCollapse">外卖商家中心</span>
      </div>
      <NavMenu :bool="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/login' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="right">
          <span>欢迎你，小貂蝉</span>
          <img src="../assets/img/photo.jpeg" alt />
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from './component/NavMenu.vue'
// import Content from './component/Content.vue'
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  components: {
    NavMenu
    // Content
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #2b3c4d;
  .logo-head {
    line-height: 36px;
    display: flex;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    img {
      width: 36px;
      border-radius: 50%;
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
.el-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right {
    img {
      width: 36px;
      height: 36px;
      margin-left: 10px;
      border-radius: 50%;
    }
  }
}
.el-main {
  background: rgb(240, 240, 240);
  padding: 0;
}
</style>
