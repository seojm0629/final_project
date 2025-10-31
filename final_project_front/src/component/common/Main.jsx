import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginIdState, memberNoState, memberTypeState } from "../utils/RecoilData";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import axios from "axios";
import FindIdModal from "../member/FindIdModal";
import FindPwModal from "../member/FindPwModal";
import AllMemberChat from "../utils/AllMemberChat";
import { DiffCount } from "../admin/ContentStatistics";
import "../admin/contentStatistics.css";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import OpenWeather from "../utils/OpenWeather";
import NoteId from "../note/NoteId";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko.js";

const Main = () => {
  //login 정보 가져와야함
  // 로그인 정보
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  const [memberNo, setMemberNo] = useRecoilState(memberNoState);

  const [member, setMember] = useState({
    memberId: memberId,
    memberEmail: "",
  });
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/member/${memberId}`)
      .then((res) => {
        setMember(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  const navigate = useNavigate();
  const toLogin = () => {
    navigate("/member/login");
  };
  const logout = () => {
    setMemberId("");
    setMemberType(0);
    setMemberNo(0);
    delete axios.defaults.headers.common["Authorization"];
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("recoil-persist");
    navigate("/");
  };

  //--------- 자유게시판 리스트
  const backServer = import.meta.env.VITE_BACK_SERVER;
  // 중고거래 게시판 리스트
  const [tradeBoardList, setTradeBoardList] = useState([]);

  // 자유게시판 리스트
  const [freeBoardList, setFreeBoardList] = useState([]);
  // 자유게시판 카테고리 리스트
  const [freeBoardWorkList, setFreeBoardWorkList] = useState([]);
  const [freeBoardGameList, setFreeBoardGameList] = useState([]);
  const [freeBoardHumorList, setFreeBoardHumorList] = useState([]);
  const [freeBoardHobbyList, setFreeBoardHobbyList] = useState([]);
  const [freeBoardInfoList, setFreeBoardInfoList] = useState([]);
  const [freeBoardRoutineList, setFreeBoardRoutineList] = useState([]);
  const [voteBoardList, setVoteBoardList] = useState([]);

  const [freeBoardCategoryNo, setFreeBoardCategoryNo] = useState(1);

  dayjs.extend(relativeTime);

// 기존 한국어 locale 불러오기
const locale = {
  ...dayjs.Ls["ko"],
  // 숫자를 한글이 아닌 아라비아 숫자로 표시하도록 커스터마이징
  relativeTime: {
    future: "%s 후",
    past: "%s 전",
    s: "몇 초",
    m: "1분",
    mm: "%d분",
    h: "1시간",
    hh: "%d시간",
    d: "1일",
    dd: "%d일",
    M: "1달",
    MM: "%d달",
    y: "1년",
    yy: "%d년",
  },
};

// 커스터마이징한 locale 적용
dayjs.locale(locale, null, true);
dayjs.locale("ko");
  
  /* 자유 게시판 리스트 시간 출력 */
  const nowDate = (dateString) => {
      const now = dayjs(); //현재 날짜/시간 가져오는 함수
      const target = dayjs(dateString); // 날짜를 dayjs 형식으로 변환하기
      const diffDays = now.diff(target, "day"); // 현재날짜와 지난날짜와 비교
      // 보낸날짜가 17일이면 오늘이 19일 그럼 2일전 표시이렇게 자동으로 계산
      if (diffDays >= 10000) {
        return target.format("YYYY-MM-DD"); // 7일 이상이면 날짜로 변형
      }
      return target.fromNow(); //한국어로 ?? 시간전 표시하기
    };

    
    
  useEffect(() => {
    axios
      .get(`${backServer}/vote/mainTitle`)
      .then((res) => {
        setVoteBoardList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  useEffect(() => {
    

    axios
      .get(`${backServer}/freeBoard/mainTitle`)
      .then((res) => {
        setFreeBoardList(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${backServer}/freeBoard/mainCategory?freeBoardCategoryNo=1`)
      .then((res) => {
        setFreeBoardWorkList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${backServer}/freeBoard/mainCategory?freeBoardCategoryNo=2`)
      .then((res) => {
        setFreeBoardGameList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${backServer}/freeBoard/mainCategory?freeBoardCategoryNo=3`)
      .then((res) => {
        setFreeBoardRoutineList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${backServer}/freeBoard/mainCategory?freeBoardCategoryNo=4`)
      .then((res) => {
        setFreeBoardHobbyList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${backServer}/freeBoard/mainCategory?freeBoardCategoryNo=5`)
      .then((res) => {
        setFreeBoardInfoList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${backServer}/freeBoard/mainCategory?freeBoardCategoryNo=6`)
      .then((res) => {
        setFreeBoardHumorList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${backServer}/tradeBoard/mainTitle`)
      .then((res) => {
        setTradeBoardList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className="section main-page">
      <div className="main-wrap">
        <div className="list-box">
          <div className="diff-count-banner">
            <div className="diff-count-box">
              <DiffCount />
            </div>
            <div className="main-weather">
              <OpenWeather />
            </div>
          </div>

          <div className="main-content-wrap">
            <div className="main-content-board-list">
              {/* 
                            <Link to="/vote/list">
                                <div className="main-vote">
                                    <div className="vote-board">
                                        <div className="main-vote-header">
                                            <h4>투표 게시판</h4>
                                        </div>
                                        <div className="vote-map">
                                            <ul className="main-vote-content">
                                                <div className="vote-title">
                                                    {voteBoardList.map((list, i)=>{
                                                        return(
                                                            <li key={"vote-" + i}>
                                                                <span>{list.voteTitle}</span>
                                                            </li>
                                                        )
                                                    })}
                                                </div>
                                                <div className="vote-nickname">
                                                    {voteBoardList.map((list, i)=>{
                                                        return(
                                                            <li key={"nick-" + i} className="main-vote-info">
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
                                    <div className="goto-vote">
                                        투표하러 가기
                                    </div>
                                </div>
                            </Link>
                            */}
              <div className="main-board-list">
                {/* 중고거래 게시판, 자유게시판 */}
                <div className="transaction-board first">
                  <div className="main-board-header">
                    <h4>투표 게시판</h4>
                    <h5>종료날짜</h5>
                  </div>

                  <ul className="main-board-content">
                    <div className="main-board-title">
                          {voteBoardList.map((list, i)=>{
                            return(
                                                            <li key={"vote-" + i}>
                                                                <span>{list.voteTitle}</span>
                                                            </li>
                                                        )
                                                    })}
                                                </div>
                                                <div className="main-board-like">
                                                    {voteBoardList.map((list, i)=>{
                                                        return(
                                                            <li key={"nick-" + i} className="main-board-info">
                                                                <span>{list.memberNickname}</span>
                                                                <span>{list.voteEndDate}</span>
                                                                
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
                      {freeBoardList.map((list, i) => {
                        return (
                          <li key={"main-" + i}>
                            <span>{list.freeBoardTitle}</span>
                          </li>
                        );
                      })}
                    </div>
                    <div className="main-board-like">
                      {freeBoardList.map((list, i) => {
                        return (
                          <li key={"member-" + i} className="main-board-info">
                            <span>{list.memberNickname}</span>
                            <span>
                              {nowDate(list.freeBoardDate)}
                            </span>
                            <span>좋아요</span>
                          </li>
                        );
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
                      {freeBoardWorkList.map((list, i) => {
                        return (
                          <li key={"category-" + i}>
                            <span>{list.freeBoardTitle}</span>
                          </li>
                        );
                      })}
                    </div>
                    <div className="main-board-like">
                      {freeBoardWorkList.map((list, i) => {
                        return (
                          <li key={"category-" + i} className="main-board-info">
                            <span>{list.memberNickname}</span>
                            <span>
                              {nowDate(list.freeBoardDate)}
                            </span>
                            <span>좋아요</span>
                          </li>
                        );
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
                      {freeBoardGameList.map((list, i) => {
                        return (
                          <li key={"category-" + i}>
                            <span>{list.freeBoardTitle}</span>
                          </li>
                        );
                      })}
                    </div>
                    <div className="main-board-like">
                      {freeBoardGameList.map((list, i) => {
                        return (
                          <li key={"category-" + i} className="main-board-info">
                            <span>{list.memberNickname}</span>
                            <span>
                              {nowDate(list.freeBoardDate)}
                            </span>
                            <span>좋아요</span>
                          </li>
                        );
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
                      {freeBoardRoutineList.map((list, i) => {
                        return (
                          <li key={"category-" + i}>
                            <span>{list.freeBoardTitle}</span>
                          </li>
                        );
                      })}
                    </div>
                    <div className="main-board-like">
                      {freeBoardRoutineList.map((list, i) => {
                        return (
                          <li key={"category-" + i} className="main-board-info">
                            <span>{list.memberNickname}</span>
                            <span>
                              {nowDate(list.freeBoardDate)}
                            </span>
                            <span>좋아요</span>
                          </li>
                        );
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
                      {freeBoardHobbyList.map((list, i) => {
                        return (
                          <li key={"category-" + i}>
                            <span>{list.freeBoardTitle}</span>
                          </li>
                        );
                      })}
                    </div>
                    <div className="main-board-like">
                      {freeBoardHobbyList.map((list, i) => {
                        return (
                          <li key={"category-" + i} className="main-board-info">
                            <span>{list.memberNickname}</span>
                            <span>
                              {nowDate(list.freeBoardDate)}
                            </span>
                            <span>좋아요</span>
                          </li>
                        );
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
                      {freeBoardInfoList.map((list, i) => {
                        return (
                          <li key={"category-" + i}>
                            <span>{list.freeBoardTitle}</span>
                          </li>
                        );
                      })}
                    </div>
                    <div className="main-board-like">
                      {freeBoardInfoList.map((list, i) => {
                        return (
                          <li key={"category-" + i} className="main-board-info">
                            <span>{list.memberNickname}</span>
                            <span>
                              {nowDate(list.freeBoardDate)}
                            </span>
                            <span>좋아요</span>
                          </li>
                        );
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
                      {freeBoardHumorList.map((list, i) => {
                        return (
                          <li key={"category-" + i}>
                            <span>{list.freeBoardTitle}</span>
                          </li>
                        );
                      })}
                    </div>
                    <div className="main-board-like">
                      {freeBoardHumorList.map((list, i) => {
                        return (
                          <li key={"category-" + i} className="main-board-info">
                            <span>{list.memberNickname}</span>
                            <span>
                              {nowDate(list.freeBoardDate)}
                            </span>
                            <span>좋아요</span>
                          </li>
                        );
                      })}
                    </div>
                  </ul>
                </div>
              </div>
            </div>

            {memberId !== "" && memberType !== 0 ? (
              <div className="main-login-box">
                <div className="main-login">
                  <div className="login-header">
                    <div className="login-img">
                      <AccountCircleIcon />
                    </div>
                    <div className="login-info">
                      <div className="login-nickname">
                        <span style={{ fontWeight: "500", fontSize: "16px" }}>
                          {memberId}
                        </span>
                      </div>
                      <div className="login-email">
                        <span style={{ fontWeight: "500", fontSize: "15px" }}>
                          {member.memberEmail}
                        </span>
                      </div>
                    </div>
                    <div className="logout-btn">
                      <button type="logout" onClick={logout}>
                        로그아웃
                        <LogoutIcon />
                      </button>
                    </div>
                  </div>

                  <div className="login-bottom">
                    <div className="login-mail">
                      <span>메일</span>
                    </div>
                    <div className="login-text">
                      <span>
                        <NoteId />
                      </span>
                    </div>
                    <div className="trans-board">
                      <span>투표</span>
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
            ) : (
              <div className="main-login-box">
                <div className="main-login">
                  <div className="login-btn">
                    <button type="submit" onClick={toLogin}>
                      talk & deal 로그인
                    </button>
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
  );
};

export default Main;
