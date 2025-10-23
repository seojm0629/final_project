import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginIdState, memberTypeState } from "../utils/RecoilData";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import axios from "axios";
import FindIdModal from "../member/FindIdModal";
import FindPwModal from "../member/FindPwModal";
import AllMemberChat from "../utils/AllMemberChat";
import { DiffCount } from "../admin/ContentStatistics";
import "../admin/contentStatistics.css";
import WeatherApi from "../utils/WeatherApi";
import ForecastWeather from "../utils/ForecastWeather";

const Main = () => {
    //login 정보 가져와야함
    // 로그인 정보
    const [memberId, setMemberId] = useRecoilState(loginIdState);
    const [memberType, setMemberType] = useRecoilState(memberTypeState);

    const [member, setMember] = useState({
        memberId : memberId,
        memberEmail : "",
    })
    useEffect(()=>{
        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/member/${memberId}`)
        .then((res)=>{
            setMember(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const navigate = useNavigate();
    const toLogin = () => {
        navigate("/member/login");
    }
    const logout = () => {
        setMemberId("");
        setMemberType(0);
        delete axios.defaults.headers.common["Authorization"];
        window.localStorage.removeItem("refreshToken");
        navigate("/");
    }


    //--------- 자유게시판 리스트
    const backServer = import.meta.env.VITE_BACK_SERVER;
    
    // 자유게시판 리스트
    const [freeBoardList, setFreeBoardList] = useState([]);
    // 중고거래 게시판 리스트
    const [tradeBoardList, setTradeBoardList] = useState([]);
    // 자유게시판 카테고리 리스트
    const [freeBoardWorkList, setFreeBoardWorkList] = useState([]);
    const [freeBoardGameList, setFreeBoardGameList] = useState([]);
    const [freeBoardHumorList, setFreeBoardHumorList] = useState([]);
    const [freeBoardHobbyList, setFreeBoardHobbyList] = useState([]);
    const [freeBoardInfoList, setFreeBoardInfoList] = useState([]);
    const [freeBoardRoutineList, setFreeBoardRoutineList] = useState([]);

    const [freeBoardCategoryNo, setFreeBoardCategoryNo] = useState(1);
    

    useEffect(() => {
        axios
        .get(`${backServer}/freeBoard/mainTitle`)
        .then((res)=>{           
            setFreeBoardList(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(() => {
        axios
        .get(`${backServer}/freeBoard/mainCategory?freeBoardCategoryNo=1`)
        .then((res) => {
            setFreeBoardWorkList(res.data);
        })
        .catch((err) => {
            console.log(err);
        })

        axios
        .get(`${backServer}/freeBoard/mainCategory?freeBoardCategoryNo=2`)
        .then((res) => {
            setFreeBoardGameList(res.data);
        })
        .catch((err) => {
            console.log(err);
        })

        axios
        .get(`${backServer}/freeBoard/mainCategory?freeBoardCategoryNo=3`)
        .then((res) => {
            setFreeBoardRoutineList(res.data);
        })
        .catch((err) => {
            console.log(err);
        })

        axios
        .get(`${backServer}/freeBoard/mainCategory?freeBoardCategoryNo=4`)
        .then((res) => {
            setFreeBoardHobbyList(res.data);
        })
        .catch((err) => {
            console.log(err);
        })

        axios
        .get(`${backServer}/freeBoard/mainCategory?freeBoardCategoryNo=5`)
        .then((res) => {
            setFreeBoardInfoList(res.data);
        })
        .catch((err) => {
            console.log(err);
        })

        axios
        .get(`${backServer}/freeBoard/mainCategory?freeBoardCategoryNo=6`)
        .then((res) => {
            setFreeBoardHumorList(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    },[freeBoardCategoryNo]) 

    useEffect(() => {
        axios
        .get(`${backServer}/tradeBoard/mainTitle`)
        .then((res)=>{     
            setTradeBoardList(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    return(
        <section className="section main-page">
            <div className="main-wrap">
                
                <div className="list-box">

                    <div className="diff-count-banner">
                        <div className="diff-count-box">
                            <DiffCount />
                        </div>
                        <div className="main-weather">
                            <WeatherApi />
                            <ForecastWeather />
                        </div>
                    </div>

                    <div className="main-content-wrap">
                        <div className="main-content-board-list">
                            <div className="main-board-list">
                                {/* 중고거래 게시판, 자유게시판 */}
                                <div className="transaction-board first">
                                    <div className="main-board-header">
                                        <h4>중고거래 게시판</h4>
                                    </div>
                                    
                                    <ul className="main-board-content">
                                        <div className="main-board-title">
                                            {tradeBoardList.map((list,i)=>{
                                                return(
                                                    <li key={"main-" + i}>
                                                        <span>{list.tradeBoardTitle}</span>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                        <div className="main-board-like">
                                            {tradeBoardList.map((list,i)=>{
                                                return(
                                                    <li key={"key-" + i} className="main-board-info" >
                                                        <span>{list.memberNickname}</span>
                                                        <span>1시간전</span>
                                                        <span>좋아요</span>
                                                    </li>
                                                )
                                        })}
                                        </div>
                                    </ul>
                                    
                                    
                                    
                                </div>

                                <div className="free-board first">
                                    <div className="main-board-header">
                                        <h4>자유게시판</h4>
                                    </div>
                                    <ul className="main-board-content">
                                        
                                        <div className="main-board-title">
                                            {freeBoardList.map((list,i)=>{
                                                return(
                                                    <li key={"main-" + i} >
                                                        <span>{list.freeBoardTitle}</span>
                                                        
                                                    </li>
                                                )
                                            })}
                                        </div>
                                        <div className="main-board-like">
                                            {freeBoardList.map((list,i)=>{
                                                return(
                                                    <li key={"member-" + i} className="main-board-info">
                                                        <span>{list.memberNickname}</span>
                                                        <span>1시간전</span>
                                                        <span>좋아요</span>
                                                    </li>
                                                )
                                        })}
                                        </div>
                                    </ul>
                                </div>
                                

                            </div>

                            <div className="main-board-list">
                                {/* 직장 게시판, 게임 게시판 */}
                                <div className="work-board first">
                                    <div className="main-board-header">
                                        <h4>직장 게시판</h4>
                                    </div>
                                    <ul className="main-board-content">
                                        <div className="main-board-title">
                                            {freeBoardWorkList
                                            
                                            .map((list, i)=>{
                                                return(
                                                    <li key={"category-" + i}>
                                                        <span>{list.freeBoardTitle}</span>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                        <div className="main-board-like">
                                            {freeBoardWorkList
                                            
                                            .map((list, i)=>{
                                                return(
                                                    <li key={"category-" + i} className="main-board-info">
                                                        <span>{list.memberNickname}</span>
                                                        <span>1시간전</span>
                                                        <span>좋아요</span>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                    </ul>
                                    
                                    
                                </div>

                                <div className="game-board first">
                                    <div className="main-board-header">
                                        <h4>게임 게시판</h4>
                                    </div>
                                    <ul className="main-board-content">
                                        <div className="main-board-title">
                                            {freeBoardGameList
                                            
                                            .map((list, i)=>{
                                                return(
                                                    <li key={"category-" + i}>
                                                        <span>{list.freeBoardTitle}</span>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                        <div className="main-board-like">
                                            {freeBoardGameList
                                            
                                            .map((list, i)=>{
                                                return(
                                                    <li key={"category-" + i} className="main-board-info">
                                                        <span>{list.memberNickname}</span>
                                                        <span>1시간전</span>
                                                        <span>좋아요</span>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                    </ul>
                                </div>

                            </div>

                            <div className="main-board-list">
                                {/* 일상 게시판, 취미/여가 게시판 */}
                                <div className="routine-board first">
                                    <div className="main-board-header">
                                        <h4>일상 게시판</h4>
                                    </div>
                                    <ul className="main-board-content">
                                        <div className="main-board-title">
                                            {freeBoardRoutineList
                                            .map((list, i)=>{
                                                return(
                                                    <li key={"category-" + i}>
                                                        <span>{list.freeBoardTitle}</span>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                        <div className="main-board-like">
                                            {freeBoardRoutineList
                                            
                                            .map((list, i)=>{
                                                return(
                                                    <li key={"category-" + i} className="main-board-info">
                                                        <span>{list.memberNickname}</span>
                                                        <span>1시간전</span>
                                                        <span>좋아요</span>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                    </ul>
                                    
                                    
                                </div>

                                <div className="hobby-board first">
                                    <div className="main-board-header">
                                        <h4>취미/여가 게시판</h4>
                                    </div>
                                    <ul className="main-board-content">
                                        <div className="main-board-title">
                                            {freeBoardHobbyList
                                            .map((list, i)=>{
                                                return(
                                                    <li key={"category-" + i}>
                                                        <span>{list.freeBoardTitle}</span>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                        <div className="main-board-like">
                                            {freeBoardHobbyList
                                            
                                            .map((list, i)=>{
                                                return(
                                                    <li key={"category-" + i} className="main-board-info">
                                                        <span>{list.memberNickname}</span>
                                                        <span>1시간전</span>
                                                        <span>좋아요</span>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                    </ul>
                                </div>
                            </div>

                            <div className="main-board-list">
                                {/* 정보공유 게시판, 유머/이슈 게시판 */}
                                <div className="info-board first">
                                    <div className="main-board-header">
                                        <h4>정보공유 게시판</h4>
                                    </div>
                                    <ul className="main-board-content">
                                        <div className="main-board-title">
                                            {freeBoardInfoList
                                            .map((list, i)=>{
                                                return(
                                                    <li key={"category-" + i}>
                                                        <span>{list.freeBoardTitle}</span>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                        <div className="main-board-like">
                                            {freeBoardInfoList
                                            
                                            .map((list, i)=>{
                                                return(
                                                    <li key={"category-" + i} className="main-board-info">
                                                        <span>{list.memberNickname}</span>
                                                        <span>1시간전</span>
                                                        <span>좋아요</span>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                    </ul>
                                    
                                    
                                </div>

                                <div className="humor-board first">
                                    <div className="main-board-header">
                                        <h4>유머/이슈 게시판</h4>
                                    </div>
                                    <ul className="main-board-content">
                                        <div className="main-board-title">
                                            {freeBoardHumorList
                                            .map((list, i)=>{
                                                return(
                                                    <li key={"category-" + i}>
                                                        <span>{list.freeBoardTitle}</span>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                        <div className="main-board-like">
                                            {freeBoardHumorList
                                            
                                            .map((list, i)=>{
                                                return(
                                                    <li key={"category-" + i} className="main-board-info">
                                                        <span>{list.memberNickname}</span>
                                                        <span>1시간전</span>
                                                        <span>좋아요</span>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        {memberId !== "" && memberType !== 0 ?(
                        <div className="main-login-box">
                            <div className="main-login">
                                <div className="login-header">
                                    <div className="login-img">
                                        <AccountCircleIcon />
                                    </div>
                                    <div className="login-info">
                                        <div className="login-nickname">
                                            <span style={{fontWeight : "500", fontSize : "16px"}}>{memberId}</span>
                                        </div>
                                        <div className="login-email">
                                            <span style={{fontWeight : "500", fontSize : "15px"}}>{member.memberEmail}</span>
                                        </div>
                                    </div>
                                    <div className="logout-btn">
                                        <button type="logout" onClick={logout}>로그아웃<LogoutIcon /></button>
                                        
                                    </div>
                                </div>
                                
                                <div className="login-bottom">
                                    <div className="login-mail">
                                        <span>메일</span>
                                    </div>
                                    <div className="login-text">
                                        <span>쪽지</span>
                                    </div>
                                    <div className="trans-board">
                                        <span>중고거래</span>
                                    </div>
                                    <div className="fr-board">
                                        <span>자유</span>
                                    </div>
                                </div>
                            </div>

                            <div className="main-chat">
                                <h3>Talk&Deal 채팅</h3>
                                <div className="chat-content-wrap">
                                    <AllMemberChat />
                                </div>
                            </div>
                        </div>
                        )
                        :
                        (
                        <div className="main-login-box">
                            <div className="main-login">
                                <div className="login-btn">
                                    <button type="submit" onClick={toLogin}>talk & deal 로그인</button>
                                </div>
                                <div className="login-find">
                                    <FindIdModal>아이디 찾기</FindIdModal>
                                    <FindPwModal>비밀번호 찾기</FindPwModal>
                                    <Link to="/member/agree">회원가입</Link>
                                </div>
                            </div>

                            <div className="main-chat">
                                <h3>Talk&Deal 채팅</h3>
                                <div className="chat-content-logout">
                                    <h2>로그인 후 이용 부탁드립니다.</h2>
                                </div>
                            </div>
                        </div>
                        )}
                
                        

                    </div>
                    
                    
                </div>

                
                
                
            </div>
        </section>
    )
}

export default Main;