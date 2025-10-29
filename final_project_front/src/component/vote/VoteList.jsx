import { useEffect, useState } from "react";
import "./voteList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageNavigation from "../utils/PageNavigation";
import { useRecoilState } from "recoil";
import { loginIdState, memberNoState } from "../utils/RecoilData";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 로케일 임포트하기
import relativeTime from "dayjs/plugin/relativeTime"; // 상대 시간 확장불러오기
dayjs.extend(relativeTime); // 상대 시간 플러그인 확장
dayjs.locale("ko"); // 한국어 로케일 설정
import FiberNewIcon from "@mui/icons-material/FiberNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const VoteList = () => {
  const [order, setOrder] = useState(3); // 정렬  0 -- 종료  1 -- 진행중
  const [member, setMember] = useRecoilState(loginIdState); // 로그인된 memberId, memberType
  const [memberNo, setMemberNo] = useRecoilState(memberNoState); // 로그인된 memberNo
  const [voteAlready, setVoteAlready] = useState(false); // 멤버가 투표한 게시글 확인값 0 / 1
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const navigate = useNavigate();

  // 필수: 페이지 정보 (프론트에서 바로 세팅)
  const [reqPageInfo, setReqPageInfo] = useState({
    sideBtnCount: 3, // 현재 페이지 양옆에 몇 개의 버튼을 보여줄지
    pageNo: 1, // 현재 페이지
    listCnt: 15, // 한 페이지에 보여줄 개수
  });
  // 필수: 전체 개수 (서버한테 받아 세팅)
  const [totalListCount, setTotalListCount] = useState(10);
  const [voteList, setVoteList] = useState([]); //리스트 값들 생성
  const [pi, setPi] = useState(null); // 기본값 세팅

  const nowDate = (dateString) => {
    const now = dayjs(); //현재 날짜/시간 가져오는 함수
    const target = dayjs(dateString); // 날짜를 dayjs 형식으로 변환하기
    const diffDays = now.diff(target, "day"); // 현재날짜와 지난날짜와 비교
    // 보낸날짜가 17일이면 오늘이 19일 그럼 2일전 표시이렇게 자동으로 계산
  };

  const todayDate = dayjs().$y + "-" + (dayjs().$M + 1) + "-" + dayjs().$D; //날짜 형변환

  useEffect(() => {
    axios
      .get(
        `${backServer}/vote?pageNo=${reqPageInfo.pageNo}&listCnt=${reqPageInfo.listCnt}&sideBtnCount=${reqPageInfo.sideBtnCount}&order=${order}&memberNo=${memberNo}`
      )
      .then((res) => {
        console.log(res.data);
        setTotalListCount(res.data.totalListCount); //받아오는 총 게시물 수
        setVoteList(res.data.selectVoteList); // 받아오는 게시물 수를 배열에 저장
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPageInfo, order]);

  return (
    <div className="vote-main-wrap">
      <div className="vote-name-box">
        <h1>투표게시판</h1>
      </div>
      <div>
        <div className="vote-write-box">
          {member === "" ? (
            <button
              onClick={() => {
                navigate("/member/login");
              }}
            >
              로그인
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/vote/voteInsert");
              }}
            >
              글작성
            </button>
          )}
          <input
            type="radio"
            name="order"
            id="end"
            value="1"
            checked={order === "1"}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
          />
          <label htmlFor="end">종료</label>
          <input
            type="radio"
            name="order"
            id="progress"
            value="0"
            checked={order === "0"}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
          />
          <label htmlFor="progress">진행중</label>
        </div>
      </div>
      <div className="vote-tbl-box">
        <table className="vote-tbl">
          <thead>
            <tr className="vote-tr">
              <th style={{ width: "10%" }}>작성자</th>
              <th
                style={{
                  width: "37%",
                }}
              >
                제목
              </th>
              <th style={{ width: "5%" }}></th>
              <th style={{ width: "7%" }}>투표여부</th>
              <th style={{ width: "10%" }}>투표상황</th>
              <th style={{ width: "15%" }}>시작날짜</th>
              <th style={{ width: "15%" }}>종료날짜</th>
            </tr>
          </thead>
          <tbody className="vote-tbody">
            {voteList.length === 0 ? (
              <tr>
                <td colSpan={"4"} style={{ textAlign: "center" }}>
                  게시물이 없습니다.
                </td>
              </tr>
            ) : (
              voteList.map((list, i) => {
                return (
                  <tr key={"list-" + i}>
                    <td>{list.memberNickname}</td>
                    <td
                      className="td-title"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (!member) {
                          // 로그인되지 않은 경우, 투표 상세 페이지로 가지 않음
                          Swal.fire({
                            title: "로그인",
                            text: "로그인 후 투표를 확인할 수 있습니다.",
                            icon: "warning",
                          }).then(() => {
                            navigate("/member/login"); // 로그인 페이지로 이동
                          });
                        } else {
                          // 로그인된 경우 투표 상세 페이지로 이동
                          navigate(`/vote/VoteDetail/${list.voteNo}`);
                        }
                      }}
                    >
                      {list.voteTitle}
                    </td>
                    {todayDate ===
                    dayjs(list.voteDate).$y +
                      "-" +
                      (dayjs(list.voteDate).$M + 1) +
                      "-" +
                      dayjs(list.voteDate).$D ? (
                      <td className="new-icon">
                        <FiberNewIcon></FiberNewIcon>
                      </td>
                    ) : (
                      <td></td>
                    )}
                    {list.voteOk === 1 ? (
                      <td className="check-icon">
                        <CheckCircleIcon />
                      </td>
                    ) : (
                      <td></td>
                    )}
                    <td>{list.voteCheck === 0 ? "진행중" : "종료"}</td>
                    <td className="td-votedate">{list.voteDate}</td>
                    <td className="td-voteEnddate">{list.voteEndDate}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="voteList-paging-wrap">
        {voteList.length != 0 && (
          <PageNavigation
            reqPageInfo={reqPageInfo}
            setReqPageInfo={setReqPageInfo}
            totalListCount={totalListCount}
          />
        )}
      </div>
    </div>
  );
};

export default VoteList;
