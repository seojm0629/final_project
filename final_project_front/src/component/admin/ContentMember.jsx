import "./contentMember.css";
const ContentMember = () => {
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
                <th>번호</th>
                <th>아이디</th>
                <th>이메일</th>
                <th>신고</th>
                <th>좋아요</th>
                <th>작성 게시글</th>
                <th>작성 댓글</th>
                <th>회원가입일</th>
                <th>회원 정지</th>
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
