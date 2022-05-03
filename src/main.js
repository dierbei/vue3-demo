import { createApp } from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import route from './route'
import axios from 'axios'
import storage from './model/store'

const app = createApp(App)

app.config.globalProperties.axios = axios
app.config.globalProperties.storage = storage

app.use(route).use(Antd).mount('#app')
