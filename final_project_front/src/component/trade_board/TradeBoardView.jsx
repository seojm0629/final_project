import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import "./tradeBoard.css";
import dayjs from "dayjs"; // 날짜js
import relativeTime from "dayjs/plugin/relativeTime"; // 상대 시간 확장불러오기
import "dayjs/locale/ko"; // 한국어 로케일 임포트하기

dayjs.extend(relativeTime); // 상대 시간 플러그인 확장
dayjs.locale("ko"); // 한국어 로케일 설정

const TradeBoardView = () => {
  const { tradeBoardNo } = useParams();
  const navigate = useNavigate();
  const loginId = useRecoilValue(loginIdState);

  const [tradeBoard, setTradeBoard] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [sellerProducts, setSellerProducts] = useState([]);

  const nowDate = (dateString) => {
    const now = dayjs(); //현재 날짜/시간 가져오는 함수
    const target = dayjs(dateString); // 날짜를 dayjs 형식으로 변환하기
    const diffDays = now.diff(target, "day"); // 현재날짜와 지난날짜와 비교
    // 보낸날짜가 17일이면 오늘이 19일 그럼 2일전 표시이렇게 자동으로 계산
    if (diffDays >= 7) {
      return target.format("YYYY-MM-DD"); // 7일 이상이면 날짜로 변형
    }
    return target.fromNow(); //한국어로 ?? 시간전 표시하기
  };

  // 상세 데이터 불러오기
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/tradeBoard/${tradeBoardNo}`)
      .then((res) => {
        const data = res.data || {};
        setTradeBoard(data);
        console.log(data);
        console.log(tradeBoardNo);
        // 댓글 불러오기
        axios
          .get(
            `${
              import.meta.env.VITE_BACK_SERVER
            }/tradeBoard/${tradeBoardNo}/comments`
          )
          .then((res2) => {
            const data = res2.data;
            console.log(data);
            if (Array.isArray(data)) setComments(data);
            else if (Array.isArray(data.comments)) setComments(data.comments);
            else setComments([]);
          })
          .catch((err) => console.error("댓글 불러오기 실패", err));

        // 판매자 다른 물품
        if (data.memberNo) {
          axios
            .get(
              `${import.meta.env.VITE_BACK_SERVER}/tradeBoard/seller/${
                data.memberNo
              }`
            )
            .then((res3) => {
              console.log(res3);
              // 자기 자신의 현재 게시글은 제외
              const otherProducts =
                res3.data?.filter(
                  (item) => item.tradeBoardNo !== data.tradeBoardNo
                ) || [];
              setSellerProducts(otherProducts);
            })
            .catch((err) => console.error("판매자 물품 불러오기 실패", err));
        }
      })
      .catch((err) => console.error("게시글 불러오기 실패", err));
  }, [tradeBoardNo]);

  // 삭제
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
              navigate("/tradeBoard/list");
            }
          })
          .catch((err) => console.error("삭제 실패", err));
      }
    });
  };

  if (!tradeBoard) return <div className="loading">로딩 중...</div>;

  // 거래 상태 텍스트
  const getStatusText = (status) => {
    if (status === 0) return "거래대기";
    if (status === 1) return "예약중";
    if (status === 2) return "거래완료";
    return "";
  };

  const write = () => {
    if (!loginId) {
      Swal.fire("로그인 필요", "댓글을 작성하려면 로그인해주세요.", "warning");
      return;
    }

    if (commentInput.trim() === "") {
      Swal.fire("입력 오류", "댓글 내용을 입력해주세요.", "error");
      return;
    }

    const newComment = {
      memberNo: Number(loginId), // 로그인한 회원 번호
      tbCommentContent: commentInput,
    };

    axios
      .post(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/tradeBoard/${tradeBoardNo}/comments`,
        newComment
      )
      .then((res) => {
        if (res.data === "success") {
          Swal.fire("등록 완료", "댓글이 등록되었습니다.", "success");
          setCommentInput(""); // 입력창 초기화
          // 새로고침 없이 댓글 목록 다시 불러오기
          axios
            .get(
              `${
                import.meta.env.VITE_BACK_SERVER
              }/tradeBoard/${tradeBoardNo}/comments`
            )
            .then((res2) => {
              setComments(res2.data);
            });
        }
      })
      .catch((err) => console.error("댓글 등록 실패", err));
  };

  return (
    <div className="trade-view-wrap">
      {/* 상단: 썸네일 + 제목/가격 */}
      <div className="trade-top">
        <div className="trade-thumbnail-box">
          <img
            src={
              tradeBoard.tradeThumbnailPath
                ? `${import.meta.env.VITE_BACK_SERVER}${
                    tradeBoard.tradeThumbnailPath
                  }`
                : "/image/default_img.png"
            }
            alt="상품 이미지"
            className="trade-thumbnail"
          />
        </div>

        <div className="trade-summary">
          <div className="trade-title-row">
            <h1 className="trade-title">
              {tradeBoard.tradeBoardTitle}
              {tradeBoard.tradeBoardStatus === 2 && (
                <span className="trade-status-badge">거래완료</span>
              )}
            </h1>
            <p className="trade-meta">
              #{tradeBoard.tradeBoardCategory || "기타"} ·{" "}
              {nowDate(tradeBoard.tradeBoardDate)}
            </p>
          </div>

          <div className="trade-info">
            <p className="trade-price">
              {Number(tradeBoard.tradeBoardPrice).toLocaleString()}원
            </p>
            <p className="trade-place">
              거래 희망 지역 : {tradeBoard.tradeBoardPlace}
            </p>
            <p className="trade-status">
              상태: {getStatusText(tradeBoard.tradeBoardStatus)}
            </p>
          </div>

          <div className="trade-claim">
            <p>관심 0 조회수 0</p>
            <button className="icon-btn claim-btn">🚨 신고</button>
          </div>

          <div className="trade-actions">
            <button className="icon-btn like-btn">❤️ 찜</button>
            <button className="btn inquiry-btn">문의하기</button>
          </div>
        </div>
      </div>

      {/* 판매자 정보 */}
      <div className="seller-box">
        <div className="seller-info">
          <p className="seller-name">{tradeBoard.memberNickname}</p>
          <p className="seller-score">
            매너점수 {tradeBoard.mannerScore ?? 0}점
          </p>
        </div>

        {loginId === tradeBoard.memberId && (
          <div className="seller-actions">
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
        )}
      </div>

      {/* 본문 */}
      <div className="trade-content">
        <p className="trade-text">{tradeBoard.tradeBoardContent}</p>
      </div>

      {/* 댓글 */}
      <div className="comment-section">
        <h3>💬 댓글 {comments.length}개</h3>

        <div className="comment-input-area">
          <input
            type="text"
            placeholder="댓글을 남겨주세요."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button className="btn comment-submit-btn" onClick={write}>
            등록
          </button>
        </div>

        <div className="comment-list">
          {comments.length === 0 ? (
            <p className="no-comment">아직 댓글이 없습니다.</p>
          ) : (
            comments.map((c) => (
              <div key={c.tradeCommentNo} className="comment-item">
                <div className="comment-top">
                  <p className="comment-writer">{c.commentWriter}</p>
                  <p className="comment-time">{c.timeAgo}</p>
                </div>
                <p className="comment-content">{c.commentContent}</p>

                <div className="comment-actions">
                  <button className="like-btn">👍 {c.likeCount || 0}</button>
                  <button className="report-btn">신고</button>

                  {loginId === c.commentWriterId && (
                    <>
                      <button className="edit-btn">수정</button>
                      <button className="delete-btn">삭제</button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 판매자의 다른 물품 */}
      {sellerProducts.length > 0 && (
        <div className="seller-products">
          <div className="seller-products-header">
            <h3>📦 {tradeBoard.memberNickname || "판매자"} 님의 다른 물품</h3>
          </div>
          <div className="product-grid">
            {sellerProducts.map((item) => (
              <div
                key={item.tradeBoardNo}
                className="product-item"
                onClick={() =>
                  navigate(`/tradeBoard/view/${item.tradeBoardNo}`)
                }
              >
                <img
                  src={
                    item.tradeThumbnailPath
                      ? `${import.meta.env.VITE_BACK_SERVER}${
                          item.tradeThumbnailPath
                        }`
                      : "/image/default_img.png"
                  }
                  alt="상품 이미지"
                  className="product-img"
                />
                <p className="product-title">{item.tradeBoardTitle}</p>
                <p className="product-price">
                  {Number(item.tradeBoardPrice).toLocaleString()}원
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeBoardView;
