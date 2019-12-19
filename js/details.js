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
    console.log("error");
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
      <span>${arr[i].comment.slice(0, 80)}</span>
      <input class="show-more" type="button" value="...(展开)" onclick="showMore()">
      <span class="hidden-comment">${arr[i].comment.slice(80)}
      <input class="show-less" type="button" value="(收起)" onclick="showLess()">
      </span>
      </div>`
      //有瑕疵，展开之后展开位置有一个空格。
    } else {
      str += `<div class="user-comment">${arr[i].comment}</div>`
    }
  }
  var commentsBox = document.getElementById("comments");
  commentsBox.innerHTML = str;
}

function showMore() {
  event.target.style.display = "none";
  event.target.parentNode.children[2].style.display = "inline";
}

function showLess() {
  event.target.parentNode.style.display = "none";
  event.target.parentNode.parentNode.children[1].style.display = "inline";
}

function searchMovie() {
  var a = event.target.parentNode;
  var val = document.getElementById("search-val").value;
  a.href = `search.html?value=${val}`
  document.getElementById("search-val").value = "";
}