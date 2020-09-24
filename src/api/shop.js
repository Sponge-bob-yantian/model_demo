/*
 * 声明有关店铺信息的请求
 */
// 引入request.js文件
import req from '@/utils/request.js'

// 获取店铺详情接口
export function getShopInfo(ask) {
  return req.get('/shop/info', ask)
}

// // 店铺图片上传接口
// export function picUpdata(ask) {
//   return req.post('/shop/upload', ask)
// }

// 店铺内容修改接口
export function shopEdit(ask) {
  return req.post('/shop/edit', ask)
}
