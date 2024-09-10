let apikeysub1 = "168429410a0e21986d19e21a26f91b7d";
let apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const whetherIcon = document.querySelector(".whether-icon");

async function checkWhether(city) {
    const response = await fetch(apiurl + city + `&appid=${apikeysub1}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".whether").style.display = "none";
    }
    else{
        var data = await response.json();
    

        document.querySelector(".city").innerHTML = data.name;

        document.querySelector(".temp").innerHTML= Math.round(data.main.temp)  + "°C";

        document.querySelector(".humidity").innerHTML=data.main.humidity + "%";

        document.querySelector(".wind").innerHTML=data.wind.speed + "km/h";

        if (data.weather && data.weather.length > 0) {
            if(data.weather[0].main == 'Clouds'){
                whetherIcon.src = "./clouds.png";
            }
            else if(data.weather[0].main == 'Clear'){
                whetherIcon.src = "./clear.png";
            }
            else if(data.weather[0].main == 'Rain'){
                whetherIcon.src = "./rain.png";
            }
            else if(data.weather[0].main == 'Drizzle'){
                whetherIcon.src = "./drizzle.png";
            }
            else if(data.weather[0].main == 'Mist'){
                whetherIcon.src = "./mist.png";
            }
        } else {
            // Handle the case where weather data is not available
            console.log("Weather data not available");
        }

        document.querySelector(".whether").style.display = "block";
    }
    
}

searchBtn.addEventListener('click' , () => {
    checkWhether(searchBox.value);
});

 