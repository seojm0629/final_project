import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
const FreeBoardDetail = () => {
  return (
    /* 상세페이지 - 받은 작성 */
    <div className="detail-container">
      <div className="detail-path">홈 &gt; 취업게시판 &gt; 직장인</div>
      <div className="detail-title-section">
        <div className="detail-title">글 제목</div>
        <div className="detail-buttonBox">
          <button className="modify-btn">수정</button>
          <button className="delete-btn">삭제</button>
        </div>
      </div>
      <div className="detail-view">
        <div className="view">
          <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
          111
        </div>
        <div className="heart">
          <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
          12
        </div>
        <div className="hour">
          <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>2
        </div>
      </div>
      <hr className="detail-line" />
      <div className="detail-main">
        <div className="detail-content">
          <div className="detail-image-box">이미지</div>
          <p>
            글 내용 내용 글 내용 내용 글 내용 내용 글 내용 내용 글 내용 내용 글
            내용 내용 글 내용 내용 글 내용 내용 글 내용 내용 글 내용 내용 글
            내용 내용
          </p>
        </div>
        <div className="recommend-box">
          <div className="recommend-title">추천글</div>
          <ul>
            <li>추천글 제목</li>
            <li>추천글 제목</li>
            <li>추천글 제목</li>
            <li>추천글 제목</li>
            <li>추천글 제목</li>
          </ul>
        </div>
      </div>
      <div className="detail-report">
        <span>
          <ReportGmailerrorredIcon className="report-icon" />
          신고하기
        </span>
      </div>
      <div className="detail-buttons">
        <button className="list-btn">목록으로</button>
        <div>
          <button className="prev-btn">이전글</button>
          <button className="next-btn">다음글</button>
        </div>
      </div>
      <div className="comment-section">
        <div className="comment-header">
          <span>댓글(댓글수)</span>
          <span className="comment-order">
            최신순 <ImportExportOutlinedIcon></ImportExportOutlinedIcon>
          </span>
        </div>
        <div className="comment-input">
          <textarea type="text" placeholder="댓글을 남겨주세요." />
          <button className="comment-submit">등록</button>
        </div>
        <div className="comment-report">
          <ReportGmailerrorredIcon className="report-icon" />
          <span>신고하기</span>
        </div>
        <div className="comment-item">
          <div className="comment-writer">
            <span>닉네임</span>
            <span>아이디</span>
          </div>
          <div className="comment-text">
            댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글
            내용
          </div>
          <div className="comment-sub">
            <div className="heart">
              <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
              12
            </div>
            <div className="hour">
              <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>2
            </div>
          </div>
          <div className="comment-button">
            <button className="modify-btn">수정</button>
            <button className="delete-btn">삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeBoardDetail;
