import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginIdState, memberNoState } from "../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";
import "./voteDetail.css";
import Swal from "sweetalert2";
import { Bar, Pie } from "react-chartjs-2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import dayjs from "dayjs"; // 진원이형이 다운받은 날짜js
import relativeTime from "dayjs/plugin/relativeTime"; // 상대 시간 확장불러오기
import "dayjs/locale/ko"; // 한국어 로케일 임포트하기
dayjs.extend(relativeTime);
dayjs.locale("ko");
const VoteDetail = () => {
  const params = useParams(); //주소값에서 불러오는 파람값
  const voteNo = params.voteNo;
  const [memberNo, setMemberNo] = useRecoilState(memberNoState); // 로그인된 memberNo
  const [member, setMember] = useRecoilState(loginIdState); // 로그인된 memberId,
  const navigate = useNavigate();
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const [selectedOption, setSelectedOption] = useState(null); // 레디오 선택한값 담기
  const [vote, setVote] = useState({ voteCommentList: [] }); // 기본정보 담을 스테이트
  const [voteList, setVoteList] = useState([]); //항목 리스트 담을 스테이트
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  //차트 안에 들어갈 data (찾아보면 더 있음)

  const data = {
    labels: voteList.map((item) => item.voteContent), // 투표안한 항목 다보이게 표시
    datasets: [
      {
        label: "비율(%)",
        data: values.map((value) => value), //배열의 길이만큼 돌아라 맵을 써서
        backgroundColor: [
          "#e61616ff",
          "#e7772bff",
          "#dac82fff",
          "#8fd341ff",
          "#2dc969ff",
          "#2870dbff",
          "#1b64d1ff",
          "#cf2cc2ff",
          "#9e1ed4ff",
          "#d617a3ff",
        ],
      },
    ],
  };
  const [refreshToggle, setRefreshToggle] = useState(false);
  //눌렀던 게시글의 기본정보들 다 가져오기
  useEffect(() => {
    axios
      .get(`${backServer}/vote/${voteNo}`)
      .then((res) => {
        console.log(res);
        setVote(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshToggle]);
  //리스트 항목 가져오는 엑시오스

  useEffect(() => {
    axios
      .get(`${backServer}/vote/option/${voteNo}`)
      .then((res) => {
        console.log(res);
        setVoteList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${backServer}/vote/count/${voteNo}`)
      .then((res) => {
        console.log(res);
        const a = res.data.map((item, index) => {
          return item.voteContent;
        });
        const b = res.data.map((item, index) => {
          return item.voteOptionCount;
        });
        setLabels(a);
        setValues(b);

        console.log(a);
        console.log(b);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshToggle]);

  const [defaultCheck, setDefaultCheck] = useState();
  useEffect(() => {
    axios
      .get(`${backServer}/vote/checkOption/${voteNo}/${memberNo}`)
      .then((res) => {
        console.log(res);
        setDefaultCheck(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(defaultCheck);

  const optionChange = (e) => {
    console.log(e.target.value);
    //라디오 버튼클릭시 선택한 옵션을 저장하기
    setSelectedOption(e.target.value);
  };
  console.log(selectedOption);

  //투표하기 버튼 눌렀을때
  const voteResult = () => {
    if (!member) {
      Swal.fire({
        title: "로그인",
        text: "로그인 후 투표를 확인할 수 있습니다.",
        icon: "warning",
      }).then(() => {
        navigate("/member/login");
      });
      return;
    }
    /*
    if (!selectedOption) {
      Swal.fire({
        title: "투표 실패",
        text: "항목을 골라주세요 (1개)",
        icon: "error",
      });
      return;
    }
      */
    const resultData = {
      voteNo: vote.voteNo,
      memberNo: memberNo,
      voteOptionNo: selectedOption,
    };

    if (defaultCheck === undefined) {
      axios //결과 테이블에 인설트 완료
        .post(`${backServer}/vote/result`, resultData)
        .then((res) => {
          Swal.fire({
            title: "투표 완료",
            icon: "success",
          });
          setRefreshToggle(!refreshToggle);
        })
        .catch((err) => {
          Swal.fire({
            title: "투표 실패",
            text: "이미 투표에 참여하셨습니다.",
            icon: "error",
          });
        });
    } else {
      //재투표 엑시오스
      axios
        .patch(`${backServer}/vote/reVote`, resultData)
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            title: "재투표 완료",
            icon: "success",
          });
          setRefreshToggle(!refreshToggle);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const voteDelete = () => {
    Swal.fire({
      title: "투표삭제",
      text: "게시글을 삭제하시겠습니까?",
      icon: "warning",
      showCloseButton: true,
      confirmButtonAriaLabel: "삭제하기",
      cancelButtonText: "취소",
    }).then((select) => {
      if (select.isConfirmed) {
        axios
          .delete(`${backServer}/vote/${voteNo}`)
          .then((res) => {
            if (res.data === 1) {
              Swal.fire({
                title: "삭제완료!",
                text: "삭제되었습니다.",
                icon: "success",
              });
            }
            navigate("/vote/list");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const voteEndDate = () => {
    Swal.fire({
      title: "투표종료",
      text: "투표를 종료하시겠습니까?",
      icon: "warning",
      showCloseButton: true,
      confirmButtonAriaLabel: "종료하기",
      cancelButtonText: "취소",
    }).then((select) => {
      if (select.isConfirmed) {
        axios
          .patch(`${backServer}/vote/${voteNo}`)
          .then((res) => {
            if (res.data === 1) {
              Swal.fire({
                title: "종료완료!",
                text: "투표가 종료 되었습니다.",
                icon: "success",
              });
            }
            navigate("/vote/list");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const [commentData, setCommentData] = useState({});
  console.log(commentData);
  const nowDate = (dateString) => {
    const now = dayjs();
    const target = dayjs(dateString);
    const diffDays = now.diff(target, "day");
    if (diffDays >= 7) {
      return target.format("YYYY-MM-DD");
    }
    return target.fromNow();
  };

  const insertComment = () => {
    axios
      .post(`${backServer}/vote/comment/insert`, commentData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(vote.voteCommentList);
  return (
    <div className="vote-detail-wrap">
      <div className="vote-detail-title">
        <h3>투표 상세보기</h3>
      </div>
      {vote && vote.memberNo === memberNo && (
        <div className="vote-detail-buttonBox">
          {vote.voteCheck === 0 && (
            <button onClick={voteEndDate}>투표종료</button>
          )}
          <button onClick={voteDelete}>삭제하기</button>
        </div>
      )}
      {vote &&
        (vote.voteCheck === 0 ? ( // 홈페이지가 표시될때 기본값이 비어있어서 오류가 나기에 조건 걸기 값이 있을떼 표시하기
          <div className="vote-detail-list">
            <div className="vote-detail-list-title">{vote.voteTitle}</div>
            <ul className="vote-detail-ul">
              {voteList.map((list, i) => {
                return (
                  <li className="vote-detail-content" key={"list" + i}>
                    <input
                      type="radio"
                      name="voteOption"
                      id={"voteOption" + list.voteOptionNo}
                      defaultChecked={defaultCheck === list.voteOptionNo}
                      value={list.voteOptionNo}
                      className="vote-radio"
                      onChange={optionChange}
                    />
                    <label
                      htmlFor={"voteOption" + list.voteOptionNo}
                      className="vote-label"
                    >
                      {list.voteContent}
                    </label>
                  </li>
                );
              })}
            </ul>
            <div className="vote-detail-button-box">
              <button className="vote-detail-check-button" onClick={voteResult}>
                투표하기
              </button>
            </div>
          </div>
        ) : (
          <div className="vote-detail-list">
            <div className="vote-detail-list-title">종료된 투표입니다.</div>
            <ul className="vote-detail-ul-end">
              {voteList.map((list, i) => {
                console.log(voteList);
                const maxValue = Math.max(...values);

                const style =
                  maxValue === "0"
                    ? {
                        backgroundColor: "orange",
                        borderRadius: "10px",
                      }
                    : undefined;

                return (
                  <li
                    className="vote-detail-content-end"
                    style={style}
                    key={"list" + i}
                  >
                    <div className="vote-content-end-div1">
                      {list.voteContent}
                      <span className="detail-checkicon">
                        {defaultCheck === list.voteOptionNo && (
                          <CheckCircleIcon />
                        )}
                      </span>
                    </div>
                    <div>{values[i]} 표</div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      <div className="vote-result-graph">
        <Pie
          data={data}
          options={{
            scales: {},
          }}
        />
      </div>
      {/* 댓글 */}
      <div className="comment-section">
        <div className="comment-input-area">
          <input
            type="text"
            placeholder="댓글을 남겨주세요."
            onChange={(e) => {
              setCommentData({
                memberNo: memberNo,
                voteCommentContent: e.target.value,
                voteNo: voteNo,
              });
            }}
          />
          <button className="btn comment-submit-btn" onClick={insertComment}>
            등록
          </button>
        </div>
        <div className="comment-list">
          {vote.voteCommentList.length === 0 ? (
            <p className="no-comment">아직 댓글이 없습니다.</p>
          ) : (
            vote.voteCommentList?.map((c) => (
              <div key={c.voteCommentNo} className="comment-item">
                <div className="comment-top">
                  <p>{c.memberNickname}</p>
                  <p className="comment-time">{nowDate(c.voteCommentDate)}</p>
                </div>
                <p className="comment-content">{c.voteCommentContent}</p>
                <div className="comment-actions">
                  <button className="like-btn">👍</button>
                  <button className="report-btn">신고</button>
                  {memberNo === c.memberNo && (
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
    </div>
  );
};

export default VoteDetail;
