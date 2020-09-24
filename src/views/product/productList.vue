<template>
  <div>
    <panel>
      <template #head>
        <h3>商品列表</h3>
      </template>
      <template #content>
        <div>
          <el-table :data="proData" style="width: 100%">
            <el-table-column type="expand">
              <template v-slot="{row}">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品 ID">
                    <span>{{ row.id }}</span>
                  </el-form-item>
                  <el-form-item label="商品名称">
                    <span>{{ row.name }}</span>
                  </el-form-item>
                  <el-form-item label="所属分类">
                    <span>{{ row.category }}</span>
                  </el-form-item>
                  <el-form-item label="商品价格">
                    <span>{{ row.price }}</span>
                  </el-form-item>
                  <el-form-item label="商品图片">
                    <span>
                      <img
                        :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+row.imgUrl"
                        alt
                        width="100px"
                        height="100px"
                      />
                    </span>
                  </el-form-item>
                  <el-form-item label="创建时间">
                    <span>{{ row.ctime|fmtDate }}</span>
                  </el-form-item>
                  <el-form-item label="商品评价">
                    <span>{{ row.rating }}</span>
                  </el-form-item>
                  <el-form-item label="商品销量">
                    <span>{{ row.sellCount }}</span>
                  </el-form-item>
                  <el-form-item label="商品描述">
                    <span>{{ row.goodsDesc }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="name">
              <template v-slot="{row}">
                <span v-if="row.isEdit">{{ row.name}}</span>
                <el-input v-else size="mini" v-model="row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="所属分类">
              <template v-slot="{row}">
                <span v-if="row.isEdit">{{ row.category}}</span>
                <el-select v-else size="mini" v-model="row.category">
                  <el-option
                    v-for="item in cateArr"
                    :key="item.cateName"
                    :label="item.cateName"
                    :value="item.cateName"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="商品价格">
              <template v-slot="{row}">
                <span v-if="row.isEdit">{{row.price}}</span>
                <el-input v-else v-model="row.price" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="商品图片">
              <template v-slot="{row}">
                <img
                  :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+row.imgUrl"
                  width="100px"
                  height="100px"
                  alt
                />
              </template>
            </el-table-column>
            <el-table-column label="商品描述">
              <template v-slot="{row}">
                <span v-if="row.isEdit">{{row.goodsDesc}}</span>
                <el-input v-else v-model="row.goodsDesc" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="{row}">
                <el-button
                  :type="row.isEdit ? 'primary':'success'"
                  size="mini"
                  @click="editPro(row.id)"
                >{{row.isEdit ? '编辑' :'完成'}}</el-button>
                <el-button type="danger" size="mini" @click="delPro(row.id)">删除</el-button>
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
        </div>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/index.vue'
import { getProList, delPro, editPro, searchCate } from '@/api/product.js'
export default {
  components: {
    panel
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 5,
      proData: [],
      cateArr: []
      /* {
          name: '',
          category: '',
          price: '',
          imgUrl: '',
          goodsDesc: '',
          id: '',
          ctime: '',
          rating: '',
          sellCount: ''
        } */
    }
  },
  created() {
    this.getProList()
    this.lookCate()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getProList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getProList()
    },
    async getProList() {
      if (this.proData.length === 1 && this.currentPage > 1) {
        this.currentPage--
      }
      const { data, total } = await getProList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      this.proData = []
      data.forEach((item) => {
        item.isEdit = true
        this.cateArr.push(item.category)
        this.proData.push(item)
      })
      this.total = total
    },
    async delPro(id) {
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await delPro({ id })
          if (data.code === 0) {
            this.getProList()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async editPro(id) {
      const i = this.proData.find((i) => i.id === id)
      if (i.isEdit) {
        i.isEdit = false
      } else {
        const data = await editPro({
          name: i.name,
          category: i.category,
          price: i.price,
          imgUrl: i.imgUrl,
          goodsDesc: i.goodsDesc,
          id: i.id
        })
        if (data.code === 0) {
          i.isEdit = true
        }
      }
    },
    async lookCate() {
      const data = await searchCate()
      this.cateArr = data.categories
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
