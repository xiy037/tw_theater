window.onload = getData();

function getData() {
  var tagArr = window.location.href.split("?")[1].split(",");
  var tag = tagArr[0].split("=")[1];
  var title = decodeURIComponent(tagArr[1].split("=")[1]);
  axios.get(`http://localhost:3004/${tag}`).then(function (response) {
    var data = response.data;
    var cssMode;
    if (["rankingList", "reviewList"].includes(tag)) {
      cssMode = "column";
    } else {
      cssMode = "row";
    }
    document.getElementById("explore-title").innerHTML += `${title}`;
    for (var x in data) {
      showFormatedData(data[x], cssMode, tag);
    }
  }).catch(function (error) {
    console.log(error);
    document.getElementById("explore-box").innerHTML += "页面搭建中......";
  })
}

function showFormatedData(arr, mode, tag) {
  console.log(arr);
  var str = ``;
  if (mode === "row") {
    for (var i = 0; i < arr.length; i++) {
      str += `<ul class="item-box1">
        <li>
          <a href="details.html?id=${arr[i].id}"><img class="explore-img" src=${arr[i].imgUrl} alt="img"></a>
        </li>
        <li class="movie-name">${arr[i].name}</li>
      </ul> `
    }
  } else {
    for (var i = 0; i < arr.length; i++) {
      str += `<div class="item-box2">
        <a href="details.html?id=${arr[i].id}"><img class="explore-img" src=${arr[i].imgUrl} alt="img"></a>
        <ul class="explore-review-list">
          <li class="movie-name">${arr[i].name}</li>
          <li class="explore-score">${arr[i].movieScore}</li>
          ${tag === "reviewList"? `<li class="explore-li"><span class="explore-user">${arr[i].userName}</span>: ${arr[i].comment}</li>` 
          : `<li class="explore-li">具体内容介绍</li>`}
        </ul> 
      </div>`
    }
    document.getElementById("explore-box").className = "explore-box2"
  }
  document.getElementById("explore-box").innerHTML += str;
}

function searchMovie() {
  var a = event.target.parentNode;
  var val = document.getElementById("search-val").value;
  a.href = `search.html?value=${val}`
  document.getElementById("search-val").value = "";
}

function exploreMore() {
  var tag = event.target.getAttribute("data-id");
  var val = event.target.value
  var url = `explore.html?id=${tag},value=${val}`;
  window.open(url, "_self");
}