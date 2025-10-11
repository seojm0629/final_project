import { NavLink } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { useState } from "react";
import "./sideMenu.css";

const FreeBoardSideMenu = (props) => {
  const menus = props.menus;
  const [naviDown, setNaviDown] = useState(null);
  const downMenu = (menu) => {
    setNaviDown(naviDown === menu ? null : menu);
  };
  return (
    <div className="side-menu">
      <section className="side-header">
        <p style={{ fontWeight: "600" }}>카테고리</p>
        <span>홈 &gt; 자유게시판 &gt; 직장</span>
        {/*backend 처리 후 클릭 시 변경되도록할 예정*/}
      </section>
      <div className="header-title">
        <span>자유게시판</span>
      </div>
      <ul>
        <div className="category">
          {menus.map((menus1, i) => {
            return (
              <li key={"side-menu" + i}>
                <div
                  className="menu-title"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    downMenu(i);
                  }}
                >
                  <span>{menus1.text}</span>
                  {naviDown === i ? (
                    <KeyboardArrowRightOutlinedIcon></KeyboardArrowRightOutlinedIcon>
                  ) : (
                    <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                  )}
                </div>
                <div className="menu-down">
                  {naviDown === i
                    ? menus1.children.map((menus2, j) => {
                        return (
                          <li
                            key={"side-menuDown" + j}
                            className="side-menuDown"
                          >
                            <NavLink
                              to={menus2.url}
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
                </div>
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
};

export default FreeBoardSideMenu;
