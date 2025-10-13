import { useEffect, useRef, useState } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MemberJoin = () => {
    const backServer = import.meta.env.VITE_BACK_SERVER;
    const navigate = useNavigate();
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
    
    // ---------- 이메일 -----------
    //인증코드를 입력하기 위한 창의 초기값을 false로 설정하여 보이지 않게 적용
    const [showCodeInput, setShowCodeInput] = useState(false);
    
    //시간 제한
    const [time, setTime] = useState(0);


    //인증하기 버튼 클릭시 인증 코드 입력창을 보이게 설정
    const clickConfirm = () => {
        setShowCodeInput(true);

        //이메일 인증 버튼 클릭시 타이머 시작
        setTime(180);


    }
    //타이머
    useEffect(()=>{
        const timer = setInterval(()=>{
            //남은 시간이 0보다 크면 1초씩 감소시킴.
            if(time > 0){
                setTime((prevTime)=>prevTime - 1); //해당 구문 이해 필요 
            } else {
                //남은 시간이 0이 되면 타이머 정지.
                clearInterval(timer);
            }
        }, 1000);

        //컴포넌트가 언마운트되면 타이머 정지
        return () => clearInterval(timer);
    },[time]); //time이 변경될 때마다 useEffect가 다시 실행

    //시간을 분과 초로 변환하는 함수 정의
    const formatTime = (s) => {
        
        const min = Math.floor(s / 60);
        const sec = s % 60;
        const formatSec = sec < 10 ? "0"+sec: sec;
        return `${min}:${formatSec}`;
    }

    //---------- 이메일 인증 구현 -----------
    const [mailCode, setMailCode] = useState(null);
    const [memberEmail, setMemberEmail] = useState("");
    const [domain, setDomain] = useState("naver.com") //기본도메인
    const [customDomain, setCustomDomain] = useState("");
    
    

    const sendMail = () => {
        //도메인 선택값 확인
        const emailDomain = domain === "직접 작성" ? customDomain : domain;
        const receiver = `${member.memberEmail}@${emailDomain}`;

        axios
        .get(`${backServer}/api/sendCode`,{params : {receiver}})
        .then((res)=>{
            console.log(res.data);
            setMailCode(res.data);
            clickConfirm();
            formatTime();
            
        })
        .catch((err)=>{
            console.log(err);
        })
        
        
        
    }
    
    //실제 인증 로직 넣을 수 있도록
    const [confirmNo, setConfirmNo] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isVerified, setIsVerified] = useState(false);

    const submitCode = (e) => {
        e.preventDefault();
        

        if(confirmNo.trim() === ""){
            setErrorMessage("인증번호를 입력해주세요.");
            return;
        }

        if(confirmNo === mailCode){
            alert("이메일 인증이 완료되었습니다!");
            setIsVerified(true);
            setErrorMessage("");

            
            
        } else {
            setErrorMessage("인증번호가 일치하지 않습니다.");
        }
    }  

    // ---------- 성별 ------------
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

    // ------------ 아이디 중복 -----------
    const [idCheck, setIdCheck] = useState(0);
    const checkId = () => {
        const idReg = /^[A-Za-z0-9]{6,12}$/;

        if(idReg.test(member.memberId)){
            axios
            .get(`${backServer}/member/exists?memberId=${member.memberId}`)
            .then((res)=>{
                
                if(res.data === 1){
                    setIdCheck(3);
                } else {
                    setIdCheck(1);
                }
            })
            .catch((err)=>{
                console.log("idCheck : ", err);
            })
        } else {
            setIdCheck(2);
        }
    }

    const [nicknameCheck, setNickNameCheck] = useState(0);
    const checkNickname = () => {
        if(member.memberNickname && member.memberNickname.trim() !== ""){
            axios
            .get(`${backServer}/member/nickname?memberNickname=${member.memberNickname}`)
            .then((res)=>{
                if(res.data === 1){
                    setNickNameCheck(3);
                } else {
                    setNickNameCheck(1);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        } else {
            setNickNameCheck(2);
        }
    }
    

    // ------------ 비밀번호 ----------
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

    
    const joinMember = () => {
        if(member.memberNickname !== "" && member.memberPhone !== ""
            && member.memberAddr !== "" 
            && confirmNo === mailCode && idCheck === 1 && nicknameCheck === 1         
        ){
            axios
            .post(`${backServer}/member`, member)
            .then((res)=>{
                setMember(res.data);
                navigate("/");
            })
            .catch((err)=>{
                console.log(err);
            })
        } else {
            Swal.fire({
                title : "모든 입력 필수",
                text : "빈칸 없이 입력해주세요.",
                icon: "warning",
            })
        }
    }
    


    return(
        <section className="section join-wrap">
            <div className="join-page-title">회원가입</div>

            <form onSubmit={(e)=>{
                e.preventDefault();
                joinMember();
            }}>
                <div className="join">
                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberId">아이디</label>
                        </div>
                        <div className="join-input-item">
                            <input type="text" name="memberId" id="memberId" 
                            value={member.memberId} onChange={inputMemberData}
                            onBlur={checkId}/>
                        </div>
                        <p className="input-msg">
                            {idCheck === 0
                                ? ""
                                : idCheck === 1
                                ? <span style={{color : "blue"}}>사용 가능한 아이디입니다.</span>
                                : idCheck === 2
                                ? <span style={{color : "red"}}>아이디는 영어 대/소문자+숫자로 6~12글자 입니다.</span>
                                : <span style={{color : "red"}}>이미 사용중인 아이디입니다.</span>}
                        </p>

                    </div>

                    <div className="join-input-wrap">
                        <div className="join-input-title">
                            <label htmlFor="memberNickname">닉네임</label>
                        </div>
                        <div className="join-input-item">
                            <input type="text" name="memberNickname" id="memberNickname" 
                            value={member.memberNickname} onChange={inputMemberData}
                            onBlur={checkNickname}
                            />
                        </div>
                        <p className="input-msg">
                            {nicknameCheck === 0 ? ""
                            : nicknameCheck === 1 
                            ? <span style={{color:"blue"}}>사용 가능한 닉네임입니다.</span>
                            : nicknameCheck === 2
                            ? <span style={{color:"red"}}>닉네임을 입력해주세요.</span>
                            : nicknameCheck === 3
                            ? <span style={{color:"red"}}>닉네임을 입력해주세요.</span>
                            : ""}
                        </p>
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

                            <select value={domain} onChange={(e)=>{setDomain(e.target.value)}}>
                                <option value="naver.com">naver.com</option>
                                <option value="google.com">gmail.com</option>
                                <option value="daum.net">daum.net</option>
                                <option value="직접 작성">직접 작성</option>
                            </select>

                            {domain === "직접 작성" && (<input type="text" placeholder="직접 입력" value={customDomain} onChange={(e)=>{setCustomDomain(e.target.value)}} />)}

                            <button type="button" onClick={sendMail}>이메일 인증</button>
                        </div>
                    </div>

                    {showCodeInput && (
                        <>
                            <div className="join-input-wrap">
                                <div className="join-input-title">
                                    <label htmlFor="confirmNo">인증코드</label>
                                </div>
                                <div className="join-input-code">
                                    <input type="text" name="confirmNo" id="confirmNo" 
                                    placeholder="인증번호를 입력하세요."
                                    value={confirmNo}
                                    onChange={(e)=>{setConfirmNo(e.target.value)}}
                                    disabled={isVerified}
                                    />
                                    <button onClick={submitCode}>인증확인</button>
                                    <div className="format-time">
                                        <span> 남은시간 : {formatTime(time)}</span>
                                    </div>                                   

                                    {errorMessage && (<p style={{color:"red", marginTop : "5px"}}>{errorMessage}</p>)}

                                    {isVerified && (<p style={{color:"green", marginTop : "5px"}}>인증이 완료되었습니다.</p>)}
                                </div>
                                
                            </div>
                        </>
                    )}
                    

                    <div className="member-button-zone-join">
                        <button type="submit" className="member-btn">회원가입</button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default MemberJoin;