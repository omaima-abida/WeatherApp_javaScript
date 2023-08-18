const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = "london";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});

form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please type in city name');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return weekday[new Date(`${year}-${month}-${day}`).getDay()];
}
//const API_key = "7150a49b6a4ddf3ca6b16dff01a6c95f";

function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=a5ceddb6e12d4d6d8a1200315231808&q=${cityInput}`)


        .then(response => response.json())
        .then(data => {
            console.log(data);

            temp.innerHTML = data.current.temp_c + "&#176;";
            conditionOutput.innerHTML = data.current.condition.text;

            const date = data.location.localtime;
            const [datePart, timePart] = date.split(' ');
            const [year, month, day] = datePart.split('-');
            const time = timePart;

            dateOutput.innerHTML = `${dayOfTheWeek(day, month, year)} ${day}, ${month} ${year}`;
            timeOutput.innerHTML = time;
            nameOutput.innerHTML = data.location.name;

            const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            icon.src = `./icons/${iconId}`;

            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + " km/h";

            let timeOfDay = "day";

            const code = data.current.condition.code;

            if (!data.current.is_day) {
                timeOfDay = "night";
            }

            if (code === 1000) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
                btn.style.background = "#e5ba92";
                if (timeOfDay === "night") {
                    btn.style.background = "#181e27";
                }
            } else if (
                code === 1003 ||
                code === 1006 ||
                // ... (other condition codes)
                code === 1252
            ) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
                btn.style.background = "#647d45";
                if (timeOfDay === "night") {
                    btn.style.background = "#325c80";
                }
            } else {
                app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
                btn.style.background = "#4d72aa";
                if (timeOfDay === "night") {
                    btn.style.background = "#1b1b1b";
                }
            }

            app.style.opacity = "1";
        })
        .catch(() => {
            alert('City not found, please try again');
            app.style.opacity = "1";
        });
}

// Initial fetch when the page loads
fetchWeatherData();
app.style.opacity = "1";
