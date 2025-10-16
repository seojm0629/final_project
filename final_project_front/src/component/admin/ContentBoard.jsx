import "./contentBoard.css";
const ContentBoard = () => {
  return (
    <div>
      <div className="admin-content-wrap">
        <div className="content-head">
          <div className="title m">게시물 관리 페이지</div>
          <div className="title s">실시간 게시물 정보</div>
        </div>
        <div className="contentBoard-body">상단</div>
      </div>
      <div className="admin-content-wrap">
        <div className="content-head">
          <div className="title m">게시글 상세 정보</div>
        </div>
        <div className="contentBoard-detail-body">상세</div>
      </div>
    </div>
  );
};

export default ContentBoard;
