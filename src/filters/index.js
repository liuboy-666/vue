import moment from 'moment'
export function types(value){
  if(value ==1){
    return '是'
  }else{
    return '否'
  }
}
/** 字符串超长截取省略号显示 */
export function ellipsis(value, vlength=10) {
  if (!value) {
    return ''
  }
  if (value.length > vlength) {
    return value.slice(0, vlength) + '...'
  }
  return value
}

export function days(dataStr, pattern ="YYYY-MM-DD HH:mm:ss") {
  return dataStr ? moment(dataStr).format(pattern) : ''
}
