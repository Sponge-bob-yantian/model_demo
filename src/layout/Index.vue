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
        <Header />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from './component/NavMenu.vue'
import Header from './component/Header.vue'
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  components: {
    NavMenu,
    Header
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
  height: 100%;
}
.el-main {
  height: 100%;
  background: rgb(240, 240, 240);
  padding: 0;
}
</style>
