import { useCallback, useEffect, useState } from "react";

const WeatherApi = () => {

    const [weatherData, setWeatherData] = useState(null); //날씨 데이터 저장
    const [region, setRegion] = useState(""); //사용자가 입력한 지역
    const [inputValue, setInputValue] = useState(""); //입력 필드의 상태   
    const [loading, setLoading] = useState(false); //로딩 상태
    const [error, setError] = useState(null); //오류 상태

    //환경 변수로 저장한 API 키 호출
    const apiKey = "0fe2985439b43837084388bfd8faf780";
    console.log("apiKey : ", apiKey);

    //fetchWeatherData 함수를 useCallBack으로 래핑
    const fetchWeatherData = useCallback(async () => {
        if(!region) return; //입력된 지역이 없으면 호출하지 않음.

        setLoading(true);
        setError(null);

        //URL 설정, &units=metric - 섭씨 변환
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${apiKey}&units=metric&lang=kr`;

        try{
            const resp = await fetch(url);
            if(!resp.ok){
                throw new Error("API 호출 실패");
            }
            const data = await resp.json();
            console.log(data);

            //날씨 데이터 상태 저장
            setWeatherData(data);
        } catch (error) {
            console.error("API 호출 실패", error);
            setError(error.message); // 오류 메시지 설정
        } finally {
            setLoading(false);
        }
        }, [region, apiKey]); // region과 apiKey를 의존성으로 추가
        
        //region이 변경될 때마다 fetchWeatherData 호출
        useEffect(()=>{
            if(region){
                fetchWeatherData();
            }
        },[region, fetchWeatherData]); // fetchWeatherData를 의존성으로 추가

        const handleSubmit = (e) => {
            e.preventDefault();

            setRegion(inputValue); //입력된 값으로 지역 업데이트
            fetchWeatherData(); //날씨 데이터 요청
        }

        return(
            <div className="container">
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
                (<p>{error}</p>) //오류메시지 표시
                :
                (weatherData && (
                    <div className="result">
                        <h4>{weatherData.name} 날씨</h4>
                        <p>온도 : {weatherData.main.temp}˚C</p>
                        <p>상태 : {weatherData.weather[0].description}</p>
                    </div>
                ))
                }
            </div>
        )
        

}

export default WeatherApi;