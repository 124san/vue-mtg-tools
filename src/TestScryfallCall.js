const axios = require('axios').default;
axios.defaults.baseURL = "https://api.scryfall.com"

axios.get('/cards/named', {
    params: {
      fuzzy: "Jin-Gitaxias, core augur"
    }
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });  