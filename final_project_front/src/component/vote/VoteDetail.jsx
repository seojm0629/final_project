import { useParams } from "react-router-dom";

const VoteDetail = () => {
  const { voteNo } = useParams(); // URL에서 숫자 꺼내기
  console.log("받은 voteNo:", voteNo);

  return (
    <div>
      <h1>투표 상세페이지</h1>
      <p>투표 번호: {voteNo}</p>
    </div>
  );
};

export default VoteDetail;
