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
    console.log(error);
  });
}
function listInfo(array, idName, tag) {
  var str = ``;
  for (var i = 0; i < array.length; i++) {
    str += `
      <ul class="movie-info" data-tag="${array[i].movieArea} 热门">
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

function searchMovie() {
  var a = event.target.parentNode;
  var val = document.getElementById("search-val").value;
  a.href = `search.html?value=${val}`
  document.getElementById("search-val").value = "";
}

function showTaggedMovieList() {
  if (event.target.type === "button") {
    var val = event.target.value;
    var id = event.currentTarget.getAttribute("data-id");
    var list = document.getElementById(id);
    var arr = list.children;
    for (var i = 0; i < arr.length; i++) {
      if (!arr[i].getAttribute("data-tag").includes(val)) {
        arr[i].style.display = "none";
      } else {
        arr[i].style.display = "block";
      }
    }
  }
}

function exploreMore() {
  var tag = event.target.getAttribute("data-id");
  var val = event.target.value
  var url = `explore.html?id=${tag},value=${val}`;
  window.open(url, "_self");
}