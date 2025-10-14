import { Modal } from "@mui/material";

const utilsModal = () => {
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

export default utilsModal;
