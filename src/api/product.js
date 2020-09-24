/**
 * 这里声明的是所有关于商品的接口
 */

// 引入request.js文件
import req from '@/utils/request.js'

// 添加分类接口
export function addCate(ask) {
  return req.post('/goods/addcate', ask)
}

// 获取分类接口
export function getList(ask) {
  return req.get('/goods/catelist', ask)
}

// 删除分类接口
export function cateDel(ask) {
  return req.get('/goods/delcate', ask)
}

// 修改分类接口
export function editCate(ask) {
  return req.post('/goods/editcate', ask)
}

// 查询所有分类名称
export function searchCate(ask) {
  return req.get('/goods/categories', ask)
}

// 添加商品接口
export function addPro(ask) {
  return req.post('/goods/add', ask)
}

// 获取商品列表接口
export function getProList(ask) {
  return req.get('/goods/list', ask)
}

// 删除商品接口
export function delPro(ask) {
  return req.get('/goods/del', ask)
}

// 修改商品接口
export function editPro(ask) {
  return req.post('/goods/edit', ask)
}
