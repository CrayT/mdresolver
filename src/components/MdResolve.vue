<template>
  <div>
    <input type="button" id="MdResolve" v-show="showSave" class="header-save" @click="onStartUpload(content)" value="保存文档">
    <input type="button" id="MdPreview" v-show="showPreview" class="header-preview" @click="onPreview" value="预览文档">
    <input type="button" id="MdEdit" class="header-edit" v-show="showEdit" @click="onPreview" value="编辑文档">
  </div>
</template>

<script>
export default {
  name: "MdResolve",
  props: {
    content: String
  },
  data (){
    return {
      showEdit: false,
      showPreview: true,
      showSave: true
    }
  },
  methods:{
    onStartUpload(content){
      console.log('click to save')
      console.log('编辑内容:', content)
      this.minio.upLoad(content).then(function(){
        console.log('上传成功。');
        //todo 弹窗提示
        this.$confirm('上传成功')
      }.bind(this), function(){
        console.log('上传失败。');
        //todo 弹窗提示
        this.$confirm('上传失败')
      }.bind(this))
    },
    onPreview(){
      this.$emit("onShowChange", this.showEdit);
      this.showPreview = !this.showPreview;
      this.showEdit = !this.showEdit;
      this.showSave = !this.showSave;

    }
  }
}
</script>

<style scoped>
  .header-save{
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    user-select: none;
  }
  .header-preview{
    position: absolute;
    top: 18px;
    left: 100%;
    transform: translateX(calc(-100% - 30px));
    font-size: 18px;
    user-select: none;
  }
  .header-edit{
    position: absolute;
    top: 18px;
    left: 30px;
    font-size: 18px;
    user-select: none;
  }
  .wh{
    z-index: 1600!important;
  }
</style>
