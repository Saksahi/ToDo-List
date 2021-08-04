import React, { useState,useEffect } from 'react';
import "./style.css";
import WeatherCard from './WeatherCard';

const Temp = () => {

    const [searchVal,setSearchVal]=useState("Patna");
    const [tempInfo,setTempInfo]=useState({});

    const getWeatherInfo=async()=>{
        try {
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&units=metric&appid=ab1eb2196c1696af7344ba53cef9b6d2`;

            const res= await fetch(url);
            const data= await res.json();
            console.log(data);

            const {temp ,humidity,pressure}=data.main;
            const {main:weathermood}=data.weather[0];
            const {name}=data;
            const {speed}=data.wind;
            const {country,sunset}=data.sys;

            const newWeatherInfo={
                temp,humidity,pressure,weathermood,name,country,sunset,speed
            };
            setTempInfo(newWeatherInfo);

        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
          getWeatherInfo();
    }, []);

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input
                      type="search"
                      placeholder="search...     🔍"
                      autoFocus
                      id="search"
                      className="searchTerm"
                      value={searchVal}
                      onChange={(event)=>{setSearchVal(event.target.value)}}
                      />
                      <button 
                      className="searchButton" 
                      type="button"
                      onClick={getWeatherInfo}
                      >search
                      </button>
                </div>
            </div>
            <WeatherCard tempInfo={tempInfo}/>
        </>
    )
}

export default Temp;
