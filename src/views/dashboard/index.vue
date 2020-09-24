<template>
  <div>
    <MyCard :dataList="CardList" />
    <MyCharts />
  </div>
</template>

<script>
import MyCard from './components/card.vue'
import MyCharts from './components/Charts.vue'
import { getAccountInfo } from '@/api/account.js'
import { getTotal } from '@/api/order.js'
import local from '@/utils/local.js'

export default {
  components: {
    MyCard,
    MyCharts
  },
  data() {
    return {
      CardList: [
        { id: 1, title: '总订单', icon: 'icon-wenjian', num: '102,400' },
        { id: 2, title: '总销售额', icon: 'icon-Dollar', num: '102,400' },
        { id: 3, title: '今日订单数', icon: 'icon-renwu', num: '102,400' },
        { id: 4, title: '今日销售额', icon: 'icon-renminbi', num: '102,400' }
      ],
      info: {},
      todayOrder: '',
      totalAmount: '',
      totalOrder: '',
      totayAmount: ''
    }
  },
  created() {
    this.getInfo()
    this.getTotalData()
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
    },
    async getTotalData() {
      const data = await getTotal()
      this.todayOrder = data.todayOrder
      this.totalAmount = data.totalAmount
      this.totalAmount = data.totalAmount
      this.totalOrder = data.totalOrder
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
    margin: 20px 0 20px 20px;
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
