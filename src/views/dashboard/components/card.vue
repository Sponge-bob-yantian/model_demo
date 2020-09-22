<template>
  <div class="parts">
    <div v-for="(item, i) in dataList" :key="item.id">
      <i :class="'iconfont '+item.icon" :style="{ color : colorArr[i]}"></i>
      <div>
        <p>{{ item.title}}</p>
        <span>{{item.num}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      colorArr: ['#1296db', '#d4237a', '#1296db', '#19fa29']
    }
  }
}
</script>

<style lang="less" scoped>
.parts {
  display: flex;
  justify-content: space-around;
  > div {
    width: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px 20px 50px;
    background-color: #fff;
    margin: 20px;
    border-radius: 10px;
    i {
      font-size: 50px;
      font-weight: bold;
    }
    > div {
      text-align: center;
      p {
        color: gray;
        font-size: 18px;
      }
      span {
        font-weight: bold;
        margin-top: 5px;
        font-size: 16px;
      }
    }
  }
}
</style>
