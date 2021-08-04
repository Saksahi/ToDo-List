import React, { useEffect, useState } from 'react';


const WeatherCard = ({tempInfo}) => {
    
    const { temp ,humidity,pressure,weathermood,name,country,sunset,speed}=tempInfo;
    const [weatherState,SetWeatherState]=useState("");
    //converting sunset time (secs) to min or hrs.
    let sec=sunset;
    let date = new Date(sec * 1000);
    let timeStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    useEffect(()=>{
        if(weathermood){
            switch (weathermood) {
                case "Clouds":SetWeatherState("wi-day-cloudy")  
                    break;
                case "Rain":SetWeatherState("wi-day-rain")  
                    break;
                case "Clear":SetWeatherState("wi-day-sunny")
                    break;
                case "Haze":SetWeatherState("wi-fog")
                    break;
                case "Mist":SetWeatherState("wi-dust")
                    break;
                default:SetWeatherState("wi-day-sunny")
                    break;
            }
        }
    },[weathermood]);

    return (
        <>
            <article className="widget">
                <div className="weatherIcon">
                    <i className={`wi ${weatherState}`}></i>
                </div>
                <div className="weatherInfo">
                    <div className="temperature">
                        <span>{temp}&deg;</span>
                    </div>
                    <div className="description">
                        <div className="weatherCondition">
                            {weathermood}
                        </div>
                        <div className="place">{name},{country}</div>
                    </div>
                </div>
                <div className="date">{new Date().toLocaleString()}</div>
                <div className="extra-temp">
                    <div className="temp-info-minmax">
                        <div className="two-sided-section">
                            <p>
                                <i className="wi wi-sunset"></i>
                            </p>
                            <p className="extra-info-leftside">
                                {timeStr}<br/>sunset
                            </p>
                        </div>
                    
                        <div className="two-sided-section">
                            <p>
                                <i className="wi wi-humidity"></i>
                            </p>
                            <p className="extra-info-leftside">
                                {humidity}<br/>humidity
                            </p>
                        </div>
                        </div>
                        <div className="weather-extra-info">
                        <div className="two-sided-section">
                            <p>
                                <i className="wi wi-pressure"></i>
                            </p>
                            <p className="extra-info-leftside">
                                {pressure}<br/>pressure
                            </p>
                        </div>
                    
                        <div className="two-sided-section">
                            <p>
                                <i className="wi wi-strong-wind"></i>
                            </p>
                            <p className="extra-info-leftside">
                                {speed}<br/>speed
                            </p>
                        </div>
                        </div>
                    
                        
                    </div>
                
            </article>
        </>
    )
}

export default WeatherCard;
