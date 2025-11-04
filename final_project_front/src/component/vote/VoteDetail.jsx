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
import ChartDataLabels from "chartjs-plugin-datalabels"; // 그래프 안에 값 보여주는 임포트
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // 위의 값 과 포
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels); // 그래프 안 항목 내용들 보여주기
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

  // 모든 항목의 값이 0인지 확인하는 값
  const voteZero = values.every((v) => v === 0);

  // 투표를 안했을때도 그래프 보이게
  const filteredData = voteZero
    ? [{ label: "투표가 없습니다", value: 1 }] // 모든 항목이 0일 때 임시 데이터 넣는값
    : voteList.map((list, i) => ({
        label: list.voteContent,
        value: values[i] || 0, // 값이 undefined면 0으로 처리 이게없으면 모든항목들이 다보임
      }));
  //차트 안에 들어갈 data (찾아보면 더 있음)
  const data = {
    labels: filteredData.map((item) => item.label), // 각 항목의 이름 배열 저장
    datasets: [
      {
        data: filteredData.map((item) => item.value),
        backgroundColor: voteZero
          ? ["#e0e0e0"] // 모든 값이 0일 때 회색 표시
          : [
              "#FF6B6B", // 선명한 빨강
              "#FFD93D", // 밝은 노랑
              "#6BCB77", // 연두
              "#4D96FF", // 파랑
              "#9D4EDD", // 보라
              "#FF8C42", // 주황
              "#5BC0EB", // 하늘
              "#FDE74C", // 레몬
              "#9BC53D", // 라임
              "#E55934", // 벽돌색
            ],
        borderWidth: 1, // 각 조각들 두께설정
      },
    ],
  };

  const [refreshToggle, setRefreshToggle] = useState(false);
  //눌렀던 게시글의 기본정보들 다 가져오기
  useEffect(() => {
    axios
      .get(`${backServer}/vote/${voteNo}`)
      .then((res) => {
        setVote(res.data);
      })
      .catch((err) => {
        navigate("/pageerror");
      });
  }, [refreshToggle]);
  //리스트 항목 가져오는 엑시오스

  useEffect(() => {
    axios
      .get(`${backServer}/vote/option/${voteNo}`)
      .then((res) => {
        setVoteList(res.data);
      })
      .catch((err) => {
        navigate("/pageerror");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${backServer}/vote/count/${voteNo}`)
      .then((res) => {
        const a = res.data.map((item, index) => {
          return item.voteContent;
        });
        const b = res.data.map((item, index) => {
          return item.voteOptionCount;
        });
        setLabels(a);
        setValues(b);
      })
      .catch((err) => {
        navigate("/pageerror");
      });
  }, [refreshToggle]);

  const [defaultCheck, setDefaultCheck] = useState();
  useEffect(() => {
    axios
      .get(`${backServer}/vote/checkOption/${voteNo}/${memberNo}`)
      .then((res) => {
        console.log(res.data);
        if (res.data === 0) {
          setDefaultCheck(undefined);
        } else {
          setDefaultCheck(res.data);
        }
      })
      .catch((err) => {
        navigate("/pageerror");
      });
  }, []);

  const optionChange = (e) => {
    //라디오 버튼클릭시 선택한 옵션을 저장하기
    setSelectedOption(e.target.value);
  };

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
      console.log("defalut1", defaultCheck);
      console.log(resultData);
      axios //결과 테이블에 인설트 완료
        .post(`${backServer}/vote/result`, resultData)
        .then((res) => {
          Swal.fire({
            title: "투표 완료",
            icon: "success",
          });
          setRefreshToggle(!refreshToggle);
          setDefaultCheck(resultData.voteOptionNo);
        })
        .catch((err) => {
          Swal.fire({
            title: "투표 실패",
            text: "이미 투표에 참여하셨습니다.",
            icon: "error",
          });
          navigate("/pageerror");
        });
    } else {
      //재투표 엑시오스
      console.log("defalut2", defaultCheck);
      axios
        .patch(`${backServer}/vote/reVote`, resultData)
        .then((res) => {
          Swal.fire({
            title: "재투표 완료",
            icon: "success",
          });
          setRefreshToggle(!refreshToggle);
        })
        .catch((err) => {
          navigate("/pageerror");
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
            navigate("/pageerror");
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
            navigate("/pageerror");
          });
      }
    });
  };

  const [commentData, setCommentData] = useState({});

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
        setCommentData({ ...commentData, voteCommentContent: "" });
        setRefreshToggle(!refreshToggle);
      })

      .catch((err) => {
        navigate("/pageerror");
      });
  };

  const [modifyFbCommentContent, setModifyFbCommentContent] = useState(""); //수정할 댓글 입력
  const [modifyCommentNo, setModifyCommentNo] = useState(); //댓글 수정 시 해당 번호찾기

  // 수정 버튼 눌렀을때 값들 저장하기
  const voteCommentModify = (comment) => {
    setModifyCommentNo(comment.voteCommentNo);
    setModifyFbCommentContent(comment.voteCommentContent);
  };

  //수정 저장 눌렀을때 값
  const updateComment = () => {
    const modifyData = {
      voteCommentNo: modifyCommentNo,
      voteCommentContent: modifyFbCommentContent,
    };
    axios
      .patch(`${backServer}/vote/comment/update`, modifyData)
      .then((res) => {
        Swal.fire({
          title: "수정 완료!",
          icon: "success",
        });

        setRefreshToggle(!refreshToggle);
        setModifyCommentNo(null);
      })
      .catch((err) => {
        navigate("/pageerror");
      });
  };
  const commentLike = (voteCommentNo) => {
    const voteCommentLike = {
      voteCommentNo: voteCommentNo,
      memberNo: memberNo,
    };

    axios
      .post(
        `${import.meta.env.VITE_BACK_SERVER}/vote/comment/like`,
        voteCommentLike
      )
      .then((res) => {
        if (res.data === 1) {
          setRefreshToggle(!refreshToggle);
          Swal.fire({
            title: "알림",
            text: `댓글에 좋아요 적용 완료`,

            icon: "success",
          });
        } else if (res.data === 0) {
          setRefreshToggle(!refreshToggle);
          Swal.fire({
            title: "알림",
            text: `댓글에 좋아요 취소 완료`,

            icon: "success",
          });
        }
      })
      .catch((err) => {
        navigate("/pageerror");
      });
  };
  const commentReport = (voteCommentNo) => {
    if (!memberNo) {
      Swal.fire({
        title: "로그인 필요",
        text: "로그인 후 이용 가능한 기능입니다.",
        icon: "warning",
      });
      return;
    }

    Swal.fire({
      title: "댓글 신고",
      input: "text",
      inputLabel: "신고 사유를 입력하세요.",
      inputPlaceholder: "예: 욕설, 비방, 스팸 등",
      showCancelButton: true,
      confirmButtonText: "신고하기",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        const reportData = {
          voteCommentNo: voteCommentNo,
          memberNo: memberNo,
          reportReason: result.value,
        };

        axios
          .post(`${backServer}/vote/comment/report`, reportData)
          .then((res) => {
            if (res.data === 1) {
              Swal.fire({
                title: "신고 완료",
                text: "댓글 신고가 접수되었습니다.",
                icon: "success",
              });
            } else if (res.data === 0) {
              Swal.fire({
                title: "이미 신고한 댓글입니다.",
                text: "중복 신고는 불가합니다.",
                icon: "info",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "오류",
              text: "신고 처리 중 문제가 발생했습니다.",
              icon: "error",
            });
            navigate("/pageerror");
          });
      }
    });
  };

  const voteLike = () => {
    if (!memberNo) {
      Swal.fire({
        title: "로그인 필요",
        text: "로그인 후 이용 가능한 기능입니다.",
        icon: "warning",
      });
      return;
    }

    const likeData = {
      voteNo: voteNo,
      memberNo: memberNo,
    };

    axios
      .post(`${backServer}/vote/like`, likeData)
      .then((res) => {
        if (res.data === 1) {
          Swal.fire({
            title: "좋아요!",
            text: "투표 게시글에 좋아요가 추가되었습니다.",
            icon: "success",
          });
        } else if (res.data === 2) {
          Swal.fire({
            title: "좋아요 취소",
            text: "좋아요가 취소되었습니다.",
            icon: "info",
          });
        }
        setRefreshToggle(!refreshToggle); // 새로고침
      })
      .catch((err) => {
        Swal.fire({
          title: "오류",
          text: "좋아요 처리 중 오류가 발생했습니다.",
          icon: "error",
        });
        navigate("/pageerror");
      });
  };

  const voteReport = () => {
    if (!memberNo) {
      Swal.fire({
        title: "로그인 필요",
        text: "로그인 후 이용 가능한 기능입니다.",
        icon: "warning",
      });
      return;
    }

    Swal.fire({
      title: "게시글 신고",
      input: "text",
      inputLabel: "신고 사유를 입력하세요.",
      inputPlaceholder: "예: 욕설, 스팸, 부적절한 내용 등",
      showCancelButton: true,
      confirmButtonText: "신고하기",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        const reportData = {
          voteNo: voteNo,
          memberNo: memberNo,
          reportReason: result.value,
        };

        axios
          .post(`${backServer}/vote/report`, reportData)
          .then((res) => {
            if (res.data === 1) {
              Swal.fire({
                title: "신고 완료",
                text: "게시글 신고가 접수되었습니다.",
                icon: "success",
              });
            } else if (res.data === 0) {
              Swal.fire({
                title: "이미 신고한 게시글입니다.",
                text: "중복 신고는 불가합니다.",
                icon: "info",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "오류",
              text: "신고 처리 중 문제가 발생했습니다.",
              icon: "error",
            });
            navigate("/pageerror");
          });
      }
    });
  };

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
                const maxValue = Math.max(...values);
                //values[i] 현재항목 득표수 에서 가장 많은 득표수 값
                //1등 항목 일때 true 를 보내기 // 공동 1등일때도 두개다 보이기  0일땐 색 넣지않게
                const oneVote = values[i] === maxValue && maxValue > 0;

                const style = oneVote
                  ? {
                      padding: "0px 5px",
                      background: "linear-gradient(135deg, #a5b4fc, #c7d2fe)", // 파스텔 그라데이션
                      border: "2px solid #FFD700", // 금색 포인트
                      borderRadius: "10px",
                    }
                  : {};
                return (
                  <li
                    className="vote-detail-content-end"
                    style={style}
                    key={"list" + i}
                  >
                    <div className="vote-content-end-div1">
                      {oneVote && <EmojiEventsIcon className="win-icon" />}
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
            responsive: true,
            maintainAspectRatio: false, // 이거 꼭!
            plugins: {
              legend: {
                position: "bottom", // 아래로 이동 (좌우로 늘어남)
                labels: {
                  boxWidth: 15,
                  padding: 15,
                  font: {
                    size: 14,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  //마우스 올렸을때 표시되는 툴팁이다!
                  label: function (context) {
                    const label = context.label || ""; // 항목 이름
                    const value = context.formattedValue || 0; //투표 수
                    return `${label}: ${value}표`; /// 예를 들어서 "항목 A : 1표"
                  },
                },
              },
              datalabels: {
                //pie 안쪽에 값 표시하기
                color: "#fff",
                font: { weight: "bold", size: 14 },
                formatter: (value, context) => {
                  if (value === 0) return ""; // 0이면 텍스트 안보이게하기
                  const label = context.chart.data.labels[context.dataIndex];
                  const total = context.chart.data.datasets[0].data.reduce(
                    (sum, v) => sum + v,
                    0
                  );
                  const percent = ((value / total) * 100).toFixed(1); // 퍼센트 계산용
                  return `${label}\n(${percent}%)`; // 예 : 항목 A (25.0%);
                },
              },
            },
          }}
        />
      </div>
      <div className="detail-button-box">
        <button
          className="like-btn"
          onClick={() => {
            voteLike();
          }}
        >
          👍{vote.likeCount}
        </button>
        <button
          className="report-btn"
          onClick={() => {
            voteReport();
          }}
        >
          신고
        </button>
      </div>
      {/* 댓글 */}
      <div className="comment-section">
        <div className="comment-input-area">
          <input
            type="text"
            placeholder="댓글을 남겨주세요."
            value={commentData.voteCommentContent}
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
                  <div className="commemt-nickname">{c.memberNickname}</div>
                  {/* 수정 버튼 눌렀을때  로그인했을때 같은 번호일때만 보이기 */}
                  {modifyCommentNo === c.voteCommentNo ? (
                    <div className="comment-modifiy-box">
                      <div className="textarea-box">
                        <textarea
                          className="modifiy-text"
                          type="text"
                          value={modifyFbCommentContent}
                          onChange={(e) =>
                            setModifyFbCommentContent(e.target.value)
                          }
                        />
                      </div>
                      <div className="comment-modifiy-buttonbox">
                        <button
                          className="save-btn"
                          onClick={() => updateComment(c.voteCommentNo)}
                        >
                          저장
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => setModifyCommentNo(null)}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div>{nowDate(c.voteCommentDate)}</div>
                </div>
                <p className="comment-content">{c.voteCommentContent}</p>
                <div className="comment-actions">
                  <button
                    className="like-btn"
                    onClick={() => {
                      commentLike(c.voteCommentNo, c.likeCnt);
                    }}
                  >
                    👍 {c.likeCnt}
                  </button>

                  <button
                    className="report-btn"
                    onClick={() => {
                      commentReport(c.voteCommentNo);
                    }}
                  >
                    신고
                  </button>
                  {memberNo === c.memberNo && (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => voteCommentModify(c)}
                      >
                        수정
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          Swal.fire({
                            title: "삭제",
                            text: "댓글을 삭제하시겠습니까?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "확인",
                            cancelButtonText: "취소",
                          }).then((confirm) => {
                            if (confirm.isConfirmed) {
                              const voteCommentNo = c.voteCommentNo;
                              axios
                                .delete(
                                  `${backServer}/vote/comment/delete/${voteCommentNo}`
                                )
                                .then((res) => {
                                  if (res.data === 1) {
                                    Swal.fire({
                                      title: "댓글 삭제 완료",
                                      text: "댓글 삭제가 완료되었습니다.",
                                      icon: "success",
                                    });
                                    setRefreshToggle(!refreshToggle);
                                  }
                                })
                                .catch((err) => {
                                  navigate("/pageerror");
                                });
                            }
                          });
                        }}
                      >
                        삭제
                      </button>
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
