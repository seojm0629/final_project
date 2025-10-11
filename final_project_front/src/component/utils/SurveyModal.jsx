import { useState } from "react";
import "./SurveyModal.css";
import Modal from "react-modal";
Modal.setAppElement("#root");
const SurveyContent = ({ onClose }) => {
  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyContent, setSurveyContent] = useState("");
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
              />
            </div>
            <div className="survey-content">
              <input
                type="text"
                placeholder="설문 내용을 입력하세요"
                value={surveyContent}
              />
            </div>
          </div>
          <div className="survey-button">
            <button>+ 항목 추가</button>
          </div>
          <div className="survey-date">종료일</div>
          <div className="check-btns">
            <button>확인</button>
            <button onClick={onClose}>취소</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default SurveyContent;
