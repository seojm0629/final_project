import { useEffect, useState } from "react";

import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./freeBoard.css";
import axios from "axios";
import PageNavigation from "../utils/PageNavigation";
import FreeBoardWrite from "./FreeBoardWrite";
import FreeBoardSideMenu from "../utils/FreeBoardSideMenu";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import Swal from "sweetalert2";

// * 메인페이지 최상위 컴포넌트 *

const FreeBoardMain = () => {
  const [selectMenu, setSelectMenu] = useState([]); //클릭 시 선택된 글씨가 나타나도록 구현하는 state
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const navigate = useNavigate();
  const [selected, setSelected] = useState(-1);
  const [menus, setMenus] = useState([]);
  const [freeBoardTitle, setFreeBoardTitle] = useState("");
  const [member, setMember] = useRecoilState(loginIdState); // 로그인된 memberId, memberType
  const [refreshToggle, setRefreshToggle] = useState(true); // 관리자 페이지에서 하위 카테고리 추가 시
  const [freeBoardContent, setFreeBoardContent] = useState("");
  const [reqPageInfo, setReqPageInfo] = useState({
    sideBtnCount: 3, // 현재 페이지 양옆에 버튼을 몇개 둘껀데?
    pageNo: 1, //몇번째 페이지를 요청하는데? (페이징에서 씀)
    listCnt: 6, //한 페이지에 몇개 리스트를 보여줄건데? (페이징에서 씀)
    order: 2, //최신순, 오래된 순
  });
  const [totalListCount, setTotalListCount] = useState(0);
  const [freeBoardList, setFreeBoardList] = useState([]);
  const [titleState, setTitleState] = useState(""); //url 넘길 state
  const searchTitle = () => {
    setReqPageInfo({...reqPageInfo, pageNo: 1});
    setTitleState(freeBoardTitle);
  }
  // * freeBoardListNo (최상위 컴포넌트에서 -> sideMenu -> main -> content) *
  const addMenu = (menu) => {
    if (!selectMenu.includes(menu)) {
      setSelectMenu([...selectMenu, menu]);
    }
  };
  const deleteMenu = (menu) => {
    //item에 menu를 제외하고 출력
    setSelectMenu(
      selectMenu.filter((item, index) => {
        return(
          item !== menu
        );
      })
    );
  };
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
  const changeTitle = (e) => {
    setFreeBoardTitle(e.target.value);
  }
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
              onChange={changeTitle}
            />
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
              setMenus={setMenus}
              setSelectMenu={addMenu}
              setSelected={setSelected}
              refreshToggle={refreshToggle}
            />
          </section>
        </div>
        <div className="main-content">
          <div className="write-div">
            <div
              onClick={() => {
                {
                  member === ""
                    ? Swal.fire({
                        title: "로그인",
                        text: "로그인 후 이용해주세요.",
                        icon: "warning",
                      }).then(() => {
                        navigate("/member/login");
                      })
                    : navigate("/freeBoard/boardWrite");
                }
              }}
            >
              <span>글작성</span>
            </div>
          </div>
          <section className="section free-board">
            <Routes>
              
              <Route
                path="content"
                element={
                  <FreeBoardContent
                    selected={selected}
                    reqPageInfo={reqPageInfo}
                    setReqPageInfo={setReqPageInfo}
                    totalListCount={totalListCount}
                    setTotalListCount={setTotalListCount}
                    freeBoardList={freeBoardList}
                    setFreeBoardList={setFreeBoardList}
                    titleState = {titleState}
                    freeBoardTitle = {freeBoardTitle}
                  ></FreeBoardContent>
                }
              ></Route>
              <Route
                path="boardWrite"
                element={
                  <FreeBoardWrite
                    setFreeBoardTitle={setFreeBoardTitle}
                    menus={menus}
                  ></FreeBoardWrite>
                }
              ></Route>
            </Routes>
          </section>
        </div>
      </div>
    </div>
  );
};

