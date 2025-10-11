import "./adminSideMenu.css";
import { useState } from "react";

const SideMenu = ({ active, setActive }) => {
  //[카테고리 접고 펼치기]
  // 1. 카테고리를 접고 펼치는 setState 를 하나 만들고, 초기값을 true 로 설정한다.
  const [openCategory, setOpenCategory] = useState(false);

  // 2. 버튼을 클릭하면 위의 openCategory 값을 반전 시킬 수 있는 함수를 생성한다.
  function toggleCategory() {
    setOpenCategory(!openCategory);
  }

  // 3. openCategory 상태에 따라 서브 카테고리 ul의 hidden 값을 조정한다.
  //
  //  3-1) true 이면 : false
  //  3-2) false 이면 : true
  // <ul hidden={!openCategory}>
  //
  // 4. openCategory 상태에 따라 페이지 관리 버튼 우측에 + - 아이콘을 변경한다.
  /*
            <button onClick={toggleCategory}>
              페이지 관리
              <span className="material-icons">
                {openCategory ? "remove" : "add"}
              </span>
            </button>
  */

  //[클릭한 메뉴를 하이라이트]
  // 1. 현재 클릭된 카테고리를 구분하기 위해 클래스 이름을 저장할 setState 를 생성한다.
  // 최상위 컴포넌트 AdminMain 으로 이동 const [active, setActive] = useState();

  // 2. active 에는 버튼을 클릭할 때 마다 각 버튼들의 가명을 set 한다.
  /*
              <button onClick={() => setActive("member")}>
              <button onClick={() => setActive("board")}>
              <button onClick={() => setActive("free-board")}>
              <button onClick={() => setActive("deal-board")}>
              <button onClick={() => setActive("test")}>
              <button onClick={() => setActive("site")}>
  */

  // 3. 각 버튼들에서는 현재 자신의 가명과 일치하는지 확인하고, 일치하면 active 클래스를 추가한다.

  return (
    <aside className="side-menu">
      {/*시멘틱 태그로 영역 구분*/}
      <h2>관리자용 메뉴</h2>
      <ul>
        <li>
          <button
            onClick={() => setActive("member")}
            className={active === "member" ? "active" : ""}
          >
            회원 관리
            <span className="material-icons">navigate_next</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => setActive("board")}
            className={active === "board" ? "active" : ""}
          >
            게시물 관리
            <span className="material-icons">navigate_next</span>
          </button>
        </li>
        <li>
          <button onClick={toggleCategory}>
            페이지 관리
            <span className="material-icons">
              {openCategory ? "remove" : "add"}
            </span>
          </button>
          <ul hidden={!openCategory}>
            <li>
              <button
                onClick={() => setActive("free-board")}
                className={active === "free-board" ? "active" : ""}
              >
                자유 게시판
              </button>
            </li>
            <li>
              <button
                onClick={() => setActive("deal-board")}
                className={active === "deal-board" ? "active" : ""}
              >
                중고 거래 게시판
              </button>
            </li>
          </ul>
        </li>
        <li>
          <button
            onClick={() => setActive("test")}
            className={active === "test" ? "active" : ""}
          >
            테스트용 기능
            <span className="material-icons">navigate_next</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => setActive("site")}
            className={active === "site" ? "active" : ""}
          >
            사이트 관리
            <span className="material-icons">navigate_next</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default SideMenu;
