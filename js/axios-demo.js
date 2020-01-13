let axios = require("axios");

axios.get('http://localhost:3004/hotList')
  .then(function (response) {
    // handle success
    console.log(response.data);
  });