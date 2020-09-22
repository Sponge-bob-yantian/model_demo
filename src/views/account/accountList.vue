<template>
  <div>
    <panel>
      <template #head>
        <h3>账号列表</h3>
      </template>
      <template #content>
        <div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="account" label="账号" width="180"></el-table-column>
            <el-table-column prop="userGroup" label="用户组" width="180"></el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="500">
              <template v-slot="{row}">{{row.ctime|fmtDate}}</template>
            </el-table-column>
            <el-table-column label="操作" v-slot="{ row }">
              <div>
                <el-button type="primary" size="mini" @click="editUser(row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="delUser(row.id)">删除</el-button>
              </div>
            </el-table-column>
          </el-table>

          <!-- 下面是模态框 -->
          <el-dialog title="修改账号" :visible.sync="dialogFormVisible">
            <el-form :model="accountEdit" class="editForm">
              <el-form-item label="用户名称" :label-width="formLabelWidth">
                <el-input v-model="accountEdit.account" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户组" :label-width="formLabelWidth">
                <el-select v-model="accountEdit.userGroup" placeholder="请选择用户权限">
                  <el-option label="普通管理员" value="普通管理员"></el-option>
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveEdit">确 定</el-button>
            </div>
          </el-dialog>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
          <template>
            <el-button type="danger" @click="batchDel()">批量删除</el-button>
            <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
          </template>
        </div>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/index.vue'
import {
  getList,
  delAccount,
  batchDelAccount,
  editAccount
} from '@/api/account.js'
export default {
  components: {
    panel
  },
  mounted() {
    this.getData()
  },
  data() {
    return {
      // 分页参数
      currentPage: 1,
      pageSize: 5,
      total: 0,
      // 表格数据
      tableData: [],
      multipleSelection: [],
      // 批量删除参数集
      idss: [],
      // 模态框
      dialogFormVisible: false,
      accountEdit: {
        account: '',
        userGroup: ''
      },
      formLabelWidth: '120px',
      rowsData: {}
    }
  },
  methods: {
    async getData() {
      if (this.tableData.length === 1 && this.currentPage > 1) {
        this.currentPage--
      }
      const { data, total } = await getList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      this.tableData = []
      data.forEach((item) => {
        this.tableData.push({
          account: item.account,
          ctime: item.ctime,
          userGroup: item.userGroup,
          id: item.id,
          img: item.imgUrl
        })
        this.total = total
      })
    },
    delUser(id) {
      this.$confirm('此操作将永久删除账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await delAccount({ id })
          if (data.code === 0) {
            /* const i = this.tableData.findIndex(item => item.id === id)
            this.tableData.splice(i, 1)
            this.total-- */
            /* this.$message({
              type: 'success',
              message: '删除成功!'
            }) */
            this.getData()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    batchDel() {
      this.$confirm('此操作将永久删除账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.idss = JSON.stringify(this.idss)
          const data = await batchDelAccount({ ids: this.idss })
          if (data.code === 0) {
            this.getData()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    toggleSelection(rows) {
      this.$refs.multipleTable.clearSelection()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.idss = []
      val.forEach((item) => {
        this.idss.push(item.id)
      })
    },
    editUser(row) {
      this.dialogFormVisible = true
      this.rowsData = row
      this.accountEdit = {
        account: row.account,
        userGroup: row.userGroup
      }
    },
    async saveEdit() {
      this.dialogFormVisible = false
      const { code } = await editAccount({
        id: this.rowsData.id,
        account: this.accountEdit.account,
        userGroup: this.accountEdit.userGroup
      })
      if (code === 0) {
        this.getData()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin: 40px 0 20px;
}
.editForm {
  .el-input {
    width: 200px;
  }
  .el-select {
    width: 200px;
  }
}
</style>

this.idss = JSON.stringify(this.idss) const { code, msg } = await
batchDelAccount({ ids: this.idss }) if (code === 0) { this.getData() } else if
(code === 1) { this.$message({ type: 'error', message: msg }) } const { code,
msg } = await editAccount({ id: row.id, account: row.account, userGroup:
row.userGroup }) if (code === 0) { console.log(code, msg) }
