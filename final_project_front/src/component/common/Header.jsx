import { Link } from "react-router-dom";
import "./common.css";
import { useState } from "react";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
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
  const downMenu = (menu) => {
    setNaviDown(naviDown === menu ? null : menu);
  }
  return(
  <nav className="navi-wrap">
    <ul className="navi-menu">
      <li className="navi-item home">
        <button className="board-btn">
          <Link to="/">HOME</Link>
        </button>
      </li>
      <li className="navi-item trade">
        <button className="board-btn" onClick={() => {
        downMenu("trade");
        }}>
          <Link>중고거래 게시판</Link>
          {naviDown === "trade" ? <KeyboardDoubleArrowDownIcon></KeyboardDoubleArrowDownIcon>
          : 
          <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon> 
          }
          
        </button>
        {naviDown === "trade" ? 
        <ul className="navi-down">
          <li><Link to = "/">메인페이지</Link></li> {/*임의로 넣어놓음*/}
          <li><Link to = "/">상세페이지</Link></li>
          <li><Link to = "/">문의하기</Link></li>
        </ul>
        :
        null
        }
      </li>
      <li className="navi-item free">
        <button className="board-btn" onClick={() => {
          downMenu("free");
        }}>
          <Link>자유게시판</Link>
          {naviDown === "free" ? 
          <KeyboardDoubleArrowDownIcon></KeyboardDoubleArrowDownIcon>
          : 
          <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon> 
          }
        </button>
        {naviDown === "free" ? 
        <ul className="navi-down">
          <li><Link to="/">메인페이지</Link></li>
          <li><Link to="/">취업</Link></li>
          <li><Link to="/">게임</Link></li>
          <li><Link to="/">잡담</Link></li>
        </ul> 
        : 
        null
        }
      </li>
    </ul>
  </nav>
  );
};
const HeaderLink = () => {
  return(
    <ul className="header-user">
      <li>
        <Link to = "/member/login">로그인</Link>
      </li>
      <li>
        <Link to = "/member/join">회원가입</Link>
      </li>
    </ul>
  );
};
export default Header;
