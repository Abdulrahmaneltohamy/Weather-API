// global
const searchInputLocation = document.getElementById('searchBtn')
const countryInp = document.getElementById('countryInput')
const dateInp = document.getElementById('dateTodayInput')
const dateTodayCard = document.querySelector(".dateToday")
const dayTodayCard = document.querySelector(".dayToday")
const cityCard = document.querySelector(".citylocation")
const tempDeg = document.querySelector(".tempC")

// when user search
searchInputLocation.addEventListener("change", function () {
    getWeatherData(searchInputLocation.value)
})


// get location from user and check

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        // console.log(latitude , "latitude");
        // console.log(longitude , "longitude");
        getWeatherData(`${latitude},${longitude}`)
    })
}

// get weather data
async function getWeatherData(query) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=cd197f49cc8e44d4a4a64211242606`)
        // console.log(response);
        let weatherData = await response.json()
        // console.log(weatherData);
        displayData(weatherData)

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "please enter avalid location",
          });
          searchInputLocation.value = "";
    }
}

// display data
function displayData(data) {
    console.log(data);
    // today date and curren country
    const currDate = data.current.last_updated
    const currCountry = data.location.country
    document.getElementById("dateTodayInput").innerHTML = `${currDate}`
    document.getElementById("countryInput").innerHTML = `${currCountry}`

    // today inform
    const date = new Date(currDate)
    // console.log(date);

    const weekDay = date.toLocaleString('en-us', { weekday: "long" });
    const todayday = date.getDate();
    const todayMonth = date.toLocaleString('en-us', { month: "long" });
    const city = data.location.name;
    const temp = data.current.temp_c;
    const tempIcon = data.current.condition.icon;
    const condationW = data.current.condition.text;

    const maxtemp_c = data.forecast.forecastday[0].day.maxtemp_c;
    const avgtemp_c = data.forecast.forecastday[0].day.avgtemp_c;
    const mintemp_c = data.forecast.forecastday[0].day.mintemp_c;

// ---------------------------------
    //display in card today -- 2
    dayTodayCard.innerHTML = weekDay;
    dateTodayCard.innerHTML = `${todayday} ${todayMonth}`;
    cityCard.innerHTML = city;
    tempDeg.innerHTML = temp;
    forecastIcon.setAttribute('src', `https:${tempIcon}`);
    weatherCondition.innerHTML = condationW;

    tempMaxText.innerHTML = ("Max Temp");
    tempMax.innerHTML = maxtemp_c;
    tempAvgText.innerHTML = ("Avg Temp");
    tempAvg.innerHTML = avgtemp_c;
    tempMinText.innerHTML = ("Min Temp");
    tempMin.innerHTML = mintemp_c;

    // -----------------------------------
    // display in card tomorow -- 2
    const dayTommorrwFull = new Date(data.forecast.forecastday[1].date);
    const dateTommorrow = new Date(dayTommorrwFull);
    // console.log(dateTommorrow);
    const tommorrowDay = dateTommorrow.toLocaleString('en-us', { weekday: "long" });
    // console.log(tommorrowDay);
    const tempIconTommorrow = data.forecast.forecastday[1].day.condition.icon
    const maxtempTommorrow = data.forecast.forecastday[1].day.maxtemp_c
    const mintempTommorrow = data.forecast.forecastday[1].day.mintemp_c
    const weatherConditionTommorrow = data.forecast.forecastday[1].day.condition.text


    dayTomm.innerHTML = tommorrowDay
    forecastIconTomm.setAttribute('src', `https:${tempIconTommorrow}`);
    maxTommorro.innerHTML = maxtempTommorrow
    minTommorrow.innerHTML = mintempTommorrow
    condTommorrow.innerHTML = weatherConditionTommorrow

    // ------------------------------
    // display in card After tomorow -- 3

    const dayAfterTm = new Date(data.forecast.forecastday[2].date)
    const dateAfterTm = new Date(dayAfterTm)
    // console.log(dateAfterTm);
    const afterTmDay = dateAfterTm.toLocaleString('en-us', { weekday: "long" });
    // console.log(afterTmDay);

    dayAfter.innerHTML = afterTmDay
    const tempIconAfter = data.forecast.forecastday[2].day.condition.icon
    const maxtempAfterTm = data.forecast.forecastday[2].day.maxtemp_c
    const mintempAfterTm = data.forecast.forecastday[2].day.mintemp_c
    const weatherConditionAfterTm = data.forecast.forecastday[2].day.condition.text

    
    forecastIconAfter.setAttribute('src', `https:${tempIconAfter}`);
    maxAfterTommorro.innerHTML = maxtempAfterTm
    minAfterTommorrow.innerHTML = mintempAfterTm
    condAfterTommorrow.innerHTML = weatherConditionAfterTm
}


