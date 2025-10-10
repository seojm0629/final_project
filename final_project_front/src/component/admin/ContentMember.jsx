import { useEffect, useState } from "react";
import "./contentMember.css";
import axios from "axios";
const ContentMember = () => {
  const [memberList, setMemberList] = useState([]);

  const [reqPageInfo, setReqPageInfo] = useState({
    order: 1, //어떤 정렬을 요청할건데??
    // 1: 아이디 오름차순
    // 2: 아이디 내림차순
    // 3: 회원가입일 오름차순
    // 4: 회원가입일 내림차순
    // 5: 회원 정지 오름차순
    // 6: 회원 정지 내림차
    pageNo: 1, //몇번째 페이지를 요청하는데?
    search: "", //어떤 검색어를 요청하는데??
    listCnt: 10, //한 페이지에 몇개 리스트를 보여줄건데?
  });

  const [totalListCount, setTotalListCount] = useState(0);

  useEffect(() => {
    console.log("pageInfo : ");
    console.log(reqPageInfo);
    axios
      .get(
        `${import.meta.env.VITE_BACK_SERVER}/admin/memberList?order=${
          reqPageInfo.order
        }&pageNo=${reqPageInfo.pageNo}&search=${reqPageInfo.search}&listCnt=${
          reqPageInfo.listCnt
        }`
      )
      .then((res) => {
        console.log(res.data.pageList);
        setMemberList(res.data.pageList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPageInfo]);

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
                <th>순서</th>
                <th>회원 번호</th> {/* MEMBER_TBL */}
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
              {memberList.length === 0 ? (
                <tr>
                  <td colSpan={12}>데이터가 없습니다.</td>
                </tr>
              ) : (
                memberList.map((m, i) => (
                  <tr key={"member" + m.memberNo}>
                    <td>{m.rnum}</td>
                    <td>{m.memberNo}</td>
                    <td>{m.memberId}</td>
                    <td>{m.memberEmail}</td>
                    <td>{m.totalClaimCnt}</td>
                    <td>{m.totalLikeCnt}</td>
                    <td>{m.totalPostCnt}</td>
                    <td>{m.totalCommentCnt}</td>
                    <td>{m.memberDate}</td>
                    <td>{m.isBen === "FALSE" ? "정상" : `${m.isBen}`}</td>
                    <td>돋보기</td>
                    <td>쪽지</td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={12}>
                  <div>
                    <button
                      onClick={() => {
                        setReqPageInfo(() => ({
                          ...reqPageInfo,
                          pageNo: reqPageInfo.pageNo - 1,
                        }));
                      }}
                    >
                      이전
                    </button>
                    <button
                      onClick={() => {
                        setReqPageInfo(() => ({
                          ...reqPageInfo,
                          pageNo: reqPageInfo.pageNo + 1,
                        }));
                      }}
                    >
                      다음
                    </button>
                  </div>
                </td>
                {/*
                
                */}
              </tr>
            </tfoot>
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
