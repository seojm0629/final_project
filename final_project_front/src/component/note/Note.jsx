import BaseModal from "../utils/BaseModal";
import MarkAsUnreadOutlinedIcon from "@mui/icons-material/MarkAsUnreadOutlined";
import "./note.css";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isLoginState,
  loginIdState,
  memberTypeState,
} from "../utils/RecoilData";
import axios from "axios";
import Swal from "sweetalert2";

const Note = () => {
  const memberId = useRecoilValue(loginIdState); // 사용자 ID
  const memberType = useRecoilValue(memberTypeState); // 사용자 타입
  const [receiveListNote, setReceiveListNote] = useState([]); // 보낸 쪽지리스트
  const [sendListNote, setSendListNote] = useState([]); // 받은 쪽지리스트
  const [selectMenu, setSelectMenu] = useState("write"); //쓰기 스테이트 기본값
  const backServer = import.meta.env.VITE_BACK_SERVER; // 서버값 저장
  const [note, setNote] = useState({
    // 입력받을 아이디,내용 함수 생성
    noteId: "",
    noteContent: "",
  });
  const inputData = (e) => {
    //입력받은 아이디, 내용
    const name = e.target.name;
    const value = e.target.value;
    const newNote = { ...note, [name]: value };
    setNote(newNote);
    console.log(newNote);
  };

  const sendNote = () => {
    if (note.noteId === "") {
      Swal.fire({
        title: "전송실패!",
        text: "받는 사람 아이디를 입력해주세요.",
        icon: "warning",
      });
      return;
    }
    if (note.noteContent === "") {
      Swal.fire({
        title: "전송실패!",
        text: "쪽지 내용을 입력해주세요.",
        icon: "warning",
      });
      return;
    }
    const data = {
      sendId: memberId, // 로그인한 사용자 ID (보내는 사람)
      receiveId: note.noteId, // 입력된 받는 사람 ID
      noteContent: note.noteContent, // 입력된 쪽지 내용
    };
    axios
      .post(`${backServer}/note`, data)
      .then((res) => {
        const idCheck = res.data;

        if (idCheck === 0) {
          Swal.fire({
            title: "아이디를 확인하세요!",
            text: "자기 자신에게는 쪽지를 보낼 수 없습니다.",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "성공!",
            text: "쪽지를 보냈습니다.",
            icon: "error",
          });

          setNote({ noteId: "", noteContent: "" });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "전송 실패",
          text: "쪽지 전송 중 오류가 발생했습니다.",
          icon: "error",
        });
      });
  };

  const menuClick = (menu) => {
    setSelectMenu(menu); //클릭했을때 함수 변경용
    console.log("memberId in menuClick:", memberId);
    if (menu === "send") {
      //받은 메시지 리스트목록이라서 보낸사람아이디로 나오게
      axios
        .get(`${backServer}/note/received/${memberId}`)
        .then((res) => {
          console.log("서버 응답(res.data):", res.data);
          setReceiveListNote(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      {
      }
    }
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

  const result =
    selectMenu === "write" ? <div onClick={sendNote}>보내기</div> : "";
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
            <button onClick={() => menuClick("receive")}>보낸쪽지함</button>
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
                  name="noteId"
                  id="noteId"
                  value={note.noteId}
                  onChange={inputData}
                  className="nameinputbox"
                  placeholder="받는사람 아이디를 입력하세요"
                ></input>
              </div>
            </div>
            <div className="note-content">
              <textarea
                className="note-textarea "
                type="text-area"
                name="noteContent"
                id="noteContent"
                value={note.noteContent}
                onChange={inputData}
              ></textarea>
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
                <thead>
                  <tr className="send-tr">
                    <th style={{ width: "10%" }}>
                      <input type="checkbox" />
                    </th>
                    <th style={{ width: "15%" }}>보낸사람</th>
                    <th style={{ width: "60%" }}>내용</th>
                    <th style={{ width: "15%" }}>보낸 날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {receiveListNote.length === 0 ? (
                    <tr>
                      <td colSpan={"4"} style={{ textAlign: "center" }}>
                        받은 쪽지가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    receiveListNote.map((receive, i) => {
                      return (
                        <tr key={"receive-" + i}>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td>{receive.sendId}</td>
                          <td>{receive.noteContent}</td>
                          <td>{receive.noteDate}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {selectMenu === "receive" && (
          <div className="send-content-wrap">
            <div className="send-delbutton-wrap">
              <div className="send-delbutton">
                <button>삭제</button>
              </div>
            </div>
            <div className="send-content-box">
              <table className="send-tbl">
                <thead>
                  <tr className="send-tr">
                    <th style={{ width: "10%" }}>
                      <input type="checkbox" />
                    </th>
                    <th style={{ width: "15%" }}>받은사람</th>
                    <th style={{ width: "60%" }}>내용</th>
                    <th style={{ width: "15%" }}>받은 날짜</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="send-tr">
                    <th style={{ width: "10%" }}>
                      <input type="checkbox" />
                    </th>
                    <th style={{ width: "15%" }}></th>
                    <th style={{ width: "60%" }}></th>
                    <th style={{ width: "15%" }}></th>
                  </tr>
                </tbody>
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
