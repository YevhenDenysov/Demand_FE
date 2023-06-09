import { createApp } from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'
import './assets/main.css'


const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

app.use(router).use(vuetify)

app.mount('#app')
