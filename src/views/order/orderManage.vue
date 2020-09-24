<template>
  <el-card>
    <!-- 搜索表单 -->
    <el-form
      :inline="true"
      :model="searchForm"
      ref="searchRef"
      class="demo-form-inline"
      size="mini"
    >
      <el-form-item label="订单号">
        <el-input v-model="searchForm.orderNum" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input
          v-model="searchForm.consignee"
          placeholder="收货人"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchForm.tel" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="searchForm.state" placeholder="订单状态">
          <el-option label="已受理" value="已受理"></el-option>
          <el-option label="未受理" value="未受理"></el-option>
          <el-option label="派送中" value="派送中"></el-option>
          <el-option label="已完成" value="已完成"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchForm.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格功能 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="orderNo" label="订单号" width="150">
      </el-table-column>
      <el-table-column label="下单时间" width="200">
        <template v-slot="{ row }">
          <span>{{ row.orderTime | fmtDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="120">
      </el-table-column>
      <el-table-column prop="consignee" label="收货人" width="120">
      </el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="300">
      </el-table-column>
      <el-table-column label="送达时间" width="200">
        <template v-slot="{ row }">
          <span>{{ row.deliveryTime | fmtDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="200">
      </el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="120">
      </el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template v-slot="{ row }">
          <el-button @click="handleClick(row.id)" type="text" size="small"
            >查看</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="$router.push('/ordermag/edit/' + row.id)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 查看模态框 -->
    <el-dialog title="查看当前的订单" :visible.sync="dialogVisible" width="50%">
      <div class="item">
        <p><span>订单:</span>&emsp;{{ currentItem.orderNo }}</p>
        <el-divider></el-divider>
        <p><span>收货人:</span> &emsp;{{ currentItem.consignee }}</p>
        <el-divider></el-divider>
        <p><span>手机号:</span> &emsp;{{ currentItem.phone }}</p>
        <el-divider></el-divider>
        <p>
          <span>下单时间:</span> &emsp;{{ currentItem.orderTime | fmtDate }}
        </p>
        <el-divider></el-divider>
        <p><span>配送地址:</span> &emsp;{{ currentItem.deliverAddress }}</p>
        <el-divider></el-divider>
        <p><span>用户备注:</span> &emsp;{{ currentItem.remarks }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-card>
  <!-- getDetail,editOrder -->
</template>

<script>
import { getOrderList, searchOrder } from '@/api/order.js'
import moment from 'moment'
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      searchForm: {
        orderNum: '',
        date: [],
        tel: '',
        consignee: '',
        state: ''
      },
      tableData: [],
      dialogVisible: false,
      //  显示当前订单
      currentItem: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data, total } = await getOrderList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.searchForm.orderNum,
        consignee: this.searchForm.consignee,
        phone: this.searchForm.tel,
        orderstate: this.searchForm.state,
        date: JSON.stringify(this.searchForm.date)
      })
      this.tableData = data

      this.total = total
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleClick(id) {
      this.dialogVisible = true
      this.currentItem = this.tableData.find(item => item.id === id)
    },
    async onSubmit() {
      const arr = []
      this.searchForm.date.forEach(item => {
        arr.push(moment(item).format('YYYY-MM-DD hh:mm:ss'))
        this.searchForm.date = arr
      })
      // console.log(this.searchForm.date)

      const { data, total } = await searchOrder({
        currentPage: 1,
        pageSize: this.pageSize,
        orderNo: this.searchForm.orderNum,
        consignee: this.searchForm.consignee,
        phone: this.searchForm.tel,
        orderstate: this.searchForm.state,
        date: JSON.stringify(this.searchForm.date)
      })

      this.tableData = data
      this.total = total
      // console.log(data)
      // console.log(this.searchForm.date)
    }
  }
}
</script>

<style lang="less" scoped>
.el-dialog {
  .item {
    span {
      font-weight: bold;
      letter-spacing: 1.5px;
      margin-right: 10px;
    }
  }
}
</style>
