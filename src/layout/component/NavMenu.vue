<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#2b3c4d"
    text-color="#fff"
    active-text-color="#66b1ff"
    :collapse="bool"
    :collapse-transition="false"
    :router="true"
  >
    <el-menu-item index="/dashboard">
      <i class="iconfont icon-shouye"></i>&emsp;&emsp;
      <span slot="title">后台首页</span>
    </el-menu-item>
    <el-menu-item index="/ordermag">
      <i class="iconfont icon-icon-"></i>&emsp;&emsp;
      <span slot="title">订单管理</span>
    </el-menu-item>
    <el-submenu index="product">
      <template slot="title">
        <i class="iconfont icon-shangpin"></i>&emsp;&emsp;
        <span>商品管理</span>
      </template>
      <el-menu-item index="/product/list">商品列表</el-menu-item>
      <el-menu-item index="/product/add">商品添加</el-menu-item>
      <el-menu-item index="/product/cate">商品分类</el-menu-item>
    </el-submenu>
    <el-menu-item index="/store">
      <i class="iconfont icon-dianpu"></i>&emsp;&emsp;
      <span slot="title">店铺管理</span>
    </el-menu-item>
    <el-submenu index="/account">
      <template slot="title">
        <i class="iconfont icon-shangpin"></i>&emsp;&emsp;
        <span>账号管理</span>
      </template>
      <el-menu-item index="/account/list">账号列表</el-menu-item>
      <el-menu-item index="/account/add">添加账号</el-menu-item>
      <el-menu-item index="/account/change">修改密码</el-menu-item>
    </el-submenu>
    <el-submenu index="/salecount">
      <template slot="title">
        <i class="iconfont icon-tongji"></i>&emsp;&emsp;
        <span>销售统计</span>
      </template>
      <el-menu-item index="/salecount/commodity">商品统计</el-menu-item>
      <el-menu-item index="/salecount/orders">订单统计</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  props: {
    bool: {
      type: Boolean,
      default: true
    }
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
.el-menu {
  border: 0;
  .iconfont {
    color: #fff;
  }
}
</style>
