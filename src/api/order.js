/*
 * 声明有关订单的请求
 */
// 引入request.js文件
import req from '@/utils/request.js'

// 查询订单详情接口
export function getOrderList(ask) {
  return req.get('/order/list', ask)
}

// 查询
export function searchOrder(ask) {
  return req.get('/order/search', ask)
}

// 订单详情接口
export function getDetail(ask) {
  return req.get('/order/detail', ask)
}

// 修改订单接口
export function editOrder(ask) {
  return req.post('/order/edit', ask)
}

// 首页报表接口
export function getTotal(ask) {
  return req.get('/order/totaldata', ask)
}

// 订单报表接口
export function getOrderTotal(ask) {
  return req.get('/order/ordertotal', ask)
}
