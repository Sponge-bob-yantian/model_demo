// 密码验证正则
export const pwdReg = /^(\w){6,20}$/

// 1. 不允许有汉字或者空格
// export const pwdReg1 = /[\u4e00-\u9fa5 ]/g
// 2. 字母/数字以及标点符号至少包含2种
// export const hasWordReg = /[A-z]/
// export const hasNumberReg = /\d/
// export const hasSymbolReg = /[^\u4e00-\u9fa5A-z0-9]/
// 3. 长度位8到14个字符
// export const passwordReg2 = /^[\w\W]{8,14}$/
