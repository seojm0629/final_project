import PageNavigation from "../utils/PageNavigation";
import "./memberDetail.css";
import Button from "@mui/material/Button";
const MemberDetail = (props) => {
  console.log("주고난 후");
  console.log(props);
  const reqPageInfo = props.reqPageInfo;
  const setReqPageInfo = props.setReqPageInfo;
  const userDetailInfo = props.userDetailInfo;
  const date = new Date();
  const utcYear = date.getUTCFullYear();
  const totalListCount = props.totalListCount;
  const userDetailBoard = props.userDetailBoard;

  const detailLoading = props.detailLoading;

  //const test = userDetailInfo.member.memberBirth;
  //const test2 = toString(test);
  //const date2 = date.getDate();
  //const day = date.getDay();
  //const year = date.getFullYear();
  //const time = date.getTime();
  //const utcDate = date.getUTCDate();
  //const timeZoneOffset = date.getTimezoneOffset();

  //console.log("타입");
  //console.log(test2);
  //console.log(date);
  //console.log(date2);
  //console.log(day);
  //console.log(year);
  //console.log(time);
  //console.log(utcDate);
  //console.log(timeZoneOffset);
  //console.log(utcYear);

  //console.log(test.substring(0, 4));

  console.log(userDetailBoard);
  return (
    <div className="memberDetail">
      <div className={"detailLeft"}>
        <table key={"detail" + userDetailInfo.member.memberNo}>
          <tbody>
            <tr>
              <th>회원 번호</th>
              <td>{userDetailInfo.member.memberNo}</td>
            </tr>
            <tr>
              <th>회원 등급</th>
              <td>
                {userDetailInfo.member.memberType === 1 ? "관리자" : "일반"}
              </td>
            </tr>
            <tr>
              <th>회원 닉네임</th>
              <td>{userDetailInfo.member.memberNickname}</td>
            </tr>
            <tr>
              <th>아이디</th>
              <td>{userDetailInfo.member.memberId}</td>
            </tr>
            <tr>
              <th>성별</th>
              <td>
                {userDetailInfo.member.memberGender === 1 ||
                userDetailInfo.member.memberGender === 3
                  ? "남자"
                  : "여자"}
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>{userDetailInfo.member.memberPhone}</td>
            </tr>
            <tr>
              <th>나이</th>
              <td>
                {utcYear -
                  Number(userDetailInfo.member.memberBirth.substring(0, 4))}
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>{userDetailInfo.member.memberEmail}</td>
            </tr>
            <tr>
              <th>신고 횟수</th>
              <td>{userDetailInfo.member.totalClaimCnt}</td>
            </tr>
            <tr>
              <th>좋아요 수</th>
              <td>{userDetailInfo.member.totalLikeCnt}</td>
            </tr>
            <tr>
              <th>회원가입일</th>
              <td>{userDetailInfo.member.memberDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="detailRight content-body">
        <table>
          <thead>
            <tr>
              <th>대분류</th>
              <th>소분류</th>
              <th>닉네임</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {detailLoading ? (
              <tr>
                <td colSpan={5}>
                  <div className="loadingMsg">
                    <Button
                      fullWidth
                      loading
                      loadingPosition="start"
                      variant="outlined"
                      className="loadingBtn"
                    >
                      로딩중입니다. 잠시만 기다려주세요!
                    </Button>
                  </div>
                </td>
              </tr>
            ) : userDetailBoard.length === 0 ? (
              <tr>
                <td colSpan={5}>작성 이력이 없습니다.</td>
              </tr>
            ) : (
              userDetailBoard.map((b, i) => (
                <tr key={`${b.categoryMain}-${b.categorySub}-${i}`}>
                  <td>{b.categoryMain}</td>
                  <td>{b.categorySub}</td>
                  <td>{b.memberNickname}</td>
                  <td>{b.boardTitle}</td>
                  <td>{b.boardDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <PageNavigation
          reqPageInfo={reqPageInfo}
          setReqPageInfo={setReqPageInfo}
          totalListCount={totalListCount}
        ></PageNavigation>
      </div>
    </div>
  );
};

export default MemberDetail;
