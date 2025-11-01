import { Link, useNavigate } from "react-router-dom";
import "./common.css";
import "./default.css";
import { useEffect, useRef, useState } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useRecoilState } from "recoil";
import { loginIdState, memberNoState, memberTypeState } from "../utils/RecoilData";
import Note from "../note/note";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-wrap">
        <Link to="/">
          <img src="/image/final_logo.png" className="logo-img" />
        </Link>
      </div>
      <MainNavi></MainNavi>
      <HeaderLink></HeaderLink>
    </header>
  );
};

const MainNavi = () => {
  const [naviDown, setNaviDown] = useState(null);
  const menuRef = useRef(null);
  const downMenu = (menu) => {
    setNaviDown(naviDown === menu ? null : menu);
  };
  /*메뉴 다운 후 해당 영역이 아닌 곳을 클릭 시 메뉴 업*/
  useEffect(() => {
    const outClickMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setNaviDown(null);
      }
    };
    document.addEventListener("mousedown", outClickMenu);
    return () => {
      document.removeEventListener("mousedown", outClickMenu);
    };
  }, [menuRef]);
  return (
    <nav className="navi-wrap">
      <ul className="navi-menu">
        <li className="navi-item home">
          <button className="board-btn">
            <Link to="/">HOME</Link>
          </button>
        </li>
        <li className="navi-item trade">
          <button
            className="board-btn"
            onClick={() => {
              downMenu("trade");
            }}
            ref={menuRef}
          >
            <Link>중고거래 게시판</Link>
            {naviDown === "trade" ? (
              <KeyboardDoubleArrowDownIcon></KeyboardDoubleArrowDownIcon>
            ) : (
              <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
            )}
          </button>
          {naviDown === "trade" ? (
            <ul className="navi-down" ref={menuRef}>
              <li>
                <Link to="/tradeBoard/list">메인페이지</Link>
              </li>
              {/*임의로 넣어놓음*/}
              <li>
                <Link to="/">상세페이지</Link>
              </li>
              <li>
                <Link to="/">문의하기</Link>
              </li>
            </ul>
          ) : null}
        </li>
        <li className="navi-item free">
          <button
            className="board-btn"
            onClick={() => {
              downMenu("free");
            }}
            ref={menuRef}
          >
            <Link>자유게시판</Link>
            {naviDown === "free" ? (
              <KeyboardDoubleArrowDownIcon></KeyboardDoubleArrowDownIcon>
            ) : (
              <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
            )}
          </button>
          {naviDown === "free" ? (
            <ul className="navi-down" ref={menuRef}>
              <li>
                <Link to="/freeBoard/content">메인페이지</Link>
              </li>
              <li>
                <Link to="/">취업</Link>
              </li>
              <li>
                <Link to="/">게임</Link>
              </li>
              <li>
                <Link to="/">잡담</Link>
              </li>
            </ul>
          ) : null}
        </li>
        <li className="navi-item vote">
          <Link to="/vote/list">투표게시판</Link>
        </li>
      </ul>
    </nav>
  );
};
const HeaderLink = () => {
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  const [memberNo, setMemberNo] = useRecoilState(memberNoState);

  const navigate = useNavigate();
  const logout = () => {
    setMemberId("");
    setMemberType(0);
    setMemberNo(0);
    delete axios.defaults.headers.common["Authorization"];
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("recoil-persist");
    
    navigate("/");
  };
  

  return (
    <ul className="header-user">
      {memberId !== "" && memberType !== 0 ? (
        <>
          <li>
            <Note />
          </li>
          <li>
            <Link to="member/mypage">{memberId}</Link>
          </li>
          <li>
            <Link to="/" onClick={logout}>
              로그아웃
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/member/login">로그인</Link>
          </li>
          <li>
            <Link to="/member/agree">회원가입</Link>
          </li>
        </>
      )}
    </ul>
  );
};
export default Header;
