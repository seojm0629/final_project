import { useState } from "react";
import SurveyOption from "../utils/SurveyOption";
const BoardContent = () => {
  const [showSurvey, setShowSurvey] = useState(false);
  return (
    <div>
      <button onClick={() => setShowSurvey(true)}>투표</button>
      {showSurvey && <SurveyOption onClose={() => setShowSurvey(false)} />}
    </div>
  );
};

export default BoardContent;
