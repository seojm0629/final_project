import "./contentFreeBoard.css";

const ContentFreeBoard = () => {
  return (
    <div>
      <div className="admin-content-wrap">
        <div className="content">
          <div className="content_box">
            <div className="content_box_title">공지사항</div>
            <div className="noticeBox search-text">
              <div className>
                <label>내용 : </label>
                <input></input>
                <select>
                  <option>자유 게시판</option>
                  <option>거래 게시판</option>
                </select>
              </div>
              <button>적용</button>
              <button>미리보기</button>
              <button>초기화</button>
            </div>
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
