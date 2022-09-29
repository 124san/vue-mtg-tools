<script setup lang="ts">

import { ref } from 'vue'
import { searchCardByName, getOldestVersion, getMtgSet } from '../utilities/utility'
var name = ref('')

// display
var displayName = ref('22')
var cardType = ref('')
var oracleText = ref('')
var imageUrl = ref('')
var imageUrl2 = ref('')
var searchOldest = false

function searchOldestCard(e: Event) {
  e.preventDefault()
  searchOldest = true
  searchCard(e)
}

function searchCard(e: Event) {
  e.preventDefault()
  searchCardByName(name.value).then(function (response) {
    if (searchOldest) {
      getOldestVersion(response.data.name).then(function (response) {
        console.log(response.data.data[0])
        updateDisplay(response.data.data[0])
      })
    }
    else {
      updateDisplay(response.data)
    }
  })
  .catch(function (error) {
    console.log(error);
  }).then(function () {
    searchOldest = false
  })
}

function updateDisplay(cardData: any) {
  console.log(cardData)
  imageUrl2.value = ""
  displayName.value = cardData.name
  // Update oracle text
  oracleText.value = cardData.oracle_text;
  if (!cardData.oracle_text && cardData.card_faces) {
    oracleText.value = ""
    for (var i = 0; i < cardData.card_faces.length; i++) {
      oracleText.value += cardData.card_faces[i].oracle_text
       + (i < (cardData.card_faces.length-1) ? "\n==========================\n" : "")
    }
  }
  // Update art
  if (cardData.image_uris)
    imageUrl.value = cardData.image_uris.normal;
  else if (cardData.card_faces) {
    // Show both art of dual face card
    imageUrl.value = cardData.card_faces[0].image_uris.normal;
    imageUrl2.value = cardData.card_faces[1].image_uris.normal;
  }
  // Update type line
  if (cardData.type_line) {
    cardType.value = cardData.type_line
  }
  else if (cardData.card_faces) {
    cardType.value = ""
    for (var i = 0; i < cardData.card_faces.length; i++) {
      cardType.value += cardData.card_faces[i].type_line
       + (i < (cardData.card_faces.length-1) ? "//" : "")
    }
  }
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
    <div class="row d-flex justify-content-center">
      <form @submit="searchCard" class="add-form col-md-6">
        <div>
          <h4 style="margin-top:.3em">Card Name:</h4>
          <input type="text" v-model="name" class="form-control" name="name" placeholder="Enter Card Name" />
          <input type="submit" value="Search" class="btn btn-primary" style="margin: .4em" />
          <button class="btn btn-secondary" @click="searchOldestCard">Search oldest version</button>
          <p>Name: {{ displayName }}</p>
          <p style="white-space: pre-line">Card type: {{ cardType }}</p>
          <p style="white-space: pre-line">Oracle text:<br/> {{ oracleText }}</p>
          <img v-bind:src="imageUrl" />
          <img v-bind:src="imageUrl2" />
          
        </div>
        
      </form>
      
    </div>
    
</template>