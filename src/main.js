import { createApp } from 'vue'
import './reset.css'
import store from './store/index'
import App from './App.vue'
import { createRouter } from './router';
import config from './config'

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
createApp(App)
    .use(store)
    .use(createRouter())
    .use(config).mount('#app')
