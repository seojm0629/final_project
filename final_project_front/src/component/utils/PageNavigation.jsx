import "./pageNavigation.css";
const PageNavigation = (props) => {
  const reqPageInfo = props.reqPageInfo;
  const setReqPageInfo = props.setReqPageInfo;
  const totalListCount = props.totalListCount;

  /*
 *  const [reqPageInfo, setReqPageInfo] = useState({
     pageNo: 1, //몇번째 페이지를 요청하는데? (페이징에서 씀)
     listCnt: 10, //한 페이지에 몇개 리스트를 보여줄건데? (페이징에서 씀)
   });
 
   const [totalListCount, setTotalListCount] = useState(0); 
 */

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
    <div className="page-nav">
      <div className="left">
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
      </div>
      <div className="center">
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
      </div>
      <div className="right">
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
    </div>
  );
};
export default PageNavigation;
