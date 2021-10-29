document.body.innerHTML=`
<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #ed5565;">
    <a class="navbar-brand" onclick="details()">Digimon</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" onclick="toggleButton()">Name</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Level
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" onclick="details(innerText)">In Training</a>
          <a class="dropdown-item" onclick="details(innerText)">Rookie</a>
          <a class="dropdown-item" onclick="details(innerText)">Champion</a>
          <a class="dropdown-item" onclick="details(innerText)">Ultimate</a>
          <a class="dropdown-item" onclick="details(innerText)">Fresh</a>
          <a class="dropdown-item" onclick="details(innerText)">Mega</a>
          <a class="dropdown-item" onclick="details(innerText)">Armor</a>
        </div>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" onclick="details(innerText)"type="button">Search</button>
    </form>
  </div>
</nav>
<section class="digimon"></section> 
`
//to toggle the search bar
function toggleButton(){
const searchBox=document.querySelector(".form-inline")
searchBox.style.display =
searchBox.style.display == "block"? "none":"block";
}
//for fetching data
function details(value){
 let container = document.querySelector(".digimon")
 container.innerHTML ="" //clear the page when next content loads
 let url=`https://digimon-api.vercel.app/api/digimon`
//filter by name
if(value == "Search"){
 const input = document.querySelector(".form-control").value
    url +=`/name/${input}`
}
//filter by level
else if(value=="In Training" ||value=="Rookie"||value=="Champion"||value=="Ultimate"||value=="Fresh"||value=="Mega"||value=="Armor"){
    url+=`/level/${value}`
    let searchBox = document.querySelector(".form-inline")//hide the search inputbox
    searchBox.style.display="none"
}
//full list of Digimon 
else{
  let searchBox=document.querySelector(".form-inline")//hide the search inputbox
  searchBox.style.display="none"
       url=url
}

fetch(url).then((responce) => {
    if (responce.status==200) {
      return responce.json();
    }else if(responce.status==400){
      throw new Error("isn't in our database");
    }else if(responce.status==404){
      throw new Error('404 Not Found');
}
})
.then((data) => {
    data.forEach(digimon=>{
container = document.querySelector(".digimon")
container.innerHTML +=`
<div class="output">
<img src="${digimon.img}" alt="${digimon.name}">
<div>
<p><b>Name: </b>${digimon.name}</p>
<p><b>Level: </b>${digimon.level}</p>
</div>
</div>
`
})
})
.catch((err) => {
  container = document.querySelector(".digimon")
  container.innerHTML +=`
  <div class="errorMessage">
  <p>${err}</p>
  </div>`
});
}
details()