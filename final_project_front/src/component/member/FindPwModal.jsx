import { Box, Modal } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "../member/findModal.css";
import Swal from "sweetalert2";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height : 380,
    backgroundColor: '#F0F2F5;',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};





const FindPwModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setMember({...member,
                        memberName : "",
                        memberBirth : "",
                        memberPhone : "",
                    })
                    
        setIsAuth(0);
    };

    const [member, setMember] = useState({
        memberId : "",
        memberName : "",
        memberEmail : "",
    })


    //비밀번호 찾기 전 : 0 - 비밀번호 찾기 성공 : 1 - 비밀번호 찾기 실패 : 2
    const [isAuth, setIsAuth] = useState(0);
    // 로딩 css 띄우기
    const [isLoader, setIsLoader] = useState(false);
    // 닫기 useState 띄우기
    const [isClose, setIsClose] = useState(false);
    
    const [isLoding, setIsLoding] = useState(false);

    const modalInputData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const findMember = {...member, [name] : value};
        setMember(findMember);
    }

    const backServer = import.meta.env.VITE_BACK_SERVER;

    const findPw = () => {
        setIsLoding(true);
        if(member.memberId !== "" && member.memberName !== "" && member.memberEmail){
            setIsLoader(true);
            axios
            .get(`${backServer}/member/findPw?memberId=${member.memberId}&&memberName=${member.memberName}
                &&memberEmail=${member.memberEmail}`)
                
                
            .then((res)=>{
                setIsLoding(false);
                console.log(res.data);
                if(res.data){
                    setIsAuth(1);          // 비밀번호 찾기 전 : 0 - 비밀번호 찾기 성공(trueResult) : 1 - 비밀번호 찾기 실패(falseResult) : 2
                    setIsLoader(false);
                    setIsClose(true);
                    setMember({...member,
                        memberId : "",
                        memberName : "",
                        memberEmail : "",
                    })
                    
                } else {
                    setIsAuth(2);
                    setIsLoader(false);
                    setIsClose(true);
                    setMember({...member,
                        memberId : "",
                        memberName : "",
                        memberEmail : "",
                    })
                }
                
            })
            .catch((err)=>{
                Swal.fire({
                    title : "비밀번호 찾기 실패",
                    text : "입력한 정보를 확인해주세요.",
                    icon: "info",
                })
            })
        }
    }

    

    return(
        <>  
        {/* 클릭 전 보여줄 내용 작성(클릭 시 open state를 true로 변경하여 모달 창을 연다) */}
            <div onClick={handleOpen}>비밀번호 찾기</div>

            {/* 여기서부터 모달 창 
                모달 전 내용을 클릭 했을 때 open state가 true로 바뀌어
                Modal의 open props로 true 값이 전달된다 이에 모달창이 열린다.
            */}

            <Modal open={open} onClose={handleClose}>
                {/* 박스의 style을 변경하여 모달 창의 크기 등 스타일을 변경한다.
                    (위 style 객체에 있는 값들이 모달창의 스타일로 적용됨)
                */}
                <Box sx={style}>
                    {/* BOX 안에 모달 창에 들어갈 내용을 적는다. */}

                    {isAuth === 0 ? (
                        <div className="member-modal-wrap">

                            {isLoader && (
                                <div className="loader-wrap">
                                    <span className={isLoding?"loader":""}></span>
                                </div>
                            )}

                            <div className="member-close-button">
                                    <button onClick={handleClose}>x</button>
                            </div>

                            <div className="member-modal-title-name">
                                <h3>비밀번호 찾기</h3>
                            </div>

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
                    : isAuth === 1 ? 
                    (
                        <div className="result-modal-wrap">
                            <div className="result-modal">
                                <div className="member-close-button">
                                    <button onClick={handleClose}>x</button>
                                </div>
                                <div className="member-modal-title-name">
                                    <h3>비밀번호 찾기</h3>
                                </div>
                                <div className="member-id">
                                    <span>임시 비밀번호가 전송되었습니다.</span>
                                </div>
                                
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="result-modal-wrap">
                            <div className="result-modal">
                                <div className="member-close-button">
                                    <button onClick={handleClose}>x</button>
                                </div>

                                <div className="member-modal-title-name">
                                    <h3>비밀번호 찾기</h3>
                                </div>
                                <div className="member-id">
                                    <span>회원님의 아이디가 존재하지 않습니다.</span>
                                </div>
                            </div>
                        </div>
                    )    
                    }
                </Box>
            </Modal>
        </>

    )

}

export default FindPwModal;