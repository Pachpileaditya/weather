const grantPermission = document.querySelector(".grant-container")
const wheatherInfo = document.querySelector(".wheather-information")
const searchBar = document.querySelector("#search-bar")
const searchButton = document.querySelector("#search")
const tempretureDetail = document.querySelector(".temperature")
const grantAccessButton = document.querySelector("#grantaccess")
const countryName = document.querySelector("#country")
const flag = document.querySelector(".flag")
const windSpeed = document.querySelector('#windspeed')
const humadity = document.querySelector('#humadity')
const clouds = document.querySelector('#clouds')
const loadingImage = document.querySelector('.loading')
const searchIcon = document.querySelector('#searchicon')
const searchInput = document.querySelector('#cityname')
const yourSearch = document.querySelector('#current-weather')

var lati ,logi , Data, cityname ,cityData;
const APIkey = "f821a69ff367dc50df7a601f0ec995e6"
wheatherInfo.style.display = "none"
searchBar.style.display = "none"
loadingImage.style.display = "none"

async function loca(position){
    lati = await position.coords.latitude
    logi = await position.coords.longitude
    cityData = await fetch(`https://us1.locationiq.com/v1/reverse?key=pk.744ebd239c036eb2ba52d2e056ace8e3&lat=${lati}&lon=${logi}&format=json`)
    cityData = await cityData.json()
    cityname = `${cityData?.address?.city}`
    cityname = cityname.toLowerCase()
}

function realTimeLocation(){
    navigator.geolocation.getCurrentPosition(loca)
}

grantAccessButton.addEventListener('click', function(){
    realTimeLocation()
    grantPermission.style.display = "none"
    loadingImage.style.display = "flex"
    setTimeout( async function(){

        apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}&units=metric`)
        Data = await apiData.json()
        setWheatherInfo()

    } ,800)

})

searchButton.addEventListener('click', function(){

    searchBar.style.display = "flex"
    wheatherInfo.style.display = "none"
    loadingImage.style.display = "none"
    grantPermission.style.display = "none"
})

searchIcon.addEventListener('click',function(){
    cityname = searchInput.value.toLowerCase()
    grantPermission.style.display = "none"
    loadingImage.style.display = "flex"
    wheatherInfo.style.display = "none"
    setTimeout( async function(){

        apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}&units=metric`)
        Data = await apiData.json()
        setWheatherInfo()

    } ,800)

})

yourSearch.addEventListener('click',function(){

    realTimeLocation()
    grantPermission.style.display = "none"
    loadingImage.style.display = "flex"
    wheatherInfo.style.display = "none"
    searchBar.style.display = "none"
    setTimeout( async function(){

        apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}&units=metric`)
        Data = await apiData.json()
        setWheatherInfo()

    } ,800)

})



function setWheatherInfo(){
    loadingImage.style.display = "none"
    wheatherInfo.style.display = "flex"
    tempretureDetail.textContent = `${Data?.main?.temp}°C`
    countryName.textContent = cityname.toUpperCase()
    let stringCountryCode = `${Data?.sys?.country}`.toLowerCase()
    var str = `https://www.worldatlas.com/r/w300/img/flag/${stringCountryCode}-flag.jpg`;
    flag.src = str
    windSpeed.textContent = `${Data?.wind?.speed}km/hr`
    humadity.textContent = `${Data?.main?.humidity}%`
    clouds.textContent = `${Data?.clouds?.all}%`
}
