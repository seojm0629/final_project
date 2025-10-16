import BaseModal from "../utils/BaseModal";
import MarkAsUnreadOutlinedIcon from "@mui/icons-material/MarkAsUnreadOutlined";
import "./note.css";
import { useState } from "react";

const Note = () => {
  const [selectMenu, setSelectMenu] = useState("write"); //쓰기 스테이트
  const menuClick = (menu) => {
    setSelectMenu(menu);
    //클릭했을때 함수 변경용
    console.log(selectMenu);
  };

  const title = (
    <div className="note-title">
      {selectMenu === "write"
        ? "쪽지 작성"
        : selectMenu === "send"
        ? "받은쪽지함"
        : "보낸쪽지함"}
    </div>
  );
  const buttonLabel = (
    <MarkAsUnreadOutlinedIcon style={{ color: "white", fontSize: "30px" }} />
  );
  const contentBoxStyle = { width: "600px", height: "500px" };

  const result = selectMenu === "write" ? "보내기" : "" == { display: "none" };
  const end = "닫기";
  const content = (
    <div className="note-mainbox">
      <div className="note-menubox">
        <ul>
          <li>
            <button onClick={() => menuClick("write")}>쪽지작성</button>
          </li>
          <li>
            <button onClick={() => menuClick("send")}> 받은쪽지함</button>
          </li>
          <li>
            <button onClick={() => menuClick("recevie")}>보낸쪽지함</button>
          </li>
        </ul>
      </div>
      <div className="note-contentbox">
        {selectMenu === "write" && (
          <div className="note-content-wrap">
            <div className="name-box">
              <div className="nameid">받는사람</div>
              <div className="nameinput">
                <input
                  type="text"
                  className="nameinputbox"
                  placeholder="받는사람 아이디를 입력하세요"
                />
              </div>
            </div>
            <div className="note-content">
              <textarea className="note-textarea " type="text-area"></textarea>
            </div>
          </div>
        )}
        {selectMenu === "send" && (
          <div className="send-content-wrap">
            <div className="send-delbutton-wrap">
              <div className="send-delbutton">
                <button>삭제</button>
              </div>
            </div>
            <div className="send-content-box">
              <table className="send-tbl">
                <tr className="send-tr">
                  <th style={{ width: "10%" }}>
                    <input type="checkbox" />
                  </th>
                  <th style={{ width: "15%" }}>받은사람</th>
                  <th style={{ width: "60%" }}>내용</th>
                  <th style={{ width: "15%" }}>보낸 날짜</th>
                </tr>
                <tr>
                  <th style={{ width: "10%" }}>
                    <input type="checkbox" />
                  </th>
                  <th style={{ width: "15%" }}>받은사람</th>
                  <th style={{ width: "60%" }}>내용</th>
                  <th style={{ width: "15%" }}>보낸 날짜</th>
                </tr>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  return (
    <div>
      <BaseModal
        title={title}
        buttonLabel={buttonLabel}
        contentBoxStyle={contentBoxStyle}
        result={result}
        end={end}
        content={content}
      />
    </div>
  );
};

export default Note;
