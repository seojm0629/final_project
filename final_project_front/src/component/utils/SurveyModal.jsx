import { useState } from "react";
import "./SurveyModal.css";
import Modal from "react-modal";
Modal.setAppElement("#root");
const SurveyContent = ({ onClose }) => {
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

  const check = () => {
    console.log({
      title: surveyTitle,
      options: options,
      endDate: endDate,
      endTime: endTime,
    });
    onClose();
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
                <input
                  key={index}
                  type="text"
                  placeholder={`${index + 1}. 항목을 입력하세요`}
                  value={option}
                  onChange={(e) => optionChange(index, e.target.value)}
                  className="option-input"
                />
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
            <button onClick={check}>확인</button>
            <button onClick={onClose}>취소</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default SurveyContent;
