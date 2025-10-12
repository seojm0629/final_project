import { useState } from "react";
import FreeBoardSideMenu from "../utils/freeBoardSideMenu";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Route, Routes } from "react-router-dom";
import "./freeBoard.css";

const FreeBoardMain = () => {
  const [selectMenu, setSelectMenu] = useState([]); //클릭 시 선택된 글씨가 나타나도록 구현하는 state
  const addMenu = (menu) => {
    if(!selectMenu.includes(menu)){ //포함하는지
      setSelectMenu([...selectMenu, menu]);
    }
  };
  const deleteMenu = (menu) => { //item에 menu를 제외하고 출력
    setSelectMenu(selectMenu.filter((item, index) => {
      item !== menu;
    }))
  };
    {
        /*
            menu는 관리자가 직접 추가 삭제가능하도록 backend 처리해야함 (axios로 카테고리와 하위 카테고리)
        */
      }
  const [menus, setMenus] = useState([
        {
          text: "직장",
          children: [
            { url: "/freeBoard/company", text: "회사생활" },
            { url: "/freeBoard/document", text: "서류/면접 팁" },
            { url: "/freeBoard/quit", text: "퇴사팁" },
          ],
        },
        {
          text: "게임",
          children: [
            { url: "/freeBoard/review", text: "게임 리뷰" },
            { url: "/freeBoard/mobile", text: "모바일 게임" },
            { url: "/freeBoard/PC", text: "PC" },
          ],
        },
      ]);
  return (
    <div className="main-wrap">
      <div className="main-header">
        <div className="search-div">
          <div className="search-menu">
            <span>자유게시판</span>
            <KeyboardDoubleArrowDownIcon></KeyboardDoubleArrowDownIcon>
          </div>
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            onKeyUp={() => {
              
            }}
          />
          <button className="search-btn">
            <ManageSearchIcon></ManageSearchIcon>
          </button>
          </div>
          <div className="status-box">
            <div className="status-bar">
              {selectMenu.map((menu, i) => {
                <span key={"menuTag" + i} className="menu-tag">
                  {menu}
                  <ClearIcon onClick={() => {
                    deleteMenu(menu);
                  }}></ClearIcon>
                </span>
              })}
            </div>
          </div>
      </div>
      <div className="main-side">
        <section className="section">
          <FreeBoardSideMenu menus={menus} setSelectMenu={addMenu}></FreeBoardSideMenu>
        </section>
      </div>
      <div className="main-content">
        <section className="section free-board">
          <Routes>
            {/*<Route path="company" element={<FreeBoardCompany></FreeBoardCompany>}></Route>*/}
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default FreeBoardMain;
