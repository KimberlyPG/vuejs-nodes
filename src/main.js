import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import store from './store'
import VueSimpleAlert from "vue3-simple-alert-next";

createApp(App).use(store).use(VueSimpleAlert).mount('#app');
