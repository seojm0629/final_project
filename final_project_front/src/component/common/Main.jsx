import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginIdState, memberTypeState } from "../utils/RecoilData";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import axios from "axios";
import FindId from "../member/FindId";
import FindPw from "../member/FindPw";
import FindModal from "../member/FindIdModal";
import FindIdModal from "../member/FindIdModal";

const Main = () => {
    //login 정보 가져와야함
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
    return(
        <section className="section main-page">
            <div className="main-wrap">

                <div className="list-box">
                    <div className="main-board-list">
                        {/* 중고거래 게시판, 자유게시판 */}
                        <div className="transaction-board first">
                            <div className="main-board-header">
                                <h4>중고거래 게시판</h4>
                            </div>
                            <div className="main-board-content">
                                <div className="transaction-list-left">
                                    <div>제목</div>
                                </div>
                                <div className="transaction-list-right">
                                    <div>익명</div>
                                    <div>1시간 전</div>
                                    <div>좋아요</div>
                                </div>
                            </div>
                            <div className="main-board-content">
                                <div className="transaction-list-left">
                                    <div>제목</div>
                                </div>
                                <div className="transaction-list-right">
                                    <div>익명</div>
                                    <div>1시간 전</div>
                                    <div>좋아요</div>
                                </div>
                            </div>
                            
                        </div>

                        <div className="free-board first">
                            <div className="main-board-header">
                                <h4>자유게시판</h4>
                            </div>
                            <div className="main-board-content">
                                <div className="transaction-list-left">
                                    <div>제목</div>
                                </div>
                                <div className="transaction-list-right">
                                    <div>익명</div>
                                    <div>1시간 전</div>
                                    <div>좋아요</div>
                                </div>
                            </div>
                            <div className="main-board-content">
                                <div className="transaction-list-left">
                                    <div>제목</div>
                                </div>
                                <div className="transaction-list-right">
                                    <div>익명</div>
                                    <div>1시간 전</div>
                                    <div>좋아요</div>
                                </div>
                            </div>
                        </div>
                        

                    </div>

                    <div className="main-board-list">
                        {/* 스포츠 게시판, 게임 게시판 */}
                        <div className="sports-board first">
                            <div className="pre-board-header">
                                <h4>스포츠 게시판</h4>
                            </div>
                            <div className="pre-board-content">
                                <h1>준비중</h1>
                            </div>
                            
                            
                        </div>

                        <div className="game-board first">
                            <div className="pre-board-header">
                                <h4>게임 게시판</h4>
                            </div>
                            <div className="pre-board-content">
                                <h1>준비중</h1>
                            </div>
                        </div>

                    </div>

                    <div className="main-board-list">
                        {/* 연예 게시판, 경제 게시판 */}
                        <div className="sports-board first">
                            <div className="pre-board-header">
                                <h4>연예 게시판</h4>
                            </div>
                            <div className="pre-board-content">
                                <h1>준비중</h1>
                            </div>
                            
                            
                        </div>

                        <div className="game-board first">
                            <div className="pre-board-header">
                                <h4>경제 게시판</h4>
                            </div>
                            <div className="pre-board-content">
                                <h1>준비중</h1>
                            </div>
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

                    <div className="main-topic">
                        <h3>today's topic</h3>
                        <div className="topic-list">
                            <h1>준비중</h1>
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
                            <FindPw>비밀번호 찾기</FindPw>
                            <Link to="/member/agree">회원가입</Link>
                        </div>
                    </div>

                    <div className="main-topic">
                        <h3>today's topic</h3>
                        <div className="topic-list">
                            <h1>준비중</h1>
                        </div>
                    </div>
                </div>
                )}
                
                
            </div>
        </section>
    )
}

export default Main;