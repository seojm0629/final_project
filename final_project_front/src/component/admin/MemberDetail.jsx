import PageNavigation from "../utils/PageNavigation";
import "./memberDetail.css";
const MemberDetail = (props) => {
  const reqPageInfo = props.reqPageInfo;
  const setReqPageInfo = props.setReqPageInfo;
  const totalListCount = props.totalListCount;
  return (
    <div className="memberDetail">
      <div className="detailLeft"></div>
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
