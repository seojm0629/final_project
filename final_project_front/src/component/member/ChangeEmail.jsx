import { useEffect, useRef, useState } from "react";
import { loginIdState } from "../utils/RecoilData";
import axios from "axios";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";

const ChangeEmail = () => {
    //로그인 한 사용자 저장 아이디 불러오기
    const [memberId, setMemberId] = useRecoilState(loginIdState);
    //member 초기 state 설정
    const [member, setMember] = useState({
        memberId : memberId,
        memberEmail : "",
    })

    useEffect(()=>{
        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/member/${memberId}`)
        .then((res)=>{
            if(res.data.memberEmail){
                const [splitEmail, domainPart] = res.data.memberEmail.split("@");
                setMember({...member, memberEmail : splitEmail});
                setDomain(domainPart || "naver.com");
            } else {
                setMember(res.data);
            }
        })
        .catch((err)=>{
            alert("해당 정보를 찾을 수 없습니다.");
        })
    },[])

    const backServer = import.meta.env.VITE_BACK_SERVER;
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
    //const [memberEmail, setMemberEmail] = useState("");
    const [mailCode, setMailCode] = useState(null);
    const [domain, setDomain] = useState("naver.com") //기본도메인
    const [customDomain, setCustomDomain] = useState("");
    const [timerActive, setTimerActive] = useState(false); //타이머 작동 여부 state 추가
    const timerRef = useRef(null);  //타이머를 useRef로 관리
    
    

    const sendMail = () => {
        //이메일 입력 여부 확인(member.memberEmail이 false 또는 비어있을 때)
        if(!member.memberEmail || member.memberEmail.trim() === ""){
            Swal.fire({
                title : "이메일 입력 필수",
                text : "이메일을 먼저 입력해주세요.",
                icon : "warning",
            })
            return;
        }

        //도메인 선택값 확인
        //emailDomain = domain이 직접 작성일 때, customDomain(직접 입력) : 기본도메인
        const emailDomain = domain === "직접 작성" ? customDomain : domain;
        const receiver = `${member.memberEmail}@${emailDomain}`;

        axios
        .get(`${backServer}/api/sendCode`,{params : {receiver}})
        .then((res)=>{
            console.log(res.data);  //인증코드 반환 console 구현 완료시 삭제 필요
            setMailCode(res.data);
            //clickConfirm();
            //formatTime();
            setShowCodeInput(true);     //인증번호 입력 창 메일 전송 시 보일 수 있게 true로 변경
            clearInterval(timerRef.current);
            setTime(180);               //시간 3분 설정
            setTimerActive(true);       //타이머 시작
            setIsVerified(false);       //재전송시 인증 초기화
            setErrorMessage("");        //에러 발생 시 빈칸 유지
            
        })
        .catch((err)=>{
            alert("이메일 형식 및 입력 정보를 확인해주세요");
        })
    }

    //타이머 useEffect 사용
    useEffect(()=>{
        if(timerActive && time > 0){
            //새로운 타이머 실행 전에 기존 타이머 제거
            clearInterval(timerRef.current);

            timerRef.current = setInterval(()=>{
                setTime((pTime)=>{
                    if (pTime <= 1){
                        clearInterval(timerRef.current);
                        setTimerActive(false);
                        return 0;
                    }
                    return pTime - 1;
                })
            },1000);
        }

        const initialTime = () =>{ 
            clearInterval(timerRef.current);
        }
        return initialTime;
    },[timerActive]);
    
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
            clearInterval(timerRef.current);
            setTimerActive(false); //인증 성공 시 타이머 정지
            setTime(0);

        } else {
            //틀린 경우 타이머 유지
            setErrorMessage("인증번호가 일치하지 않습니다.");
        }
    }  
    
    const updateEmail = () => {
        const emailDomain = domain === "직접 작성" ? customDomain : domain;
        const fullEmail = `${member.memberEmail}@${emailDomain}`;

        const sendData = {...member, memberEmail : fullEmail};

        axios
        .patch(`${import.meta.env.VITE_BACK_SERVER}/member/email`, sendData)
        .then((res)=>{
            if(res.data === 1){
                setMember(prev => ({
                    ...prev,
                    ...res.data,
                    memberEmail: prev.memberEmail || emailFront   
                }));
                
                Swal.fire({
                    title : "이메일 수정 완료",
                    icon : "success",
                }).then(()=>{
                    window.location.reload();
                })
                setShowCodeInput(false);
                setIsVerified(false);
                setErrorMessage("");
                setTime(0);
                setTimerActive(false);
            }
        })
        .catch((err)=>{
            Swal.fire({
                title : "이메일 입력 오류",
                text : "존재하는 이메일이 아닙니다.",
                icon : "warning",
            })
        })
    }

    return(
        <div>
            <div className="mypage-changeEmail-wrap">
                <div className="changeEmail-name">
                        <span>이메일 변경</span>
                </div>
                <div className="changeEmail">
                    <input type="text" name="memberEmail" id="memberEmail" 
                    value={member.memberEmail}
                    onChange={(e)=>{
                        setMember({...member, [e.target.name] : e.target.value})
                    }}
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
                    
                    {showCodeInput && (
                        <>
                            <div className="mypage-input-wrap">
                                
                                <div className="mypage-input-code">
                                    <input type="text" name="confirmNo" id="confirmNo" 
                                    placeholder="인증번호를 입력하세요."
                                    value={confirmNo}
                                    onChange={(e)=>{setConfirmNo(e.target.value)}}
                                    disabled={isVerified}
                                    />
                                    <button onClick={submitCode}>인증확인</button>

                                    {!isVerified && (
                                        <button type="button" onClick={sendMail}>
                                            재전송
                                        </button>
                                    )}

                                    {!isVerified && (
                                        <div className="format-time">
                                            <span>남은시간 :  {formatTime(time)}</span>
                                        </div>           
                                    )}                        

                                    {errorMessage && (<p style={{color:"red", marginTop : "5px"}}>{errorMessage}</p>)}

                                    {isVerified && (<p style={{color:"green", marginTop : "5px"}}>인증이 완료되었습니다.</p>)}
                                    
                                </div>
                                
                            </div>
                        </>
                    )}

                    {isVerified && 
                    (<div className="mypage-changeEmail-btn-box">
                        <button type="submit" onClick={updateEmail}>수정</button>
                    </div>)
                    }
                    
                    
                </div>
            </div>
        </div>
    )
}
export default ChangeEmail;