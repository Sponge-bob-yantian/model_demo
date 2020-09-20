<template>
  <div>
    <div class="parts">
      <div>
        <i class="iconfont icon-wenjian skyblue"></i>
        <div>
          <p>总订单</p>
          <span>102,400</span>
        </div>
      </div>
      <div>
        <i class="iconfont icon-Dollar red"></i>
        <div>
          <p>总销售额</p>
          <span>102,400</span>
        </div>
      </div>
      <div>
        <i class="iconfont icon-renwu skyblue"></i>
        <div>
          <p>今日订单数</p>
          <span>102,400</span>
        </div>
      </div>
      <div class="last">
        <i class="iconfont icon-renminbi green"></i>
        <div>
          <p>今日销售额</p>
          <span>102,400</span>
        </div>
      </div>
    </div>
    <div class="hello">
      <chart ref="chart1" :options="option" :auto-resize="true"></chart>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      option: {}
    }
  },
  mounted() {
    this.option = {
      title: {
        text: '折线图堆叠'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      grid: {
        left: '10%',
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
          '2019/10/18',
          '2019/10/19',
          '2019/10/20',
          '2019/10/21',
          '2019/10/22',
          '2019/10/23',
          '2019/10/24'
        ]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
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
  .last {
    margin-right: 20px;
  }
  .skyblue {
    color: #1296db;
  }
  .red {
    color: #d4237a;
  }
  .green {
    color: #19fa29;
  }
  .gray {
    color: gray;
  }
}
</style>
