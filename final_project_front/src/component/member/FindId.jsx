import { useState } from "react";
import BaseModal from "../utils/BaseModal";
import Swal from "sweetalert2";
import axios from "axios";

const FindId = () => {
    const [member, setMember] = useState({
        memberName : "",
        memberBirth : "",
        memberPhone : "",
    })

    const modalInputData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const findMember = {...member, [name] : value};
        setMember(findMember);
    }
    
    const findId = () => {
        if(member.memberName !== "" && member.memberBirth != "" && member.memberPhone !== ""){
            axios
            .get(`${import.meta.env.VITE_BACK_SERVER}/member/find`, member)
            .then((res)=>{
                console.log(res);
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
                        value={member.memberId} onChange={modalInputData}
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
                    <button type="submit" className="modal-btn" onClick={findId}>아이디 찾기</button>
                </div>
            </div>
        </div>
    )
    return(
       <div>
        <BaseModal
            title={title}
            buttonLabel={"모달열기버튼"}
            contentBoxStyle={{ width: "800px", height: "600px" }}
            result={"확인버"}
            end={"닫기버튼이름"}
            content={content}
        />
    </div>
    )
}

export default FindId;