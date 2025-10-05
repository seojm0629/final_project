import { useState } from "react";
import SideMenu from "./SideMenu";
import "./admin.css";

const AdminMain = () => {
  //최상위 컴포넌트로 정의하고, 하위 컴포넌트에 필요한 props 를 모두 넘겨주고, 화면에 표현하는 역할을 한다.
  const [active, setActive] = useState("member");

  return (
    <div className="admin">
      <div className="admin-head">
        <h1>관리자 페이지</h1>
      </div>
      {/* 현재 어떤 탭이 클릭되었는지, 최상위가 알아야한다. */}
      <SideMenu active={active} setActive={setActive} />
    </div>
  );
};

export default AdminMain;
