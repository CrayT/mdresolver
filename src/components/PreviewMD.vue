<template>
<div class="article" v-html="compiledMarkdown">

</div>
</template>

<script>
import marked from 'marked'
import Config from '../config'
export default {
  name: "PreviewMD",
  props:[ ],
  data(){
    return{
      value: ''
    }
  },
  methods : {
        init(){
            let self = this;
            console.log('init data');
            return new Promise((resolve, reject) => {
                this.$https.get( `${Config.minio.filePath}?${new Date().getTime()}`).then(function(data){
                    console.log(data);
                    self.value = data.data;
                    resolve();
                }, function(e){
                    console.log(e);
                    reject();
                })
            })
        }
  },
  computed:{
    compiledMarkdown(){
      return marked(this.value)
    }
  },
  mounted : function(){
    console.log('mount');
    this.init();
  }
}
</script>

<style scoped>

</style>
