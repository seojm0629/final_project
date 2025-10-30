import { useEffect, useRef, useState } from "react";
import NavigateLogin from "../utils/NavigateLogin";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authReadyState, loginIdState, memberTypeState } from "../utils/RecoilData";
import axios from "axios";
import ChangePw from "./ChangePw";
import ChangeEmail from "./ChangeEmail";
import Swal from "sweetalert2";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const MemberMypage = () => {
    const [memberId, setMemberId] = useRecoilState(loginIdState);
    const [memberType, setMemberType] = useRecoilState(memberTypeState);
    
    //스크롤 이동할 Ref 구현
    const infoRef = useRef(null);
    const accountRef = useRef(null);
    const communityRef = useRef(null);
    const noticeRef = useRef(null);
    const etcRef = useRef(null);

    //스크롤 이동 함수
    const scroll = (ref) => {
        if(ref.current){
            ref.current.scrollIntoView({behavior : "smooth", block:"start"});
        }
    };

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
                
                setMember(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })    
    },[memberId]);
    const navigate = useNavigate();
    const agree = () => {
        navigate("/service/agree");
    }
    


    const [menus, setMenus] = useState(
    memberType === 1 ?
    ([
        {url : "/member/info", text: "내 정보" },
        {url : "/member/account", text: "계정"},
        {url : "/member/community", text : "커뮤니티"},
        {url : "/member/notice", text:"이용약관"},
        {url : "/member/etc", text:"기타"},
        {url : "/admin", text:"관리자 페이지"},

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
                    <NavigateLogin menus={menus}
                        scroll={scroll}
                        refs={{infoRef, accountRef, communityRef, noticeRef, etcRef}}
                    />
                </section>
            </div>

            <div className="mypage-name">
                <section className="section site-path">
                    <div className="mypage-tab">
                        <section ref={infoRef} className="section site-path">
                            <MemberInfo member={member} memberId={memberId} setMember={setMember} />
                        </section>
                        <section ref={accountRef} className="section site-path">
                            <MemberAccount memberId={memberId} />
                        </section>
                        <section ref={communityRef} className="section site-path">
                            <MemberCommunity agree={agree} />
                        </section>
                        <section ref={noticeRef} className="section site-path">
                            <MemberNotice agree={agree} memberId={memberId}/>
                        </section>
                        <section ref={etcRef} className="section site-path">
                            <MemberEtc memberId={memberId} memberType={memberType} setMemberId={setMemberId} setMemberType={setMemberType} />
                        </section>
                    </div>
                </section>
            </div>
        </div>
    )
}

const MemberInfo = (props) => {
    const member = props.member;
    const memberId = props.memberId;
    const setMember = props.setMember;
    
    
    const changeNickname = () => {
        Swal.fire({
            title : "닉네임 수정",
            text: "닉네임을 수정하시겠습니까?",
            icon : "question",
            showCancelButton : true,
            confirmButtonText : "수정",
            cancelButtonText : "취소"
        }).then((change)=>{
            if(change.isConfirmed){
                axios
                .patch(`${import.meta.env.VITE_BACK_SERVER}/member`, member)
                .then((res)=>{
                    if(res.data === 1){
                        Swal.fire({
                            title : "수정 완료",
                            text : "닉네임이 수정되었습니다.",
                            icon : "success",
                        })
                    }
                    
                })
            }

        })
        .catch((err)=>{
            console.log(err);
        })
    }

    
    return(      
        <div className="mypage-info tab-menu">
            <div className="info-title mypage-title">
                <h2>내 정보</h2>
            </div>

            <div className="info-content" >
                
                <div className="info-nickname">
                    <div className="nickname-input ">
                        <div className="nickname content-info">
                            닉네임
                        </div>
                        <input name="memberNickname" id="memberNickname"
                        value={member.memberNickname} onChange={(e) => setMember({...member, memberNickname : e.target.value})}></input>
                    </div>
                </div>
                <div className="mypage-nick-btn-box">
                    <button type="submit" onClick={changeNickname}>변경하기</button>
                </div>
            </div>
        </div>
    )
}

const MemberAccount = (props) => {
    const memberId = props.memberId;
    return(
        <div className="mypage-account-wrap tab-menu">
            <div className="account-title mypage-title">
                <h2>계정</h2>
            </div>

            <div className="mypage-account">

                <div className="account-name tab-div">
                    <div className="member-name content-info">
                        아이디
                    </div>                    
                    <span>{memberId}</span>
                </div>

                <div className="account-changePw tab-div">
                    <ChangePw />
                </div>
                <div className="account-changeEmail tab-div">
                    <ChangeEmail />
                </div>
            </div>
        </div>
    )
}

const MemberCommunity = (props) => {
    const navigate = useNavigate();
    const agree = props.agree;

    
    return(
        <div className="mypage-community-wrap tab-menu">
            <div className="community-title">
                <h2>커뮤니티</h2>
            </div>
            <div className="mypage-community">
                <div className="notice tab-div">
                    <button type="submit">공지사항</button>
                </div>
                <div className="community-manage tab-div">
                    <button type="submit">게시판 관리</button>
                </div>
                
            </div>
        </div>
    )
}

const MemberNotice = (props) => {
    const agree = props.agree;
    const memberId = props.memberId;
    const [memberCheck, setMemberCheck] = useState("N");
    

    const [promotionCheck, setPromotionCheck] = useState({
        promotion : false,
    })

    useEffect(()=>{
        if(!memberId) return;

        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/member/${memberId}`)
        .then((res)=>{
            if(res.data){
                const isAgreed = res.data.memberCheck === "Y";
                setPromotionCheck({promotion: isAgreed});
            }

        })
        .catch((err)=>{
            console.log(err);
        })

    }, [memberId])

    const promotionAgree = (e) =>{
        const name = e.target.name;
        const checked = e.target.checked;
        const updated = {...promotionCheck, [name] : checked};
        setPromotionCheck(updated);    

        const memberCheck = checked ? "Y" : "N";

        axios
        .patch(`${import.meta.env.VITE_BACK_SERVER}/member/promotion?memberId=${memberId}&&memberCheck=${memberCheck}`)
        .then((res)=>{
            console.log(res);
            if(res.data === 1){
                if(memberCheck === "Y"){
                    alert("홍보 및 이벤트 이메일 수신 동의하셨습니다.");
                } else {
                    alert("홍보 및 이벤트 이메일 수신 동의를 해제하셨습니다.");
                }
            } 
                    
        })
        .catch((err)=>{
            console.log(err);
        })

    }
    
    
    /*
    useEffect(()=>{
        if(promotionCheck.promotion){
            setMemberCheck("N");          
        } else {
            setMemberCheck("Y");
        }
        
        
        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/member/${memberId}`)
        .then((res)=>{
            if(res.data !== ""){
                axios
                .patch(`${import.meta.env.VITE_BACK_SERVER}/member/promotion?memberId=${memberId}&&memberCheck=${memberCheck}`)
                .then((res)=>{
                    if(res.data === 1){
                        
                    } else {
                        
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
        /*
        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/member/promotion/${poCheck}` )
        .then((res)=>{
            console.log(res);        
        })
        .catch((err)=>{
            console.log(err);
        })
            
        
    },[promotionCheck])
    */
    

    return(
        <div className="mypage-notice-wrap tab-menu">
            <div className="agree-title">
                <h2>이용약관</h2>
            </div>
            <div className="mypage-notice">
                <div className="commnuity-rule tab-div">
                    <button type="submit" onClick={agree}>커뮤니티 이용규칙</button>
                </div>
                <div className="mypage-service tab-div">
                    <button type="submit" onClick={agree}>서비스 이용약관</button>
                </div>
                <div className="mypage-terms tab-div">
                    <button type="submit" onClick={agree}>개인정보 처리방침</button>
                </div>
                <div className="mypage-promotion tab-div">
                    <button type="submit" onClick={agree}>홍보 및 마케팅 활용에 대한 동의</button>
                    <div className="promotion-check">
                        <input type="checkbox" name="promotion" id="promotion" onChange={promotionAgree} checked={promotionCheck.promotion}/>
                        <label htmlFor="promotion">동의</label>
                    </div>
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
        <div className="mypage-etc-wrap  tab-menu">
            <div className="etc-title">
                <h2>기타</h2>
            </div>
            <div className="mypage-etc">
                <div className="delete-member tab-div">
                    <button type="submit" onClick={deleteMember}>회원 탈퇴</button>
                </div>
            </div>
        </div>
    )
}

export default MemberMypage;