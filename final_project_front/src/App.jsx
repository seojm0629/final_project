import { Route, Routes } from "react-router-dom"
import MemberLogin from "./component/member/MemberLogin"

function App() {


  return (
    <div>
      <main className="section">

        <Routes>
          <Route path="/member/login" element={<MemberLogin />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
