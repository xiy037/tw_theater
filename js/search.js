window.onload = showSearchResult();

function showSearchResult() {
  var keyword = window.location.href.split("?")[1].split("=")[1];
  var userVal = decodeURIComponent(keyword);
  var title = document.getElementById("search-title");
  title.innerText += ` ${userVal}`;
  axios.get("http://localhost:3004/movieList").then(function (response) {
    var data = response.data;
    var resultArray = [];
    for (var x in data) {
      resultArray = resultArray.concat(filterData(data[x], userVal));
    }
    formatResult(resultArray);
  }).catch(function (error) {
    console.log(error);
  });
}

function filterData(arr, val) {
  return arr.filter(function (element) {
    return element.name.includes(val);
  });
}

function formatResult(arr) {
  var str = ``;
  for (var i = 0; i < arr.length; i++) {
    str += `
    <div class="result-item">
      <a href="details.html?id=${arr[i].id}"><img class="result-img" src=${arr[i].imgUrl} alt="img"></a>
      <ul class="item-list">
        <li class="movie-name">${arr[i].name}</li>
        <li>上映日期: ${arr[i].movieDate}</li>
        <li>地区类别: ${arr[i].movieArea}</li>
        <li>评分: ${arr[i].movieScore}</li>
      </ul>
    </div>
    `
  }
  if (str) {
    document.getElementById("search-results").innerHTML = str;
  } else {
    document.getElementById("search-results").innerHTML = `<p>未找到相关结果，请尝试其它关键词</p>`
  }
 
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