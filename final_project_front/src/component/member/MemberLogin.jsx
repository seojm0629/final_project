import { Link, useNavigate } from "react-router-dom";
import "./member.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { loginIdState, memberTypeState } from "../utils/RecoilData";
import FindPw from "./FindPw";
import FindId from "./FindId";

const MemberLogin = () => {
    //recoil에 선언한 데이터(state)를 가져오는 방법
    const [memberId, setMemberId] = useRecoilState(loginIdState);
    const [memberType, setMemberType] = useRecoilState(memberTypeState);


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

                //로그인 성공시점에 받아온 회원 정보를 recoil의 저장소에 저장
                setMemberId(res.data.memberId);
                setMemberType(res.data.memberType);

                //로그인 이후 axios를 통한 요청을 수행하는 경우 토큰값을 자동으로 axios를 추가하는 로직
                axios.defaults.headers.common["Authorization"] = res.data.access;
                //로그인 성공 시 갱신을 위한 refreshToken을 브라우저에 저장
                window.localStorage.setItem("refreshToken", res.data.refreshToken);

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
                        <FindId>아이디 찾기</FindId>
                        
                        <FindPw> 비밀번호 찾기</FindPw>
                        
                        <Link to="/member/join">회원가입</Link>
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