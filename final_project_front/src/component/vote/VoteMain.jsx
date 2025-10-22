import "./voteMain.css";
import { useNavigate } from "react-router-dom";
const VoteMain = () => {
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const [list, setList] = useState([]); //4개 값 받을 리스트 생성

  const navigate = useNavigate();

  const writebutton = () => {
    navigate("/vote/voteInsert");
  };

  return (
    <div className="vote-main-wrap">
      <div className="vote-name-box">
        <h1>투표게시판</h1>
      </div>
      <div>
        <div className="vote-write-box">
          <button onClick={writebutton}>글작성</button>
        </div>
      </div>
      <div className="vote-tbl-box">
        <table className="vote-tbl">
          <thead>
            <tr className="vote-tr">
              <th style={{ width: "10%" }}>작성자</th>
              <th
                style={{
                  width: "65%",
                }}
              >
                제목
              </th>
              <th style={{ width: "10%" }}>투표상황</th>
              <th style={{ width: "15%" }}>작성날짜</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default VoteMain;
