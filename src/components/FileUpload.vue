<template>
    <div class="file-box">
        <div v-for="(file,index) in currentFileList||[]" :key="file.fileCode">
            <div class="file-list fl" v-if="file.status !== 0">
                <i class="el-icon-error" @click="deleteImg(index,file.fileType)"></i>
                <!-- 图片 -->
                <img v-if="file.fileType===0" :src="Bus.imgPath(file.fileCode)" onerror="this.src='/images/default.png'"/>
                <!-- 视频 -->
                <video v-if="file.fileType===1" :src="Bus.imgPath(file.fileCode)" controls="controls">您的浏览器不支持 video 标签</video>
            </div>
        </div>
        <div class="upload-file-box fl">
            <el-upload ref="fileUpload"
                action=""
                v-loading="uploadLoading"
                list-type="picture-card"
                :on-change="changeFile"
                :show-file-list="false"
                :auto-upload="false">
                <i class="el-icon-plus"></i>
                </el-upload>
        </div>
    </div>
</template>
<script>
// import { Bus,Cache } from '$utils'
// import { API } from '../api'
export default {
    data(){
        return {
            uploadLoading:false,
            currentFileList:[],//当前文件数组
            Bus,
            // 文件格式验证
            fileFormat:[
                {
                    typeNum:0,
                    type:'img',
                    currentCount:0,
                    suffix:['JPG','JPEG','PNG','BMP'],
                    size:2*1024*1024,
                    suffixErr:'图片格式限定为JPG，JPEG，PNG，BMP,视频格式限定为MP4',
                    sizeErr:'图片大小限定为2M',
                    count:10,
                    countErr:'图片个数不能超过10个'
                },
                {
                    typeNum:1,
                    type:'video',
                    currentCount:0,
                    suffix:['MP4'],
                    size:Cache.get('COMMON_OPTIONS').videoSize*1024*1024,
                    suffixErr:'图片格式限定为JPG，JPEG，PNG，BMP,视频格式限定为MP4',
                    sizeErr:'视频大小限定为' + `${Cache.get('COMMON_OPTIONS').videoSize}` + 'M',
                    count:3,
                    countErr:'视频个数不能超过3个'
                },
            ],
        }
    },
    methods:{
        deleteImg(index,fileType){
            this.fileFormat[fileType].currentCount--;
            this.$set(this.currentFileList[index],'status', 0);
        },
         changeFile (file, fileList) {
            // 截取文件后缀名并转为大写 需要把点也去掉
            const suffix = file.name.substr(file.name.lastIndexOf(".")+1).toUpperCase();
            let isSuffix =false;
            this.fileFormat.map(item=>{
                // 符合当前文件格式
                if(item.suffix.findIndex(su=>su === suffix)> -1 ){
                    isSuffix = true;
                    if(item.currentCount >= item.count)//文件个数已满
                    {
                        // 将不符合的文件移除
                        this.fileErr( item.countErr);
                    }else if(file.size > item.size){// 大小校验不通过
                        this.fileErr(item.sizeErr);
                    }else{// 大小和格式都通过，数量加1
                        // 格式和大小都匹配
                        this.uploadFile(file,item.typeNum,item);
                    }
                }
            });
            if(!isSuffix){//文件格式不符合
                this.fileErr(this.fileFormat[0].suffixErr);
            }
        },
        fileErr(txt){
            // 将不符合的文件移除
            this.$message({
                message: txt,
                type: 'error'
            });
        },
        uploadFile(file,fileType,item){
            this.uploadLoading = true;
            let formData = new FormData()
            formData.append('files', file.raw);
            // 上传图片
            this.$fetch('/common/file/batchFileload.json', formData).then(res => {
             // 移除控件中的文件
             if(res.success == true){
                 this.uploadLoading = false;
                 item.currentCount++;
             }
            res.returnObj && res.returnObj.map(item => {
                if(!res.returnObj[0].fileId) {
                    this.$message.error('上传失败')
                }
                this.currentFileList.push({
                    "fileCode": item.fileId,
                    "fileType": fileType,
                    "status": 1,
                    "suffix": "string",
                    "url": item.url
                    })
                })
            })
        }
    }
}
</script>
<style lang="scss">
.file-box{
    .file-list{
        position: relative;
        .el-icon-error{
            top:-4px;
            right: -4px;
            width: 10px;
            height: 10px;;
            position: absolute;
            cursor: pointer;
        }
        width:80px;
        height: 80px;
        margin-right:10px;
        img,video{
            width:80px;
            height: 80px;
        }
    }
    .upload-file-box{
        width:80px;
        height: 80px;
        .el-upload,.el-upload--picture-card {
            width: 80px;
            height: 80px;
            line-height: 80px;
            background-color: #355486;
        }
    }
}
</style>


