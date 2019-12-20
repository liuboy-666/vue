/*
 *@Description:字典工具库

 */

const DIC = {
  /**
   *@name:find
   *@param dicName 字典名称
   *@description:根据字典名称获取字典数据
   *@return:
   */
  find(dicName) {
    const dicForKey = []
    const dics = [{
      "id": 912,
      "enumType": "ranks",
      "itemValue": "1",
      "label": "一级",
      "sortNo": 1,
      "description": "性别",
    }, {
      "id": 913,
      "enumType": "ranks",
      "itemValue": "2",
      "label": "二级",
      "sortNo": 2,
      "description": "性别"
    }, {
      "id": 914,
      "enumType": "position",
      "itemValue": "3",
      "label": "现场设备层",
      "sortNo": 1,
      "description": "业务位置",
    }, {
      "id": 915,
      "enumType": "position",
      "itemValue": "4",
      "label": "现场控制层",
      "sortNo": 2,
      "description": "业务位置"
    }]
    if(!dics){
      return
    }
    // 字典项遍历
    dics.map(item => {
      if (item.enumType == dicName) {
        const option = {
          label: item.label,
          value: parseInt(item.itemValue)
        }
        dicForKey.push(option)
      }
    })
    return dicForKey
  },
  /**
   * *@name:findByValue
   * @param dicName 数据字典名称
   * @param value 数据字典的值
   * @description: 根据字典的value获取label
   * @returns {*}
   */
  findByValue(dicName, value) {
    const options = this.find(dicName)
    if (!options) return
    const item = _.find(options, function(o) {
      return o.value == value
    })
    console.log(item)
    if (!item) return ''
    return item.label
  },
  /**
   * @name:findByLabel
   * @param dicName 数据字典名称
   * @param label 数据字典的标签
   * @description: 根据字典的label获取value
   * @returns {*}
   */
  findByLabel(dicName, label) {
    const options = this.find(dicName)
    if (!options) return
    const item = _.find(options, function(o) {
      return o.label === label
    })
    if (!item) return ''
    return item.value
  }
}

export default DIC
