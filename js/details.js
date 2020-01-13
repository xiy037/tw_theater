window.onload = getDetailsData()
function getDetailsData() {
  var infoStr = window.location.href.split("?")[1];
  var id = infoStr.split("=")[1];
  axios.get(`http://localhost:3004/${id}`).then(function (response) {
    var movie = response.data;
    document.getElementById("details").innerHTML = `<h1 class="movie-title">${movie.name}</h1>`
    listFormatedDetails(movie);
    listFormatedRelatedMovies(movie);
    listFormatedComments(movie);
  }).catch(function(error) {
    console.log(error);
    document.getElementById("details").innerHTML += "详情页面添加中......"
  });
}

function listFormatedDetails(obj) {
  var str = "";
  str = `
  <div class="basic-info-box">
    <img class="movie-img" src=${obj.imgUrl} alt="img">
    <ul class="basic-info-list">
      <li class="info-li">导演: <span class="username">${obj.director}</span></li>
      <li class="info-li">主演: <span class="username">${obj.actors.split(" ")[0]}</span>等</li>
      <li class="info-li">制片国家/地区: ${obj.movieArea}</li>
      <li class="info-li">上映时间: ${obj.movieDate}</li>
      <li class="info-li">评分: <span class="user-score">${obj.movieScore}</span></li>
      <li class="info-li">豆瓣链接: <a class="douban-link" href=${obj.link} target="_blank">${obj.link}</a></li>
      <li class="info-li">剧情简介: <p class="movie-intro">${obj.details}</p></li>
    </ul>
  </div>`;
  var detailsBox = document.getElementById("details");
  detailsBox.innerHTML += str;
}

function listFormatedRelatedMovies(obj) {
  var title = document.getElementById("recommendation");
  title.innerText = "猜你喜欢";
  var str = "";
  var arr = obj.relatedMovies;
  for (var i = 0; i < arr.length; i++) {
    str += `
    <div class="movie-info">
     <img class="related-img" src=${arr[i].imgUrl} alt="img">
      <p class="movie-name">${arr[i].name}</p>
    </div>`;
  }
  var relatedMovies = document.getElementById("related-movies");
  relatedMovies.innerHTML = str;
}
function listFormatedComments(obj) {
  var title = document.getElementById("comments-title");
  title.innerText = "热门评论";
  var str = "";
  var arr = obj.comments;
  for (var i = 0; i < arr.length; i++) {
    str += `
    <div class="user-info">
      <span class="username user">${arr[i].userName}</span>
      <span class="user-date user">${arr[i].commentDate}</span>
      <span class="user">看过</span>
      <span class="user-score user">${arr[i].score}</span>
    </div>`
    if (arr[i].comment.length > 80) {
      str += `<div class="user-comment">
      <span class="comment-detail">${arr[i].comment.slice(0, 80)}</span> 
      <span class="hidden-comment comment-detail" id=${i}-hidden>${arr[i].comment.slice(80)}
      <span class="show-less" onclick="showLess()">(收起)</span>
      </span>
      <span class="show-more" id=${i}-expand onclick="showMore()">...(展开)</span>
      </div>`
    } else {
      str += `<div class="comment-detail">${arr[i].comment}</div>`
    }
  }
  var commentsBox = document.getElementById("comments");
  commentsBox.innerHTML = str;
}

function showMore() {
  event.target.style.display = "none";
  let id = event.target.id.split("-")[0];
  document.getElementById(`${id}-hidden`).style.display = "inline";
}

function showLess() {
  event.target.parentNode.style.display = "none";
  let id = event.target.parentNode.id.split("-")[0];
  document.getElementById(`${id}-expand`).style.display  = "inline";
}

function submitSearch() {
  if (event.keyCode === 13 || event.target.id === "search-btn") {
    var val = document.getElementById("search-val").value;
    window.open(`search.html?value=${val}`, "_self");
  }
}

function exploreMore() {
  if (event.target.type === "button") {
    var tag = event.target.getAttribute("data-id");
    var val = event.target.value;
    document.getElementById("content-box").innerHTML = "";
    getData(tag, val);
  }
}