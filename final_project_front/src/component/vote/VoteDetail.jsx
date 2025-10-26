import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginIdState, memberNoState } from "../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";
import "./voteDetail.css";
import Swal from "sweetalert2";
const VoteDetail = () => {
  const params = useParams(); //주소값에서 불러오는 파람값
  const voteNo = params.voteNo;
  const [memberNo, setMemberNo] = useRecoilState(memberNoState); // 로그인된 memberNo
  const navigate = useNavigate();
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const [selectedOption, setSelectedOption] = useState(null); // 레디오 선택한값 담기
  const [vote, setVote] = useState(null); // 기본정보 담을 스테이트
  const [voteList, setVoteList] = useState([]); //항목 리스트 담을 스테이트

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

  console.log(voteList);

  const optionChange = (e) => {
    //라디오 버튼클릭시 선택한 옵션을 저장하기
    setSelectedOption(e.target.value);
  };
  console.log(selectedOption);

  //투표하기 버튼 눌렀을때
  const voteResult = () => {
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
      })
      .catch((err) => {
        Swal.fire({
          title: "투표 실패",
          text: "이미 투표에 참여하셨습니다.",
          icon: "error",
        });
      });
  };

  return (
    <div className="vote-detail-wrap">
      <div className="vote-detail-title">
        <h3>투표 상세보기</h3>
      </div>
      {vote && ( // 홈페이지가 표시될때 기본값이 비어있어서 오류가 나기에 조건 걸기 값이 있을떼 표시하기
        <div className="vote-detail-list">
          <div className="vote-detail-list-title">{vote.voteTitle}</div>
          <ul className="vote-detail-ul">
            {voteList.map((list, i) => {
              return (
                <li className="vote-detail-content" key={"list" + i}>
                  <input
                    type="radio"
                    name="voteOption"
                    value={list.voteOptionNo}
                    className="vote-radio"
                    onChange={optionChange}
                  ></input>
                  <label className="vote-label">{list.voteContent}</label>
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
    </div>
  );
};

export default VoteDetail;
