/*
 * 声明有关账号的请求
 */
// 引入request.js文件
import req from '@/utils/request.js'

// 登录接口
export function login(ask) {
  return req.post('/users/checkLogin', ask)
}

// 注册接口
export function addAccount(ask) {
  return req.post('/users/add', ask)
}

// 获取列表接口
export function getList(ask) {
  return req.get('/users/list', ask)
}

// 删除账号接口
export function delAccount(ask) {
  return req.get('/users/del', ask)
}

// 批量删除接口
export function batchDelAccount(ask) {
  return req.get('users/batchdel', ask)
}

// 修改账号接口
export function editAccount(ask) {
  return req.post('/users/edit', ask)
}

// 检查旧密码是否正确接口
export function checkOldPwd(ask) {
  return req.get('/users/checkoldpwd', ask)
}

// 修改密码接口
export function editPassword(ask) {
  return req.post('/users/editpwd', ask)
}

// 获取账号信息接口
export function getAccountInfo(ask) {
  return req.get('/users/info', ask)
}
