window.onload = getDatafromDB();

function getDatafromDB() {
  axios.get("http://localhost:3004/db").then(function (response) {
    var comingSoonArr = response.data.comingSoon;
    listInfo(comingSoonArr, "coming-soon-list");
  });
}
function listInfo(array, idName) {
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
          ${array[i].movieDate}
        </li>
      </ul>
    </div>`;
  }
  var box = document.getElementById(idName);
  box.innerHTML = str;
}
