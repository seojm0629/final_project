import { useEffect, useState } from "react";
import "./contentMember.css";
import axios from "axios";
import PageNavigation from "../utils/PageNavigation";
import { TableSortLabel } from "@mui/material";
const ContentMember = () => {
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■ 여기서부터 ■■■■■■■■■■■■
  const [memberList, setMemberList] = useState([]);

  const [reqPageInfo, setReqPageInfo] = useState({
    order: 1, //어떤 정렬을 요청할건데??
    // 1: 회원 번호 오름차순
    // 2: 회원 번호 내림차순
    // 3: 신고 받은 수 오름차순
    // 4: 신고 받은 수 내림차순
    // 5: 좋아요 받은 수 오름차순
    // 6: 좋아요 받은 수 내림차순
    // 7: 작성 게시글 수 오름차순
    // 8: 작성 게시글 수 내림차순
    // 9 : 작성 댓글 수 오름차순
    // 10 : 작성 댓글 수 내림차순
    // 11: 회원 정지 오름차순
    // 12: 회원 정지 내림차순
    pageNo: 1, //몇번째 페이지를 요청하는데?

    listCnt: 15, //한 페이지에 몇개 리스트를 보여줄건데?
    searchType: "no",
    searchText: "",
  });
  const [searchType, setSearchType] = useState("no");
  const [searchText, setSearchText] = useState("");
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
        }&pageNo=${reqPageInfo.pageNo}&searchText=${
          reqPageInfo.searchText
        }&searchType=${reqPageInfo.searchType}&listCnt=${reqPageInfo.listCnt}`
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

  const searchPlaceholder = {
    no: "회원 번호로 검색",
    id: "아이디로 검색",
    email: "이메일로 검색",
  };

  const inputData = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const search = () => {
    setReqPageInfo({
      ...reqPageInfo,
      searchType: searchType,
      searchText: searchText,
      pageNo: 1,
    });
  };
  return (
    <div>
      <div className="admin-content-wrap">
        <div className="content-head">
          <div className="title m">회원 관리 페이지</div>
          <div className="title s">
            실시간 회원 정보 (전체 회원 수 : {totalListCount})
          </div>

          <form className="search">
            <div></div>
            <div className="search-box">
              <div className="search-type">
                <input
                  type="radio"
                  name="searchType"
                  id="no"
                  value="no"
                  checked={searchType === "no"}
                  onChange={(e) => {
                    const type = e.target.value;
                    console.log(type);
                    setSearchType(type);
                  }}
                />
                <label htmlFor="no">회원 번호</label>

                <input
                  type="radio"
                  name="searchType"
                  id="id"
                  value="id"
                  checked={searchType === "id"}
                  onChange={(e) => {
                    const type = e.target.value;
                    console.log(type);
                    setSearchType(type);
                  }}
                />
                <label htmlFor="id">아이디</label>

                <input
                  type="radio"
                  name="searchType"
                  id="email"
                  value="email"
                  checked={searchType === "email"}
                  onChange={(e) => {
                    const type = e.target.value;
                    console.log(type);
                    setSearchType(type);
                  }}
                />
                <label htmlFor="email">이메일</label>
              </div>
              <div className="search-text">
                <input
                  placeholder={searchPlaceholder[searchType]}
                  type="text"
                  name="searchText"
                  value={searchText}
                  onChange={inputData}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchText !== "") {
                      e.preventDefault();
                      search();
                    }
                  }}
                />
                <button type="button" onClick={search}>
                  검색
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="content-body">
          <table>
            <thead>
              <tr>
                <th>행</th>
                <th>
                  <TableSortLabel active="true" direction="desc">
                    회원 번호
                  </TableSortLabel>
                </th>{" "}
                {/* MEMBER_TBL */}
                <th>아이디</th>
                {/*" https://mui.com/material-ui/api/table-sort-label/"*/}
                {/* MEMBER_TBL */}
                <th>이메일</th> {/* MEMBER_TBL */}
                <th>
                  <TableSortLabel active="true" direction="desc">
                    신고 받은 수
                  </TableSortLabel>
                </th>
                {/* FB_CLAIM_TBL, FBC_CLAIM_TBL, TB_CLAIM_TBL, TBC_CLAIM_TBL */}
                <th>
                  <TableSortLabel active="true" direction="desc">
                    좋아요 받은 수
                  </TableSortLabel>
                </th>
                {/* FB_LIKE_TBL, FBC_LIKE_TBL, TB_LIKE_TBL, TBC_LIKE_TBL */}
                <th>
                  <TableSortLabel active="true" direction="desc">
                    작성 게시글 수
                  </TableSortLabel>
                </th>{" "}
                {/* FREE_BOARD_TBL, TRADE_BOARD_TBL */}
                <th>
                  <TableSortLabel active="true" direction="desc">
                    작성 댓글 수
                  </TableSortLabel>
                </th>{" "}
                {/* FB_COMMENT_TBL, TB_COMMENT_TBL */}
                <th>회원가입일</th> {/* MEMBER_TBL */}
                <th>
                  <TableSortLabel active="true" direction="desc">
                    회원 정지
                  </TableSortLabel>
                </th>{" "}
                {/* MEMBER_BEN_TBL */}
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
                  <PageNavigation
                    reqPageInfo={reqPageInfo}
                    setReqPageInfo={setReqPageInfo}
                    totalListCount={totalListCount}
                  />
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
