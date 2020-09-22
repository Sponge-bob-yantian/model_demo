<template>
  <div>
    <panel>
      <template #head>
        <div class="manage">
          <h3>店铺管理</h3>
          <el-button type="primary" size="mini" @click="saveEdit">保存</el-button>
        </div>
      </template>

      <template #content>
        <el-form ref="shopData" :model="shopData" label-width="80px" class="storeForm">
          <el-form-item label="店铺名称">
            <el-input v-model="shopData.name"></el-input>
          </el-form-item>
          <el-form-item label="店铺公告" class="bulletin">
            <el-input type="textarea" maxlength="120" show-word-limit v-model="shopData.bulletin"></el-input>
          </el-form-item>
          <el-form-item label="店铺头像">
            <!-- <el-avatar shape="square" :size="100" :src="shopData.avatar"></el-avatar> -->
            <el-image style="width: 150px; height: 150px" :src="shopData.avatar"></el-image>
          </el-form-item>
          <el-form-item label="店铺图片">
            <el-upload
              name="file"
              :action="'/upload'"
              accept=".jpg, .png .webp"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="配送费">
            <el-input v-model="shopData.deliveryPrice"></el-input>
          </el-form-item>
          <el-form-item label="配送时间">
            <el-input v-model="shopData.deliveryTime"></el-input>
          </el-form-item>
          <el-form-item label="配送描述">
            <el-input v-model="shopData.description"></el-input>
          </el-form-item>
          <el-form-item label="店铺评分">
            <el-input v-model="shopData.score"></el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="shopData.sellCount"></el-input>
          </el-form-item>

          <el-form-item label="活动">
            <el-checkbox-group v-model="shopData.supports">
              <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
              <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
              <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="营业时间">
            <el-col :span="11" class="worktime">
              <el-date-picker
                v-model.trim="shopData.data"
                type="datetimerange"
                range-separator="至"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="08:00"
                end-placeholder="23:00"
              />
            </el-col>
          </el-form-item>
        </el-form>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/index.vue'
import { getShopInfo, shopEdit } from '@/api/shop.js'
export default {
  components: {
    panel
  },
  data() {
    return {
      shopData: {
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
        data: [],
        minprice: ''
      }
    }
  },
  async created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const { data } = await getShopInfo()
      this.shopData = {
        name: data.name,
        bulletin: data.bulletin,
        avatar: data.avatar,
        deliveryPrice: data.deliveryPrice,
        deliveryTime: data.deliveryTime,
        description: data.description,
        score: data.score,
        sellCount: data.sellCount,
        supports: data.supports,
        pics: data.pics,
        date: data.date,
        minprice: data.minprice
      }
    },
    async saveEdit() {
      const { code } = await shopEdit(this.shopData)
      if (code === 0) {
        console.log(code)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.manage {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.storeForm {
  width: 450px;
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
    height: 200px;
  }
}
</style>
