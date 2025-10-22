import { Link } from "react-router-dom";
import "./voteCss.css";
const VoteMain = () => {
  return (
    <div className="vote-main-wrap">
      <div className="vote-name-box">투표게시판</div>
      <div>
        <div className="vote-insert-box">
          <Link to="/vote/voteInsert">글작성</Link>
        </div>
      </div>
    </div>
  );
};

export default VoteMain;
