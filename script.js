// Event listener for the Search button (search by city)
document.getElementById('searchBtn').addEventListener('click', getWeather);

// Event listener for the Location button (search by geolocation)
document.getElementById('locationBtn').addEventListener('click', getWeatherByLocation);

// Function to get weather by city name
async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);  // Display weather info on the page
    } catch (error) {
        console.error("Error fetching weather data: ", error);
        alert("An error occurred while fetching weather data.");
    }
}

// Function to get weather based on geolocation
async function getWeatherByLocation() {
    if (navigator.geolocation) {
        // Get current position
        navigator.geolocation.getCurrentPosition(async function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                displayWeather(data);  // Display weather info on the page
            } catch (error) {
                console.error("Error fetching weather data: ", error);
                alert("An error occurred while fetching weather data.");
            }
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to display weather data on the page
function displayWeather(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Show weather info section
    document.getElementById('weatherInfo').style.display = 'block';
}
