import { useState } from "react";

const MemberJoin = () => {
    const [gender, setGender] = useState("1");
    return(
        <section className="section join-wrap">
            <div className="join-page-title">회원가입</div>

            <form onSubmit={(e)=>{
                e.preventDefault;
            }}>
                <div className="join">
                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberId">아이디</label>
                        </div>
                        <div className="join-input-item">
                            <input type="text" name="memberId" id="memberId" />
                        </div>
                    </div>

                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberNickname">닉네임</label>
                        </div>
                        <div className="join-input-item">
                            <input type="text" name="memberNickname" id="memberNickname" />
                        </div>
                    </div>

                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberPw">비밀번호</label>
                        </div>
                        <div className="join-input-item">
                            <input type="text" name="memberPw" id="memberPw" />
                        </div>
                    </div>

                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberPwRe">비밀번호 확인</label>
                        </div>
                        <div className="join-input-item">
                            <input type="text" name="memberPwRe" id="memberPwRe" />
                        </div>
                    </div>

                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberBirth">생년월일</label>
                        </div>
                        <div className="join-input-item">
                            <input type="text" name="memberBirth" id="memberBirth" />
                        </div>
                    </div>

                    <div className="join-input-gender">
                        <div className="join-input-radio">
                            <input type="radio" name="memberGender" id="m" value={"1"} 
                            checked={gender === "1"}
                            onChange={()=>{
                                setGender("1");
                            }}/>
                            <label htmlFor="m">남</label>
                        </div>
                        <div className="join-input-radio">
                            <input type="radio" name="memberGender" id="f" value={"2"} 
                            checked={gender === "2"}
                            onChange={()=>{
                                setGender("2");
                            }}
                            />
                            <label htmlFor="f">여</label>
                        </div>
                    </div>

                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberAddr">주소</label>
                        </div>
                        <div className="join-input-item">
                            <input type="text" name="memberAddr" id="memberAddr" />
                        </div>
                    </div>

                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberPhone">전화번호</label>
                        </div>
                        <div className="join-input-item">
                            <input type="text" name="memberPhone" id="memberPhone" />
                        </div>
                    </div>

                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberEmail">이메일</label>
                        </div>
                        <div className="join-input-email">
                            <input type="text" name="memberEmail" id="memberEmail" />
                            <span>@</span>
                            <select>
                                <option value="naver.com">naver.com</option>
                                <option value="google.com">google.com</option>
                                <option value="daum.net">daum.net</option>
                                <option value="직접 작성">직접 작성</option>
                            </select>
                            <button>인증하기</button>
                        </div>
                    </div>

                    <div className="member-button-zone-join">
                        <button type="submit" className="member-btn">회원가입</button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default MemberJoin;