import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const FreeBoardDetail = () => {
  return (
    <div className="freeboard-detail">
      <div className="detail-header">
        <div className="breadcrumb">홈 &gt; 취업게시판 &gt; 직장인</div>
        <h2 className="detail-title">글 제목 (Title)</h2>
        <div className="detail-info">
          <div className="view">
                  <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
                  111
                </div>
                <div className="heart">
                  <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
                  11
                </div>
                <div className="hour">
                  <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>2
                </div>
        </div>
        <div className="detail-buttons">
          <button className="edit-btn">수정</button>
          <button className="delete-btn">삭제</button>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-image">이미지</div>
        <div className="detail-text">
          글 내용을 입력하세요 글 내용을 입력하세요 글 내용을 입력하세요 글 내용을 입력하세요 글 내용을 입력하세요
          글 내용을 입력하세요 글 내용을 입력하세요 글 내용을 입력하세요 글 내용을 입력하세요
        </div>
      </div>

      <div className="detail-navigation">
        <button className="nav-btn">이전글</button>
        <button className="nav-btn">다음글</button>
      </div>

      <div className="detail-comment-section">
        <h3>댓글 1</h3>
        <div className="comment-input">
          <input type="text" placeholder="댓글을 남겨주세요." />
          <button className="comment-btn">등록</button>
        </div>

        <div className="comment-list">
          <div className="comment-item">
            <div className="comment-top">
              <span className="comment-writer">닉네임</span> · <span className="comment-time">6시간 전</span>
            </div>
            <div className="comment-text">
              댓글 내용을 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력
            </div>
            <div className="comment-actions">
              <button className="edit-btn">수정</button>
              <button className="delete-btn">삭제</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default FreeBoardDetail;
