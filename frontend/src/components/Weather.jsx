import { useState, useEffect } from "react"

const API_URL = import.meta.env.VITE_API_URL || 'services/'

function Weather() {
    const [weather, setWeather] = useState(null)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const token = localStorage.getItem("access")
                const response = await fetch(`${API_URL}/weather/`, {
                    headers: { "Authorization": `Bearer ${token}` }
                })

                const data = await response.json()

                if (response.ok) {
                    setWeather(data)
                } else {
                    setError("Weather could not load.")
                }
            } catch (err) {
                setError("Weather could not load.")
            }
        }

        fetchWeather()
    }, [])

    if (error) {
        return <p className="status_message error">{error}</p>
    }

    if (!weather) {
        return <p>Weather Loading....</p>
    }

    return (
        <div className="weather-container">
            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                className="weather-icon" />

            <div className="weather-info">
                <p className="weather-location">{weather.city}, {weather.region}</p>
                <p className="weather_temp">{weather.description}</p>
                <p className="weather-feels">Feels like {weather.feels_like}°F</p>
            </div>
        </div>
    )
}

export default Weather