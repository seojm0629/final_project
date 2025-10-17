import { NavLink } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { useEffect, useState } from "react";
import "./sideMenu.css";
import axios from "axios";

const FreeBoardSideMenu = (props) => {
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const menus = props.menus;
  const setSelectMenu = props.setSelectMenu;
  const setSelectedBoardList = props.setSelectedBoardList;
  const setSelected = props.setSelected;
  //const setFreeBoardList = props.setFreeBoardList;
  //const setTotalListCount = props.setTotalListCount;
  const [naviDown, setNaviDown] = useState(null);
  const [menuNavi, setMenuNavi] = useState(""); //카테고리 밑 메뉴 네비
  const downMenu = (menu) => {
    setNaviDown(naviDown === menu ? null : menu);
  };
  const searchList = (freeBoardSubcategoryNo) => {
    axios
      .get(`${backServer}/freeBoard/category/${freeBoardSubcategoryNo}`)
      .then((res) => {
        setSelectedBoardList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="side-menu">
      <section className="side-header">
        <p style={{ fontWeight: "600" }}>카테고리</p>
        <span>홈 &gt; 자유게시판 &gt; {menuNavi}</span>
      </section>
      <div className="header-title">
        <span>자유게시판</span>
      </div>
      <ul className="category">
        {menus.map((m, i) => {
          return (
            <li key={"menu-title" + i}>
              <span
                className="menu-title"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  downMenu(i);
                  setMenuNavi(menuNavi !== i && m.freeBoardCategory);
                }}
              >
                {m.freeBoardCategory}
                {naviDown === i ? (
                  <KeyboardArrowRightOutlinedIcon></KeyboardArrowRightOutlinedIcon>
                ) : (
                  <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                )}
              </span>
              <div className="menu-down">
                {m.freeBoardSubcategory.map((n, i) => {
                  return (
                    <ul
                      key={"side-menuDown" + i}
                      className="side-menuDown"
                      onClick={() => {
                        setSelectMenu(n);
                      }}
                    >
                      {i % 2 === 0 && (
                        <ul
                          className="side-submenu"
                          onClick={() => {
                            setSelected(i);
                            searchList(i);
                          }}
                        >
                          <li>
                            <CircleOutlinedIcon
                              style={{
                                fontSize: "15px",
                                marginRight: "10px",
                              }}
                            ></CircleOutlinedIcon>
                            <span style={{ marginTop: "10px" }}>{n}</span>
                          </li>
                        </ul>
                      )}
                    </ul>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

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
        setFreeBoardList(res.data.boardList);
        setTotalListCount(res.data.totalListCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPageInfo.order, reqPageInfo.pageNo]);
  return (
    <section className="freeBoard-section">
      <div className="board-div">
        {freeBoardList.map((list, i) => {
          return i % 2 === 0 ? (
            <div
              key={"first" + i}
              className="board-section"
              style={{
                borderRight: "1px solid #ccc",
              }}
            >
              {/*상태넣을꺼*/}
              <div className="board-status">{list.freeBoardNo}</div>
              <div className="board-title">{list.freeBoardTitle}</div>
              <div className="board-content">{list.freeBoardContent}</div>
              <div className="nickname-id">
                <span>{list.memberNickname}</span>
                <span>{list.memberId}</span>
              </div>
              <div className="view-heart">
                <div className="view">
                  {/*작성된 게시글을 */}
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
            <div key={"second" + i} className="board-section" style={{}}>
              <div className="board-status">{list.freeBoardNo}</div>
              <div className="board-title">{list.freeBoardTitle}</div>
              <div className="board-content">{list.freeBoardContent}</div>
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
export default FreeBoardSideMenu;
