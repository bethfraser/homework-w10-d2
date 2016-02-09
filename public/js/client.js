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
  // var books = JSON.parse(localStorage.getItem('books')) || []; 
  // var storedBooksView = document.getElementById('storedBooks');

  form.onsubmit = function(event){
    event.preventDefault();
    var city = input.value;
    var currentReport = new WeatherReport(city);

    currentReport.get(function(){
      var data = currentReport.data;
      var weatherDisplay = "<h4>" + city + "</h4><img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'><br>Weather: " + data.weather[0].main + "<br>Temperature: " + data.main.temp + " C";
      weatherView.innerHTML = weatherDisplay;

      // document.querySelector('#addBook').onclick = function(){
      //   books.push(data);
      //   localStorage.setItem('books', JSON.stringify(books));
      //   displayBooks();
      })
    };

  }
  
  