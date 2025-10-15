import BaseModal from "../utils/BaseModal";

const Test = () => {
  return (
    <div>
      <BaseModal
        title={"제목입력하는곳"}
        buttonLabel={"모달열기버튼"}
        contentBoxStyle={{ width: "1000px", height: "600px" }}
        result={"확인버"}
        end={"닫기버튼이름"}
        content={
          <div>
            여기는 내용자리
            <p>아래 정보를 입력하세요.</p>
            <input type="text" placeholder="이름" />
            <br />
            <input type="email" placeholder="이메일" />
            <br />
            <button>버튼</button>
          </div>
        }
      />
    </div>
  );
};

export default Test;
