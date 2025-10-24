import axios from "axios";
import { useEffect, useState } from "react";
import "../utils/weather.css";
import { Button } from "@mui/material";

const OpenWeather = () => {
    const [weather, setWeather] = useState(null);
    const [dayYN, setDayYN] = useState(true);
    const [city, setCity] = useState("");
    const cities = ["seoul", "busan"]
    

    const apiKey = "0fe2985439b43837084388bfd8faf780";

    //브라우저 내장 객체(navigator)
    //navigator를 geolocation을 사용하면 지리적 정보를 얻을 수 있음.
    const getCurrentLocation = () =>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                
                

                axios
                .get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr&cnt=5`)
                .then((res)=>{
                    console.log(res)
                    setWeather(res.data);

                    
                })
                
            });
        } else {
            alert("위치정보 사용 불가능");
        }
    }

    

    useEffect(() => {
        getCurrentLocation();
    }, [])

    const getWeatherByCity = () => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;

        axios
        .get(url)
        .then((res) => {
            console.log(res.data);
            setWeather(res.data);

            let dt = res.data.dt;
            let time = new Date(dt*1000);
            let hours = time.getHours();

            if(hours > 7 && hours < 19){
                setDayYN(true);
            } else {
                setDayYN(false);
            }

            
        })
    }

    useEffect(() => {
        if(city === ""){
            getCurrentLocation();
        } else {
            getWeatherByCity();
        }
    }, [city])
    return(
        <div className="app">
            
            <div className="weather-container">
                {weather && <WeatherBox weather={weather}></WeatherBox>}
                <WeatherButton cities={cities} setCity={setCity}></WeatherButton>
            </div>
        </div>
    )
}

const WeatherBox = ({ weather }) => {
    return(
        <div className="weather-box">
            <div className="weather-data">
                <div>{weather?.name}</div>
                <h1>{`${Math.round((weather?.main.temp) * 10) / 10}˚C`}</h1>
                <div>{weather?.weather[0].description}</div>
            </div>
            <div className="weather-img-wrap">
                <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}/>
            </div>
        </div>
    )
}

const WeatherButton = ( {cities, setCity }) => {
    

    return(
        <div className="weather-buttons">
            <Button variant="primary" onClick={()=>setCity("")}>내 위치</Button>
            {
                cities.map((city, idx) => {
                    return <Button key={"idx- " + idx} variant="primary" onClick={() => setCity(city)}>{city}</Button>
                })
            }
        </div>
    )
}

export default OpenWeather;