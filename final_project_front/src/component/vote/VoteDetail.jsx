import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginIdState, memberNoState } from "../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";
import "./voteDetail.css";
import Swal from "sweetalert2";
import { Bar } from "react-chartjs-2";
const VoteDetail = () => {
  const params = useParams(); //주소값에서 불러오는 파람값
  const voteNo = params.voteNo;
  const [memberNo, setMemberNo] = useRecoilState(memberNoState); // 로그인된 memberNo
  const [member, setMember] = useRecoilState(loginIdState); // 로그인된 memberId,
  const navigate = useNavigate();
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const [selectedOption, setSelectedOption] = useState(null); // 레디오 선택한값 담기
  const [vote, setVote] = useState(null); // 기본정보 담을 스테이트
  const [voteList, setVoteList] = useState([]); //항목 리스트 담을 스테이트
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  //차트 안에 들어갈 data (찾아보면 더 있음)
  const data = {
    labels: voteList.map((item) => item.voteContent), // 투표안한 항목 다보이게 표시
    datasets: [
      {
        label: "투표수",
        data: values,
        backgroundColor: "rgba(5, 20, 160, 0.5)",
        borderWidth: 1,
      },
    ],
  };
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
  }, []);
  //리스트 항목 가져오는 엑시오스
  const [refreshToggle, setRefreshToggle] = useState(false);
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
        const a = res.data.map((item, index) => {
          return item.voteContent;
        });
        const b = res.data.map((item, index) => {
          return item.voteOptionCount;
        });

        console.log(a);
        console.log(b);

        setLabels(a);
        setValues(b);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshToggle]);

  const optionChange = (e) => {
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
    if (!selectedOption) {
      Swal.fire({
        title: "투표 실패",
        text: "항목을 골라주세요 (1개)",
        icon: "error",
      });
      return;
    }
    const resultData = {
      voteNo: vote.voteNo,
      memberNo: memberNo,
      voteOptionNo: selectedOption,
    };

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
  return (
    <div className="vote-detail-wrap">
      <div className="vote-detail-title">
        <h3>투표 상세보기</h3>
      </div>

      {vote && vote.memberNo === memberNo && (
        <div className="vote-detail-buttonBox">
          <button onClick={voteEndDate}>투표종료</button>
          <button onClick={voteDelete}>삭제하기</button>
        </div>
      )}

      {vote &&
        vote.voteCheck === 0 && ( // 홈페이지가 표시될때 기본값이 비어있어서 오류가 나기에 조건 걸기 값이 있을떼 표시하기
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
                      value={list.voteOptionNo}
                      className="vote-radio"
                      onChange={optionChange}
                    ></input>
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
        )}
      <div className="vote-result-graph">
        <Bar
          data={data}
          options={{
            scales: {
              y: {
                beginAtZero: true, // Y축 0부터 시작
                ticks: {
                  // 옆 틱 값
                  stepSize: 1, // 눈금 표시
                  autoSkip: false,
                  maxRotation: 0,
                  minRotation: 0,
                  callback: function (value) {
                    // 실행값
                    return value;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default VoteDetail;
