import { useState } from "react";
import SurveyModal from "./SurveyModal.jsx";
import "./SurveyProgress.css";
const SurveyContent = () => {
  const [showSurvey, setShowSurvey] = useState(false); // 투표창
  const [progressData, setprogressData] = useState(null); // 투표만들때 받아오는 값들
  const [voteCount, setVoteCount] = useState([]); // 투표개수 저장
  const [showCharts, setShowCharts] = useState(false); // 결과창
  const [selectOption, setSelectOption] = useState(); // 사용자가 선택한 옵션
  const modalSubmit = (data) => {
    // 확인 눌렀을때
    setprogressData(data); // 받은 데이터값 저장
  };
  const optionChange = (e) => {
    //라디오 버튼클릭시 선택한 옵션을 저장하기
    setSelectOption(e.target.value);
  };
  const voteButton = () => {
    if (!selectOption) {
      alert("옵션을 선택하세요!"); // 옵션선택한지 안한지 확인
      return;
    }
  };
  return (
    <div>
      <button onClick={() => setShowSurvey(true)}>투표</button>
      {showSurvey && (
        <SurveyModal
          onClose={() => setShowSurvey(false)}
          onSubmit={modalSubmit}
        />
      )}
      {progressData && (
        <div className="progress-box">
          <div className="progress-title">
            <h3>{progressData.title}</h3>
          </div>
          <div className="progress-choice">
            <h6>하나만 선택할 수 있습니다.</h6>
          </div>
          <div className="progress-content">
            {progressData.options.map((option, index) => (
              <div className="progress-option-box" key={index}>
                <input
                  type="radio"
                  name="surveyOption"
                  value={option}
                  className="progress-radio"
                  onChange={optionChange}
                ></input>
                <label>{option}</label>
              </div>
            ))}
          </div>
          <div className="progress-button">
            <button onClick={voteButton}>투표하기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyContent;
