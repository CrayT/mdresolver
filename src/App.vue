<template>
  <div id="app">
    <mavon-editor v-show="mavonShow" style='z-index: 1' @change="onEditChange" v-model="value"/>
    <MdResolve v-bind:content="value"  @onShowChange="onShowChange" ></MdResolve>
    <PreviewMD v-show="previewShow" ref="preview"></PreviewMD>
    <div class="minio-logo" @click="onClickMinio" title="打开Minio"><img src="../src/assets/pics/minioLogo.png"></div>
  </div>

</template>

<script>

import MdResolve from "@/components/MdResolve";
import PreviewMD from "@/components/PreviewMD";
import Config from './config';
export default {
  name: 'App',
  data(){
    return {
      value: '',
      mavonShow: true,
      previewShow: false
    }
  },
  components: {
    PreviewMD,
    MdResolve

  },
  methods:{
    onShowChange(show){
      console.log('onChange', show);
      let self = this;
      this.mavonShow = show;

      if(show){
        this.previewShow = !show;
      } else {
        this.$refs.preview.init().then(function(){
          self.previewShow = !show;
        });
      }
    },
    onEditChange(){

    },
    onClickMinio(){
      window.open(`${Config.minio.vpsIP}:${Config.minio.Port}`)
    }
  },
  mounted(){
    let self = this;
    this.$https.get(`${Config.minio.filePath}`).then(function(data){
      console.log(data);
      self.value = data.data
    }, function(e){
      console.log('初始化获取数据出错:\n', e);
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
.minio-logo{
  position: absolute;
  top: 20px;
  left: 75%;
}
.minio-logo>img{
  width: 24px;
  height: 24px;
}
</style>
