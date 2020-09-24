<template>
  <div>
    <panel>
      <template #head>
        <h3>商品添加</h3>
      </template>
      <template #content>
        <el-form ref="proForm" :rules="rules" :model="proForm" label-width="80px">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="proForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="category">
            <el-select v-model="proForm.category" placeholder="请选择商品分类">
              <el-option
                v-for="item in cateData"
                :key="item.id"
                :label="item.cateName"
                :value="item.cateName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input-number v-model="proForm.price" :min="1" :max="100" placeholder="0"></el-input-number>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="活动形式" prop="goodsDesc">
            <el-input type="textarea" v-model="proForm.goodsDesc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('proForm')">立即添加</el-button>
            <el-button @click="resetForm('proForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/index.vue'
import { getList, addPro } from '@/api/product.js'

export default {
  components: {
    panel
  },
  data() {
    return {
      proForm: {
        name: '',
        price: '',
        category: '',
        goodsDesc: ''
      },
      imgUrl: '',
      cateImg: '',
      cateData: [],
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ]
      }
    }
  },

  created() {
    this.getCate()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imgUrl = URL.createObjectURL(file.raw)
      this.cateImg = res.imgUrl
    },
    async beforeAvatarUpload(file) {
      var arr = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      const isJPG = arr.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/jpeg/png/webp 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const data = await addPro({
            name: this.proForm.name,
            category: this.proForm.category,
            price: this.proForm.price,
            imgUrl: this.cateImg,
            goodsDesc: this.proForm.goodsDesc
          })
          if (data.code === 0) {
            this.$refs[formName].resetFields()
            this.$router.push('/product/list')
          }
        } else {
          this.$message.error('验证不通过')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async getCate() {
      const { data } = await getList({
        currentPage: 1,
        pageSize: 100
      })
      this.cateData = data
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
/deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
