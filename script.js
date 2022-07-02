const filter = document.querySelector("#country");
const gallery = document.querySelector(".gallery");
const country = document.querySelector(".detailed");
// console.log(country.clientX)

//| fetch region's data and set it to card
let getData = async (value) => {
  const res = await fetch(`https://restcountries.com/v3.1/region/${value}`);
  const data = await res.json();
  gallery.innerHTML = "";
  Object.values(data).map((con) => {
    let card = document.createElement("div");
    card.innerHTML = `<div class="card" onClick="getCountry('${
      con.name.common
    }')">
    <img src="${con.flags.png}" alt="Flag of ${con.name.common}" class="flag" />
    <div class="about">
      <h4>${con.name.common}</h4>
      <p>Population : <span class="popul-no">${con.population.toLocaleString()}</span></p>
      <p>Region : <span class="region-name">${con.region}</span></p>
      <p>Capital : <span class="cap-name">${con.capital[0]}</span></p>
    </div>
  </div>  
  `;
    gallery.appendChild(card);
  });
};

//| get selected region from dropdown & pass it to getData() to fetch data of that region
function getRegion(e) {
  let value = e.target.value.toLowerCase();
  if (value == null) return;
  else {
    getData(value);
  }
}

//| get Country details & display it
const getCountry = async (name) => {
  console.log({ name });

  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const data = await res.json();
  console.log(data);

  // window.open("./", "_self");
  //?  to Array
  let native = Object.values(data[0].name.nativeName);
  // console.log(native[0].common);

  let Currency = Object.values(data[0].currencies);
  // console.log(Currency[0].name);
  let lang = Object.values(data[0].languages);
  // console.log(lang);

  let border = data[0].borders ? Object.values(data[0].borders) : "";

  // console.log(border);

  //?  to Array
  country.innerHTML = "";
  let conData = document.createElement("div");
  conData.innerHTML = `<button class="back">
  <img class="arrow" src="./images/arrow.svg" alt="" />
  <span>Back</span>
</button>

<div class="country-info">
  <img class="flag" src="${data[0].flags.svg}" alt="" />
  <div class="about-country">
    <h3 class="country-name">${data[0].name.common}</h3>
    <div class="statistics">
      <div class="left">
        <p>Native Name : <span> ${native[0].common}</span></p>
        <p>Population : <span>${data[0].population}</span></p>
        <p>Region : <span> ${data[0].region}</span></p>
        <p>Sub Region: <span> ${data[0].subregion}</span></p>
        <p>Capital : <span> ${data[0].capital[0]}</span></p>
      </div>
      <div class="right">
        <p>Top level Domain : <span>${data[0].tld[0]}</span></p>
        <p>Currencies : <span> ${Currency[0].name}</span></p>
        <p>Language : <span>${lang[0]}</span></p>
      </div>
    </div>
    <div class="borders">
      <span class="b-text">Border Countries:</span>
      <div class="cons">
        <span>France</span>
        <span>Germany</span>
        <span>Netherlands</span>
      </div>              
    </div>
  </div>
</div>`;

  country.appendChild(conData);

  let wrapper = document.querySelector(".detail-wrapper");

  wrapper.classList.toggle("active");

  const backBtn = document.querySelector(".back");
  backBtn.addEventListener("click", () => {
    wrapper.classList.toggle("active");
  });
};

//| Theme Toggle

document.addEventListener("load", getData("africa"));
const theme = document.querySelector(".theme");
const mode = document.querySelector(".day-mode");
const dark = document.querySelector(".dark path");
const moon = document.querySelector(".dark");
const sun = document.querySelector(".day");
const modeText = document.querySelector(".mode");
theme.addEventListener("click", () => {
  console.log({ dark });
  if (mode.className == "day-mode") {
    // document.body.classList.remove("day-mode");
    // dark.innerHTML=''
    document.body.classList.add("dark-mode");
    moon.style.display = "none";
    sun.style.display = "block";
    modeText.innerText = "Day Mode";
  } else {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("day-mode");
    sun.style.display = "none";
    moon.style.display = "block";
    modeText.innerText = "Dark Mode";
  }
});
