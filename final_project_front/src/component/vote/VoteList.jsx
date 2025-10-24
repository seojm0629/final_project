import { useEffect, useState } from "react";
import "./voteList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const VoteList = () => {
  // 필수: 페이지 정보 (프론트에서 바로 세팅)
  const [reqPageInfo, setReqPageInfo] = useState({
    sideBtnCount: 3, // 현재 페이지 양옆에 몇 개의 버튼을 보여줄지
    pageNo: 1, // 현재 페이지
    listCnt: 10, // 한 페이지에 보여줄 개수
  });
  // 필수: 전체 개수 (서버한테 받아 세팅)
  const [totalListCount, setTotalListCount] = useState(0);

  const backServer = import.meta.env.VITE_BACK_SERVER;
  const [votelist, setVoteList] = useState([]); //4개 값 받을 리스트 생성
  const [pi, setPi] = useState(null); // 기본값 세팅
  const navigate = useNavigate();

  const writebutton = () => {
    navigate("/vote/voteInsert");
  };

  useEffect(() => {
    axios
      .get(`${backServer}/vote?reqPage=${reqPageInfo}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(res);
      });
  }, []);

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

export default VoteList;
