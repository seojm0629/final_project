import PageNavigation from "../utils/PageNavigation";
import "./memberDetail.css";
const MemberDetail = (props) => {
  const reqPageInfo = props.reqPageInfo;
  const setReqPageInfo = props.setReqPageInfo;
  const totalListCount = props.totalListCount;
  const userDetailInfo = props.userDetailInfo;

  return (
    <div className="memberDetail">
      <div className={"detailLeft"}>
        <table key={"detail" + userDetailInfo.member.memberNo}>
          <tr>
            <th>회원 번호</th>
            <td>{userDetailInfo.member.memberNo}</td>
          </tr>
          <tr>
            <th>회원 등급</th>
            <td>{userDetailInfo.member.memberType}</td>
          </tr>
          <tr>
            <th>아이디</th>
            <td>{userDetailInfo.member.memberId}</td>
          </tr>
          <tr>
            <th>성별</th>
            <td>{userDetailInfo.member.memberGender}</td>
          </tr>
          <tr>
            <th>전화번호</th>
            <td>{userDetailInfo.member.memberPhone}</td>
          </tr>
          <tr>
            <th>나이</th>
            <td>{userDetailInfo.member.memberBirth}</td>
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
        </table>
      </div>
      <div className="detailRight">
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
