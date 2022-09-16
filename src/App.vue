
<script lang="ts">
import { defineComponent } from 'vue'
import DeckAnalyzer from './components/DeckAnalyzer.vue'
import CardFetcher from './components/CardFetcher.vue'
// Requires defineComponent when using vue with TypeScript
export default defineComponent({
  components: {
    DeckAnalyzer,
    CardFetcher
  },
  methods: {
	  activeClass: function (...names: string[]) {
    	for (let name of names) {
    		if (name == this.$route.name)
    			return 'active';
      }
    }    
  }
})
</script>

<template>
  <ul class="nav nav-tabs justify-content-center">
    <li class="nav-item">
      <router-link class="nav-link" :class="activeClass('home')" to="/">Home</router-link>
      <!-- <a class="nav-link active" aria-current="page" href="#">EDH Deck Analyzer</a> -->
    </li>
    <li class="nav-item">
      <router-link class="nav-link" :class="activeClass('deckanalyzer')" to="/deckanalyzer">EDH Deck Analyzer</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" :class="activeClass('cardfetcher')" to="/cardfetcher">Card Fetcher</router-link>
    </li>
  </ul>
  <router-view />
</template>


<style scoped>
header {
  line-height: 1.5;
}
</style>
