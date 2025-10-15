import { useEffect, useState } from "react";
import NavigateLogin from "../utils/NavigateLogin";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authReadyState, loginIdState, memberTypeState } from "../utils/RecoilData";
import axios from "axios";
import ChangePw from "./ChangePw";
import ChangeEmail from "./ChangeEmail";
import Swal from "sweetalert2";

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



    const [menus, setMenus] = useState(
    memberType === 1 ?
    ([
        {url : "/member/info", text: "내 정보" },
        {url : "/member/account", text: "계정"},
        {url : "/member/community", text : "커뮤니티"},
        {url : "/member/notice", text:"이용약관"},
        {url : "/member/etc", text:"기타"},
        {url : "/member/admin", text:"관리자 페이지"},

    ]):
    ([
        {url : "/member/info", text: "내 정보" },
        {url : "/member/account", text: "계정"},
        {url : "/member/community", text : "커뮤니티"},
        {url : "/member/notice", text:"이용약관"},
        {url : "/member/etc", text:"기타"},
        
    ])
    );
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
                    <div className="mypage-tab">
                        <MemberInfo member={member} memberId={memberId}/>
                        <MemberAccount memberId={memberId} />
                        <MemberCommunity />
                        <MemberNotice />
                        <MemberEtc memberId={memberId} memberType={memberType} setMemberId={setMemberId} setMemberType={setMemberType}/>
                    </div>
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
                <div className="account-changeEmail">
                    <ChangeEmail />
                </div>
            </div>
        </div>
    )
}

const MemberCommunity = () => {
    const navigate = useNavigate();

    const board = () => {
        navigate("") //게시판 링크 필요
    }
    const community = () => {
        navigate("") //커뮤니티 이용 규칙 링크 필요
    }
    return(
        <div className="mypage-community-wrap">
            <div className="mypage-community">
                <div className="community-manage">
                    <button type="submit">게시판 관리</button>
                </div>
                <div className="commnuity-rule">
                    <button type="submit">커뮤니티 이용규칙</button>
                </div>
            </div>
        </div>
    )
}

const MemberNotice = () => {

    return(
        <div className="mypage-notice-wrap">
            <div className="mypage-notice">
                <div className="notice">
                    <button type="submit">공지사항</button>
                </div>
                <div className="mypage-service">
                    <button type="submit">서비스 이용약관</button>
                </div>
                <div className="mypage-terms">
                    <button type="submit">개인정보 처리방침</button>
                </div>
            </div>
        </div>
    )
}

const MemberEtc = (props) => {
    const memberId = props.memberId;
    const memberType = props.memberType;
    const setMemberId = props.setMemberId;
    const setMemberType = props.setMemberType;
    const navigate = useNavigate();

    const deleteMember = () => {
        Swal.fire({
            title : "회원 탈퇴",
            text : "회원을 탈퇴하시겠습니까?",
            icon : "warning",
            showCancelButton : true,
            confirmButtonText : "확인",
            cancelButtonText : "취소",
        }).then((deleteCheck)=>{
            if(deleteCheck.isConfirmed){
                axios
                .delete(`${import.meta.env.VITE_BACK_SERVER}/member/${memberId}`)
                
                .then((res)=>{
                    if(res.data===1){
                        Swal.fire({
                            title : "회원탈퇴 완료",
                            text : "탈퇴가 완료되었습니다.",
                            icon : "success",
                        }).then(()=>{
                            setMemberId("");
                            setMemberType(0);
                            delete axios.defaults.headers.common["Authorization"];
                            window.localStorage.removeItem("refreshToken");
                            navigate("/");
                        })
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })

            }
        })
    }
    return(
        <div className="mypage-etc-wrap">
            <div className="mypage-etc">
                <div className="delete-member">
                    <button type="submit" onClick={deleteMember}>회원 탈퇴</button>
                </div>
            </div>
        </div>
    )
}

export default MemberMypage;