//각 카테고리별 하위카테고리를 눌렀을 때 뜨도록하는 페이지 관리자 페이지에서 추가될때 마다 생성되도록 구현 필요
const FreeBoardContent = (props) => {
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const selected = props.selected;
  const reqPageInfo = props.reqPageInfo;
  const setReqPageInfo = props.setReqPageInfo;
  const totalListCount = props.totalListCount;
  const setTotalListCount = props.setTotalListCount;
  const freeBoardList = props.freeBoardList;
  const setFreeBoardList = props.setFreeBoardList;
  const navigate = useNavigate();
  const titleState = props.titleState;
  const [result, setResult] = useState(false); //리스트 조회 결과에 따라 출력
  const listUrl =
    selected === -1
      ? `${backServer}/freeBoard/content?pageNo=${reqPageInfo.pageNo}
        &listCnt=${reqPageInfo.listCnt}
        &sideBtnCount=${reqPageInfo.sideBtnCount}
        &order=${reqPageInfo.order}`
      : `${backServer}/freeBoard/content/category?pageNo=${reqPageInfo.pageNo}
              &listCnt=${reqPageInfo.listCnt}
              &sideBtnCount=${reqPageInfo.sideBtnCount}
              &order=${reqPageInfo.order}
              &selected=${selected}`;
  const searchFreeBoardUrl = 
  `${backServer}/freeBoard/content/freeBoardTitle?pageNo=${reqPageInfo.pageNo}
        &listCnt=${reqPageInfo.listCnt}
        &sideBtnCount=${reqPageInfo.sideBtnCount}
        &order=${reqPageInfo.order}
        &freeBoardTitle=${titleState}`;
  const boardUrl = titleState && titleState.trim() !== "" ? searchFreeBoardUrl : listUrl;
  useEffect(() => {
    //게시글이 카테고리와 하위 카테고리에 해당하는 게시글만 조회되도록
    axios
      .get(boardUrl)
      .then((res) => {
        if(res.data.boardList.length !== 0 ){
          setFreeBoardList(res.data.boardList);
          setTotalListCount(res.data.totalListCount);
        }else{
          setFreeBoardList([]);
          setTotalListCount(0);
        }
      })
      .catch((err) => {
        console.log(err);
        setResult(true);
      });
  }, [reqPageInfo.order, reqPageInfo.pageNo, selected, titleState]);
  const detailNavi = () => {
    navigate("/freeBoard/detail");
  };
  return (
    <section className="freeBoard-section">
      {result ? (
        <div className="no-result">
          검색 결과가 없습니다.
        </div>
      ) : (
              <div className="board-div">
        {freeBoardList.map((list, i) => {
          return i % 2 === 0 ? (
            <div
              key={"first" + i}
              className="board-section"
              style={{
                borderRight: "1px solid #ccc",
              }}
              onClick={detailNavi}
            >
              {/*상태넣을꺼*/}
              <div className="board-status">{list.freeBoardNo}</div>
              <div className="board-title">{list.freeBoardTitle}</div>
              <div
                className="board-content"
                dangerouslySetInnerHTML={{ __html: list.freeBoardContent }}
              ></div>
              <div className="nickname-id">
                <span>{list.memberNickname}</span>
                <span>{list.memberId}</span>
              </div>
              <div className="view-heart">
                <div className="view">
                  {/*작성된 게시글을 클릭 시 count(*) */}
                  <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
                  111
                </div>
                <div className="heart">
                  <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
                  {list.likeCount}
                </div>
                <div className="hour">
                  <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>2
                </div>
              </div>
            </div>
          ) : (
            <div key={"second" + i} className="board-section"
              onClick={detailNavi}
            >
              <div className="board-status">{list.freeBoardNo}</div>
              <div className="board-title">{list.freeBoardTitle}</div>
              <div
                className="board-content"
                dangerouslySetInnerHTML={{ __html: list.freeBoardContent }}
              ></div>
              <div className="nickname-id">
                <span>{list.memberNickname}</span>
                <span>{list.memberId}</span>
              </div>
              <div className="view-heart">
                <div className="view">
                  <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
                  111
                </div>
                <div className="heart">
                  <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
                  {list.likeCount}
                </div>
                <div className="hour">
                  <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>2
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}
      <div
        className="order-div"
        onClick={() => {
          {
            reqPageInfo.order === 2
              ? setReqPageInfo({ ...reqPageInfo, order: 1 })
              : setReqPageInfo({ ...reqPageInfo, order: 2 });
          }
        }}
      >
        <div>
          <ImportExportOutlinedIcon></ImportExportOutlinedIcon>
          {reqPageInfo.order === 2 ? (
            <span>최신순</span>
          ) : (
            <span>오래된순</span>
          )}
        </div>
      </div>
      <div className="page-navi">
        <PageNavigation
          reqPageInfo={reqPageInfo}
          setReqPageInfo={setReqPageInfo}
          totalListCount={totalListCount}
          setTotalListCount={setTotalListCount}
          setFreeBoardList={setFreeBoardList}
        ></PageNavigation>
      </div>
    </section>
  );
};

/**
 * props : refreshToggle (관리자페이지 새로고침용)
 */
const FreeBoardSideMenuMap = (props) => {
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const [selectMenu, setSelectMenu] = useState([]);
  const [selected, setSelected] = useState(-1);
  const [menus, setMenus] = useState([]);
  const toggle = props.refreshToggle;
  const addMenu = (menu) => {
    if (!selectMenu.includes(menu)) {
      setSelectMenu([...selectMenu, menu]);
    }
  };

  useEffect(() => {
    axios
      .get(`${backServer}/freeBoard/mainPage`)
      .then((res) => {
        setMenus(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggle]);
  return (
    <FreeBoardSideMenu
      menus={menus}
      setMenus={setMenus}
      setSelectMenu={addMenu}
      setSelected={setSelected}
    ></FreeBoardSideMenu>
  );
};
export { FreeBoardMain, FreeBoardSideMenuMap };
