<template>
  <div>
    <panel>
      <template #head>
        <div class="manage">
          <h3>店铺管理</h3>
        </div>
      </template>

      <template #content>
        <el-form
          ref="shopData"
          :model="shopData"
          :rules="shopRules"
          label-width="80px"
          class="storeForm"
        >
          <el-form-item label="店铺名称" prop="name">
            <el-input v-model="shopData.name"></el-input>
          </el-form-item>
          <el-form-item label="店铺公告" class="bulletin" prop="bulletin">
            <el-input
              type="textarea"
              maxlength="120"
              show-word-limit
              v-model="shopData.bulletin"
            ></el-input>
          </el-form-item>
          <el-form-item label="店铺头像" prop="avatar">
            <el-image
              v-if="shopData.avatar"
              style="width: 150px; height: 150px"
              fit="fill"
              :src="'http://127.0.0.1:5000/upload/shop/' + shopData.avatar"
            ></el-image>
          </el-form-item>
          <el-form-item label="店铺图片" prop="pics">
            <el-upload
              action="http://127.0.0.1:5000/shop/upload"
              list-type="picture-card"
              :file-list="fileList"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="配送费" prop="deliveryPrice">
            <el-input v-model="shopData.deliveryPrice"></el-input>
          </el-form-item>
          <el-form-item label="配送时间" prop="deliveryTime">
            <el-input v-model="shopData.deliveryTime"></el-input>
          </el-form-item>
          <el-form-item label="配送描述" prop="description">
            <el-input v-model="shopData.description"></el-input>
          </el-form-item>
          <el-form-item label="店铺评分" prop="score">
            <el-input v-model="shopData.score"></el-input>
          </el-form-item>
          <el-form-item label="销量" prop="sellCount">
            <el-input v-model="shopData.sellCount"></el-input>
          </el-form-item>

          <el-form-item label="活动" prop="supports">
            <el-checkbox-group v-model="shopData.supports">
              <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
              <el-checkbox
                label="VC无限橙果汁全场8折"
                name="type"
              ></el-checkbox>
              <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
              <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="营业时间" prop="date">
            <el-col :span="11" class="worktime">
              <el-date-picker
                v-model.trim="shopData.date"
                type="datetimerange"
                range-separator="至"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="08:00"
                end-placeholder="08:00"
              />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('shopData')"
              >保存</el-button
            >
            <el-button @click="resetForm('shopData')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/index.vue'
import { getShopInfo, shopEdit } from '@/api/shop.js'
import _ from 'lodash'
export default {
  components: {
    panel
  },
  data() {
    return {
      shopData: {
        id: '',
        name: '',
        bulletin: '',
        avatar: '',
        deliveryPrice: '',
        deliveryTime: '',
        description: '',
        score: '',
        sellCount: '',
        supports: [],
        pics: [],
        date: [],
        minprice: ''
      },
      imgUrl: '',
      save: '',
      fileList: [],
      shopRules: {
        name: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        bulletin: [
          { required: true, message: '请输入店铺公告', trigger: 'blur' },
          {
            min: 10,
            max: 120,
            message: '长度在 10 到 120 个字符',
            trigger: 'blur'
          }
        ],
        deliveryPrice: [
          { required: true, message: '请输入配送价格', trigger: 'blur' }
        ],
        deliveryTime: [
          { required: true, message: '请输入配送时间', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入配送描述', trigger: 'blur' }
        ],
        score: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        supports: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        date: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        sellCount: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      imgBaseUrl: 'http://127.0.0.1:5000/upload/shop/'
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    handleAvatarSuccess(res, file) {
      this.imgUrl = URL.createObjectURL(file.raw)
      this.save = res.imgUrl
      // 将上传的文件保存到pics文件里面
      this.shopData.pics.push(this.save)
    },
    async getInfo() {
      const { data } = await getShopInfo()
      this.shopData = data
      // console.log(this.shopData)
      data.pics.forEach((item, index) => {
        item = this.imgBaseUrl + item
        this.fileList.push({
          name: index,
          id: index,
          url: item
        })
      })
      // console.log(this.shopData)
    },

    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const obj = _.cloneDeep(this.shopData)
          obj.supports = JSON.stringify(obj.supports)
          obj.pics = JSON.stringify(obj.pics)
          obj.date = JSON.stringify(obj.date)
          const data = await shopEdit(obj)
          if (data.code === 0) {
            location.reload()
          }
        } else {
          this.$message.error('验证不通过')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.storeForm {
  width: 500px;
}
.worktime {
  display: flex;
  /deep/.el-date-editor .el-range-input {
    width: 140px;
  }
}
/deep/.el-textarea__inner {
  height: 80px;
}
.bulletin {
  /deep/.el-textarea__inner {
    height: 150px;
    resize: none;
  }
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
.el-upload {
  display: flex;
}
</style>
