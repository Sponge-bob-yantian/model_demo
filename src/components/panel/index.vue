<template>
  <el-card>
    <div class="head">
      <slot name="head"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </el-card>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.el-card {
  margin: 20px;
}
/deep/ .el-card__body {
  padding: 0;
}
.head {
  font-size: 20px;
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
.content {
  padding: 20px;
}
</style>
