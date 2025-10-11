import { useState } from "react";
import NavigateLogin from "../utils/NavigateLogin";
import { Route, Routes } from "react-router-dom";

const MemberMypage = () => {
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
                        <Route path="info" element={<MemberInfo />} />
                        <Route path="account" element={<MemberAccount />}/>
                    </Routes>
                </section>
            </div>
        </div>
    )
}

const MemberInfo = () => {
    return(
        <div className="mypage-info">
            <div className="info-img">
                <img src="/image/default_img.png" />
            </div>
            <div className="info-nickname">
                <div>member.nickname</div>
            </div>
        </div>
    )
}

const MemberAccount = () => {
    return(
        <div className="mypage-account-wrap">
            <div className="mypage-account">
                <div className="account-name">
                    <span>memberId</span>
                </div>
                <div className="account-changePw">
                    
                </div>
                <div className="account-changeEmail"></div>
            </div>
        </div>
    )
}


export default MemberMypage;