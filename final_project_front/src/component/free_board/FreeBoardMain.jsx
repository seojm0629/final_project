import {useState} from "react";
import FreeBoardSideMenu from "../utils/freeBoardSideMenu";

const FreeBoardMain = () => {
    {/*
        menu는 관리자가 직접 추가 삭제가능하도록 backend 처리해야함 (axios로 카테고리와 하위 카테고리)
    */}
    const [menus, setMenus] = useState([
        {text: "직장",
            children:[
                {url: "/freeBoard/company", text: "회사생활"},
                {url: "/freeBoard/document", text: "서류/면접 팁"},
                {url: "/freeBoard/quit", text: "퇴사팁"},
            ],
        },
        {text: "게임",
            children:[
                {url: "/freeBoard/review", text: "게임 리뷰"},
                {url: "/freeBoard/mobile", text: "모바일 게임"},
                {url: "/freeBoard/PC", text: "PC"},
            ],
        },
    ]);
    return(
        <div className="main-wrap">
            <div className="main-side">
                <section className="section free-board">
                    <div>자유게시판</div>
                </section>
                <section>
                    <FreeBoardSideMenu menus={menus}></FreeBoardSideMenu>
                </section>
            </div>
        </div>
    );  
};

export default FreeBoardMain;