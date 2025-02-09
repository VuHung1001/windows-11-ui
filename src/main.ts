import { createApp } from 'vue'
import App from '@/App.vue'
import taskbarStore from '@/store/taskbarStore';
import '@/style.css'

const app = createApp(App);
app.use(taskbarStore);
app.mount('#app');
