fetch("https://restcountries.eu/rest/v2/all")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

function appendData(data) {
  let mainContainer = document.getElementById("countriesList");
  for (let i = 0; i < data.length; i++) {
    let countryCard = document.createElement("div");
    let capital = document.createElement("p");
    let flag = document.createElement("img");
    let population = document.createElement("p");
    let region = document.createElement("p");

    region.innerHTML = "Region: " + data[i].region;
    population.innerHTML = "Population: " + data[i].population;
    countryCard.innerHTML = "Country: " + data[i].name;
    capital.innerHTML = "Capital: " + data[i].capital;
    flag.src = data[i].flag;
    countryCard.setAttribute("countryname", data[i].name);
    countryCard.appendChild(region);
    countryCard.appendChild(population);
    countryCard.appendChild(flag);
    countryCard.appendChild(capital);
    countryCard.addEventListener("click", getDetails);
    mainContainer.appendChild(countryCard);
  }
}

let countryName;
function getSearchCountry() {
  let input = document.getElementById("searchBar");
  let filter = input.value.toUpperCase();
  let mainContainer = document.getElementById("countriesList");
  let list = mainContainer.getElementsByTagName("div");
  for (i = 0; i < list.length; i++) {
    let txtValue = list[i].textContent || list[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
}

function getDetails() {
  console.log(this.getAttribute("countryname"));
  let name = this.getAttribute("countryname");
  let singleCountryData;

  fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      appendExtraDetails(data);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });
}

function appendExtraDetails(data) {
  let modal = document.getElementById("countryDetails");
  modal.style.display = "block";
  let closeButton = document.getElementById("modalCloseButton");

  let countryName = document.createElement("div");
  countryName.innerHTML = "Country: " + data[0].name;
  let flag = document.createElement("img");
  flag.src = data[0].flag;
  let alpha2code = document.createElement("p");
  alpha2code.innerHTML = "alpha2code: " + data[0].alpha2Code;
  let capital = document.createElement("p");
  capital.innerHTML = "Capital: " + data[0].capital;
  let region = document.createElement("p");
  region.innerHTML = "Region: " + data.region;
  let population = document.createElement("p");
  population.innerHTML = "Population: " + data[0].population;
  let latlng = document.createElement("p");
  latlng.innerHTML = "latIng: " + data[0].latIng;
  let area = document.createElement("p");
  area.innerHTML = "Area: " + data[0].area;
  let timeZone = document.createElement("p");
  timeZone.innerHTML = "Time Zone: " + data[0].timezones;
  let currentTime = document.createElement("p");
  currentTime.innerHTML = "Current Time: " + data[0].currentTime;
  let borders = document.createElement("p");
  borders.innerHTML = "Neighbours: " + data[0].borders;
  let currencies = document.createElement("p");
  currencies.innerHTML = "Currencies: " + data[0].currencies[0].name;
  let languages = document.createElement("p");
  languages.innerHTML = "Languages: " + data[0].languages[0].name;
  modal.appendChild(languages);
  modal.appendChild(currencies);
  modal.appendChild(borders);
  modal.appendChild(currentTime);
  modal.appendChild(timeZone);
  modal.appendChild(area);
  modal.appendChild(flag);
  modal.appendChild(countryName);
  modal.appendChild(alpha2code);
  modal.appendChild(capital);

  closeButton.onclick = function () {
    modal.style.display = "none";
    // flag
    // name
    // alpha 2 code
    // capital
    // region (continent)
    // population
    // latlng
    // area
    // timezone
    // current time
    // the names of the neighbour countries (when clicked should display the selected neighbour details)
    // currencies
    // official languages
  };
}
