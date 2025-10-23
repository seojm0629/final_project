import { useState } from "react";

const WeatherApi = () => {

    const [weatherData, setWeatherData] = useState(null); //날씨 데이터 저장
    const [region, setRegion] = useState(""); //사용자가 입력한 지역
    const [inputValue, setInputValue] = useState(""); //입력 필드의 상태   
    const [loading, setLoading] = useState(false); //로딩 상태
    const [error, setError] = useState(null); //오류 상태

    //환경 변수로 저장한 API 키 호출
    const apiKey = import.meta.env.REACT_APP_WEATHER;
    console.log("apiKey : ", apiKey);
    

}

export default WeatherApi;