import { useEffect, useState } from "react";

import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Route, Routes } from "react-router-dom";
import "./freeBoard.css";
import FreeBoardSideMenu from "../utils/FreeBoardSideMenu";
import axios from "axios";
import PageNavigation from "../utils/PageNavigation";

const FreeBoardMain = () => {
  const [selectMenu, setSelectMenu] = useState([]); //클릭 시 선택된 글씨가 나타나도록 구현하는 state
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const addMenu = (menu) => {
    if (!selectMenu.includes(menu)) {
      setSelectMenu([...selectMenu, menu]);
    }
  };
  const deleteMenu = (menu) => {
    //item에 menu를 제외하고 출력
    setSelectMenu(
      selectMenu.filter((item, index) => {
        item !== menu;
      })
    );
  };
  {
    /*
            menu는 관리자가 직접 추가 삭제가능하도록 backend 처리해야함 (axios로 카테고리와 하위 카테고리)
        */
  }

  /*
  const [menus, setMenus] = useState([
    {
      text: "직장",
      children: [
        { url: "/freeBoard/content", text: "회사생활" },
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
  */

  const [menus, setMenus] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/freeBoard/mainPage`)
      .then((res) => {
        console.log(res);
        setMenus(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(menus);
  /*
  const [menus, setMenus] = useState([
    {
      freeBoardCategory: "직장",
      freeBoardSubcategory: ["회사생활","서류/면접 팁","퇴사 팁"]
        
      ],
    },
  ]);
  */
  /*
  const [reqPageInfo, setReqPageInfo] = useState({
  pageNo: 1, //몇번째 페이지를 요청하는데? (페이징에서 씀)
  listCnt: 6, //한 페이지에 몇개 리스트를 보여줄건데? (페이징에서 씀)
    });
  const [totalListCount, setTotalListCount] = useState(0);
  */
  const [freeBoardTitle, setFreeBoardTitle] = useState("");
  const searchTitle = (e) => {
    if (e.target.text !== null) {
      //axios.get()
      /*
        id="freeBoardTitle"
              name="freeBoardTitle"
              value={freeBoardTitle}
      */
    }
  };
  return (
    <div className="main-wrap">
      <div className="main-header">
        <div className="search-div">
          <div className="search-menu">
            <span>자유게시판</span>
            <KeyboardDoubleArrowDownIcon></KeyboardDoubleArrowDownIcon>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchTitle(e);
            }}
            className="search-btn"
          >
            <input type="text" placeholder="검색어를 입력해주세요" />
            {/*클릭 시 axios search되도록*/}
            <ManageSearchIcon></ManageSearchIcon>
          </form>
        </div>
        <div className="status-box">
          <div className="status-bar">
            {selectMenu.map((menu, i) => {
              return (
                <span key={"menuTag" + i} className="menu-tag">
                  {menu}
                  <ClearIcon
                    onClick={() => {
                      deleteMenu(menu);
                    }}
                  ></ClearIcon>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="main-page">
        <div className="main-side">
          <section className="sidemenu-section">
            <FreeBoardSideMenu
              menus={menus}
              setSelectMenu={addMenu}
            ></FreeBoardSideMenu>
          </section>
        </div>
        <div className="main-content">
          <div className="write-div">
            <span>글작성</span>
          </div>
          <section className="section free-board">
            <Routes>
              <Route
                path="mainPage"
                element={<FreeBoardContent></FreeBoardContent>}
              ></Route>
            </Routes>
          </section>
          {/*
          <div className="page-navi">
            <PageNavigation></PageNavigation>
          </div>
          */}
        </div>
      </div>
    </div>
  );
};

//각 카테고리별 하위카테고리를 눌렀을 때 뜨도록하는 페이지 관리자 페이지에서 추가될때 마다 생성되도록 구현 필요
const FreeBoardContent = () => {
  return (
    <section className="freeBoard-section">
      <div className="board-div">
        <div className="board-section">
          <div className="board-status">now</div>
          <div className="board-title">야야야</div>
          <div className="board-content">내용내용내용</div>
          <div className="nickname-id">
            <span>닉네임</span>
            <span>아이디</span>
          </div>
          <div className="view-heart">
            <div className="view">
              <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
              111
            </div>
            <div className="heart">
              <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
              222
            </div>
            <div className="hour">
              <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>2
            </div>
          </div>
        </div>
        <div className="board-section" style={{ borderLeft: "1px solid #ccc" }}>
          <div className="board-status">now</div>
          <div className="board-title">야야야</div>
          <div className="board-content">내용내용내용</div>
          <div className="nickname-id">
            <span>닉네임</span>
            <span>아이디</span>
          </div>
          <div className="view-heart">
            <div className="view">
              <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
              111
            </div>
            <div className="heart">
              <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
              222
            </div>
            <div className="hour">
              <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>2
            </div>
          </div>
        </div>
      </div>
      <div className="board-div">
        <div className="board-section">
          <div className="board-status">now</div>
          <div className="board-title">야야야</div>
          <div className="board-content">내용내용내용</div>
          <div className="nickname-id">
            <span>닉네임</span>
            <span>아이디</span>
          </div>
          <div className="view-heart">
            <div className="view">
              <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
              111
            </div>
            <div className="heart">
              <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
              222
            </div>
            <div className="hour">
              <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>2
            </div>
          </div>
        </div>
        <div className="board-section" style={{ borderLeft: "1px solid #ccc" }}>
          <div className="board-status">now</div>
          <div className="board-title">야야야</div>
          <div className="board-content">내용내용내용</div>
          <div className="nickname-id">
            <span>닉네임</span>
            <span>아이디</span>
          </div>
          <div className="view-heart">
            <div className="view">
              <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
              111
            </div>
            <div className="heart">
              <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
              222
            </div>
            <div className="hour">
              <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>2
            </div>
          </div>
        </div>
      </div>
      <div className="board-div">
        <div className="board-section">
          <div className="board-status">now</div>
          <div className="board-title">야야야</div>
          <div className="board-content">내용내용내용</div>
          <div className="nickname-id">
            <span>닉네임</span>
            <span>아이디</span>
          </div>
          <div className="view-heart">
            <div className="view">
              <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
              111
            </div>
            <div className="heart">
              <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
              222
            </div>
            <div className="hour">
              <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>2
            </div>
          </div>
        </div>
        <div className="board-section" style={{ borderLeft: "1px solid #ccc" }}>
          <div className="board-status">now</div>
          <div className="board-title">야야야</div>
          <div className="board-content">내용내용내용</div>
          <div className="nickname-id">
            <span>닉네임</span>
            <span>아이디</span>
          </div>
          <div className="view-heart">
            <div className="view">
              <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
              111
            </div>
            <div className="heart">
              <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
              222
            </div>
            <div className="hour">
              <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>2
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FreeBoardMain;
