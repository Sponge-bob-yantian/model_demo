<template>
  <div>
    <panel>
      <template #head>
        <div class="cate">
          <h3>商品分类</h3>
          <el-button type="primary" size="mini">添加分类</el-button>
        </div>
      </template>
      <template #content>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="序号" width="180"></el-table-column>
          <el-table-column prop="name" label="商品分类" width="450">
            <template slot-scope="row">
              <el-input placeholder="请输入内容" v-show="row.row.show" v-model="row.row.name"></el-input>
              <span v-show="!row.row.show">{{row.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否启用">
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <el-button plain>编辑</el-button>
            <el-button type="danger">删除</el-button>
          </el-table-column>
        </el-table>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/index.vue'
export default {
  components: {
    panel
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '乌鸡白凤丸',
          tab1: '111',
          tab2: '2222',
          show: true
        },
        {
          id: 2,
          name: '六味地黄丸',
          tab1: '111',
          tab2: '2222',
          show: true
        },
        {
          id: 3,
          name: '脑白金',
          tab1: '111',
          tab2: '2222',
          show: true
        },
        {
          id: 4,
          name: '六个核桃',
          tab1: '111',
          tab2: '2222',
          show: true
        },
        {
          id: 5,
          name: '天地一号',
          tab1: '111',
          tab2: '2222',
          show: true
        }
      ],
      value: true
    }
  }
}
</script>

<style lang="less" scoped>
.cate {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
