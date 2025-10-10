import { Route, Routes } from "react-router-dom";
import MemberLogin from "./component/member/MemberLogin";
import MemberJoin from "./component/member/MemberJoin";
import Main from "./component/common/Main";
import MemberAgree from "./component/member/MemberAgree";
import Header from "./component/common/Header";
import MemberMypage from "./component/member/MemberMypage";
import Footer from "./component/common/Footer";
import AdminMain from "./component/admin/AdminMain";

function App() {
  return (
    <div className="wrap">
      <Header></Header>
      <main className="section">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/member/login" element={<MemberLogin />} />
          <Route path="/member/join" element={<MemberJoin />} />
          <Route path="/member/agree" element={<MemberAgree />} />
          <Route path="/member/mypage" element={<MemberMypage />} />
          <Route path="/admin" element={<AdminMain />} />
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
