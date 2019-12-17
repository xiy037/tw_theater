window.onload = getDatafromDB();

function getDatafromDB() {
  axios.get("http://localhost:3004/movieList").then(function (response) {
    var comingSoonArr = response.data.comingSoon;
    listInfo(comingSoonArr, "comingSoon-list", "date");
    var actionArr = response.data.action;
    listInfo(actionArr, "action-list", "score");
    var romanceArr = response.data.romance;
    listInfo(romanceArr, "romance-list", "score");
    var dramaArr = response.data.drama;
    listInfo(dramaArr, "drama-list", "score");
  }).catch(function (error) {
    alert("error!");
  });
}
function listInfo(array, idName, tag) {
  var str = ``;
  for (var i = 0; i < array.length; i++) {
    str += `
      <ul class="movie-info">
        <li>
          <a href="details.html?id=${array[i].id}"><img class="movie-poster" src=${array[i].imgUrl} alt="movie image"></a>
        </li>
        <li class="movie-name">
          ${array[i].name}
        </li>
        <li class="movie-date">
          ${tag === "date" ? array[i].movieDate + "<span class='movie-dscpt'>上映</span>" : array[i].movieScore}
        </li>
      </ul>`;
  }
  var box = document.getElementById(idName);
  box.innerHTML = str;
}
