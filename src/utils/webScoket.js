import { Cache, Dic, Dates } from '$utils'

var ALARM_CACHE_LIST = [];

const webscoket = {
  initWebSocket: function($vue) {
    const access_token = Cache.get('access_token')
    if (!Cache.get('SCOKET_OPTIONS') || window['Webscoket']) return;
    const scoketAdress = Cache.get('SCOKET_OPTIONS').IP;    
    const wsUri = `${scoketAdress}/bas/websocket?ticket=${access_token}`;    
    window['Webscoket'] = new WebSocket(wsUri);
    let websocket = window['Webscoket'];
    websocket.onopen = function(evt) {
      console.log('scoket connect')
      window['ScoketInterval'] = setInterval(function() {
        console.log('scoket send heart')
        websocket.send("{key: 'heart'}")
      }, 30000)
    }
    websocket.onclose = function(evt) {
      console.log('scoket closed')
      websocket.close()
    }
    websocket.onmessage = function(evt) {
      console.log('scoket accept')
      let data = undefined
      try {
        data = JSON.parse(evt.data)        
        if (data.key === 'ack') {
          return
        } else {
          todo(data, $vue)
        }
      } catch (e) {
        console.log(e)
      }
    }
    websocket.onerror = function(evt) {
      websocket = new WebSocket(wsUri)
    }
  }
}

function todo(message, $vue) {
    // console.log(message.body)
  if (message.key === 'videoPatrol.prompt.message') {
    $vue.appScoketDialogIsShow = true
    Cache.put('videoPatrol-autoStart', message.body)
  } else if (message.key === 'videoPatrol.autoStart.message') {
    if ($vue.$route.path === '/videoPatrol/task' || window.location.hash === "#/videoPatrol/task") {
      //   $vue.$router.push({ path: '/videoPatrol/task' })
      Cache.put('videoPatrol-autoStart', message.body)
      if ($vue.appScoketDialogIsShow) {
        $vue.$refs.socketWindow.setWebsocketData()
      } else {
        $vue.appScoketDialogIsShow = true
      }
    }
  } else if (message.key === 'ALARM') {    
    $vue.$store.state.common.alarmNewList = message.body
    // ALARM_CACHE_LIST.push(message.body);
    // setTimeout(() => {
    //     receiveMessage($vue)
    // }, 1000);
    //   popMessage(message.body,$vue)
      $vue.alarmDialog = message.body
  } 
  if (
    $vue.$router.currentRoute.path === '/realTimeAlarm' &&
    message.alarmCount
  ) {
    $vue.$store.state.common.alarmCount = message.alarmCount
  }
}
/*
 *@name: receiveMessage
 *@description: 告警中心消息接收处理
 */
function receiveMessage($vue) {
    let html = document.getElementsByClassName('el-notification');
    let timer = setInterval(() => {
        if (ALARM_CACHE_LIST.length < 1) {
            clearInterval(timer);
            timer = null;
        }
        if (html.length <= 4) {
            popMessage(ALARM_CACHE_LIST[0], $vue);
            ALARM_CACHE_LIST.splice(0,1);
        }
    }, 3500);
}
/*
 *@name: popMessage
 *@param:{type}
 *@description: 告警中心弹出框方法
 *@return:
 *@author: guzhengguang
 *@date: 2019-05-05 19:05:34
 */
function popMessage(alarmData, $vue) {
  console.warn(alarmData,'1111111')
  if(!alarmData){
    return;
  }
  const h = $vue.$createElement
  let _descOptions = {
    attrs: { class: 'el-button el-button--text el-button--mini' },
    on: {
      click() {
        // $vue.$store.dispatch('SetAlarmData', alarmData)
        $vue.$router.push({
          path: '/realTimeAlarm',
          query: { alarmId: alarmData.alarmId }
        })
        $vue.alarmMsgBox.close()
      }
    }
  }  
  let _optDivOptions = {
    attrs: { class: '' }
  }
  let _iframeOption = {
    attrs: {
      style:
        'position: absolute;width:330px;height:160px;left:0;top:0;border:none;z-index: -1;'
    }
  }

  let level = Dic.findByValue('SENU017', parseInt(alarmData.alarmLevel))

  //  视频告警转换判断
  let type =
    alarmData.alarmType == '60101'
      ? Dic.findByValue('SENU004006', parseInt(alarmData.alarmType))
      : Dic.findByValue('SENU004005', parseInt(alarmData.alarmType))

  // 拼写设备名称规则
  let deviceName = alarmData.deviceName
  if (deviceName) {
    deviceName = type + '_' + deviceName
  } else {
    deviceName = type
  }
  let _pInfoOptions = {
      attrs: {
          style: 'max-width:255px;overflow:hidden;height: 25 px;line-height: 25 px;text-overflow: ellipsis;white-space: nowrap;',
          title: deviceName
      }
  }
  $vue.alarmMsgBox = Promise.resolve().then($vue.$nextTick).then(()=>{
      $vue.$notify({
          title: '告警通知',
          message: h('div', [
              h('iframe', _iframeOption),
              h('p', _pInfoOptions, '告警名称：' + deviceName),
              h('p', _pInfoOptions, '告警等级：' + level),
              h(
                  'p',
                  _pInfoOptions,
                  '告警时间：' +
                  Dates.dayjs(alarmData.alarmTime).format('YYYY-MM-DD HH:mm:ss')
                  ),
                  h('div', _optDivOptions, [h('button', _descOptions, '查看')])
                ]),
                dangerouslyUseHTMLString: true,
                position: 'bottom-right',
                type: 'warning',
                duration: 3000
            })
        })
    }

export default webscoket
