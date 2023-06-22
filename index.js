const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '4633e5ed1d31aee144d9bf8b3ea23d2b';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
 

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });
});
/*
The provided code appears to be a JavaScript snippet that fetches weather data from the OpenWeatherMap API based on the city entered in a search input field. It then updates the weather information on the web page.

Here's a breakdown of how the code works:

1. It selects the necessary HTML elements from the page using the `document.querySelector` method and assigns them to variables: `container`, `search`, `weatherBox`, `weatherDetails`, and `error404`.

2. An event listener is attached to the `search` element, listening for a click event.

3. Inside the event listener callback function, the API key and city input value are retrieved.

4. If the `city` input value is empty, the function returns early and does nothing.

5. If the `city` input value is not empty, a `fetch` request is made to the OpenWeatherMap API using the `fetch` function. The URL includes the `city` value and the API key. The API response is handled using Promise chaining.

6. The response is converted to JSON using the `response.json()` method.

7. The resulting JSON data is then used to update the weather information on the web page.

   - If the API response indicates an error with a "404" code, indicating that the city was not found, the appropriate elements are manipulated to display an error message and hide the weather information.

   - If the API response is successful and the weather data is available, the appropriate elements are manipulated to display the weather information. The weather image, temperature, description, humidity, and wind speed are updated based on the received JSON data.

8. CSS classes are added to trigger animations for fading in the weather box and weather details.

9. The container height is adjusted to accommodate the displayed weather information.

Overall, this code fetches weather data from the OpenWeatherMap API based on the user's input and updates the weather information on the webpage dynamically. Note that in order to use this code, you would need to replace `'Your Api Key'` with your actual OpenWeatherMap API key.
*/