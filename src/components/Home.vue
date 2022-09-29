<script lang="ts">
  export default {
    data() {
      return {
        count: 0
      }
    }
  }
</script>
    
<template>
  <div class="container">
    <p style="margin-top:.4em" class="display-5">Welcome</p>
    <p class="lead">
      This site contains some tools for Magic: The Gathering, a trading card game created by Richard Garfield in 1993.
      <br/>
      Click on the tabs to check out the tools. Currently, this site features the following tools:
      <br/>
      <ul>
        <li><strong>EDH Deck Analyzer: </strong>paste your EDH/Commander deck here, and you will find out some fun and/or insightful statistics about your deck, such as deck age, a.k.a. the average age of all cards in your deck.</li>
        <li><strong>Card Fetcher: </strong>Search for a certain card by card name (typo is allowed to some extent). You can also search for the oldest printed version of a card, such as Birds of Paradise in 2016 vs Birds of Paradise in 1993.</li>
      </ul>
      
      <br/>
      <br/>
      <br/>
    </p>
  </div>
</template>