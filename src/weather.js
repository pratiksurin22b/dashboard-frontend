import React, { useEffect, useState } from 'react';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState("New York"); // Default city
    const [isSettingsOpen, setIsSettingsOpen] = useState(false); // State for settings modal

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:8080/api/weather?city=${city}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(); // Fetch weather data on initial load
    }, [city]);

    const handleCityChange = () => {
        fetchWeather(); // Fetch new weather data
        setIsSettingsOpen(false); // Close settings after changing city
    };

    const getAnimationClass = (description) => {
        if (description.includes("rain")) {
            return "rain-animation";
        } else if (description.includes("thunderstorm")) {
            return "thunder-animation";
        } else if (description.includes("clear")) {
            return "clear-animation";
        } else if (description.includes("sunny")) {
            return "sunny-animation"; // New sunny animation class
        } else if (description.includes("snow")) {
            return "snow-animation";
        } else {
            return "default-animation";
        }
    };

    const getWeatherIcon = (description) => {
        if (description.includes("rain")) {
            return "🌧️";
        } else if (description.includes("thunderstorm")) {
            return "⛈️";
        } else if (description.includes("clear")) {
            return "☀️";
        } else if (description.includes("sunny")) {
            return "🌞";
        } else if (description.includes("snow")) {
            return "❄️";
        } else {
            return "🌈";
        }
    };

    // New functions to get symbols for temperature and wind speed
    const getTemperatureSymbol = () => "🌡️"; // Thermometer symbol for temperature
    const getWindSpeedSymbol = () => "💨"; // Wind symbol for wind speed

    return (
        <div className={`weather-container ${weatherData ? getAnimationClass(weatherData.description) : ''}`} style={{ position: 'relative', padding: '20px', maxWidth: '600px', margin: 'auto', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', background: '#f9f9f9' }}>
            <h1 style={{ textAlign: 'center' }}>Weather App</h1>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ marginRight: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '200px' }}
                />
                <button onClick={fetchWeather} style={{ padding: '10px', borderRadius: '4px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Get Weather</button>
                
                <button 
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)} 
                    style={{
                        marginLeft: '10px',
                        padding: '10px',
                        borderRadius: '4px',
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Settings
                </button>
            </div>

            {isSettingsOpen && (
                <div style={{
                    position: 'absolute', 
                    top: '80px', 
                    right: '10px', 
                    background: 'white', 
                    border: '1px solid #ccc', 
                    padding: '10px', 
                    zIndex: 1,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                    borderRadius: '8px'
                }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>Change City</h3>
                    <input
                        type="text"
                        placeholder="Enter new city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '180px' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button onClick={handleCityChange} style={{ marginRight: '5px', padding: '10px', borderRadius: '4px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Update City</button>
                        <button onClick={() => setIsSettingsOpen(false)} style={{ padding: '10px', borderRadius: '4px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>Close</button>
                    </div>
                </div>
            )}

            {loading && <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>}
            {error && <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>Error: {error}</div>}
            {weatherData && (
                <div style={{ marginTop: '20px', padding: '20px', background: '#e9ecef', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
                    <h2 style={{ margin: '10px 0' }}>Weather Data for {weatherData.city}</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px' }}>
                        <div style={{ marginRight: '10px' }}>{getWeatherIcon(weatherData.description)}</div>
                        <span style={{ fontSize: '24px' }}>{weatherData.description}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: '24px' }}>{getTemperatureSymbol()} {weatherData.temperature} °C</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: '24px' }}>{getWindSpeedSymbol()} {weatherData.windSpeed} km/h</span>
                            <span style={{ fontSize: '24px', marginLeft: '10px' }}><strong>Humidity:</strong> {weatherData.humidity} %</span>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .weather-container {
                    transition: background-color 0.5s ease;
                }
                .rain-animation {
                    animation: rain-animation 5s infinite;
                    background: rgba(0, 0, 255, 0.1);
                }
                .thunder-animation {
                    animation: thunder-animation 2s infinite;
                    background: rgba(255, 255, 0, 0.1);
                }
                .clear-animation {
                    animation: clear-animation 5s infinite;
                    background: rgba(135, 206, 235, 0.1);
                }
                .sunny-animation {
                    animation: sunny-animation 5s infinite;
                    background: rgba(255, 223, 0, 0.1); /* Soft sunny background */
                }
                .snow-animation {
                    animation: snow-animation 5s infinite;
                    background: rgba(255, 255, 255, 0.7);
                }
                @keyframes rain-animation {
                    0% { background: rgba(0, 0, 255, 0.1); }
                    50% { background: rgba(0, 0, 255, 0.3); }
                    100% { background: rgba(0, 0, 255, 0.1); }
                }
                @keyframes thunder-animation {
                    0%, 100% { background: rgba(255, 255,
                    0, 0); }
                    50% { background: rgba(255, 255, 0, 0.2); }
                }
                @keyframes clear-animation {
                    0%, 100% { background: rgba(135, 206, 235, 0.1); }
                    50% { background: rgba(135, 206, 235, 0.3); }
                }
                @keyframes sunny-animation {
                    0%, 100% { background: rgba(255, 223, 0, 0.1); }
                    50% { background: rgba(255, 223, 0, 0.5); }
                }
                @keyframes snow-animation {
                    0%, 100% { background: rgba(255, 255, 255, 0.7); }
                    50% { background: rgba(255, 255, 255, 1); }
                }
            `}</style>
        </div>
    );
};

export default Weather;
