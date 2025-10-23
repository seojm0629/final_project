import { useCallback, useEffect, useState } from "react";

const ForecastWeather = () => {
    const [forecastData, setForeCastData] = useState(null); //미래 날씨 데이터 저장
    const [region, setRegion] = useState(""); //사용자가 입력한 지역
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const apiKey = "0fe2985439b43837084388bfd8faf780";

    const fetchForecastData = useCallback(async () => {
        //입력된 지역이 없으면 호출하지 않음
        if(!region) return;

        setLoading(true);
        setError(null);

        //위도 경도 가져오는 Geoapi
        const geo = `http://api.openweathermap.org/geo/1.0/direct?q=${region}&limit=1&appid=${apiKey}`;
        
        try{
            const geoResp = await fetch(geo);
            const geoData = await geoResp.json();

            if(geoData.length > 0){
                //첫 번째 결과에서 위도와 경도 추출
                const {lat, lon} = geoData[0];

                const url =`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr&cnt=5`;
                const resp = await fetch(url);
                const data = await resp.json();

                if(data.cod === "200"){
                    setForeCastData(data);
                } else {
                    throw new Error(data.message);
                }
            } else {
                throw new Error("지역을 조회할 수 없습니다.");
            }
        } catch(error) {
            console.log("API호출 실패", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        setRegion(inputValue);
        setInputValue("");
    }

    useEffect(()=>{
        if(region){
            fetchForecastData();
        }
    }, [region, apiKey]);

    return(
        <div className="container">
            <div className="title">
                <h3>forecast test page</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="search-region">
                    <div className="search-weather">
                        <h3>원하는 지역을 검색해주세요 : </h3>
                        <input type="text"
                        value={inputValue}
                        onChange={(e)=>setInputValue(e.target.value)}
                        />
                        <button type="submit">검색</button>
                    </div>
                </div>
            </form>
            {loading ? (
                <p>로딩 중...</p>
            )
            :
            error ?
            (<p>{error}</p>)
            :
            (forecastData && 
            (<div className="weather-result">
                <h4>{forecastData.city.name} 날씨</h4>
                {forecastData.list.map((weather)=>(
                    <div key={"weather-" + weather.dt}>
                        <p>날짜 : {weather.dt_txt}</p>
                        <p>온도 : {weather.main.temp}˚C</p>
                        <p>상태 : {weather.weather[0].description}</p>
                    </div>
                ))}
            </div>))
            }
        </div>
    )
}
export default ForecastWeather;