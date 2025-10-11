import { useState } from "react";
import "./SurveyOption.css";
const SurveyContent = ({ onClose }) => {
  const [SurveyTitle, setSurveyTitle] = useState("");
  return (
    <div className="Survey-box">
      <div className="Survey-content">
        <h2>투표 만들기</h2>
        <div>
          <input
            type="text"
            placeholder="설문 제목을 입력하세요"
            value={SurveyTitle}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="설문 내용을 입력하세요"
            value={SurveyTitle}
          />
        </div>
        <button>+ 항목 추가</button>

        <div className="check-btns">
          <button>확인</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};
export default SurveyContent;
