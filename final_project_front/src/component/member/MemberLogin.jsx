import "./member.css";

const MemberLogin = () => {
    return(
        <section className="section login-wrap">
            <div className="page-title">로그인</div>
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
                            <input type="text" name="memberPw" id="memberPw" />
                        </div>
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