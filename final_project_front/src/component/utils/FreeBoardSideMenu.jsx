import { NavLink } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { useEffect, useState } from "react";
import "./sideMenu.css";
import axios from "axios";

const FreeBoardSideMenu = (props) => {
  const menus = props.menus;
  const setMenus = props.setMenus;
  const setSelectMenu = props.setSelectMenu;
  const setSelected = props.setSelected;
  const [naviDown, setNaviDown] = useState(null);
  const [menuNavi, setMenuNavi] = useState(""); //카테고리 밑 메뉴 네비
  //const [subClick, setSubClick] = useState("side-submenu.active");
  const downMenu = (menu) => {
    setNaviDown(naviDown === menu ? null : menu);
  };
  return (
    <div className="side-menu">
      <section className="side-header">
        <p style={{ fontWeight: "600" }}>카테고리</p>
        <span>홈 &gt; 자유게시판 &gt; {menuNavi}</span>
      </section>
      <div
        className="header-title"
        onClick={() => {
          setSelected(-1);
          setMenuNavi("");
        }}
      >
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
                  setMenuNavi(m.freeBoardCategory);
                }}
              >
                {m.freeBoardCategory}
                {naviDown === i ? (
                  <KeyboardArrowRightOutlinedIcon></KeyboardArrowRightOutlinedIcon>
                ) : (
                  <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                )}
              </span>
              <div
                className="menu-down"
                style={{ display: naviDown === i ? "block" : "none" }}
              >
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
                            setSelected(m.freeBoardSubcategory[i + 1]);
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
export default FreeBoardSideMenu;
