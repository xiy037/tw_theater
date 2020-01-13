
function getData(tag, val) {
  axios.get(`http://localhost:3004/${tag}`).then(function (response) {
    var data = response.data;
    var contentTitle = document.getElementById("content-title");
    contentTitle.innerText = val;
    contentTitle.style.display = "block";
    var cssMode;
    if (["rankingList", "reviewList"].includes(tag)) {
      cssMode = "column";
    } else {
      cssMode = "row";
    }
    for (var x in data) {
      showFormatedData(data[x], cssMode, tag);
    }
  }).catch(function (error) {
    console.log(error);
    document.getElementById("content-box").innerHTML += "页面搭建中......";
  })
}

function showFormatedData(arr, mode, tag) {
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
    document.getElementById("content-box").className = "explore-box1"
  } else {
    for (var i = 0; i < arr.length; i++) {
      str += `<div class="item-box2">
        <a href="details.html?id=${arr[i].id}"><img class="explore-img" src=${arr[i].imgUrl} alt="img"></a>
        <ul class="explore-review-list">
          <li class="explore-movie-name">${arr[i].name}</li>
          <li class="explore-score">${arr[i].movieScore}</li>
          ${tag === "reviewList"? `<li class="explore-li"><span class="explore-user">${arr[i].userName}</span>: ${arr[i].comment}</li>` 
          : `<li class="explore-li">具体内容介绍</li>`}
        </ul> 
      </div>`
    }
    document.getElementById("content-box").className = "explore-box2"
  }
  document.getElementById("content-box").innerHTML += str;
}

