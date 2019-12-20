import Mock from 'mockjs'
import Tool from './tools'
const Random = Mock.Random

 const test =Mock.mock('/bas/personFaceAccess/queryControlRecords.json', 'post', () => {
  // const { 1, 10 } = JSON.parse(config.body)
  let List = []
  let PageList = []
  List = Tool.mockList(60, {
    "entranceName": Random.cword(3),
    "area": Random.cword(3),
    "operator": Random.cword(3),
    "entranceCode": Random.integer(1000, 9999),
    "optType": 1,
    "duration": Random.integer(1000, 9999),
    "optTime": new Date()

  })

  PageList = Tool.getPageList(List, 1, 10)
  return {
    msgContent: '请求成功',
    msgCode: '0',
    returnObj: {
      list: PageList,
      total: 60,
      pageNum: 1,
      pageSize:10
    },
    prompt: null,
    success: true,
  }
})

export default test
