import { useState } from "react";
import "./voteCss.css";
import Swal from "sweetalert2";
const VoteInsert = () => {
  const [voteTitle, setVoteTitle] = useState("");
  const [voteList, setVoteList] = useState(["", ""]); //기본 2개항목 생성
  const [endDate, setEndDate] = useState(""); //끝나는 날짜 받기
  const [endTime, setEndTime] = useState(""); //끝나는 시간 받기

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
    setVoteList([...voteList, ""]);
  };
  //항목 입력값 받기
  const listInsert = (index, value) => {
    const newList = [...voteList];
    newList[index] = value;
    setVoteList(newList);
    console.log(newList);
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
                <button type="button" className="delete-button">
                  X
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="vote-addbutton">
        <button onClick={addList}>+ 항목 추가</button>
      </div>
      <button>만들기</button>
    </div>
  );
};

export default VoteInsert;
