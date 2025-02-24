---
sidebar_position: 4
tags:
  
  - python
  - node.js
  - vue.js
  - machine-learning
---
import StarRepo from '@site/src/components/StarRepo.js';

<StarRepo itemId="1" />

## Building a Polyglot Weather Dashboard with MetaCall
In this tutorial, you will learn how to build a **weather dashboard** by integrating **Node.js** for API handling and **Python** for weather analytics. This project demonstrates how to leverage multiple programming languages in a seamless manner using **MetaCall**.
## Tutorial Overview

In this tutorial, you'll learn how to create a weather dashboard by integrating Node.js and Python using MetaCall. You will cover:

- Installing MetaCall.
- Writing Python functions for weather analytics.
- Calling Python functions from a Node.js backend.
- Deploying the solution to the cloud for real-time weather data processing.




## Installing MetaCall
MetaCall enables the execution of functions from different programming languages in a single project. Before proceeding, ensure that **MetaCall** is installed. Follow the [MetaCall's installation guide](/docs/category/installating-metacall-cli). to set it up.

### What We Are Building?


#### A **Weather dashboard** that combines different programming languages to provide weather insights. Here's how it works:

- **Node.js Backend:** Handles API requests and serves data.
- **Python Analytics Module:** Performs data analysis using libraries like `pandas` and `NumPy`.
- **MetaCall Integration:** Executes Python functions inside the Node.js backend.
- **Vue.js Frontend (Optional):** Displays weather data in a user-friendly UI.

### **Why Use Python in a Node.js Project?**
While JavaScript excels at handling API requests, Python offers advanced data processing libraries that are essential for weather analytics. By using MetaCall, you can integrate the best of both worlds: **Node.js** for API handling and **Python** for analytics.

---

## Installing Project Dependencies
Before writing any code, let's install the necessary libraries.


### **Step 1: Install Node.js Dependencies**
Run the following command in your project folder:

```sh
npm install express axios
```

### **Step 2: Install Python Dependencies**
For weather data analysis,u should download This File
[Requirements](https://github.com/metacall/weather-dashboard-example/blob/main/backend/requirements.txt)
 
 Run the following command in your project folder:

```sh
metacall pip install -r requirements.txt
```

Now, we are ready to write some code! 🚀

---

## 📝 4. Writing the Python Weather Analysis Script
We'll write a simple Python Script to **analyze weather data** using `Python`.
 focusing on weather analysis , trends and predictions  . The implementation includes functions to summarize the weather, detect temperature trends, and predict future temperatures using machine learning techniques and give an analysis of the current weather.
## Functions Overview
This tutorial consists of three main functions:
1. `get_weather_summary(weather_data, predicted_temp_next_day)`: Generates a summary of today’s weather and tomorrow’s predicted temperature.
2. `detect_trend(temps)`: Detects whether the temperature is increasing, decreasing, or stable.
3. `get_weather_stats(weather_data)`: give an analysis of the current weather, predict temperature,detect temperature trends and provides a weather summary.

### **Create a Python File (`weather_analysis.py`)**
```python
import statistics
import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LinearRegression
```

### 1. **Weather Analysis**
```python
def get_weather_stats(weather_data):
    temps = [item["main"]["temp"] for item in weather_data["list"]]
    avg_temp = round(statistics.mean(temps), 2)   
    
    timestamps = np.arange(len(temps)).reshape(-1, 1)

    if len(temps) < 3:
        return {"error": "Not enough data to predict", "language": "Python"}

    # Use Polynomial Regression 
    model = make_pipeline(PolynomialFeatures(degree=2), LinearRegression())
    model.fit(timestamps, temps)

    # Predict next day's temperature
    next_time_index = np.array([[len(temps)]]).reshape(-1, 1)
    predicted_temp = round(model.predict(next_time_index)[0], 2)
    trend = detect_trend(temps)
    weather_summary = get_weather_summary(weather_data, predicted_temp)

    return {
        "average_temperature": round(np.mean(temps), 2),
        "max_temp": round(np.max(temps), 2),
        "min_temp": round(np.min(temps), 2),
        "predicted_temp_next_day": round(predicted_temp, 2),
        "trend": trend,
        "summary": weather_summary["summary"],
        "average_temperature": avg_temp
    }
```

### Explanation
- Extracts temperature data from `weather_data` from `OpenWeather`.
- Uses polynomial regression (degree 2) for improved trend analysis.
- Predicts the next day’s temperature.
- Calls `detect_trend` to determine the general trend.
- Returns a structured weather report with key statistics and avg temps.


---
### 2. Detecting Temperature Trends
```python
def detect_trend(temps):
    """Detect whether the temperature trend is increasing, decreasing, or stable."""
    trend = np.polyfit(range(len(temps)), temps, 1)[0]
    if trend > 0:
        return "increasing"
    elif trend < 0:
        return "decreasing"
    return "stable"
```

### Explanation
- Uses `numpy.polyfit` to compute a linear trend line.
- Determines whether the overall trend is increasing, decreasing, or stable.

---
### 3. Generating a Weather Summary
```python
def get_weather_summary(weather_data, predicted_temp_next_day):
    """Generate a summary of today's weather and tomorrow's predicted temperature."""
    temps = [item["main"]["temp"] for item in weather_data["list"]]

    if len(temps) < 16:
        return {"error": "Not enough data to predict", "language": "Python"}
    
    today_temps = temps[:8]
    max_temp_today = int(round(max(today_temps)))
    min_temp_today = int(round(min(today_temps)))
    predicted_temp = int(round(predicted_temp_next_day))

    # Identify temperature trend
    is_steadily_increasing = all(today_temps[i] < today_temps[i + 1] for i in range(len(today_temps) - 1))
    is_steadily_decreasing = all(today_temps[i] > today_temps[i + 1] for i in range(len(today_temps) - 1))

    if is_steadily_increasing:
        summary = f"Weather Today: Temperatures will gradually rise, peaking at {max_temp_today}°C."
    elif is_steadily_decreasing:
        summary = f"Weather Today: Temperatures will gradually drop, reaching a low of {min_temp_today}°C."
    else:
        summary = f"Weather Today will be warmer with a high of {max_temp_today}°C and a low of {min_temp_today}°C."
    
    # Add tomorrow's prediction
    summary += f" Tomorrow, the expected temperature will be around {predicted_temp}°C."

    return {
        "summary": summary,
        "max_temp_today": max_temp_today,
        "min_temp_today": min_temp_today,
        "predicted_temp_next_day": predicted_temp
    }
```

### Explanation
- Extracts temperature data from `weather_data`.
- Identifies whether the temperature is increasing, decreasing, or normal.
- Constructs a human-readable summary of the day's weather and tomorrow's forecast.

---
## Example Usage
To use these functions, provide weather data in the following format:
```python
weather_data = {
    "list": [
        {"main": {"temp": 15.0}},
        {"main": {"temp": 16.5}},
        {"main": {"temp": 18.0}},
        {"main": {"temp": 19.5}},
        {"main": {"temp": 20.0}},
    ]
}

print(get_weather_stats(weather_data))
```

### Sample Output
```json
{
    "average_temperature": 17.8,
    "max_temp": 20.0,
    "min_temp": 15.0,
    "predicted_temp_next_day": 21.5,
    "trend": "increasing",
    "summary": "Weather Today: Temperatures will gradually rise, peaking at 20°C. Tomorrow, the expected temperature will be around 21.5°C."
}
```
:::tip 🎉🎉
Now, We Created The Weather Analysis Functions We Can Move To The Node.Js Part ,Congrats!
:::
## 🌦️  Connecting to a Live Weather API (OpenWeatherMap)
Instead of using static data, let’s fetch real-time weather data from **OpenWeatherMap**.

### **Get an API Key**
1. Sign up at [OpenWeatherMap](https://openweathermap.org/).
2. Get your **API key** from the dashboard.
:::tip Info
Now, We Can Use This In Our  `Main.js` File!
:::

## 🔗 5. Calling Python Code from Node.js using MetaCall
Now, let’s integrate our Python function into a Node.js Code!

### **Create a (`main.js`) File**
```javascript
const express = require('express');
const axios = require('axios')
const { metacall } = require("metacall");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

```

```javascript
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
app.post("/analyze-weather", async (req, res) => {
    try {
        const { city } = req.body;
        if (!city) return res.status(400).json({ error: "City is required" });

        // Fetch Forecast Data from OpenWeatherMap
        const response = await axios.get(`${FORECAST_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
        const weatherData = response.data;

        // Call Python Function via MetaCall
        const analytics = await metacall("get_weather_stats", weatherData);

        const forecast = weatherData.list.slice(0, 5).map(item => ({
            date: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
            time: new Date(item.dt * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
            temperature: item.main.temp,
            description: item.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        }));

        res.json({
            forecast,
            city,
            analytics: {
                average_temperature: Math.floor(analytics.average_temperature),
                max_temp: Math.floor(analytics.max_temp),
                min_temp: Math.floor(analytics.min_temp),
                predicted_temp_next_day: Math.floor(analytics.predicted_temp_next_day),
                trend: analytics.trend,
                condition: analytics.condition,
                forechart: analytics.forecast_chart,
                summary: analytics.summary
            },
            language: analytics.language
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});
```


## How This Works
1. The user sends a `POST` request with the `city` name.
2. The API fetches weather data from OpenWeatherMap.
3. The fetched data is passed to a Python function via MetaCall.
4. The Python function analyzes the weather data and returns statistics.
5. The API formats the results and sends them back in JSON response.

## Usage
Send a POST request to the API endpoint:
```sh
curl -X POST http://localhost:5000/analyze-weather -H "Content-Type: application/json" -d '{"city": "London"}'
```
### We can Also Get AirQuality Data
```javascript
app.post("/air-quality", async (req, res) => {
    const cityName = req.body.city;
        
    if (!cityName) {
        return res.status(400).json({ error: 'City name is required' });
    }
    
    try {
        // Step 1: Get city coordinates
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${WEATHER_API_KEY}`;
        const geoResponse = await axios.get(geoUrl);
        const geoData = geoResponse.data;
        
        if (geoData.length === 0) { // Check if array is empty
            return res.status(404).json({ error: 'City not found' });
        }
        
        // Extract coordinates from first result
        const { lat, lon } = geoData[0];
        
        // Step 2: Get air quality data
        const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
        const airQualityResponse = await axios.get(airQualityUrl);
        const airQualityData = airQualityResponse.data;
        
        if (!airQualityData.list?.length) {
            return res.status(500).json({ error: 'Failed to fetch air quality data' });
        }
        
        // Step 3: Return results
        return res.json({
            city: cityName,
            aqi: airQualityData.list[0].main.aqi,
            airQualityData: airQualityData.list[0].components,
        });
        
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

```
## How This Works
1. The user sends a `POST` request with the `city` name.
2. The API fetches the city's coordinates from OpenWeatherMap using the geo-location API
3. The API then fetches air quality data based on the coordinates.
4. The fetched air quality data is returned in the response.

## Usage
Send a POST request to the API endpoint:
```sh
curl -X POST http://localhost:3000/air-quality -H "Content-Type: application/json" -d '{"city": "London"}'
```
:::info Info
Congrats! You created the main functions for the weather app.  
You can see the full functions implementation [here](https://github.com/metacall/weather-dashboard-example).

:::
---

## 🛠️ 7. Testing MetaCall FaaS Locally
Before deploying, let’s ensure our function works with MetaCall locally.

Run the following command:

```sh
metacall main.js
```

This verifies that MetaCall can execute our function without errors.

---

## ☁️ 8. Deploying to MetaCall FaaS (Serverless Deployment)
Now, let's deploy our Python function to the **MetaCall Cloud** so it can be used anywhere!

### **Step 1: Log in to MetaCall Cloud**
Go to [MetaCall Dashboard](https://dashboard.metacall.io) and log in or sign up.

### **Step 2: Upload Your Python Script**
1. Navigate to the **Deployments** section.
2. Click **Upload Function** and select `weather_analysis.py`.

### **Step 3: Get Your API Endpoint**
- MetaCall will generate a **public API URL** for your function.
- Copy this URL to use it in your Node.js backend.

### **Step 4: Modify `main.js` to Use the Cloud API**
Replace the local MetaCall call with an HTTP request to your cloud function:
inside the weather/analyze
- from:
```javascript
 const analytics = await metacall("get_weather_stats", weatherData);
```
- to:
```javascript
    const analytics = await axios.post('YOUR_METACALL_API_URL', { args: [weatherData] });
```

### **Step 5: Run Your Backend Again**
```sh
metacall main.js
```

Now, your **Node.js backend is using the metacall Faas Function**! 🚀

---
## Additional Steps
### Display Weather Data Inside Frontend with Vue.js
Now let's create the frontend with Vue.js to display the weather data in a user-friendly interface.
### Step 1: Create a Vue.js App
If you don’t have Vue CLI installed, you can install it with the following:
```sh
npm install -g @vue/cli
```
Create a new Vue project:
```sh
vue create [projectname]
```
Once the project is created, navigate to the project folder:
```sh
cd [projectname]
```
### Step 2: Install Axios in Vue
Install Axios to make HTTP requests to the Node.js backend:
```sh
npm install axios
```
### Step 3: Modify App.vue
add the following template content:
```html
<template>
  <div id="app">
    <h1>Climatic Weather Dashboard</h1>
    
    <!-- Weather Info Section -->
    <div v-if="weatherData">
      <p><strong>City:</strong> {{ weatherData.name }}</p>
      <p><strong>Temperature:</strong> {{ weatherData.main.temp }}°C</p>
      <p><strong>Weather:</strong> {{ weatherData.weather[0].description }}</p>
    </div>

    <div v-else>
      <p>Loading weather data...</p>
    </div>

    <!-- Weather Analysis Section -->
    <div v-if="weatherSummary">
      <h2>Weather Analysis</h2>
      <pre>{{ weatherSummary }}</pre>
    </div>

    <!-- Air Quality Section -->
    <div v-if="air_quality">
      <h2>Air Quality</h2>
      <ul>
        <li v-for="(item, index) in air_quality.airQualityData" :key="index">
          <strong>{{ item.pollutant }}:</strong> {{ item.value }}
        </li>
      </ul>
    </div>

    <!-- Loading and Error Messages -->
    <div v-if="loading">Loading...</div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

```
:::info info
Next, add the script to handle the logic and data fetching
:::
```js
<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Reactive variables
const weatherData = ref(null);
const weatherSummary = ref(null);
const air_quality = ref(null);
const loading = ref(false);
const errorMessage = ref("");
const city = ref("London");

// Fetch Weather Data
const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`http://localhost:3000/weather?city=${city}`);
    weatherData.value = response.data;
  } catch (error) {
    errorMessage.value = "Error fetching weather data.";
  }
};

// Fetch Weather Analysis
const fetchWeatherAnalysis = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch("http://localhost:5000/weather/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: city.value }),
    });

    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    weatherSummary.value = data;

  } catch (error) {
    errorMessage.value = "Error fetching weather analysis.";
  } finally {
    loading.value = false;
    skeleton.value = false;
  }
};

// Fetch Air Quality
const fetchAirQuality = async (city) => {
  try {
    const response = await fetch("http://localhost:5000/air/quality", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city }),
    });

    const data = await response.json();

    // Convert airQualityData (object) to an array of objects,
    // then limit it to the first 5 items.
    const airQualityArray = Object.entries(data.airQualityData)
      .map(([pollutant, value]) => ({
        pollutant,
        value: Number(value),  // Convert value to number if needed
      }))
      .slice(0, 4); // Take only the first 4 entries

    air_quality.value = {
      ...data,
      airQualityData: airQualityArray,
    };

  } catch (error) {
    console.error("Error fetching air quality:", error);
  }
};

// Call functions on component mount

</script>
```
### Styling(Optional)
For styling, you can add your custom styles inside the `<style>` tag within WeatherDashboard.vue. For example:
```css
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
```
:::tip
This will style your weather dashboard. Customize it according to your preferences.
:::
---
## Conclusion
Congratulations! 🎉 You’ve built a polyglot weather dashboard using Node.js, Python, and MetaCall for seamless cross-language execution. You learned how to:

- Integrate **Node.js** with **Python** for weather analytics.
- Use **MetaCall** to run Python code within the Node.js backend.
- Fetch and process live weather data from an external API.
- Deploying to **MetaCall** FaaS (Serverless Deployment)
- Display weather predictions and analysis with Python’s data-processing capabilities.

## Next Steps
Now that you've completed the core functionality, you can further enhance your weather dashboard by:

- Adding more sophisticated weather analysis and forecasting models in Python.
- Enhancing the UI with **Vue.js** for real-time data updates.
- Deploying your project to the cloud to make it accessible anywhere.
- Experimenting with other data sources and incorporating machine learning models for more accurate predictions.

## Get Involved
If you're interested in contributing to this project or exploring more about polyglot programming with MetaCall, feel free to check out the official **[MetaCall documentation](https://metacall.io/docs)** and **[GitHub repository](https://github.com/metacall)**.

### See the Full Implementation
To explore the complete code and structure of this project, check out the full implementation on GitHub:  
**[Weather Dashboard Project on GitHub](https://github.com/metacall/weather-dashboard-example)**

### Share Your Work
Once you've customized the tutorial or added your own enhancements, share your project with the community! You can create a pull request or link to your repository in the comments.

We hope this tutorial helped you understand how to seamlessly integrate Python and Node.js using MetaCall. Happy coding! 🚀
### Don't forget to star the repo and share your experience! 😃
---
