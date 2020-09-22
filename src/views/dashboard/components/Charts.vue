<template>
  <div class="hello">
    <div id="chart1"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {}
  },
  mounted() {
    this.$chart.line1('chart1')
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
