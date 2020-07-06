    The URL of the functional, deployed application:https://github.com/anitapeppercorn/Weather-Dashboard-Application

    The URL of the GitHub repository: https://anitapeppercorn.github.io/Weather-Dashboard-Application/
    
## README describing the project.

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. I have been tasked with retrieving data from another application's API and using it in the context of my own to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

I have been asked to se the OpenWeather API (Links to an external site: https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that provides basic setup and usage instructions. I have used localStorage to store persistent data.
# An Application for a Weather Dashboard
I have utilized weathermap API to create a simple weather forecasting app. 

Approach:
When a new city is submitted within the input form: 
1.  We insert the value into the query url and run it through ajax
2.  We create a button and add it to the list of the name of the city. When this button is clicked again, we  run it through queryURL again
3.  We use Get to fetch the information and use .text ( ) to show the information on info screen. We use Moment.js for the date on the title
4.  We use an API call to get the 5 day forecast and then render it on  a new card. Since UV index is a different api documentation, make a new function inside displaycurrentinfo that takes the longitude and latitude from the response parameter and put them inside UV index api. Render the UV index number and color  then return the function using closure so we can pass the response to UV index function as parameter
5. We use Moment.js JS to manipulate add feature to set the future date

#User Story
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
#Acceptance Criteria
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

Mock-Up: The Mockup image shows the web application's appearance and functionality:

weather dashboard demo

Grading Requirements
This challenge is graded based on the following criteria:

1. Technical Acceptance Criteria: 40%
    Satisfies all of the above acceptance criteria plus the following:

    Uses the OpenWeather API to retrieve weather data

    Uses localStorage to store persistent data

2. Deployment: 32%
    Application deployed at live URL

    Application loads with no errors

    Application GitHub URL submitted

    GitHub repository that contains application code

3. Application Quality: 15%
    Application user experience is intuitive and easy to navigate

    Application user interface style is clean and polished

    Application resembles the mock-up functionality provided in the Challenge instructions

4. Repository Quality: 13%
    Repository has a unique name

    Repository follows best practices for file structure and naming conventions

    Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

    Repository contains multiple descriptive commit messages

    Repository contains quality README file with description, screenshot, and link to deployed application

5. How to Submit the Challenge
    You are required to submit BOTH of the following for review:

    The URL of the functional, deployed application.

    The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.



