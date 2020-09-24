<template>
  <div>
    <panel>
      <template #head>
        <span>修改订单</span>
      </template>
      <template #content> 显示表单修改订单发送请求 </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/index.vue'
import { getDetail } from '@/api/order.js'

export default {
  components: {
    panel
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  created() {
    // console.log(this.$route.params.id)
    // console.log(this.id)
    this.getDetail(this.id - 0)
  },
  methods: {
    async getDetail(id) {
      const data = await getDetail({ id })
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped></style>
