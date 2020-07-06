
$(document).ready(function() {
   var date = moment().format('L');
 
//function to handle event when search button is clicked
   $("#getWeatherInformationfor-city-button").on("click", function(event) {
       event.preventDefault();
       // This line grabs the input from the textbox
       var city = $("#cityWeather-input").val().trim();       
       //push the value so the button can be recreated through local storage.
       saveCityStore.push(city);
       storeButtons()
       // Adding cities from the textbox to array
        renderCurrentInformation(city);
       renderFutureInformation(city);
       renderButtons(city);
       //store the value of the last searched city in local storage
       var cityName = $("#cityWeather-input").val();
       storeInput(cityName);
       //clear input form after submission
       $("#cityWeather-input").val("");
   });


//render city history buttons when the search button is clicked
   function renderButtons(city){
       var createButtons = $("<button>");
       //add class to each buttons
       createButtons.addClass("cityButtons btn btn-block");
       createButtons.attr("data-name", city);
       createButtons.text(city);
       //prepend the city name into the div
       $("#search-history").prepend(createButtons);
   }
  
//display the selected city's current weather info
   function  renderCurrentInformation(cityName){
       var apiKey = "bb91369dec28d018f1972d9d7d97b6c1";
       var urltoFetch = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=" + apiKey;
       //Fetch is compatible with all recent browsers including Edge, but not with Internet Explorer. Therefore, if you are looking for maximum compatibility, you will continue to use Ajax to update a web page. If you also want to interact with the server, the WebSocket object is also more appropriate than fetch 
       $.ajax({
       url: urltoFetch,
       method: "GET"
       }).then(function(response) {
           var iconCode = response.weather[0].icon;
           var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
           var renderIcon = $("<img>").attr("src", iconurl);
           var tempF = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(1);
           $(".city").text(response.name +"  ("+date +")")
           $(".city").append(renderIcon);
           $(".temperature").text("Temperature:  " + tempF + " °F");
           $(".humidity").text("Humidity:  "+ response.main.humidity + "%");
           $(".wind-speed").text("Wind speed:  "+ response.wind.speed + "MPH");     
 
           //get city coordinate
           var lat = response.coord.lat;
           var lon = response.coord.lon;
 
            //function to findout the UV index of city based on its coordinate using closure
           var uvIndex = function(lat, lon){
               var urltoFetchUV = "http://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey +"&lat="+ lat +"&lon="+ lon;
               //continue to use Ajax to update a web page
               $.ajax({
                   url: urltoFetchUV,
                   method: "GET"
                   }).then(function(response) {
                       console.log(response)
                       var uvValue = response.value;
                       //Identify UV Safety Levels
                       var uvSafety = $("<span>").attr("id", "uvSafety").addClass("badge");
                       uvSafety.text(uvValue);
                        if (uvValue <= 2){
                           uvSafety.addClass("favorable");
                       }else if (uvValue >=3 && uvValue <=7){
                           uvSafety.addClass("moderate");
                       }else{
                           uvSafety.addClass("severe");
                       }
                        $(".uv-index").text("UV Index:  " );
                       $(".uv-index").append(uvSafety);
                    })
           }
           //call uvIndex function
           uvIndex(lat,lon);
       })
   }
 



   //function to display the next 5 days weather forecast of the selected city
   function renderFutureInformation(cityName){
       var apiKey = "bb91369dec28d018f1972d9d7d97b6c1";

       var urltoFetch = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityName +"&appid=" + apiKey;
       //continue to use Ajax to update a web page
       $.ajax({
       url: urltoFetch,
       method: "GET"
       }).then(function(response) {
           //clean up the previous elements
           $("#forecast").empty();
           console.log(response);
           var index = [3,11,19,27,35];
           for(var i = 0; i < index.length; i++){
               //create content
               var createDiv = $("<div class = 'card'>");
               var lineBreak = $("<br>");
               var futureTime = moment().add(i+1, 'd').format('L');
               var pTime = $("<h5>").text(futureTime);
               createDiv.append(pTime, lineBreak);
               var iconCode = response.list[index[i]].weather[0].icon;
               var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
               var renderIcon = $("<img>").attr("src", iconurl);
               renderIcon.css("width", "50px");
               createDiv.append(renderIcon, lineBreak);
               var temp = ((response.list[index[i]].main.temp - 273.15) * 1.80 + 32).toFixed(2);
               var pTemp = $("<p>").text("Temp: " + temp + " °F");
               createDiv.append(pTemp, lineBreak);
               var humidity = response.list[index[i]].main.humidity;
               var pHumid = $("<p>").text("Humidity: " + humidity);
               createDiv.append(pHumid);
             
               $("#forecast").append(createDiv);
           }    
       })
   }
 
//function that renders information on pressing the stored button as an event
   $(document).on("click", ".cityButtons", function(event) {
       event.preventDefault();
       var cityName = $(this).attr("data-name");
       saveCityStore.push(cityName);
        renderCurrentInformation(cityName);
       renderFutureInformation(cityName);
   })
 





//storage information
   function storeInput(cityName){
       localStorage.setItem("Last city searched", cityName);
   }
    renderCurrentInformation(localStorage.getItem("Last city searched"));
   renderFutureInformation(localStorage.getItem("Last city searched"));
    var saveCityStore = JSON.parse(window.localStorage.getItem("history")) || [];
 
   if(saveCityStore.length > 0){
    renderCurrentInformation(saveCityStore[saveCityStore.length - 1])
   }
 
   for(var i = 0; i < saveCityStore.length; i++){
       renderButtons(saveCityStore[i]);
   }
 




 //when city stored button is clicked, we run through rederInfomation functions to render the info
   function storeButtons(){
       localStorage.setItem("history", JSON.stringify(saveCityStore));
   }

})
