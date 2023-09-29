import './styles/bs-theme.scss'
import './styles/style.css'
import './styles/code.css'

// as per Bootstrap docs (https://getbootstrap.com/docs/5.2/getting-started/vite/) but broken
//import * as bootstrap from 'bootstrap'

// this works
import 'bootstrap'


import { createApp } from 'vue'
import router from './router/router'
import { createPinia } from 'pinia'



import App from './App.vue'
const app = createApp(App);

const pinia = createPinia();


app.use(pinia);
app.use(router);

router.isReady().then(() => {
    app.mount('#app')
})
