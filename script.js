const filter = document.querySelector("#country");
const gallery = document.querySelector(".gallery");
const country = document.querySelector(".detailed");

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
  console.log(name);

  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const data = await res.json();
  console.log(data);
  //?  to Array
  let native = Object.values(data[0].name.nativeName);
  // console.log(native[0].common);

  let Currency = Object.values(data[0].currencies);
  // console.log(Currency[0].name);
  let lang = Object.values(data[0].languages);
  console.log(lang);

  let border = data[0].borders
    ? Object.values(data[0].borders)
    : "";

  console.log(border);

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

  country.classList.toggle("active");

  const backBtn = document.querySelector(".back");
  backBtn.addEventListener("click", () => {
    country.classList.toggle("active");
  });
};

document.addEventListener("load", getData("africa"));
