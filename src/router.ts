import { createRouter, createWebHistory } from "vue-router";
import DeckAnalyzer from './components/DeckAnalyzer.vue'
import CardFetcher from './components/CardFetcher.vue'
import Home from './components/Home.vue'

const repoName = '/vue-mtg-tools'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: repoName, name:'home', component: Home },
    { path: repoName+"/deckanalyzer", name:'deckanalyzer', component: DeckAnalyzer },
    { path: repoName+"/cardfetcher", name:'cardfetcher', component: CardFetcher }
  ]
});
export default router;


