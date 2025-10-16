import { useState } from "react";
import "./SurveyModal.css";
import { Modal } from "@mui/material";
const SurveyContent = ({ onClose, onSubmit, title }) => {
  //컴포넌트에 onClose 함수 받아오기 (모달닫기)
  const [surveyTitle, setSurveyTitle] = useState("");
  const [options, setOptions] = useState(["", ""]); //기본 2개 항목
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  //항목 추가
  const addOption = () => {
    if (options.length >= 10) {
      alert("항목은 최대 10개까지만 추가할 수 있습니다.");
      return;
    }
    setOptions([...options, ""]);
  };

  //항목 입력값 받기
  const optionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    console.log(newOptions);
  };
  //항목 갯수 저장
  let optionsCount = 0;
  //확인누를때 값 저장
  const checkSubmit = () => {
    const data = {
      title: surveyTitle,
      options,
      endDate,
      endTime,
    };
    //제목 비어있을때 경고
    if (data.title === "") {
      alert("제목을 입력하세요");
      return;
    }
    //내용 2개이상 될때만 만들기
    for (let i = 0; i < data.options.length; i++) {
      if (data.options[i].trim() === "") {
        alert("모든 항목을 비칸 없이 입력하세요");
        return;
      } else {
        optionsCount++;
      }
    }
    //항목 갯수 경고
    if (optionsCount < 2) {
      alert("항목을 2개 이상 입력하세요");
      return;
    }
    //날짜 빈칸 경고
    if (data.endDate === "") {
      alert("날짜를 설정하세요");
      return;
    }
    //시간 빈칸 경고
    if (data.endTime === "") {
      alert("시간을 설정하세요");
      return;
    }
    onSubmit(data); // 값 전달
    onClose(); // 다되면 닫기
  };

  return (
    <Modal
      isOpen={true}
      contentLabel="투표만들기"
      className="survey-modal-content"
      overlayClassName="survey-modal-overlay"
    >
      <div className="survey-box">
        <div className="survey-mainbox">
          <h2>투표</h2>
          <div className="survey-wrap">
            <div className="survey-title">
              <input
                type="text"
                placeholder="설문 제목을 입력하세요"
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
              />
            </div>
            <div className="survey-options">
              {options.map((option, index) => (
                <div key={index} className="survey-item">
                  <input
                    type="text"
                    placeholder={`${index + 1}. 항목을 입력하세요`}
                    value={option}
                    onChange={(e) => optionChange(index, e.target.value)}
                    className="option-input"
                  ></input>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => {
                      if (options.length <= 2) {
                        alert("항목은 최소 2개입니다");
                        return;
                      }
                      const newOption = options.filter((item, i) => {
                        return i !== index;
                      });
                      setOptions(newOption);
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="survey-addbutton">
            <button onClick={addOption}>+ 항목 추가</button>
          </div>
          <div className="survey-date">
            종료일,시간 설정
            <div className="date-time-box">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div className="check-btns">
            <button onClick={checkSubmit}>확인</button>
            <button onClick={onClose}>취소</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default SurveyContent;
