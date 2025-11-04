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
import { loginIdState, memberNoState } from "../utils/RecoilData";
import Swal from "sweetalert2";
import FreeBoardDetail from "./FreeBoardDetail";
import dayjs from "dayjs";
import FreeBoardModify from "./FreeBoardModify";

// * 메인페이지 최상위 컴포넌트 *

const FreeBoardMain = () => {
  const [selectMenu, setSelectMenu] = useState([]); //클릭 시 선택된 글씨가 나타나도록 구현하는 state
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const navigate = useNavigate();
  const [selected, setSelected] = useState(-1);
  const [menus, setMenus] = useState([]);
  const [freeBoardNo, setFreeBoardNo] = useState(); //detail에 넘길 freeBoardNo
  const [freeBoardTitle, setFreeBoardTitle] = useState("");
  const [member, setMember] = useRecoilState(loginIdState); // 로그인된 memberId, memberType
  const [refreshToggle, setRefreshToggle] = useState(true); // 관리자 페이지에서 하위 카테고리 추가 시
  const [reqPageInfo, setReqPageInfo] = useState({
    sideBtnCount: 3, // 현재 페이지 양옆에 버튼을 몇개 둘껀데?
    pageNo: 1, //몇번째 페이지를 요청하는데? (페이징에서 씀)
    listCnt: 6, //한 페이지에 몇개 리스트를 보여줄건데? (페이징에서 씀)
    order: 2, //최신순, 오래된 순
  });
  const [totalListCount, setTotalListCount] = useState(0);
  const [freeBoardList, setFreeBoardList] = useState([]);
  const [titleState, setTitleState] = useState(""); //url 넘길 state

  const [noticeList, setNoticeList] = useState([]);
  const [noticeIndex, setNoticeIndex] = useState(0);
  const [showNotice, setShowNotice] = useState(false);
  const searchTitle = () => {
    setReqPageInfo({ ...reqPageInfo, pageNo: 1 });
    setTitleState(freeBoardTitle);
  };
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
        return item !== menu;
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
        navigate("/pageerror");
      });
  }, []);
  const changeTitle = (e) => {
    setFreeBoardTitle(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${backServer}/admin/freeboard/notice/active`)
      .then((res) => {
        if (res.data.length > 0) {
          setNoticeList(res.data);
          setShowNotice(true);
        }
      })
      .catch((err) => {
        navigate("/pageerror");
      });
  }, []);
  useEffect(() => {
    console.log(noticeList);
    if (
      showNotice &&
      noticeList.length > 0 &&
      noticeIndex < noticeList.length
    ) {
      const current = noticeList[noticeIndex];

      Swal.fire({
        title: `공지사항 ${noticeIndex + 1}/${noticeList.length}`,
        html: current.noticeContent,
        width: 800,
        showCancelButton: noticeIndex < noticeList.length - 1,
        confirmButtonText:
          noticeIndex < noticeList.length - 1 ? "다음 공지" : "닫기",
        cancelButtonText: "그만 보기",
      }).then((result) => {
        if (result.isConfirmed && noticeIndex < noticeList.length - 1) {
          setNoticeIndex((prev) => prev + 1);
        } else {
          setShowNotice(false);
        }
      });
    }
  }, [noticeList, noticeIndex, showNotice]);
  return (
    <div className="main-div">
      <div className="main-header">
        <div className="search-div">
          <div className="search-menu">
            <span>자유게시판</span>
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
            <ManageSearchIcon
              onClick={() => {
                searchTitle();
              }}
            ></ManageSearchIcon>
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
                    titleState={titleState}
                    freeBoardTitle={freeBoardTitle}
                    setFreeBoardNo={setFreeBoardNo}
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
              <Route
                path="modify/:freeBoardNo"
                element={
                  <FreeBoardModify
                    setFreeBoardTitle={setFreeBoardTitle}
                    menus={menus}
                  />
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
  const [memberNo, setMemberNo] = useRecoilState(memberNoState);
  const [freeBoardCategoryNo, setFreeBoardCategoryNo] = useState();
  const [freeBoardSubcategoryNo, setFreeBoardSubcategoryNo] = useState();
  const [freeBoardNo, setFreeBoardNo] = useState();
  const [toggle, setToggle] = useState(false);

  const nowDate = (dateString) => {
    const now = dayjs(); //현재 날짜/시간 가져오는 함수
    const target = dayjs(dateString); // 날짜를 dayjs 형식으로 변환하기
    const diffDays = now.diff(target, "day"); // 현재날짜와 지난날짜와 비교
    // 보낸날짜가 17일이면 오늘이 19일 그럼 2일전 표시이렇게 자동으로 계산
    if (diffDays >= 7) {
      return target.format("YYYY-MM-DD"); // 7일 이상이면 날짜로 변형
    }
    return target.fromNow(); //한국어로 ?? 시간전 표시하기
  };
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
  const searchFreeBoardUrl = `${backServer}/freeBoard/content/freeBoardTitle?pageNo=${reqPageInfo.pageNo}
        &listCnt=${reqPageInfo.listCnt}
        &sideBtnCount=${reqPageInfo.sideBtnCount}
        &order=${reqPageInfo.order}
        &freeBoardTitle=${titleState}`;
  const boardUrl =
    titleState && titleState.trim() !== "" ? searchFreeBoardUrl : listUrl;
  useEffect(() => {
    //게시글이 카테고리와 하위 카테고리에 해당하는 게시글만 조회되도록
    axios
      .get(boardUrl)
      .then((res) => {
        if (res.data.boardList.length !== 0) {
          setFreeBoardList(res.data.boardList);
          setTotalListCount(res.data.totalListCount);
        } else {
          setFreeBoardList([]);
          setTotalListCount(0);
        }
      })
      .catch((err) => {
        setResult(true);
        navigate("/pageerror");
      });
  }, [
    reqPageInfo.order,
    reqPageInfo.pageNo,
    selected,
    titleState,
    freeBoardNo,
    freeBoardCategoryNo,
    freeBoardSubcategoryNo,
    toggle,
  ]);
  /* 상세페이지 view */
  //처음 렌더링될 때 axios가 실행되지 않아서 viewCount에 들어 있지 않음
  const [viewCount, setViewCount] = useState();
  console.log(memberNo);
  return (
    <section className="freeBoard-section">
      {result ? (
        <div className="no-result">검색 결과가 없습니다.</div>
      ) : (
        <div className="board-div">
          {/*
          {freeBoardList.map((list, i) => {
            return i % 2 === 0 ? (
              <div
                key={"first" + i}
                className="board-section"
                style={{
                  borderRight: "1px solid #ccc",
                }}
                onClick={() => {
                  axios
                    .get(
                      `${backServer}/freeBoard/content/view?memberNo=${memberNo}&freeBoardNo=${list.freeBoardNo}&freeBoardCategoryNo=${list.freeBoardCategoryNo}&freeBoardSubcategoryNo=${list.freeBoardSubcategoryNo}`
                    )
                    .then((res) => {
                      //setViewCount(res.data.viewCount); //content페이지에서 띄울 count
                      navigate(
                        `/freeBoard/detail/${list.freeBoardNo}/${res.data.viewCount}`
                      );
                      console.log(res.data.viewCount);
                    })
                    .catch((err) => {
                      navigate("/pageerror");
                    });
                  setToggle(!toggle);
                }}
              >
                <div className="board-list-title">
                  <div className="board-status">{list.freeBoardNo}</div>
                  <div className="board-title">{list.freeBoardTitle}</div>
                </div>
                <div className="board-content">
                  <img src={list.freeBoardThumbnail}></img>
                </div>
                <div className="nickname-id">
                  <span>{list.memberNickname}</span>ㆍ
                  <span>{list.memberId}</span>
                </div>
                <div className="view-heart">
                  <div className="view">
                    {/*작성된 게시글을 클릭 시 count(*) 
                    <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
                    {viewCount}
                  </div>
                  <div className="heart">
                    <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
                    {list.likeCount}
                  </div>
                  <div className="hour">
                    <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>
                    {nowDate(list.freeBoardDate)}
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={"second" + i}
                className="board-section"
                onClick={() => {
                  axios
                    .get(
                      `${backServer}/freeBoard/content/view?memberNo=${memberNo}&freeBoardNo=${list.freeBoardNo}&freeBoardCategoryNo=${list.freeBoardCategoryNo}&freeBoardSubcategoryNo=${list.freeBoardSubcategoryNo}`
                    )
                    .then((res) => {
                      //setViewCount(res.data.viewCount);
                      navigate(
                        `/freeBoard/detail/${list.freeBoardNo}/${res.data.viewCount}`
                      );
                    })
                    .catch((err) => {
                      navigate("/pageerror");
                    });
                  setToggle(!toggle);
                }}
              >
                <div className="board-list-title">
                  <div className="board-status">{list.freeBoardNo}</div>
                  <div className="board-title">{list.freeBoardTitle}</div>
                </div>
                <div className="board-content">
                  <img src={list.freeBoardThumbnail}></img>
                </div>
                <div className="nickname-id">
                  <span>{list.memberNickname}</span>ㆍ
                  <span>{list.memberId}</span>
                </div>
                <div className="view-heart">
                  <div className="view">
                    <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
                    {viewCount}
                  </div>
                  <div className="heart">
                    <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
                    {list.likeCount}
                  </div>
                  <div className="hour">
                    <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>
                    {nowDate(list.freeBoardDate)}
                  </div>
                </div>
              </div>
            );
          })}
          */}
          <div className="board-table-wrap">
            <table className="board-table four-cols">
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>썸네일</th>
                  <th style={{ width: "35%" }}>제목</th>
                  <th style={{ width: "15%" }}>작성자</th>
                  <th style={{ width: "25%" }}>상태</th>
                </tr>
              </thead>
              <tbody>
                {freeBoardList.map((list) => (
                  <tr
                    key={list.freeBoardNo}
                    className="board-row"
                    style={{
                      borderRight: "1px solid #ccc",
                    }}
                    onClick={() => {
                      const detailUrl =
                        memberNo !== ""
                          ? `${backServer}/freeBoard/content/view?memberNo=${memberNo}&freeBoardNo=${list.freeBoardNo}&freeBoardCategoryNo=${list.freeBoardCategoryNo}&freeBoardSubcategoryNo=${list.freeBoardSubcategoryNo}`
                          : `${backServer}/freeBoard/content/view?memberNo=${0}&freeBoardNo=${
                              list.freeBoardNo
                            }&freeBoardCategoryNo=${
                              list.freeBoardCategoryNo
                            }&freeBoardSubcategoryNo=${
                              list.freeBoardSubcategoryNo
                            }`;
                      axios
                        .get(detailUrl)
                        .then((res) => {
                          setViewCount(res.data.viewCount); //content페이지에서 띄울 count
                          navigate(
                            `/freeBoard/detail/${list.freeBoardNo}/${res.data.viewCount}`
                          );
                          console.log(res.data);
                        })
                        .catch((err) => {
                          navigate("/pageerror");
                        });
                      setToggle(!toggle);
                    }}
                  >
                    <td className="thumb-cell">
                      {list.freeBoardThumbnail ? (
                        <img
                          src={list.freeBoardThumbnail}
                          alt="thumbnail"
                          className="thumbnail"
                        />
                      ) : (
                        <div className="thumbnail placeholder" />
                      )}
                    </td>

                    <td className="title-cell">
                      <span className="title-text">{list.freeBoardTitle}</span>
                    </td>

                    <td className="author-cell">
                      <span className="nickname">{list.memberNickname}</span>
                      <span className="gray">({list.memberId})</span>
                    </td>

                    <td className="states-cell">
                      <span className="state">
                        <VisibilityOutlinedIcon className="icon" />
                        {list.viewCount}
                      </span>
                      <span className="state">
                        <FavoriteBorderOutlinedIcon className="icon" />
                        {list.likeCount}
                      </span>
                      <span className="state">
                        <AccessTimeOutlinedIcon className="icon" />
                        {nowDate(list.freeBoardDate)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="order-div">
        <div
          onClick={() => {
            {
              reqPageInfo.order === 2
                ? setReqPageInfo({ ...reqPageInfo, order: 1 })
                : setReqPageInfo({ ...reqPageInfo, order: 2 });
            }
          }}
        >
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
        navigate("/pageerror");
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
