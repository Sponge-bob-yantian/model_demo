<template>
  <div>
    <panel>
      <template #head>
        <div class="cate">
          <h3>商品分类</h3>
          <el-button type="primary" size="mini" @click="dialogFormVisible = true">添加分类</el-button>
          <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="分类名称" :label-width="formLabelWidth">
                <el-input v-model="form.cateName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="是否启用" :label-width="formLabelWidth">
                <el-switch v-model="form.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveAdd">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </template>
      <template #content>
        <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column property="cateName" label="分类名称">
            <template v-slot="{row}">
              <!-- 显示正常文字 -->
              <span v-if="row.isEdit">{{row.cateName}}</span>
              <!-- 点击编辑显示input输入框 -->
              <el-input v-else v-model="row.cateName" size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="是否启用">
            <template v-slot="{row}">
              <el-switch
                v-model="row.state"
                :disabled="row.isEdit"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row}">
              <el-button
                :type="row.isEdit ? 'plain' : 'success'"
                size="mini"
                @click="editProCate(row.id)"
              >{{row.isEdit ? '编辑' : '完成'}}</el-button>
              <el-button type="danger" size="mini" @click="delCate(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/index.vue'
import { getList, addCate, editCate, cateDel } from '@/api/product.js'
export default {
  components: {
    panel
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      currentRow: null,
      tableData: [],
      dialogFormVisible: false,
      form: {
        cateName: '',
        state: true
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getData()
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
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
        item.state = Boolean(item.state)
        item.isEdit = true
        this.tableData.push(item)
      })
      this.total = total
    },
    // 添加分类确定按钮
    async saveAdd() {
      const { code } = await addCate({
        cateName: this.form.cateName,
        state: this.form.state
      })
      if (code === 0) {
        this.form.cateName = ''
        this.form.state = true
        this.getData()
      }
      this.dialogFormVisible = false
    },
    // 编辑分类按钮
    async editProCate(id) {
      const i = this.tableData.find((i) => i.id === id)
      if (i.isEdit) {
        i.isEdit = false
      } else {
        const data = await editCate(i)
        if (data.code === 0) {
          i.isEdit = true
        }
      }
    },
    // 删除分类按钮
    delCate(id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await cateDel({ id })
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
