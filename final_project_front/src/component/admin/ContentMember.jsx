import { useEffect, useState } from "react";
import "./contentMember.css";
import axios from "axios";
const ContentMember = () => {
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■ 여기서부터 ■■■■■■■■■■■■
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
  //■■■■■■■■■■■■ 이까지는 ■■■■■■■■■■■■
  // Client -> Back 으로 전달하고 응답받을 값
  // memberList : Back -> Client
  // reqPageInfo : Client -> Back
  // totalListCount : Back -> Client
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■ 여기서부터 ■■■■■■■■■■■■
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
        console.log(res.data.totalListCount);
        setMemberList(res.data.pageList);
        setTotalListCount(res.data.totalListCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPageInfo]);
  //■■■■■■■■■■■■ 이까지는 ■■■■■■■■■■■■
  // Back 호출하고 리턴 받기
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■ 여기서부터 ■■■■■■■■■■■■
  //마지막 페이지 계산 : 단, totalListCount가 1보다 작으면 반드시 1로 저장
  const lastPage =
    Math.ceil(totalListCount / reqPageInfo.listCnt) < 1
      ? 1
      : Math.ceil(totalListCount / reqPageInfo.listCnt);
  //양쪽에 버튼을 몇개씩 둘건지?
  const sideBtnCount = 3;

  //시작 버튼과 끝 버튼 계산
  let startPage = reqPageInfo.pageNo - sideBtnCount;
  let endPage = reqPageInfo.pageNo + sideBtnCount;

  //만약 startPage 가 1보다 작고, endPage 가 lastPage 보다 크면
  if (startPage < 1) {
    //1페이지를 요청했어 -> -3이면 -2가 startPage
    //페이지는 총 7개가 떠야하니까 오른쪽에 6개가 들어가야함
    //이 때, endPage는 4일거임
    // [1] 2 3 4 5 6 7

    // 그럼 sideBtnCount 가 5인 경우는?
    // 1페이지를 요청 -> -5를 하면 -4가 startPage
    //페이지는 총 11개가 떠야하니까 오른쪽에 10개가 들어가야함
    // 이 때, endPage는 6일거임
    // [1] 2 3 4 5 6 7 8 9 10 11

    // 그럼 sideBtncount 가 3인데 2페이지를 요청한 경우는?
    // 2페이지를 요청 -> -3을 하면 -1이 startPage
    // 페이지는 총 7개가 떠야하니까 오른쪽에 5개가 들어가야함
    // 이 때 , endPage는 5일거임
    // 1 [2] 3 4 5 6 7
    //결론 : endPage-startPage + 1
    endPage = endPage - startPage + 1;
    startPage = 1;
    //보정 했는데 endPage가 lastPage보다 커버리면 추가 보정
  }
  if (endPage > lastPage) {
    startPage = startPage - (endPage - lastPage);
    endPage = lastPage;
    if (startPage < 1) {
      startPage = 1;
    }
  }

  const pages = [];
  for (let p = startPage; p <= endPage; p++) {
    pages.push(p);
  }
  //■■■■■■■■■■■■ 이까지는 ■■■■■■■■■■■■
  // 페이지 버튼 계산 (별도의 컴포넌트로 빼야함)
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  return (
    <div>
      <div className="admin-content-wrap">
        <div className="content-head">
          <div className="title m">회원 관리 페이지</div>
          <div className="title s">
            실시간 회원 정보 (전체 회원 수 : {totalListCount})
          </div>
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
                    {reqPageInfo.pageNo !== 1 && (
                      <button
                        onClick={() => {
                          setReqPageInfo({ ...reqPageInfo, pageNo: 1 });
                        }}
                      >
                        처음으로
                      </button>
                    )}
                    {reqPageInfo.pageNo !== 1 && (
                      <button
                        onClick={() => {
                          setReqPageInfo({
                            ...reqPageInfo,
                            pageNo: reqPageInfo.pageNo - 1,
                          });
                        }}
                      >
                        이전
                      </button>
                    )}

                    {pages.map((p, i) => (
                      <button
                        key={p}
                        className={p === reqPageInfo.pageNo ? "active" : ""}
                        onClick={() => {
                          setReqPageInfo({ ...reqPageInfo, pageNo: p });
                        }}
                      >
                        {p}
                      </button>
                    ))}
                    {reqPageInfo.pageNo !== lastPage && (
                      <button
                        onClick={() => {
                          setReqPageInfo({
                            ...reqPageInfo,
                            pageNo: reqPageInfo.pageNo + 1,
                          });
                        }}
                      >
                        다음
                      </button>
                    )}
                    {reqPageInfo.pageNo !== lastPage && (
                      <button
                        onClick={() => {
                          setReqPageInfo({ ...reqPageInfo, pageNo: lastPage });
                        }}
                      >
                        끝으로
                      </button>
                    )}
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
