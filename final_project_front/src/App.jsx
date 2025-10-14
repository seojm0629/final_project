import { Route, Routes } from "react-router-dom";
import MemberLogin from "./component/member/MemberLogin";
import MemberJoin from "./component/member/MemberJoin";
import Main from "./component/common/Main";
import MemberAgree from "./component/member/MemberAgree";
import Header from "./component/common/Header";
import MemberMypage from "./component/member/MemberMypage";
import Footer from "./component/common/Footer";
import AdminMain from "./component/admin/AdminMain";
import BoardContent from "./component/utils/BoardContent";
import FreeBoardMain from "./component/free_board/FreeBoardMain";
import TradeBoardList from "./component/trade_board/TradeBoardList";
import FreeBoardContent from "./component/utils/BoardContent";

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
          <Route path="/utils/content" element={<BoardContent />} />
          <Route
            path="/freeBoard/*"
            element={<FreeBoardMain></FreeBoardMain>}
          ></Route>
          <Route path="/tradeBoard/list" element={<TradeBoardList />} />
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
