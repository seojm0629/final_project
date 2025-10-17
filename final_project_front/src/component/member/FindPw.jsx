import { useEffect, useState } from "react";
import BaseModal from "../utils/BaseModal";
import Swal from "sweetalert2";
import axios from "axios";


const FindPw = () => {
    
    const [member, setMember] = useState({
        memberId : "",
        memberName : "",
        memberEmail : "",
    })

    const [mailCode, setMailCode] = useState(null);
    const [domain, setDomain] = useState("naver.com") //기본도메인
    const [customDomain, setCustomDomain] = useState("");

    const [isAuth, setIsAuth] = useState(0);
    const [isLoader, setIsLoader] = useState(false);

    const modalInputData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const findMember = {...member, [name] : value};
        setMember(findMember);
    }

    const backServer = import.meta.env.VITE_BACK_SERVER;

    const findPw = () => {
        if(member.memberId !== "" && member.memberName !== "" && member.memberEmail){
            axios
            .get(`${backServer}/member/findPw?memberId=${member.memberId}&&memberName=${member.memberName}
                &&memberEmail=${member.memberEmail}`)
            .then((res)=>{
                console.log(res.data);
                if(res.data){
                    setIsAuth(1);
                    setIsLoader(true);
                } else {
                    setIsAuth(2);
                }
                
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }

    /*
    const findPw = () => {
        if(member.memberId !== "" && member.memberName !== "" && member.memberEmail !== ""){
            axios
            .get(`${backServer}/member/findPw?memberId=${member.memberId}`)
                .then((res)=>{
                
                if(res.data){
                    setMember(res.data);

                    const receiver = `${member.memberEmail}`

                    axios
                    .get(`${backServer}/api/sendCodePw`,{params : {receiver}})
                    .then((res)=>{
                        console.log(res);
                        if(res.data){
                            setMailCode(res.data); //이메일 전송코드 저장

                            axios
                            .patch(`${backServer}/member/password`, member)
                            .then((res)=>{
                                
                                if(res.data === 1){
                                    alert("비밀번호 전송완료");
                                    
                                    setMember({...member, memberPw : ""});
                                }
                            })
                            .catch((err)=>{
                                console.log(err);
                            })
                        }

                        
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                }
                
                
            })    
            .catch((err)=>{
                console.log(err);
            })
        }
    }
    */

    
    
    const titleExplain = (
        <div className="title-explain">
            <span>※ 가입한 정보로 비밀번호를 찾을 수 있습니다.</span>
        </div>
    )
    const title = ( 
        <div className="member-modal-title">
            <span>가입정보로 비밀번호 찾기</span>
            {titleExplain}
        </div>
    ) 

    
    const content = (
        <div className="member-modal-wrap">
            <div className="member-modal-content">
                <div className="modal-member-name">
                    <div className="modal-member-title">
                        <label htmlFor="memberId">아이디</label>
                    </div>    
                    <div className="modal-member-item">
                        <input type="text" name="memberId" id="memberId"
                        value={member.memberId} onChange={modalInputData}
                        />
                    </div>
                    
                    
                </div>    
                <div className="modal-member-name">
                    <div className="modal-member-title">
                        <label htmlFor="memberName">이름</label>
                    </div>
                    <div className="modal-member-item">
                        <input type="text" name="memberName" id="memberName" 
                        value={member.memberName} onChange={modalInputData}
                        />
                    </div>
                </div>
                
                <div className="modal-member-name">
                    <div className="modal-member-title">
                        <label htmlFor="memberEmail">이메일</label>
                    </div>
                    <div className="modal-member-item">
                        <input type="text" name="memberEmail" id="memberEmail"
                        value={member.memberEmail} onChange={modalInputData}
                        />
                    </div>
                </div>

                <div className="modal-button-box">
                    <button type="submit" className="modal-btn" onClick={findPw}>                    
                        비밀번호 찾기
                    </button>
                </div>
            </div>
        </div>
            
    )

    const trueResult = (
        <div className="result-modal-wrap">
            <div className="result-modal">                
                <div className="member-id">
                    <span className="loader"></span>
                </div>
                <button className="result-modal-btn" onClick={()=>{setIsAuth(0);}}>닫기</button>
            </div>
        </div>
        
    )
    
    const falseResult = (
        <div className="result-modal-wrap">
            <div className="result-modal">
                <div className="member-id">
                    <span >회원님의 아이디가 존재하지 않습니다.</span>
                </div>
                <button className="result-modal-btn" onClick={()=>{setIsAuth(0)}}>닫기</button>
            </div>
        </div>
    )

    

    
    return(
    <div>
        <BaseModal
            title={title}
            buttonLabel={"비밀번호 찾기"}
            contentBoxStyle={{ width: "600px", height: "500px" }}
            result={""}
            end={"닫기"}
            content={isAuth === 0 ? (content) : isAuth === 1 ? (trueResult) : (falseResult)}
        />
    </div>
    )
}



export default FindPw;