import { createApp } from 'vue'
import App from './App.vue'
import route from './route'
//配置Antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
//axios
import Axios,{AxiosInstance} from 'axios'
//Storage
import Storage,{StorageInstance} from './models/storage'

//ts 全局配置Axios  Storage
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $axios: AxiosInstance;
      $storage:StorageInstance      
    }
}
let app=createApp(App)
app.use(route)
app.use(Antd)
//全局绑定axios
app.config.globalProperties.$axios=Axios;
//全局配置Storage
app.config.globalProperties.$storage=Storage;
app.mount('#app')
