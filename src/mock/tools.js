import Mock from 'mockjs'
const Tool = {
  getPageList(data, pageNo, pageSize) {
    if (!data) return
    let response = []
    response = data.filter(
      (item, index) =>
        index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
    )
    return response
  },
  mockList(lenght, options) {
    let List = []

    for (let i = 0; i < lenght; i++) {
      List.push(Mock.mock(options))
    }

    return List
  }
}

export default Tool
