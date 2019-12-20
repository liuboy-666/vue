
<template>
  <div>
    <!-- <i class="el-icon-error" v-if="imgFile" @click="clearImgLeft"></i> -->
    <el-upload
      :before-upload="handleAvatarSuccess"
      :show-file-list="false"
      action
      class="avatar-uploader"
    >
      <img
        :src="imageUrl"
        class="avatar"
        v-if="imageUrl"
      />

      <i
        class="el-icon-plus avatar-uploader-icon"
        v-else
      ></i>
    </el-upload>

    <el-upload
      :auto-upload="false"
      :limit="4"
      :on-change="changeFile"
      :on-exceed="fileCount"
      :on-remove="removeFile"
      action
      list-type="picture-card"
      ref="addRosterUl"
      style="margin-bottom: 10px"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-button @click="submitFile">确认</el-button>
    <el-button @click="submitFiles">确认2</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      imgFile: null,
      imgFileList: []
    }
  },
  methods: {
    //验证图片
    validImg(file) {
      const fileName = file.name
      const type = fileName.slice(fileName.indexOf(".") + 1, fileName.length)
      const imgArr = [
        "jpg",
        "png",
        "jpeg",
        "jpe",
        "dib",
        "bmp",
        "JPG",
        "PNG",
        "JPEG",
        "JPE",
        "DIB",
        "BMP"
      ]
      let isJPG = null
      imgArr.indexOf(type) === -1 ? (isJPG = false) : (isJPG = true)

      if (!isJPG) {
        this.$message.error("格式不正确")
        return false
      }
      const Size = 1024 * 1024 * 4
      if (file.size > Size) {
        this.$message.error("大小尺寸不符合")
        return false
      }
      return true
    },
    handleAvatarSuccess(file) {
      if (!this.validImg(file)) {
        return false
      }
      this.imgFile = file
      this.imageUrl = URL.createObjectURL(file)
      return false
    },
    submitFile() {
      let formData = new FormData()
      formData.append("files", this.imgFile)
    },
    //多张
    // 判断上传文件个数
    fileCount(file, fileList) {
      this.$message.warning("上传最多4张")
    },
    changeFile(file, fileList) {
      if (!this.validImg(file)) {
        this.deleteImg(file, fileList)
        return false
      }
      this.imgFileList = fileList
      console.log(this.imgFileList, "222")
    },
    deleteImg(file, fileList) {
      let index = this.imgFileList.findIndex(item => {
        return item.url === file.url
      })
      fileList.splice(index, 1)
    },
    removeFile(file, fileList) {
      this.imgFileList = fileList
    },
    submitFiles() {
      let formData = new FormData()
      this.imgFileList.map(item => {
        formData.append("files", item.raw)
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
