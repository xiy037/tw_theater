window.onload = getDetailsData()
function getDetailsData() {
  var infoStr = window.location.href.split("?")[1];
  var id = infoStr.split("=")[1];
  axios.get(`http://localhost:3004/${id}`).then(function (response) {
    var movie = response.data;

  }).catch(function(error) {
    alert("error!");
  });
}

function listFormatedDetails(obj) {
  
}