const SearchBar = (props) => {
  const searchType = props.searchType;
  const setSearchType = props.setSearchType;
  const searchText = props.searchText;
  const searchPlaceholder = props.searchPlaceholder;
  const inputData = props.inputData;
  const search = props.search;
  const reset = props.reset;

  /*
   * 
    const [searchType, setSearchType] = useState("no");
    const [searchText, setSearchText] = useState("");
  
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
      if (searchText == "") {
        Swal.fire({
          title: "알림",
          text: `${searchPlaceholder[searchType]}어를 입력하세요!`,
          icon: "warning",
        });
      } else {
        setReqPageInfo({
          ...reqPageInfo,
          searchType: searchType,
          searchText: searchText,
          pageNo: 1,
        });
      }
    };
    const reset = () => {
      setSearchText("");
      setSearchType("no");
      const resetData = {
        order: 2, //어떤 정렬을 요청할건데??
  
        pageNo: 1, //몇번째 페이지를 요청하는데?
  
        listCnt: 15, //한 페이지에 몇개 리스트를 보여줄건데?
        searchType: "no",
        searchText: "",
      };
  
      setReqPageInfo(resetData);
    };
   */
  return (
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
              if (e.key === "Enter") {
                e.preventDefault();
                search();
              }
            }}
          />
          <button type="button" onClick={search}>
            검색
          </button>
          <button type="button" onClick={reset}>
            초기화
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
