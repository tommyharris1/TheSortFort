import { createApp } from 'vue'
import App from './App.vue'
import SortOptions from './components/SortOptions.vue'
import SortGraph from './components/SortGraph.vue'

const app = createApp(App)
app.component('sort-options', SortOptions)
app.component('sort-graph', SortGraph)
app.mount('#app')
