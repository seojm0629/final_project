import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { loginIdState, memberNoState } from "../utils/RecoilData";
import BaseModal from "../utils/BaseModal";

const FreeBoardDetail = () => {
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const [member, setMember] = useRecoilState(loginIdState);
  const [memberNo, setMemberNo] = useRecoilState(memberNoState);
  const params = useParams();
  const freeBoardNo = params.freeBoardNo;
  const [freeBoard, setFreeBoard] = useState({});
  const [freeBoardComment, setFreeBoardComment] = useState([]); //해당 게시글에 대한 번호
  const [fbCommentContent, setFbCommentContent] = useState(""); //게시글에 대한 댓글
  const commentCount = freeBoardComment.length;
  const [toDate, setToDate] = useState(); //사용할 시간
  const navigate = useNavigate();

  const [fbClaimReason, setFbClaimReason] = useState();

  const [fbClaimSet, setFbClaimSet] = useState();
  console.log(fbClaimSet);

  useEffect(() => {
    axios
      .post(
        `${import.meta.env.VITE_BACK_SERVER}/freeBoard/detail/claim`,
        fbClaimSet
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fbClaimSet]);

  const comment = {
    freeBoardNo: freeBoardNo,
    freeBoardSubcategoryNo: freeBoard.freeBoardSubcategoryNo,
    freeBoardCategoryNo: freeBoard.freeBoardCategoryNo,
    memberNo: memberNo,
    fbCommentContent: fbCommentContent,
  };
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
  {
    useEffect(() => {
      axios
        .get(`${backServer}/freeBoard/detail/${freeBoardNo}`)
        .then((res) => {
          setFreeBoard(res.data);
          setToDate(res.data.freeBoardDate);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [freeBoardNo]);
  }
  useEffect(() => {
    axios
      .get(`${backServer}/freeBoard/detail/comment?freeBoardNo=${freeBoardNo}`)
      .then((res) => {
        setFreeBoardComment(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [freeBoardNo, fbCommentContent]);
  const commentResist = () => {
    if (member === null || member === "") {
      Swal.fire({
        title: "로그인",
        text: "로그인 후 이용해주세요.",
        icon: "warning",
      }).then(() => {
        navigate("/member/login");
      });
    }
    if (
      member !== null &&
      (fbCommentContent === "" || fbCommentContent === null)
    ) {
      alert("댓글을 입력해주세요.");
    } else {
      axios
        .post(`${backServer}/freeBoard/detail/regist`, comment)
        .then((res) => {
          console.log(res);
          if (res.data === 1) {
            setFbCommentContent("");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    /* 상세페이지  */
    <div className="detail-container">
      <div className="detail-path">홈 &gt; 취업게시판 &gt; 직장인</div>
      <div className="detail-title-section">
        <div className="detail-title">{freeBoard.freeBoardTitle}</div>
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
          {freeBoard.likeCount}
        </div>
        <div className="hour">
          <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>
          {nowDate(toDate)}
        </div>
      </div>
      <hr className="detail-line" />
      <div className="detail-main">
        <div className="detail-content">
          <div className="detail-image-box">{freeBoard.freeBoardThumbnail}</div>
          <div
            className="detail-freeBoardContent"
            dangerouslySetInnerHTML={{ __html: freeBoard.freeBoardContent }}
          ></div>
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
        <BaseModal
          title="이용자 신고하기"
          content={
            <div>
              <div>게시글을 신고하시겠습니까?</div>
              <div>게시글 번호 : {freeBoard.freeBoardNo}</div>
              <div>
                신고 사유 :{" "}
                <input
                  type="text"
                  value={fbClaimReason}
                  onChange={(e) => {
                    setFbClaimReason(e.target.value);
                  }}
                ></input>
              </div>
            </div>
          }
          buttonLabel={
            <span>
              <ReportGmailerrorredIcon className="report-icon" />
              신고하기
            </span>
          }
          contentBoxStyle={{ width: "800px", height: "400px" }}
          end={"취소"}
          result={
            <button
              onClick={() => {
                setFbClaimSet({
                  freeBoardNo: freeBoard.freeBoardNo,
                  fbClaimReason: fbClaimReason,
                  memberNo: memberNo,
                });
              }}
            >
              확인
            </button>
          }
        />
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
          <span>댓글 {commentCount}</span>
          <span className="comment-order">
            최신순 <ImportExportOutlinedIcon></ImportExportOutlinedIcon>
          </span>
        </div>
        <div className="comment-input">
          <textarea
            type="text"
            placeholder="댓글을 남겨주세요."
            name={fbCommentContent}
            value={fbCommentContent}
            onChange={(e) => {
              setFbCommentContent(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (member === null || member === "") {
                  Swal.fire({
                    title: "로그인",
                    text: "로그인 후 이용해주세요.",
                    icon: "warning",
                  }).then(() => {
                    navigate("/member/login");
                  });
                }
                if (
                  member !== null &&
                  (fbCommentContent === "" ||
                    fbCommentContent === " " ||
                    fbCommentContent === null)
                ) {
                  alert("댓글을 입력해주세요.");
                } else {
                  axios
                    .post(`${backServer}/freeBoard/detail/regist`, comment)
                    .then((res) => {
                      console.log(res);
                      if (res.data === 1) {
                        setFbCommentContent("");
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              }
            }}
          />
          <button className="comment-submit" onClick={commentResist}>
            등록
          </button>
        </div>
        <div className="comment-report">
          <ReportGmailerrorredIcon className="report-icon" />
          <span>신고하기</span>
        </div>
        <div className="comment-box">
          {freeBoardComment.map((comment, i) => {
            return (
              <div
                className={
                  i + 1 === freeBoardComment.length
                    ? "comment-item end"
                    : "comment-item"
                }
                key={"item" + i}
              >
                <div className="comment-writer">
                  <span>{comment.memberNickname}</span>
                  <span>{comment.memberId}</span>
                </div>
                <div
                  className="comment-text"
                  dangerouslySetInnerHTML={{
                    __html: comment.fbCommentContent,
                  }}
                ></div>
                <div className="comment-sub">
                  <div className="heart">
                    <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
                    {comment.cnt}
                  </div>
                  <div className="hour">
                    <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>
                    {nowDate(comment.fbCommentDate)}
                  </div>
                </div>
                <div className="comment-button">
                  <button className="modify-btn">수정</button>
                  <button className="delete-btn">삭제</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FreeBoardDetail;
