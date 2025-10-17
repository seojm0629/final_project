import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./tradeBoard.css";

const TradeBoardView = () => {
  const { tradeBoardNo } = useParams();
  const navigate = useNavigate();

  const [tradeBoard, setTradeBoard] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [sellerProducts, setSellerProducts] = useState([]);

  useEffect(() => {
    // 상세 게시글 + 댓글 불러오기
    axios
      .get(`/tradeBoard/${tradeBoardNo}`)
      .then((res) => {
        setTradeBoard(res.data);

        // 댓글
        axios
          .get(`/tradeBoard/${tradeBoardNo}/comments`)
          .then((res2) => setComments(res2.data));

        // 판매자의 다른 판매물품 (현재 게시글 제외)
        if (res.data.sellerId) {
          axios
            .get(`/tradeBoard/seller/${res.data.sellerId}`)
            .then((res3) => setSellerProducts(res3.data))
            .catch((err) => console.error("판매자 물품 불러오기 실패", err));
        }
      })
      .catch((err) => console.error(err));
  }, [tradeBoardNo]);

  const deleteBoard = () => {
    Swal.fire({
      title: "게시글 삭제",
      text: "게시글을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제하기",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/tradeBoard/${tradeBoardNo}`)
          .then((res) => {
            if (res.data === 1) {
              Swal.fire("삭제 완료", "게시글이 삭제되었습니다.", "success");
              navigate("/tradeBoard/list");
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  if (!tradeBoard) return <div className="loading">로딩 중...</div>;

  return (
    <div className="trade-detail-container">
      {/* 제목 + 카테고리 + 시간 */}
      <div className="trade-header">
        <div className="trade-header-left">
          <h1 className="trade-title">{tradeBoard.tradeBoardTitle}</h1>
          <p className="trade-meta">
            #{tradeBoard.categoryName} · {tradeBoard.timeAgo}
          </p>
        </div>
        <div className="trade-header-right">
          <button className="icon-btn report-btn" title="신고하기">
            🚩
          </button>
          <button className="icon-btn like-btn" title="찜하기">
            ❤️
          </button>
        </div>
      </div>

      {/* 가격, 지역, 찜, 조회수 */}
      <div className="trade-info">
        <span className="trade-price">
          {tradeBoard.tradeBoardPrice.toLocaleString()}원
        </span>
        <span className="trade-place">📍 {tradeBoard.tradeBoardPlace}</span>
        <span>❤️ {tradeBoard.likeCount}개</span>
        <span>👁 {tradeBoard.viewCount}회</span>
      </div>

      {/* 판매자 정보 */}
      <div className="seller-box">
        <div className="seller-info">
          <p className="seller-name">{tradeBoard.sellerNickname}</p>
          <p className="seller-score">매너점수 {tradeBoard.mannerScore}점</p>
        </div>
        <div className="seller-actions">
          <button className="btn inquiry-btn">문의하기</button>
          <button
            className="btn edit-btn"
            onClick={() =>
              navigate(`/tradeBoard/edit/${tradeBoard.tradeBoardNo}`)
            }
          >
            수정
          </button>
          <button className="btn delete-btn" onClick={deleteBoard}>
            삭제
          </button>
        </div>
      </div>

      {/* 본문 */}
      <div className="trade-content">
        {tradeBoard.tradeThumbnailPath && (
          <img
            src={tradeBoard.tradeThumbnailPath}
            alt="thumbnail"
            className="trade-thumbnail"
          />
        )}
        <p className="trade-text">{tradeBoard.tradeBoardContent}</p>
      </div>

      {/* 판매자의 다른 물품 */}
      {sellerProducts.length > 0 && (
        <div className="seller-products">
          <h3>📦 {tradeBoard.sellerNickname} 님의 다른 물품</h3>
          <div className="product-grid">
            {sellerProducts.map((item) => (
              <div
                key={item.tradeBoardNo}
                className="product-item"
                onClick={() => navigate(`/tradeBoard/${item.tradeBoardNo}`)}
              >
                <img src={item.tradeThumbnailPath} alt="" />
                <p className="product-title">{item.tradeBoardTitle}</p>
                <p className="product-price">
                  {item.tradeBoardPrice.toLocaleString()}원
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 댓글 구역 */}
      <div className="comment-section">
        <h3>💬 댓글 {comments.length}개</h3>

        <div className="comment-input-area">
          <input
            type="text"
            placeholder="댓글을 입력하세요"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button className="btn comment-submit-btn">등록</button>
        </div>

        <div className="comment-list">
          {comments.map((c) => (
            <div key={c.tradeCommentNo} className="comment-item">
              <div className="comment-top">
                <p className="comment-writer">{c.commentWriter}</p>
                <p className="comment-time">{c.timeAgo}</p>
              </div>
              <p className="comment-content">{c.commentContent}</p>
              <div className="comment-actions">
                <div className="comment-left">
                  <button className="like-btn">👍 {c.likeCount}</button>
                  <button className="report-btn">신고</button>
                </div>
                {c.isMine && (
                  <div className="comment-right">
                    <button className="edit-btn">수정</button>
                    <button className="delete-btn">삭제</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradeBoardView;
