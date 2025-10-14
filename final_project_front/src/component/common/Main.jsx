import { Link, useNavigate } from "react-router-dom";

const Main = () => {
    //login 정보 가져와야함
    
    const navigate = useNavigate();
    const toLogin = () => {
        navigate("/member/login");
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

                
                
                <div className="main-login-box">
                    <div className="main-login">
                        <div className="login-btn">
                            <button type="submit" onClick={toLogin}>로그인 하기</button>
                        </div>
                        <div className="login-find">
                            <Link to="#">아이디 찾기</Link>
                            <Link to="#">비밀번호 찾기</Link>
                            <Link to="#">회원가입</Link>
                        </div>
                    </div>

                    <div className="main-topic">
                        <h3>today's topic</h3>
                        <div className="topic-list">
                            <h1>준비중</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main;