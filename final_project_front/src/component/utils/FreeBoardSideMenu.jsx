import { NavLink } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { useState } from "react";
import "./sideMenu.css";

const FreeBoardSideMenu = (props) => {
  const menus = props.menus;
  const setSelectMenu = props.setSelectMenu;
  const [naviDown, setNaviDown] = useState(null);
  const [menuNavi, setMenuNavi] = useState(""); //카테고리 밑 메뉴 네비
  const downMenu = (menu) => {
    setNaviDown(naviDown === menu ? null : menu);
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
                      <ul className="side-submenu">
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
{
  /*
  <div className="side-menu">
    <section className="side-header">
      <p style={{ fontWeight: "600" }}>카테고리</p>
      <span>홈 &gt; 자유게시판 &gt; {menuNavi}</span>
    </section>
    <div className="header-title">
      <span>자유게시판</span>
    </div>
    <ul>
      <li>
        {menus.map((m, i) => {
          return <div>{m}</div>;
        })}
      </li>

      <div className="category">
        {menus.map((menus1, i) => {
          return (
            <li key={"side-menu" + i}>
              <div
                className="menu-title"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  downMenu(i);
                  setMenuNavi(menuNavi !== i && menus1.freeBoardCategory);
                }}
              >
                <span>{menus1.freeBoardCategory}</span>
                {naviDown === i ? (
                  <KeyboardArrowRightOutlinedIcon></KeyboardArrowRightOutlinedIcon>
                ) : (
                  <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                )}
              </div>
              <ul className="menu-down">
                {naviDown === i
                  ? menus1.freeBoardSubcategory.map((menus2, j) => {
                      return (
                        <li
                          key={"side-menuDown" + j}
                          className="side-menuDown"
                          onClick={() => {
                            setSelectMenu(menus2);
                          }}
                        >
                          <NavLink
                            to={menus2}
                            className={({ isActive }) =>
                              isActive ? "active-link" : ""
                            }
                          >
                            <CircleOutlinedIcon
                              style={{
                                fontSize: "15px",
                                marginRight: "10px",
                              }}
                            ></CircleOutlinedIcon>
                            <span style={{ marginTop: "10px" }}>
                              {menus2.text}
                            </span>
                          </NavLink>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </li>
          );
        })}
      </div>
    </ul>
  </div>;
*/
}

export default FreeBoardSideMenu;
