import { useEffect, useState } from "react";
import NavigateLogin from "../utils/NavigateLogin";
import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authReadyState, loginIdState, memberTypeState } from "../utils/RecoilData";
import axios from "axios";
import ChangePw from "./ChangePw";

const MemberMypage = () => {
    const [memberId, setMemberId] = useRecoilState(loginIdState);
    const [memberType, setMemberType] = useRecoilState(memberTypeState);
    
    
    const [member, setMember] = useState({
        memberId : "",
        memberNickname : "",
        memberPw : "",
        memberBirth : "",
        memberGender : "1",
        memberAddr : "",
        memberPhone : "",
        memberEmail : "",
    });

    
    useEffect(()=>{
        axios
            .get(`${import.meta.env.VITE_BACK_SERVER}/member/${memberId}`)
            .then((res)=>{
                console.log(res);
                setMember(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })    
    },[memberId]);



    const [menus, setMenus] = useState([
        {url : "/member/info", text: "내 정보" },
        {url : "/member/account", text: "계정"},
        {url : "/member/commninty", text : "커뮤니티"},
        {url : "/member/myagree", text:"이용약관"},
        {url : "/member/etc", text:"기타"},
        {url : "/member/admin", text:"관리자 페이지"},

    ]);
    return(
        <div className="mypage-wrap">

            <div className="mypage-side">
                <section className="section account-box">
                    <div>
                        마이페이지
                    </div>
                </section>
                <section className="section map-site">
                    <NavigateLogin menus={menus}/>
                </section>
            </div>

            <div className="mypage-name">
                <section className="section site-path">
                    <Routes>
                        <Route path="info" element={<MemberInfo member={member} memberId={memberId}/>} />
                        <Route path="account" element={<MemberAccount memberId={memberId} />}/>
                        
                    </Routes>
                </section>
            </div>
        </div>
    )
}

const MemberInfo = (props) => {
    const member = props.member;
    

    return(
        <div className="mypage-info">
            <div className="info-img">
                <img src="/image/default_img.png" />
            </div>
            <div className="info-nickname">
                <div>{member.memberNickname}</div>
            </div>
        </div>
    )
}

const MemberAccount = (props) => {
    const memberId = props.memberId;
    return(
        <div className="mypage-account-wrap">
            <div className="mypage-account">
                <div className="account-name">
                    <span>{memberId}</span>
                </div>
                <div className="account-changePw">
                    <ChangePw />
                </div>
                <div className="account-changeEmail"></div>
            </div>
        </div>
    )
}


export default MemberMypage;