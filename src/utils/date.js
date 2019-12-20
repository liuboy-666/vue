
import moment from 'moment'
// import i18n from '@/i18n/index'

const DATE = {
  formatDate:function(date){
    let dates = moment(date).format('YYYY-MM-DD HH:mm:ss')
    return dates
  },
  dateChangeWeek: function (data) {
    let week = moment(data).day()
    return week === 0 ? 7 : week
  }
}
export default DATE
