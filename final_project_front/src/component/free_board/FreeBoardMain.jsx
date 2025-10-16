import { useEffect, useState } from "react";

import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./freeBoard.css";

import axios from "axios";
import PageNavigation from "../utils/PageNavigation";
import FreeBoardWrite from "./FreeBoardWrite";
import FreeBoardSideMenu from "../utils/freeBoardSideMenu";

const FreeBoardMain = () => {
  const [selectMenu, setSelectMenu] = useState([]); //클릭 시 선택된 글씨가 나타나도록 구현하는 state
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const navigation = useNavigate();
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
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/freeBoard/mainPage`)
      .then((res) => {
        setMenus(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [freeBoardTitle, setFreeBoardTitle] = useState("");
  const searchTitle = () => {
    axios
      .get(`${backServer}/freeBoard/${freeBoardTitle}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="main-div">
      <div className="main-header">
        <div className="search-div">
          <div className="search-menu">
            <span>자유게시판</span>
            <KeyboardDoubleArrowDownIcon></KeyboardDoubleArrowDownIcon>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchTitle();
            }}
            className="search-btn"
          >
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              id="freeBoardTitle"
              name="freeBoardTitle"
              value={freeBoardTitle}
              onChange={(e) => {
                setFreeBoardTitle(e.target.value);
              }}
            />
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
          <div
            className="write-div"
            onClick={() => {
              navigation("/freeBoard/boardWrite");
            }}
          >
            <span>글작성</span>
          </div>
          <section className="section free-board">
            <Routes>
              <Route
                path="mainPage"
                element={<FreeBoardContent></FreeBoardContent>}
              ></Route>
              <Route
                path="boardWrite"
                element={<FreeBoardWrite></FreeBoardWrite>}
              ></Route>
            </Routes>
          </section>
        </div>
      </div>
    </div>
  );
};

//각 카테고리별 하위카테고리를 눌렀을 때 뜨도록하는 페이지 관리자 페이지에서 추가될때 마다 생성되도록 구현 필요
const FreeBoardContent = () => {
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const [reqPageInfo, setReqPageInfo] = useState({
    sideBtnCount: 3, // 현재 페이지 양옆에 버튼을 몇개 둘껀데?
    pageNo: 1, //몇번째 페이지를 요청하는데? (페이징에서 씀)
    listCnt: 6, //한 페이지에 몇개 리스트를 보여줄건데? (페이징에서 씀)
    order: 2, //최신순, 오래된 순
  });
  const [totalListCount, setTotalListCount] = useState(0);
  const [freeBoardList, setFreeBoardList] = useState([]);
  console.log(freeBoardList);
  useEffect(() => {
    //게시글이 카테고리와 하위 카테고리에 해당하는 게시글만 조회되도록
    axios
      .get(
        `${backServer}/freeBoard/content?pageNo=${reqPageInfo.pageNo}
        &listCnt=${reqPageInfo.listCnt}
        &sideBtnCount=${reqPageInfo.sideBtnCount}
        &order=${reqPageInfo.order}`
      )
      .then((res) => {
        console.log(res);
        setFreeBoardList(res.data.boardList);
        setTotalListCount(res.data.totalListCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPageInfo.pageNo]);
  return (
    <section className="freeBoard-section">
      <div className="board-div">
        {freeBoardList.map((list, i) => {
          return i % 2 !== 0 ? (
            <div key={"first" + i} className="board-section">
              <div className="board-status">now</div>
              {/*상태*/}
              <div className="board-title">{list.freeBoardTitle}</div>
              <div className="board-content">{list.freeBoardContent}</div>
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
          ) : (
            <div
              key={"second" + i}
              className="board-section"
              style={{ borderLeft: "1px solid #ccc" }}
            >
              <div className="board-status">now</div>
              <div className="board-title">{list.freeBoardTitle}</div>
              <div className="board-content">{list.freeBoardContent}</div>
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
          );
        })}
      </div>
      <div className="page-navi">
        <PageNavigation
          reqPageInfo={reqPageInfo}
          setReqPageInfo={setReqPageInfo}
          totalListCount={totalListCount}
        ></PageNavigation>
      </div>
    </section>
  );
  {
    /*
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
      */
  }
};
export default FreeBoardMain;
