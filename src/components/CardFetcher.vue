<script setup lang="ts">

import { ref } from 'vue'
import { searchCardByName, getOldestVersion } from '../utilities/utility'
var name = ref('')

// display
var displayName = ref('22')
var oracleText = ref('')
var imageUrl = ref('')

function searchOldestCard(e: Event) {
    e.preventDefault()
    searchCardByName(name.value).then(function (response) {
    getOldestVersion(response.data.name).then(response => {
        var card = response.data.data[0]
        console.log(card);
        displayName.value = card.name
        oracleText.value = card.oracle_text;
        if (card.image_uris)
            imageUrl.value = card.image_uris.normal;
        else if (card.card_faces) {
        imageUrl.value = card.card_faces[0].image_uris.normal;
        }
    }).catch(err => {
        console.log(err)
    })
    })
    .catch(function (error) {
    console.log(error);
    })
    .then(function () {
    // always executed
    });  
}

function searchCard(e: Event) {
    e.preventDefault()
    searchCardByName(name.value).then(function (response) {
    console.log(response.data);
    displayName.value = response.data.name
    oracleText.value = response.data.oracle_text;
    if (response.data.image_uris)
        imageUrl.value = response.data.image_uris.normal;
    else if (response.data.card_faces) {
        imageUrl.value = response.data.card_faces[0].image_uris.normal;
    }
    })
    .catch(function (error) {
    console.log(error);
    })
    .then(function () {
    // always executed
    });  
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
          Card Name:
          <input type="text" v-model="name" name="name" placeholder="Enter Your Name" />
          <input type="submit" value="Search" class="btn btn-block" />
          <button @click="searchOldestCard">Search oldest</button>
          <p>Name: {{ displayName }}</p>
          <p style="white-space: pre-line">Oracle Text: {{ oracleText }}</p>
          <img v-bind:src="imageUrl" />
          
        </div>
        
      </form>
      
    </div>
    
</template>