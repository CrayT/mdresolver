import Vue from 'vue'
import App from './App.vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from "axios";
import Util from "./assets/utils/Util"
import store from "./store/store"
import MinioClient from "./assets/minio/MinioClient"
import Confirm from 'vue-confirm'

Vue.use(Confirm)
Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.prototype.$https = axios;
Vue.prototype.utils = Util;
Vue.prototype.minio = new MinioClient();
axios.defaults.baseURL = "";

new Vue({
  render: h => h(App),
  data(){
    return {
      value:''
    }
  },
  store
}).$mount('#app')
