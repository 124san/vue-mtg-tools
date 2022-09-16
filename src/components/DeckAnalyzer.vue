<script setup lang="ts">

import { ref } from 'vue'
import { getOldestVersion, getMtgSet, processDecklist, calculateAge, isBasicLand } from '../utilities/utility'
var name = ref('')
var decklist = ref('')
var result = ref('')

// display
var displayName = ref('22')
var oracleText = ref('')
var imageUrl = ref('')

async function deckAge(e: Event) {
    e.preventDefault()
    var totalAge = 0;
    var promiseList = processDecklist(decklist.value)
    if (!promiseList) {
    result.value = "Decklist error"
    return
    }
    try {
    var responses = await Promise.all(promiseList)
    }
    catch (err) {
    result.value = String(err)
    return
    }
    
    var mtgSetPromises = [] as Promise<number>[]
    for (let response of responses) {
    var exactName = response.data.name
    if (isBasicLand(exactName)) continue
    const p = new Promise<number>(async (res, rej) => {
        try {
        var oldestCard = (await getOldestVersion(exactName)).data.data[0]
        var mtgSet = (await getMtgSet(oldestCard.set)).data
        var cardAge = calculateAge(mtgSet.released_at)
        res(cardAge)
        } catch (err) {
        rej(err)
        }
    }) 
    mtgSetPromises.push(p)
    
    }
    const cardAges = await Promise.all(mtgSetPromises)
    cardAges.forEach((cardAge: number) => {
    totalAge += cardAge
    console.log('This card is '+(cardAge)+' days old')
    })
    var age = ((totalAge/cardAges.length)/365).toFixed(2)
    result.value = `Your deck is ${age} years old`
}

</script>

<script lang="ts">
  export default {
    data() {
      return {
          
      }
    }
  }
</script>

<template>

    <div class="row justify-content-center">
      <div class="col-md-7">
        <h2>Deck List</h2>
  
        <div class="row">
            <div class="col">
              <div><textarea type="text" v-model="decklist" name="deckList" rows="20" cols="65" style="resize: none" placeholder="Enter Your Name" /></div>
            </div>    
            <div class="col">
              <div><button @click="deckAge" type="button" class="btn btn-lg btn-primary mb-1">Calculate Deck Age</button></div>
              <div><button type="button" class="btn btn-lg btn-primary mb-1">Primary</button></div>
              <div><button type="button" class="btn btn-lg btn-primary">Primary</button></div>
            </div>
        </div>
  
        
        
        
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-7">
        <h2>Result</h2>
        <div><textarea type="text" v-model="result" name="deckList" rows="4" cols="65" style="resize: none" placeholder="Analyzed result" readonly/></div>
      </div>
    </div>
    
</template>
  
  
<style scoped>
header {
line-height: 1.5;
}
</style>