import { useRef, useState } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const MemberJoin = () => {
    const [member, setMember] = useState({
        memberId : "",
        memberNickname : "",
        memberPw : "",
        memberBirth : "",
        memberGender : "1",
        memberAddr : "",
        memberPhone : "",
        memberEmail : "",
    })

    //성별 선택을 위한 State
    const [gender, setGender] = useState("1");    

    //비밀번호 일치 확인 state
    const [memberPwRe, setMemberPwRe] = useState("");

    //입력 시마다 값 가져오는 state
    const inputMemberData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const newMember = {...member, [name]:value};
        setMember(newMember);
    }

    //비밀번호 및 비밀번호 확인 일치 여부 확인
    const pwMsgRef = useRef(null);
    //비밀번호 메세지 
    const checkPw = () => {
        pwMsgRef.current.classList.remove("valid")
        pwMsgRef.current.classList.remove("HighlightOffIcon")
        if(member.memberPw === memberPwRe){
            pwMsgRef.current.classList.add("valid")
            pwMsgRef.current.innerText="비밀번호가 일치합니다.";
            pwMsgRef.current.style.color = "blue";
        } else {
            pwMsgRef.current.classList.add("HighlightOffIcon")
            pwMsgRef.current.innerText = "비밀번호가 일치하지 않습니다."
            pwMsgRef.current.style.color = "red";
        }
    }

    /*
    const joinMember = () => {
        if(member.memberName !== "" && member.memberPhone !== ""
            && member.memberBirth === 8 && member.memberAddr !== "" 
            && member.memberEmail !== ""
        ){
            
        }
    }
    */

    return(
        <section className="section join-wrap">
            <div className="join-page-title">회원가입</div>

            <form onSubmit={(e)=>{
                e.preventDefault;
                joinMember();
            }}>
                <div className="join">
                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberId">아이디</label>
                        </div>
                        <div className="join-input-item">
                            <input type="text" name="memberId" id="memberId" 
                            value={member.memberId} onChange={inputMemberData}/>
                        </div>
                    </div>

                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberNickname">닉네임</label>
                        </div>
                        <div className="join-input-item">
                            <input type="text" name="memberNickname" id="memberNickname" 
                            value={member.memberNickname} onChange={inputMemberData}
                            />
                        </div>
                    </div>

                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberPw">비밀번호</label>
                        </div>
                        <div className="join-input-item">
                            <input type="password" name="memberPw" id="memberPw" 
                            value={member.memberPw} onChange={inputMemberData}
                            onBlur={checkPw}
                            />
                        </div>
                    </div>

                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberPwRe">비밀번호 확인</label>
                        </div>
                        <div className="join-input-item">
                            <input type="password" name="memberPwRe" id="memberPwRe" 
                            value={memberPwRe} onChange={(e)=>{setMemberPwRe(e.target.value);}}
                            onBlur={checkPw}
                            />
                        <p className="input-msg" ref={pwMsgRef}></p>
                        </div>
                    </div>

                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberBirth">생년월일</label>
                        </div>
                        <div className="join-input-item">
                            <input type="text" name="memberBirth" id="memberBirth" 
                            value={member.memberBirth} onChange={inputMemberData}
                            placeholder="ex. 19000101"
                            />
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
                            <input type="text" name="memberAddr" id="memberAddr" 
                            value={member.memberAddr} onChange={inputMemberData}
                            />
                        </div>
                    </div>

                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberPhone">전화번호</label>
                        </div>
                        <div className="join-input-item">
                            <input type="text" name="memberPhone" id="memberPhone" 
                            value={member.memberPhone} onChange={inputMemberData}
                            placeholder="ex. 010-0000-0000"
                            />
                        </div>
                    </div>

                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberEmail">이메일</label>
                        </div>
                        <div className="join-input-email">
                            <input type="text" name="memberEmail" id="memberEmail" 
                            value={member.memberEmail} onChange={inputMemberData}
                            />
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