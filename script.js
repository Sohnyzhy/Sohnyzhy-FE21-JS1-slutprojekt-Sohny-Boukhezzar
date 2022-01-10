async function fetchWeather(city) {
	const future = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=24241ff129a14a6e89b228fa89e946f5&lang=sv&days=6&city=${city}`)
	.then(function(response) {
		if(response.status == 200){
			$(".error").hide();
			return response.json();
		}
		else{	
			$(".error").show();
		}
	  }).then(function(data) {
		return data;
	  });
	  return future;

}
async function fetchWeatherCurrent(city) {
	const current = await fetch(`http://api.weatherbit.io/v2.0/current?key=24241ff129a14a6e89b228fa89e946f5&lang=sv&city=${city}`)
	
	const result = await current.json();
	return result
}



function search() {
	fetchWeather(document.querySelector(".search-bar").value).then(data => {
		weather.displayWeather(data);
		weather.daily(data);
	});
}

function searchCurrent() {
	fetchWeatherCurrent(document.querySelector(".search-bar").value).then(data => {
		weather.displayWeather(data);
		weather.daily(data);
	});
}
let weather = {
	displayWeather: function(data) {
		if(data != undefined){
			let result = data.data[0]
			document.querySelector(".city").innerText = "Väder i " + data.city_name;
			document.querySelector(".icon").src = `https://www.weatherbit.io/static/img/icons/${result.weather.icon}.png`
			document.querySelector(".description").innerText = result.weather.description;
			document.querySelector(".temp").innerText = result.temp + "°C";
			document.querySelector(".timezone").innerText = `Vindriktning: ${result.wind_cdir_full}`;
			document.querySelector(".wind").innerText = `Vind: ${result.wind_spd} km/h`;
			document.querySelector(".air").innerText = `Luftfuktighet ${result.rh} %`;
			document.querySelector(".sunrise").innerText = `${result.valid_date}`;
			document.querySelector(".sunset").innerText = `Snörisk   ${result.snow} %`;
			$(".weather").removeClass("loading")
			$("body").css("background-image", "url(" + `https://source.unsplash.com/1600x900/?${data.city_name}` + ")")

		}
	
	},
	daily: function(data) {
		if (data!= undefined) 
			{
			document.querySelector(".dateone").innerText = data.data[1].datetime;
			document.querySelector(".day1temp").innerText = data.data[1].weather.description;
            document.querySelector(".tempone").innerText = data.data[1].temp + "°C";
			document.querySelector(".date").innerText = data.data[2].datetime;
			document.querySelector(".daytwotemp").innerText = data.data[2].weather.description;
            document.querySelector(".temptwo").innerText = data.data[2].temp + "°C";
			document.querySelector(".datethree").innerText = data.data[3].datetime;
			document.querySelector(".daythreetemp").innerText = data.data[3].weather.description;
            document.querySelector(".tempthree").innerText = data.data[3].temp + "°C";
			document.querySelector(".datefour").innerText = data.data[4].datetime;
			document.querySelector(".dayfourth").innerText = data.data[4].weather.description;
			document.querySelector(".tempfour").innerText = data.data[4].temp + "°C";
            document.querySelector(".datefive").innerText = data.data[5].datetime;
			document.querySelector(".dayfive").innerText = data.data[5].weather.description;
			document.querySelector(".tempfive").innerText = data.data[5].temp + "°C";
            


			$.each($(".iman"), function(index) {
				$el = $(this);
				$el.attr("src", `https://www.weatherbit.io/static/img/icons/${data.data[index].weather.icon}.png`)
			})
		}
	}
}
document.querySelector(".search button").addEventListener("click", function(event) {
	event.preventDefault()
	search();
});
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
	event.preventDefault()
	if (event.key == "Enter") {
		search();
	}
});