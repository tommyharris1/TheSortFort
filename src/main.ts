import { createApp } from 'vue'
import App from './App.vue'
import Options from './components/Options.vue'
import SortGraph from './components/SortGraph.vue'

const app = createApp(App);
app.component('options', Options);
app.component('sort-graph', SortGraph);
app.mount('#app');