import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import "./tradeBoard.css";

const TradeBoardView = () => {
  const { tradeBoardNo } = useParams();
  const [tradeBoard, setTradeBoard] = useState(null);
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  /* 게시글 상세 조회 */
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/tradeBoard/${tradeBoardNo}`)
      .then((res) => {
        setTradeBoard(res.data.tradeBoard);
        setComments(res.data.commentList || []);
        setIsLiked(res.data.isLiked || false);
      })
      .catch((err) => console.log(err));
  }, []);

  /* 게시글 삭제 */
  const deleteBoard = () => {
    Swal.fire({
      title: "게시글 삭제",
      text: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${import.meta.env.VITE_BACK_SERVER}/tradeBoard/${tradeBoardNo}`
          )
          .then((res) => {
            if (res.data === 1) {
              Swal.fire("삭제 완료", "게시글이 삭제되었습니다.", "success");
              navigate("/tradeboard/list");
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  /* 찜 토글 */
  const toggleLike = () => {
    if (!memberId) {
      Swal.fire("로그인이 필요합니다.", "", "warning");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_BACK_SERVER}/tradeBoard/like`, {
        tradeBoardNo,
        memberId,
      })
      .then((res) => {
        setIsLiked(res.data.liked);
        setTradeBoard({ ...tradeBoard, tradeLikeCount: res.data.likeCount });
      })
      .catch((err) => console.log(err));
  };

  /* 댓글 등록 */
  const addComment = () => {
    if (!memberId) {
      Swal.fire("로그인이 필요합니다.", "", "warning");
      return;
    }
    if (commentContent.trim() === "") {
      Swal.fire("댓글 내용을 입력해주세요.", "", "info");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACK_SERVER}/tradeBoard/comment`, {
        tradeBoardNo,
        memberId,
        commentContent,
      })
      .then((res) => {
        setComments([...comments, res.data]);
        setCommentContent("");
      })
      .catch((err) => console.log(err));
  };

  /* 댓글 삭제 */
  const deleteComment = (commentNo) => {
    Swal.fire({
      title: "댓글 삭제",
      text: "이 댓글을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${
              import.meta.env.VITE_BACK_SERVER
            }/tradeBoard/comment/${commentNo}`
          )
          .then((res) => {
            if (res.data === 1) {
              setComments(comments.filter((c) => c.commentNo !== commentNo));
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  if (!tradeBoard) return null;

  return (
    <section className="trade-view-wrap">
      {/* --- 게시글 상단 --- */}
      <div className="trade-header">
        {/*
        <img
          src={
            tradeBoard.tradeThumbnailPath
              ? `${import.meta.env.VITE_BACK_SERVER}/trade/thumb/${tradeBoard.tradeThumbnailPath}`
              : "/image/default_img.png"
          }
          alt="상품이미지"
          className="trade-thumbnail"
        />
*/}
        <div className="trade-info">
          <h2 className="trade-title">{tradeBoard.tradeBoardTitle}</h2>
          <p className="trade-category">
            카테고리 | {tradeBoard.tradeCategoryName || "기타"}
          </p>
          <p className="trade-price">
            {tradeBoard.tradeBoardPrice?.toLocaleString()}원
          </p>
          <p className="trade-place">{tradeBoard.tradeBoardPlace}</p>

          <div className="trade-meta">
            <span>{tradeBoard.memberId}</span> |{" "}
            <span>{tradeBoard.tradeBoardDate}</span> |{" "}
            <span>조회 {tradeBoard.tradeBoardViews}</span>
          </div>

          <div className="trade-status">
            거래상태:{" "}
            <span
              className={tradeBoard.tradeBoardStatus === 1 ? "on-sale" : "sold"}
            >
              {tradeBoard.tradeBoardStatus === 1 ? "거래중" : "거래완료"}
            </span>
          </div>

          <div className="trade-actions">
            <button className="btn-like" onClick={toggleLike}>
              {isLiked ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}{" "}
              찜 {tradeBoard.tradeLikeCount || 0}
            </button>
            <button className="btn-chat">
              <ChatBubbleOutlineIcon /> 문의
            </button>
          </div>
        </div>
      </div>

      {/* --- 게시글 본문 --- */}
      <div className="trade-content">{tradeBoard.tradeBoardContent}</div>

      {/* --- 수정 / 삭제 버튼 --- */}
      {memberId === tradeBoard.memberId && (
        <div className="trade-btn-zone">
          <Link
            to={`/tradeboard/update/${tradeBoard.tradeBoardNo}`}
            className="btn-edit"
          >
            수정
          </Link>
          <button onClick={deleteBoard} className="btn-delete">
            삭제
          </button>
        </div>
      )}

      {/* --- 댓글 영역 --- */}
      <div className="trade-comment-wrap">
        <h3>댓글 {comments.length}</h3>
        <div className="comment-input">
          <input
            type="text"
            placeholder="댓글을 남겨주세요."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button className="btn-comment" onClick={addComment}>
            등록
          </button>
        </div>

        <ul className="comment-list">
          {comments.length === 0 && (
            <li className="empty">등록된 댓글이 없습니다.</li>
          )}
          {comments.map((c) => (
            <li key={c.commentNo}>
              <div className="comment-top">
                <span className="comment-writer">{c.memberId}</span>
                <span className="comment-time">{c.commentDate}</span>
              </div>
              <p className="comment-content">{c.commentContent}</p>
              <div className="comment-bottom">
                {memberId === c.memberId && (
                  <>
                    <button
                      className="btn-small"
                      onClick={() => deleteComment(c.commentNo)}
                    >
                      삭제
                    </button>
                  </>
                )}
                <span className="comment-like">❤️ {c.commentLike || 0}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* --- 판매자의 다른 물품 --- */}
      <div className="trade-more">
        <div className="trade-more-header">
          <h4>{tradeBoard.memberId}의 판매 물품</h4>
          <Link to="/tradeBoard/list" className="btn-more">
            더 구경하기 &gt;
          </Link>
        </div>

        <div className="trade-more-list">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="trade-item">
              <img src="/image/default_img.png" alt="상품" />
              <p className="trade-item-title">글 제목</p>
              <p className="trade-item-price">상품 가격</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TradeBoardView;
