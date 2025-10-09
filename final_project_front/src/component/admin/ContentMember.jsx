import { useEffect, useState } from "react";
import "./contentMember.css";
import axios from "axios";
const ContentMember = () => {
  const [memberList, setMemberList] = useState([{}]);

  const [info, setInfo] = useState({
    order: 1,
    // 1: 아이디 오름차순
    // 2: 아이디 내림차순
    // 3: 회원가입일 오름차순
    // 4: 회원가입일 내림차순
    // 5: 회원 정지 오름차순
    // 6: 회원 정지 내림차
    reqPage: 1,
    search: "",
  });

  useEffect(() => {
    console.log("info : ");
    console.log(info);
    axios
      .get(
        `${import.meta.env.VITE_BACK_SERVER}/admin/memberList?order=${
          info.order
        }&reqPage=${info.reqPage}&search=${info.search}`
      )
      .then((res) => {
        console.log(res.data);
        setMemberList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [info]);

  return (
    <div>
      <div className="admin-content-wrap">
        <div className="content-head">
          <div className="title m">회원 관리 페이지</div>
          <div className="title s">실시간 회원 정보</div>
          <form className="search">
            <input placeholder="아이디/이메일 검색" />
            <button type="submit">검색</button>
          </form>
        </div>
        <div className="content-body">
          <table>
            <thead>
              <tr>
                <th>번호</th> {/* MEMBER_TBL */}
                <th>아이디</th> {/* MEMBER_TBL */}
                <th>이메일</th> {/* MEMBER_TBL */}
                <th>신고</th>{" "}
                {/* FB_CLAIM_TBL, FBC_CLAIM_TBL, TB_CLAIM_TBL, TBC_CLAIM_TBL */}
                <th>좋아요</th>{" "}
                {/* FB_LIKE_TBL, FBC_LIKE_TBL, TB_LIKE_TBL, TBC_LIKE_TBL */}
                <th>작성 게시글</th> {/* FREE_BOARD_TBL, TRADE_BOARD_TBL */}
                <th>작성 댓글</th> {/* FB_COMMENT_TBL, TB_COMMENT_TBL */}
                <th>회원가입일</th> {/* MEMBER_TBL */}
                <th>회원 정지</th> {/* MEMBER_BEN_TBL */}
                <th>상세 보기</th>
                <th>쪽지</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>USER01</td>
                <td>USER01@NAVER.COM</td>
                <td>500</td>
                <td>400</td>
                <td>200</td>
                <td>400</td>
                <td>2022-08-22</td>
                <td>정지</td>
                <td>돋보기</td>
                <td>쪽지</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="admin-content-wrap">
        <div className="content-head">
          <div className="title m">사용자 상세 정보</div>
          <div className="title s">유저명</div>
        </div>
      </div>
    </div>
  );
};

export default ContentMember;
