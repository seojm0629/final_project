import { useState } from "react";
import SurveyModal from "./SurveyModal.jsx";
import "./SurveyProgress.css";
const BoardContent = () => {
  const [showSurvey, setShowSurvey] = useState(false);
  const [progressData, setprogressData] = useState(null);

  const modalSubmit = (data) => {
    setprogressData(data);
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
                ></input>
                <label>{option}</label>
              </div>
            ))}
          </div>
          <div className="progress-button">
            <button>투표하기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardContent;
