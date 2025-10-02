import { Route, Routes } from "react-router-dom"
import MemberLogin from "./component/member/MemberLogin"
import MemberJoin from "./component/member/MemberJoin"
import Main from "./component/common/Main"
import MemberAgree from "./component/member/MemberAgree"
import MemberMypage from "./component/member/MemberMypage"

function App() {


  return (
    <div>
      <main className="section">

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/member/login" element={<MemberLogin />} />
          <Route path="/member/join" element={<MemberJoin />} />
          <Route path="/member/agree" element={<MemberAgree />} />
          <Route path="/member/mypage" element={<MemberMypage />} /> 
        </Routes>
      </main>
    </div>
  )
}

export default App
