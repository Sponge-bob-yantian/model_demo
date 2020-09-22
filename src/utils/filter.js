const filters = {
  // 返回处理后的时间格式
  fmtDate: function(value) {
    var t = new Date(value)
    var yy = t.getFullYear()
    var mm = (t.getMonth() + 1).toString().padStart(2, 0)
    var dd = t
      .getDate()
      .toString()
      .padStart(2, 0)
    var HH = t
      .getHours()
      .toString()
      .padStart(2, 0)
    var MM = t
      .getMinutes()
      .toString()
      .padStart(2, 0)
    var SS = t
      .getSeconds()
      .toString()
      .padStart(2, 0)
    return `${yy}-${mm}-${dd} ${HH}:${MM}:${SS}`
  }
}
export default Vue => {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}
