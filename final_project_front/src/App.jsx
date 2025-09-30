import { Route, Routes } from "react-router-dom"
import MemberLogin from "./component/member/MemberLogin"
import MemberJoin from "./component/member/MemberJoin"

function App() {


  return (
    <div>
      <main className="section">

        <Routes>
          <Route path="/member/login" element={<MemberLogin />} />
          <Route path="/member/join" element={<MemberJoin />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
