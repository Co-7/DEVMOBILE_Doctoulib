import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/tailwind-light/theme.css'

const app = createApp(App);

app.use(router)
app.use(PrimeVue)
app.mount('#app')