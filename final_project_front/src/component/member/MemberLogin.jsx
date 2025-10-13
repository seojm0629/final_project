import { Link, useNavigate } from "react-router-dom";
import "./member.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const MemberLogin = () => {
    //member 로그인 시 초기값 세팅
    const [member, setMember] = useState({
        memberId : "",
        memberPw : "",
    })

    //member input 태그 입력 데이터 전송 위한 함수
    const inputLoginData = (e) => {
        setMember({...member, [e.target.name] : e.target.value});
        
    }

    const navigate = useNavigate();

    const login = () => {
        
        if(member.memberId !== "" && member.memberPw !== ""){
            const backServer = import.meta.env.VITE_BACK_SERVER;

            axios
            .post(`${backServer}/member/login`, member)
            .then((res)=>{
                setMember(res.data);
                navigate("/");
            })
            .catch((err)=>{
                Swal.fire({
                    title : "로그인 실패",
                    text : "아이디 또는 비밀번호를 확인해주세요.",
                    icon : "warning",
                })
            }) 

        } else {
            Swal.fire({
                title : "아이디 및 비밀번호 확인",
                text : "빈칸을 모두 입력해주세요.",
                icon : "warning",
            })
        }
    }
    

    
    
    return(
        <section className="section login-wrap">
            <div className="login-page-title">
                <img src="/image/final_logo.png" />
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                login();
            }}>
                <div className="login">
                    <div className="login-input-wrap">
                        <div className="login-input-title">
                            <label htmlFor="memberId">아이디</label>
                        </div>
                        <div className="login-input-item">
                            <input type="text" name="memberId" id="memberId" 
                            value={member.memberId} onChange={inputLoginData}/>
                        </div>
                    </div>

                    <div className="login-input-wrap">
                        <div className="login-input-title">
                            <label htmlFor="memberPw">비밀번호</label>
                        </div>
                        <div className="login-input-item">
                            <input type="password" name="memberPw" id="memberPw" 
                            value={member.memberPw} onChange={inputLoginData}/>
                        </div>
                    </div>
                
                    <div className="login-find">
                        <Link to="#">아이디 찾기</Link>
                        
                        <Link to="#">비밀번호 찾기</Link>
                        
                        <Link to="#">회원가입</Link>
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