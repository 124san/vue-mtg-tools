import { createRouter, createWebHistory } from "vue-router";
import DeckAnalyzer from './components/DeckAnalyzer.vue'
import CardFetcher from './components/CardFetcher.vue'
import Home from './components/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name:'home', component: Home },
    { path: "/deckanalyzer", name:'deckanalyzer', component: DeckAnalyzer },
    { path: "/cardfetcher", name:'cardfetcher', component: CardFetcher }
  ]
});
export default router;


