
<template>
  <div>
    <el-button @click="change">{{$t("name")}}</el-button>
    <el-button
      @click="sendQuest"
      type="primary"
      v-status
    >{{$t("main")}}</el-button>
    <el-select
      placeholder="请选择"
      v-model="value"
    >
      <el-option
        :key="item.value"
        :label="item.label"
        :value="item.value"
        v-for="item in options"
      ></el-option>
    </el-select>
    {{getNums?getNums:0}}
    <el-button @click="changeType('zh')">中文</el-button>
    <el-button @click="changeType('en')">英文</el-button>
  </div>
</template>
<script>
import { Dic, Dates } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      options: [],
      value: '',
      num: new Date()
    }
  },
  methods: {
    changeType(type) {
      localStorage.setItem('locale', type)
      this.$i18n.locale = type
    },
    change() {
      this.$store.commit('NUMS', this.value)
      let nums = Dates.formatDate(new Date())
      console.log(nums)
    },
    sendQuest() {
      this.$msg(this.$t('mes'), 'warning')
      // this.$http.post('/bas/personFaceAccess/queryControlRecords.json').then((response)=>{
      //       console.log(response,'1213')
      //   })
    }
  },
  created() {
    this.options = Dic.find('ranks')
    this.value = Dic.findByLabel('ranks', '一级')
  },
  computed: {
    ...mapGetters(['getNums'])
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
