import { useState } from "react";
import SurveyModal from "./SurveyModal.jsx";
const BoardContent = () => {
  const [showSurvey, setShowSurvey] = useState(false);
  return (
    <div>
      <button onClick={() => setShowSurvey(true)}>투표</button>
      {showSurvey && <SurveyModal onClose={() => setShowSurvey(false)} />}
    </div>
  );
};

export default BoardContent;
