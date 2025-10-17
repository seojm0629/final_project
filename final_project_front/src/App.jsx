import { Route, Routes } from "react-router-dom";
import MemberLogin from "./component/member/MemberLogin";
import MemberJoin from "./component/member/MemberJoin";
import Main from "./component/common/Main";
import MemberAgree from "./component/member/MemberAgree";
import Header from "./component/common/Header";
import MemberMypage from "./component/member/MemberMypage";
import Footer from "./component/common/Footer";
import AdminMain from "./component/admin/AdminMain";
import FreeBoardMain from "./component/free_board/FreeBoardMain";
import TradeBoardList from "./component/trade_board/TradeBoardList";
import ServiceAgree from "./component/member/ServiceAgree";
import Test from "./component/note/Test";
import TradeBoardView from "./component/trade_board/TradeBoardView";
import FindId from "./component/member/FindId";
import FindPw from "./component/member/FindPw";

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
          <Route path="/member/*" element={<MemberMypage />} />
          <Route path="/admin" element={<AdminMain />} />
          <Route path="/service/agree" element={<ServiceAgree />} />
          <Route path="/member/findId" element={<FindId />} />
          <Route path="/member/findPw" element={<FindPw />} />          
          <Route
            path="/freeBoard/*"
            element={<FreeBoardMain></FreeBoardMain>}
          ></Route>
          <Route path="/tradeBoard/list" element={<TradeBoardList />} />
          <Route
            path="/tradeBoard/view/:tradeBoardNo"
            element={<TradeBoardView />}
          />
          <Route path="/note/test" element={<Test />} />
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
