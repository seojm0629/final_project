import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ChangePw = () => {
    //로그인 한 사용자 저장 아이디 불러오기
    const [memberId, setMemberId] = useRecoilState(loginIdState);
    //member 초기 state 설정
    const [member, setMember] = useState({
        memberId : memberId,
        memberPw : "",
    })
    //현재 비밀번호를 입력해서 확인했는지 체크하는 state
    const [isAuth, setIsAuth] = useState(false);
    //비밀번호 확인 State
    const [memberPwRe, setMemberPwRe] = useState("");
    
    const navigate = useNavigate();
    const inputPw = (e) => {
        const newPw = {...member, memberPw : e.target.value};
        setMember(newPw);
    }
    const inputPwRe = (e) => {
        setMemberPwRe(e.target.value);
    }

    //기존 비밀번호 확인 
    const checkPw = () => {      
        axios
        .post(`${import.meta.env.VITE_BACK_SERVER}/member/checkPw`, member)
        .then((res)=>{
            console.log(res);
            if(res.data === 1){
                setIsAuth(true);
                setMember({...member, memberPw:""});
            } else {
                Swal.fire({
                    title : "비밀번호 확인",
                    icon : "info",
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    //새 비밀번호로 수정
    const changePw = () => {
        if(member.memberPw !== "" && member.memberPw === memberPwRe){
            axios
            .patch(`${import.meta.env.VITE_BACK_SERVER}/member/password`, member)
            .then((res)=>{
                if(res.data === 1){
                    Swal.fire({
                        title : "비밀번호 변경 완료",
                        icon : "success",
                    })
                    .then(()=>{
                        setIsAuth(flase);
                        setMember({...member, memberPw : ""})
                        setMemberPwRe("");
                        
                    })
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        } else {
            Swal.fire({
                title : "비밀번호 확인",
                text : "비밀번호가 일치하지 않습니다.",
                icon : "warning",
            })
        }
    }

    return(
        <div>
            <div className="changePw-wrap">
                {isAuth ? (<form onSubmit={(e)=>{
                    e.preventDefault();
                    changePw();
                }}>
                    <div className="changePw-name">
                        <span>비밀번호 변경</span>
                    </div>
                    <div className="mypage-changePw-wrap-update">
                        <div className="mypage-changePw-item">
                            <input type="password" name="memberPw" id="memberPw"
                            value={""}
                            onChange={inputPw}
                            placeholder="확인되었습니다."
                            disabled
                            />
                        </div>
                        
                    </div>

                    <div className="mypage-changePw-wrap-update">
                        <div className="mypage-changePw-item">
                            <input type="password" name="changePw" id="changePw" 
                            value={member.memberPw}
                            onChange={inputPw}
                            placeholder="새 비밀번호 입력"
                            />
                        </div>
                    </div>

                    <div className="mypage-changePw-wrap-update">
                        <div className="mypage-changePw-item">
                            <input type="password" name="changePwRe" id="changePwRe"
                            value={memberPwRe}
                            onChange={inputPwRe}
                            placeholder="새 비밀번호 확인 입력"
                            />
                        </div>
                        <div className="mypage-changePw-btn-box">
                            <button className="btn-zone">수정</button>
                        </div>
                    </div>

                    
                </form>) : (
                    <form onSubmit={(e)=>{
                    e.preventDefault();
                    checkPw();
                }}>
                    <div className="changePw-name">
                        <span>비밀번호 변경</span>
                    </div>
                    <div className="mypage-changePw-wrap">
                        
                        <div className="mypage-changePw-item">
                            <input type="password" name="memberPw" id="memberPw"
                            value={member.memberPw}
                            onChange={inputPw}
                            placeholder="기존 비밀번호 입력"
                            />
                        </div>
                        <div className="mypage-changePw-btn-box">
                            <button className="btn-zone">확인</button>
                        </div>
                    </div>

                    <div className="mypage-changePw-wrap">
                        <div className="mypage-changePw-item">
                            <input type="password" name="changePw" id="changePw" 
                            value={""}
                            onChange={inputPw}
                            placeholder="새 비밀번호 입력"
                            disabled
                            />
                        </div>
                    </div>

                    <div className="mypage-changePw-wrap">
                        <div className="mypage-changePw-item">
                            <input type="password" name="changePwRe" id="changePwRe"
                            value={memberPwRe}
                            onChange={inputPwRe}
                            placeholder="새 비밀번호 확인 입력"
                            disabled
                            />
                        </div>
                    </div>
                    
                </form>)}
                
            </div>
        </div>
    )
}

export default ChangePw;