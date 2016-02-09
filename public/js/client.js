var WeatherReport = function(city){
  this.url = 'http://localhost:3000/weather/' + city;
  this.data;
}

WeatherReport.prototype = {
  get: function(callback){
    var that = this;
    var request = new XMLHttpRequest();
    request.open('GET', this.url);
    request.onload = function(){
      that.data = JSON.parse(request.responseText);
      callback();
    }
    request.send(null);
  }
}

window.onload = function(){

  var form = document.getElementById('weatherSearch');
  var input = document.getElementById('weatherInput');
  var weatherView = document.querySelector('.weatherDisplay');
  var savedLocations = JSON.parse(localStorage.getItem('savedLocations')) || []; 
  var savedLocationsView = document.getElementById('savedLocations');

  var displayLocations = function(){
    savedLocationsView.innerHTML = "";
    console.log(savedLocations);
    savedLocations.forEach(function(e, i){
      console.log(e);
      var link = document.createElement('a');
      link.innerText = e;
      link.href = "http://localhost:3000/weather/" + e;
      savedLocationsView.appendChild(link);
    })
  }

  form.onsubmit = function(event){
    event.preventDefault();
    var city = input.value;
    var currentReport = new WeatherReport(city);

    currentReport.get(function(){
      var data = currentReport.data;
      var weatherDisplay = "<h4>" + city + "</h4><img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'><br>Weather: " + data.weather[0].main + "<br>Temperature: " + data.main.temp + " C <br><button id='addLocation'>Add to saved locations</button>";
      weatherView.innerHTML = weatherDisplay;

      var button = document.querySelector('#addLocation');

      button.onclick = function(event){
        event.preventDefault();
        savedLocations.push(city);
        localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
        displayLocations();
      }
    });
}
    // displayLocations();
  }
  
  