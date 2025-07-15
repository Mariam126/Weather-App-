
let city ="Egypt";
const units ="metric";
const apikey = "a7fb3c9df9269e15a67b4cda2fbb14dd";
const apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=`;
  const search =document.querySelector('.search ');
  const searchbox =document.querySelector('.search input');
  const searchbtn =document.querySelector('.search button');
  const weathericon = document.querySelector('.weather-icon');


  document.body.addEventListener('load', checkWeather());
//   const dateObject = new Date();

// let date = dateObject.toUTCString();

// console.log(date);
function convertTimeStamp(timestamp, timezone){
  const convertTimezone = timezone / 3600; // convert seconds to hours 

 const date = new Date(timestamp * 1000);
 
 const options = {
     weekday: "long",
     day: "numeric",
     month: "long",
     year: "numeric",
     hour: "numeric",
     minute: "numeric",
     timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
     hour12: true,
 }
 return date.toLocaleString("en-US", options)

}

  search.addEventListener("submit" ,(e)=>{
    e.preventDefault();
    city= searchbox.value;
    checkWeather(city);
    searchbox.value = "";
   
  })
   async function checkWeather(city) {
     const responce =await fetch(apiUrl + city + `&units=${units}`+ `&APPID=${apikey}`);
     if( responce.status == 404){
         document.querySelector('.error').style.display='block'
         
     }
     else{
     var data =await responce.json();
     const weatherState =data.weather[0].main;
     const sunriseTimestamp = data.sys.sunrise * 1000;
     const sunsetTimestamp = data.sys.sunset * 1000; 
   // Get the current time in milliseconds
   const currentTime = new Date().getTime();

   // Determine whether it is daytime or nighttime based on the current time
   const isDaytime = currentTime > sunriseTimestamp && currentTime < sunsetTimestamp;

 console.log(data);
 document.querySelector('.weather-forecast').innerHTML =` <span>${data.weather[0].main}</span>`;
 document.querySelector('.weather-tempature').innerHTML =Math.round(data.main.temp) + '℃';
 document.querySelector('.city').innerHTML =data.name;
 document.querySelector('.min').innerHTML =`Min: ${data.main.temp_min.toFixed()}` + '&#176c';
 document.querySelector('.max').innerHTML =`Max: ${data.main.temp_max.toFixed()}` +`&#176c`;
 document.querySelector('.weather__humidity').innerHTML =data.main.humidity +'%';
 document.querySelector('.weather__wind').innerHTML =data.wind.speed +'km/h';
 document.querySelector('.weather__realfeel').innerHTML =data.main.feels_like +'%';
 document.querySelector('.weather__pressure').innerHTML =data.main.pressure +'hpa';
 document.querySelector('.weather-icon').innerHTML=`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`;
 document.querySelector('.weather-datetime').innerHTML =convertTimeStamp(data.dt , data.timezone);
 updateBackground(weatherState,isDaytime);

}
   }
  function updateBackground (weatherState,isDaytime){
    if(isDaytime){
      switch(weatherState){
        case 'Clear':
          document.body.style.backgroundImage='url(./images/clear.webp)';
          break;
        case "Clouds":
          document.body.style.backgroundImage='url(./images/cloudy.jpeg)';
          break;
case 'Rain':
  document.body.style.backgroundImage='url(./images/rain.webp)';
  break;
default:
  document.body.style.backgroundImage='url(./images/default.webp)';


      }
    }else{
      switch(weatherState){
        case "Clouds":
          document.body.style.backgroundImage='url(./images/cloudy1.webp)';
            break;
case 'Rain':
  document.body.style.backgroundImage='url(./images/rain1.webp)';
  break;
  case 'Clear':
  document.body.style.backgroundImage='url(./images/clear1.webp)';
  break;
  default:
    document.body.style.backgroundImage='url(./images/default1.webp)';
      }
    }
  }

 
 


