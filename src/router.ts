import { createRouter, createWebHistory } from "vue-router";
import DeckAnalyzer from './components/DeckAnalyzer.vue'
import CardFetcher from './components/CardFetcher.vue'
import Home from './components/Home.vue'
const repoName = '/vue-mtg-tools'

const router = createRouter({
  history: createWebHistory(repoName+"/"),
  routes: [
    // { path: "/", redirect: { name: 'home' }},
    { path: "/", name:'home', component: Home },
    // { path: "/deckanalyzer", redirect: { name: 'deckanalyzer' }},
    { path: "/deckanalyzer", name:'deckanalyzer', component: DeckAnalyzer },
    // { path: "/cardfetcher", redirect: { name: 'cardfetcher' }},
    { path: "/cardfetcher", name:'cardfetcher', component: CardFetcher }
  ]
});
export default router;


