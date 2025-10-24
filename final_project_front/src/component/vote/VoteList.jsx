import { useEffect, useState } from "react";
import "./voteList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageNavigation from "../utils/PageNavigation";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import Swal from "sweetalert2";
const VoteList = () => {
  const [member, setMember] = useRecoilState(loginIdState); // 로그인된 memberId, memberType
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

  useEffect(() => {
    axios
      .get(
        `${backServer}/vote?pageNo=${reqPageInfo.pageNo}&listCnt=${reqPageInfo.listCnt}&sideBtnCount=${reqPageInfo.sideBtnCount}`
      )
      .then((res) => {
        console.log(res);
        setTotalListCount(res.data.totalListCount); //받아오는 총 게시물 수
        setVoteList(res.data.selectVoteList); // 받아오는 게시물 수를 배열에 저장
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPageInfo]);
  console.log(voteList);
  console.log(totalListCount);
  return (
    <div className="vote-main-wrap">
      <div className="vote-name-box">
        <h1>투표게시판</h1>
      </div>
      <div>
        <div className="vote-write-box">
          <button
            onClick={() => {
              {
                member === ""
                  ? Swal.fire({
                      title: "로그인",
                      text: "로그인 후 이용해주세요",
                      icon: "warning",
                    }).then(() => {
                      navigate("/member/login");
                    })
                  : navigate("/vote/voteInsert");
              }
            }}
          >
            글작성
          </button>
        </div>
      </div>
      <div className="vote-tbl-box">
        <table className="vote-tbl">
          <thead>
            <tr className="vote-tr">
              <th style={{ width: "10%" }}>작성자</th>
              <th
                style={{
                  width: "65%",
                }}
              >
                제목
              </th>
              <th style={{ width: "10%" }}>투표상황</th>
              <th style={{ width: "15%" }}>작성날짜</th>
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
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/vote/VoteDetail/${list.voteNo}`)
                      }
                    >
                      {list.voteTitle}
                    </td>
                    <td>{list.voteCheck === 0 ? "진행중" : "종료"}</td>
                    <td>{list.voteDate}</td>
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
