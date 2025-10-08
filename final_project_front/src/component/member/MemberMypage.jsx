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
                {menus.map((page, i)=>{
                    
                })}
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
            <div className="info-nickname"></div>
        </div>
    )
}

export default MemberMypage;