import { useState } from "react";
import "./voteCss.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VoteMain from "./VoteMain";
import { useRecoilValue } from "recoil";
import { memberNoState } from "../utils/RecoilData";
const VoteInsert = () => {
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const memberNo = useRecoilValue(memberNoState); // 사용자 ID
  const [voteTitle, setVoteTitle] = useState("");
  const [voteList, setVoteList] = useState(["", ""]); //기본 2개항목 생성
  const [endDate, setEndDate] = useState(""); //끝나는 날짜 받기
  const [endTime, setEndTime] = useState(""); //끝나는 시간 받기
  const naviGate = useNavigate();

  const mainVote = () => {
    naviGate("/vote/main");
  };
  //리스트 항목 추가
  const addList = () => {
    if (voteList.length >= 10) {
      Swal.fire({
        title: "갯수 제한",
        text: "항목은 10개 까지 입니다.",
        icon: "error",
      });
      return;
    }
    //배열 이니까 배열로 다시 받아야지
    setVoteList([...voteList, ""]);
  };
  //항목 입력값 배열받기
  const listInsert = (index, value) => {
    const newList = [...voteList];
    newList[index] = value;
    setVoteList(newList);
    console.log(newList);
  };
  //확인 누를때 값 저장
  const insertSubmit = () => {
    const voteData = {
      memberNo: memberNo,
      voteTitle: voteTitle,
      voteContent: voteList,
      voteEndate: endDate + endTime,
    };

    console.log(voteData);

    axios
      .post(`${backServer}/vote`, voteData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="vote-insert-box">
      <div className="vote-insert-title">
        <h2>투표글작성</h2>
      </div>
      <div className="vote-insert-content-box">
        <div className="vote-content-title">투표 생성 하기</div>
        <div>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            name="voteTitle"
            id="voteTitle"
            value={voteTitle}
            onChange={(e) => setVoteTitle(e.target.value)}
          ></input>
        </div>
        <div className="vote-list-box">
          {voteList.map((list, index) => {
            return (
              <div className="vote-content-list">
                <input
                  type="text"
                  placeholder={`${index + 1}.항목을 입력하세요`}
                  name="voteContent"
                  id="voteContent"
                  value={list}
                  onChange={(e) => listInsert(index, e.target.value)}
                  className="vote-input-box"
                ></input>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => {
                    if (voteList.length <= 2) {
                      Swal.fire({
                        title: "삭제 실패",
                        text: "최소 항목 수는 2개입니다",
                        icon: "error",
                      });
                      return;
                    }
                    const nList = voteList.filter((item, i) => {
                      return i !== index;
                    });
                    setVoteList(nList); //지운 배열에 새 배열 대입
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
        <div className="vote-date-box">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></input>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className="vote-addbutton">
          <button onClick={addList}>항목 추가</button>
        </div>
        <button onClick={insertSubmit}>만들기</button>
        <button onClick={mainVote}>취소</button>
      </div>
    </div>
  );
};

export default VoteInsert;
