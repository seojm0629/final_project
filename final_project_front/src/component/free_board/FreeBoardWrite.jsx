const FreeBoardWrite = () => {
  return (
    <div className="write-wrap">
      <div className="nickname section-area">
        <div className="text-area">
          <span>닉네임</span>
          <div className="nickname-text">
            <span>작성자</span>
          </div>
        </div>
      </div>
      <div className="category-select section-area">
        <div className="category-area">
          <span>카테고리</span>
          {/*카테고리 개수만큼 처리*/}
          <div className="category-text">
            <div>
              <input type="radio" />
              <span>test1</span>
            </div>
            <div>
              <input type="radio" />
              <span>test2</span>
            </div>
            <div>
              <input type="radio" />
              <span>test3</span>
            </div>
            <div>
              <input type="radio" />
              <span>test4</span>
            </div>
          </div>
        </div>
      </div>
      <div className="write-title section-area">
        <div className="title-area">
          <span>제 목</span>
          <div className="title-text">
            <span>글제목</span>
          </div>
        </div>
      </div>
      <div className="content-write">
        <div className="content-area">
          <span>내 용</span>
          <div className="content-text">
            <textarea name="" id="">
              sdasd
            </textarea>
          </div>
        </div>
      </div>
      <div className="submit-section">
        <div className="write-button">
          <button className="submit-btn">작성하기</button>
        </div>
        <div className="cancel-button">
          <button className="cancel-btn">취소하기</button>
        </div>
      </div>
    </div>
  );
};

export default FreeBoardWrite;
