<script setup lang="ts">

import { ref } from 'vue'
import { getOldestVersion, getMtgSet, processDecklist, calculateAge, isBasicLand, parseDate } from '../utilities/utility'
import type { AxiosResponse } from 'axios'
var resultHeightValue1 = 4
var resultHeightValue2 = 20

var resultHeight = ref(resultHeightValue1)
var name = ref('')
var decklist = ref('')
var result = ref('Analyzed result will be shown here')
var requestSpinner = ref(false)
// display
var displayName = ref('22')
var oracleText = ref('')
var imageUrl = ref('')

function beginSendingRequest() {
  requestSpinner.value = true
  result.value = "Processing..."
}

function finishSendingRequest() {
  requestSpinner.value = false
}

async function deckAge(e: Event) {
    e.preventDefault()
    beginSendingRequest()
    var totalAge = 0;
    var mtgSetPromises = [] as Promise<number>[]
    var responses = await getResponsesFromDecklist()
    if (!responses) return
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
          finishSendingRequest()
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
    finishSendingRequest()
}

async function listReleaseYears(e: Event) {
  e.preventDefault()
  beginSendingRequest()
  // Initialize array to hold cards and according release year
  var yearsAndCards = {} as Record<number, string[]>
  var releaseYearPromises = [] as Promise<void>[]
  var responses = await getResponsesFromDecklist()
  if (!responses) return
  for (let response of responses) {
    var exactName = response.data.name
    if (isBasicLand(exactName)) continue
    const p = new Promise<void>(async (res, rej) => {
      try {
        var oldestCard = (await getOldestVersion(exactName)).data.data[0]
        var mtgSet = (await getMtgSet(oldestCard.set)).data
        var releaseDate = parseDate(mtgSet.released_at)
        var cardNamesAtYear = yearsAndCards[releaseDate.getUTCFullYear()]
        if (cardNamesAtYear) {
          cardNamesAtYear.push(oldestCard.name)
        }
        else {
          yearsAndCards[releaseDate.getUTCFullYear()] = [oldestCard.name]
          
        }
        console.log(oldestCard.name)
        res()
      } catch (err) {
        finishSendingRequest()
        rej(err)
      }
    }) 
    releaseYearPromises.push(p)
  }
  await Promise.all(releaseYearPromises).catch(err => result.value = String(err))
  // build result string based on years and cards released during that year
  var resultString = ""
  for (let year in yearsAndCards) {
    resultString += year+"\n"
    for (let cardName of yearsAndCards[year]){
      resultString += cardName +"; "
    }
    resultString = resultString.slice(0, -2)
    resultString += "\n"
  }
  result.value = resultString
  finishSendingRequest()
}

async function getResponsesFromDecklist(): Promise<AxiosResponse[] | null>  {
  var promiseList = processDecklist(decklist.value)
  if (!promiseList) {
    result.value = "Decklist error"
    finishSendingRequest()
    return null
  }
  try {
    var responses = await Promise.all(promiseList)
  }
  catch (err) {
    result.value = String(err)
    finishSendingRequest()
    return null
  }
  return responses
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
        <h2 style="margin-top: .2em;">Deck List</h2>
  
        <div class="row">
            <div class="col">
              <div><textarea type="text" class="form-control" v-model="decklist" name="deckList" rows="20" cols="65" style="resize: none"
                placeholder="Paste your EDH decklist here following the export format from Moxfield.com" /></div>
              </div>    
            <div class="col">
              <div><button @click="deckAge" type="button" class="btn btn-primary mb-1">Calculate Deck Age</button></div>
              <div><button @click="listReleaseYears" type="button" class="btn btn-primary mb-1">List Cards By Release Year</button></div>
            </div>
        </div>
  
        
        
        
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-7">
        <h2 style="margin-top:.3em">Result <span v-show="requestSpinner" class="spinner-border" role="status"></span></h2>
        <!-- <div><textarea type="text" v-model="result" name="deckList" rows="4" cols="65" style="resize: none" placeholder="Analyzed result" readonly/></div> -->
        <div style="white-space: pre-line">{{result}}</div>
      </div>
    </div>
    
</template>
  
  
<style scoped>
header {
line-height: 1.5;
}
</style>