import { useState } from "react";
import BaseModal from "../utils/BaseModal";
import Swal from "sweetalert2";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";

const FindId = () => {
    
    const [member, setMember] = useState({
        memberName : "",
        memberBirth : "",
        memberPhone : "",
    })

    const [isAuth, setIsAuth] = useState(0);

    const modalInputData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const findMember = {...member, [name] : value};
        setMember(findMember);
    }
    
    const navigate = useNavigate();
    

    const findId = () => {
        
        if(member.memberName !== "" && member.memberBirth != "" && member.memberPhone !== ""){
            axios
            .get(`${import.meta.env.VITE_BACK_SERVER}/member/find?memberName=${member.memberName}`)
            .then((res)=>{
                
                if(res.data){
                    if(member.memberName === res.data.memberName && member.memberBirth === res.data.memberBirth && member.memberPhone === res.data.memberPhone){
                        setMember(res.data);
                        setIsAuth(1);
                    } else {
                        setIsAuth(2);
                    }
                    
                    
                } 
                
            })
            .catch((err)=>{
                console.log(err);
            })
        } else {
            Swal.fire({
                title : "입력 정보 확인",
                text : "빈칸 없이 모두 입력해주세요.",
                icon : "warning",
            })
        }
        
    }

    
    
    const titleExplain = (
        <div className="title-explain">
            <span>※ 가입한 정보로 아이디를 찾을 수 있습니다.</span>
        </div>
    )
    const title = ( 
        <div className="member-modal-title">
            <span>가입정보로 아이디 찾기</span>
            {titleExplain}
        </div>
    ) 

    
    const content = (
        <div className="member-modal-wrap">
            <div className="member-modal-content">
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
                        <label htmlFor="memberBirth">생년월일</label>
                    </div>
                    <div className="modal-member-item">
                        <input type="text" name="memberBirth" id="memberBirth" 
                        value={member.memberBirth} onChange={modalInputData}
                        />
                    </div>
                </div>
                
                <div className="modal-member-name">
                    <div className="modal-member-title">
                        <label htmlFor="memberPhone">전화번호</label>
                    </div>
                    <div className="modal-member-item">
                        <input type="text" name="memberPhone" id="memberPhone"
                        value={member.memberPhone} onChange={modalInputData}
                        />
                    </div>
                </div>

                <div className="modal-button-box">
                    <button type="submit" className="modal-btn" onClick={findId}>                    
                        아이디 찾기
                    </button>
                </div>
            </div>
        </div>
            
    )

    const trueResult = (
        <div className="result-modal-wrap">
            <div className="result-modal">
                <div className="member-id">
                    <span>회원님의 아이디는 : "{member.memberId}" 입니다.</span>
                </div>
                <button className="result-modal-btn" onClick={()=>{setIsAuth(0)}}>닫기</button>
            </div>
        </div>
        
    )
    
    const falseResult = (
        <div className="result-modal-wrap">
            <div className="result-modal">
                <div className="member-id">
                    <span>회원님의 아이디가 존재하지 않습니다.</span>
                </div>
                <button className="result-modal-btn" onClick={()=>{setIsAuth(0)}}>닫기</button>
            </div>
        </div>
    )

    

    
    return(
    <div>
        <BaseModal
            title={title}
            buttonLabel={"아이디 찾기"}
            contentBoxStyle={{ width: "600px", height: "500px" }}
            result={""}
            end={"닫기"}
            content={isAuth === 0 ? (content) : isAuth === 1 ? (trueResult) : (falseResult)}
        />
    </div>
    )
}



export default FindId;