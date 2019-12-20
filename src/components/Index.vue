<template>
  <!-- 人脸对比 -->
  <div class="section-main__warp face-comparison">
    <div class="avatar-upload">
      <div class="avatar-upload__content" :style="styleBg">
        <div class="left-content">
          <i class="el-icon-error" v-if="imgUrl.left" @click="clearImgLeft"></i>
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="handleAvatarSuccessLeft"
            :show-file-list="false"
            :style="checkData.left && 'border: 1px solid #A90E17'">
            <img v-if="imgUrl.left" :src="imgUrl.left" class="avatar">
            <div v-else class="tip-content">
              <img :src="FaceComparisonTip" class="avatar-bg">
              <div class="upload-btn" :style="checkData.left && 'color: #A90E17'">
                <!-- {{$t('personContrast.title.picture')}} -->
              </div>
            </div>
          </el-upload>
        </div>
        <div class="middle-content">
          <p class="text">{{$t('personContrast.title.similarity')}}</p>
          <p :class="similarity !== '0' ? 'number active' : 'number'">{{similarity}}%</p>
        </div>
        <div class="right-content">
          <i class="el-icon-error" v-if="imgUrl.right" @click="clearImgRight"></i>
          <el-upload
            class="avatar-uploader"
            action=""
            :before-upload="handleAvatarSuccessRight"
            :show-file-list="false"
            :style="checkData.right && 'border: 1px solid #A90E17'">
            <img v-if="imgUrl.right" :src="imgUrl.right" class="avatar">
            <div v-else class="tip-content">
              <img :src="FaceComparisonTip" class="avatar-bg">
              <div class="upload-btn" :style="checkData.right && 'color: #A90E17'">
                <!-- {{$t('personContrast.title.picture')}} -->
              </div>
            </div>
          </el-upload>
        </div>
      </div>
      <div class="btn__content">
        <el-button type="primary" size="medium" round @click="contrastClick" :loading="loading">{{loading ? this.$t('personContrast.title.comparison') : this.$t('personContrast.title.compare')}}</el-button>
        <el-button size="medium" round class="line-btn" @click="resetClick">
          <!-- {{$t('personContrast.button.reset')}} -->
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import {api} from '../api'
// import { Cache } from '$utils'
// import FaceComparisonBg from '../image/FaceComparisonBg.png'
// import FaceComparisonTip from '../image/FaceComparisonTip.png'

export default {
  data () {
    return {
      loading: false,
      similarity: '0', // 相似度
      imgUrl: {
        left: '',
        right: ''
      },
      checkData: { // 校验
        left: false,
        right: false
      },
      imgFile: { // 图片file
        left: null,
        right: null,
      },
    }
  },
  watch: {
    imgUrl: {
      handler (newValue) {
        if (newValue.left) {
          this.checkData.left = false
        }
        if (newValue.right) {
          this.checkData.right = false
        }
        if (!newValue.left || !newValue.right) {
          this.similarity = '0'
        }
      },
      deep: true
    }
  },
  methods: {
    /*
     *@name: 验证图片
     *@param:{type}
     *@description:
     *@return:
     *@author: panlua
     *@date: 2019-06-12 14:59:44
    */
    validImg (file) {
      const fileName = file.name;
      const type = fileName.slice(fileName.indexOf('.') + 1, fileName.length);
      const imgArr = ['jpg', 'png', 'jpeg', 'jpe', 'dib', 'bmp', 'JPG', 'PNG', 'JPEG', 'JPE', 'DIB', 'BMP'];
      let isJPG = null;
      imgArr.indexOf(type) === -1 ? isJPG = false : isJPG = true;

      if (!isJPG) {
        this.$message.error(this.$t('personContrast.message.Noformat'));
        return false
      }
      const Size =  1024 * 1024 * 4
      if (file.size > Size) {
        this.$message.error(this.$t('personContrast.message.size'))
        return false
      }
      return true
    },
    /*
     *@name: 左侧图片回填
     *@param:{type}
     *@description:
     *@return:
     *@author: panlua
     *@date: 2019-04-24 15:52:21
    */
    handleAvatarSuccessLeft (file) {
      if (!this.validImg(file)) {
        return false
      }
      this.imgFile.left = file
      this.imgUrl.left = URL.createObjectURL(file);
      return false
    },
    /*
      *@name: 右侧侧图片回填
      *@param:{type}
      *@description:
      *@return:
      *@author: panlua
      *@date: 2019-04-24 15:53:04
    */
    handleAvatarSuccessRight (file) {
      if (!this.validImg(file)) {
        return false
      }
      this.imgFile.right = file
      //URL.createObjectURL(file)得到本地内存容器的URL地址，方便预览
      this.imgUrl.right = URL.createObjectURL(file);
      return false
    },
    /*
      *@name: 清除左侧图片
      *@param:{type}
      *@description:
      *@return:
      *@author: panlua
      *@date: 2019-04-24 16:29:22
    */
    clearImgLeft () {
      this.imgUrl.left = ''
      this.imgFile.left = null
    },
    /*
      *@name: 清除右侧图片
      *@param:{type}
      *@description:
      *@return:
      *@author: panlua
      *@date: 2019-04-24 16:29:47
    */
    clearImgRight () {
      this.imgUrl.right = ''
      this.imgFile.right = null
    },
    /*
     *@name: 对比事件
     *@param:{type}
     *@description:
     *@return:
     *@author: panlua
     *@date: 2019-04-24 17:13:02
    */
    contrastClick () {
      if (!this.imgFile.left && !this.imgFile.right) {
        this.checkData.left = true
        this.checkData.right = true
      } else if (!this.imgFile.left) {
        this.checkData.left = true
      } else if (!this.imgFile.right) {
        this.checkData.right = true
      } else {
        let formData = new FormData()
        formData.append('files', this.imgFile.left)
        formData.append('files', this.imgFile.right)
        this.$fetch(api.batchFileload, formData).then(res => {
          if (!res.returnObj) {
            this.$message.error(this.$t('personContrast.message.failed'))
            return false
          }
          let param = {
            imageOne: res.returnObj[0].fileId,
            imageTwo: res.returnObj[1].fileId,
            vcmSiId:  Cache.get('VCM_INFO').vcmPlatCode
          }
          this.loading = true
          this.$fetch(api.oneToOnePeopleFaceSearching, param).then(res => {
            this.loading = false
            if (res.success) {
              this.similarity = res.returnObj
            } else {
              this.$message.error(res.msgContent)
            }
          })
        })
      }
    },
    /*
     *@name: 重置事件
     *@param:{type}
     *@description:
     *@return:
     *@author: panlua
     *@date: 2019-04-24 17:24:15
    */
    resetClick () {
      this.imgUrl = {
        left: '',
        right: ''
      }
      this.imgFile = {
        left: null,
        right: null
      }
      this.checkData = {
        left: false,
        right: false
      }
      this.similarity = '0'
    }
  }
}
</script>

