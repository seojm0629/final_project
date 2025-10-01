import { Link } from "react-router-dom";
import "./member.css";

const MemberLogin = () => {
    return(
        <section className="section login-wrap">
            <div className="login-page-title">
                <img src="/image/final_logo.png" />
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault;
            }}>
                <div className="login">
                    <div className="login-input-wrap">
                        <div className="login-input-title">
                            <label htmlFor="memberId">아이디</label>
                        </div>
                        <div className="login-input-item">
                            <input type="text" name="memberId" id="memberId" />
                        </div>
                    </div>

                    <div className="login-input-wrap">
                        <div className="login-input-title">
                            <label htmlFor="memberPw">비밀번호</label>
                        </div>
                        <div className="login-input-item">
                            <input type="password" name="memberPw" id="memberPw" />
                        </div>
                    </div>
                
                    <div className="login-find">
                        <Link to="#">아이디 찾기</Link>
                        
                        <Link to="#">비밀번호 찾기</Link>
                        
                        <Link to="#">회원가입</Link>
                    </div>

                    <div className="member-button-zone">
                        <button type="submit" className="member-btn">로그인</button>
                    </div>
                </div>
            </form>
        </section>
        
    )
}

export default MemberLogin;