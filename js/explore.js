

function searchMovie() {
  var a = event.target.parentNode;
  var val = document.getElementById("search-val").value;
  a.href = `search.html?value=${val}`
  document.getElementById("search-val").value = "";
}

function exploreMore() {
  var tag = event.target.getAttribute("data-id");
  var url = `explore.html?id=${tag}`;
  window.open(url, "_self");
}