import "./contentFreeBoard.css";

const ContentFreeBoard = () => {
  return (
    <div>
      <div className="admin-content-wrap">
        <div className="content">
          <div className="content_box">
            <div className="content_box_title">공지사항</div>
            <div className="noticeBox">양식이 들어갈 자리</div>
          </div>
          <div className="content_box">
            <div className="content_box_title">카테고리</div>
            <div className="categoryBox">양식이 들어갈 자리</div>
          </div>
        </div>
      </div>
      <div className="admin-content-wrap">
        <div className="content-head">
          <div className="title m">공지사항</div>
          <div className="content_box">공지사항 리스트 들어갈 자리</div>
        </div>
      </div>
    </div>
  );
};

export default ContentFreeBoard;
