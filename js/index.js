window.onload = getDatafromDB();

function getDatafromDB() {
  axios.get("http://localhost:3004/movieList").then(function (response) {
    var comingSoonArr = response.data.comingSoon;
    listInfo(comingSoonArr, "coming-soon-list", "date");
    var actionArr = response.data.action;
    listInfo(actionArr, "action-list", "score");
    var romanceArr = response.data.romance;
    listInfo(romanceArr, "romance-list", "score");
    var dramaArr = response.data.drama;
    listInfo(dramaArr, "drama-list", "score");
  });
}
function listInfo(array, idName, tag) {
  var str = ``;
  for (var i = 0; i < array.length; i++) {
    str += `<div class="movie-info">
      <ul>
        <li>
          <img class="movie-poster" src=${array[i].imgUrl} alt="movie image">
        </li>
        <li class="movie-name">
          ${array[i].name}
        </li>
        <li class="movie-date">
          ${tag === "date" ? array[i].movieDate + "<span class='movie-dscpt'>上映</span>" : array[i].movieScore}
        </li>
      </ul>
    </div>`;
  }
  var box = document.getElementById(idName);
  box.innerHTML = str;
}
