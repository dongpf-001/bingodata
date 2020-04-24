<template>
    <svg class="icon svg-icon" aria-hidden="true" :width="width" :height="height">
        <use v-if="fileType=='word'" xlink:href="#iconWORD"></use>
        <use v-if="fileType=='ppt'" xlink:href="#iconPPT"></use>
        <use v-if="fileType=='pdf'" xlink:href="#iconPDF"></use>
        <use v-if="fileType=='excel'" xlink:href="#iconIcon-wenjianleixing-Excel"></use>
        <use v-if="fileType=='txt'" xlink:href="#icontxt-ext"></use>
        <use v-if="fileType=='shipin'" xlink:href="#iconshipin"></use>
        <use v-if="fileType=='yinpin'" xlink:href="#iconduanyinpincopy"></use>
        <use v-if="fileType=='picture'" xlink:href="#iconbianjitupian"></use>
        <use v-if="fileType=='default'" xlink:href="#icon-lianjie"></use>
    </svg>
</template>
<script>
export default {
  name: 'bingo-file-icon',
  data () {
    return {
      fileType: ''
    }
  },
  components: {
  },
  props: {
    type: {
      type: String,
      default: 'xlsx'
    },
    width: {
      type: String,
      default: '30px'
    },
    height: {
      type: String,
      default: '30px'
    }
  },
  watch: {
    type () {
      if (this.type == 'doc' || this.type == 'docx') {
        this.fileType = 'word'
      } else if (this.type == 'xls' || this.type == 'xlsx') {
        this.fileType = 'excel'
      } else if (this.type == 'ppt' || this.type == 'pptx') {
        this.fileType = 'ppt'
      } else if (this.type == 'pdf') {
        this.fileType = 'pdf'
      } else if (this.type == 'txt') {
        this.fileType = 'txt'
      } else if (this.type == 'mp4') {
        this.fileType = 'yinpin'
      } else if (this.type == 'gif' || this.type == 'jpg' || this.type == 'jpeg' || this.type == 'bmp' || this.type == 'png') {
        this.fileType = 'picture'
      } else {
        this.fileType = 'default'
      }
    }
  },
  mounted () {
    if (this.type == 'doc' || this.type == 'docx') {
      this.fileType = 'word'
    } else if (this.type == 'xls' || this.type == 'xlsx') {
      this.fileType = 'excel'
    } else if (this.type == 'ppt' || this.type == 'pptx') {
      this.fileType = 'ppt'
    } else if (this.type == 'pdf') {
      this.fileType = 'pdf'
    } else if (this.type == 'txt') {
      this.fileType = 'txt'
    } else if (this.type == 'mp4') {
      this.fileType = 'yinpin'
    } else if (this.type == 'gif' || this.type == 'jpg' || this.type == 'jpeg' || this.type == 'bmp' || this.type == 'png') {
      this.fileType = 'picture'
    } else {
      this.fileType = 'default'
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
</style>
