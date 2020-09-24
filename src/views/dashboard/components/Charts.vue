<template>
  <div class="hello">
    <div id="myChart"></div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '数据统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['订单', '销售额', '注册人数', '管理员人数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '2020/09/18',
            '2020/09/19',
            '2020/09/20',
            '2020/09/21',
            '2020/09/22',
            '2020/09/23',
            '2020/09/24'
          ]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '订单',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '销售额',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '注册人数',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '管理员人数',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.hello {
  min-width: 980px;
  height: 500px;
  background-color: #fff;
  margin: 20px;
  padding: 20px;
}
#chart1 {
  width: 90%;
  height: 480px;
}
</style>
