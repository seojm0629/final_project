import BaseModal from "../utils/BaseModal";
import MarkAsUnreadOutlinedIcon from "@mui/icons-material/MarkAsUnreadOutlined";
import "./note.css";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isLoginState,
  loginIdState,
  memberTypeState,
} from "../utils/RecoilData";
import axios from "axios";
import Swal from "sweetalert2";
import dayjs from "dayjs"; // 진원이형이 다운받은 날짜js
import relativeTime from "dayjs/plugin/relativeTime"; // 상대 시간 확장불러오기
import "dayjs/locale/ko"; // 한국어 로케일 임포트하기
import { MenuList } from "@mui/material";
import { noteModalState } from "../utils/RecoilData";
import { useNavigate } from "react-router-dom";
dayjs.extend(relativeTime); // 상대 시간 플러그인 확장
dayjs.locale("ko"); // 한국어 로케일 설정

const Note = (props) => {
  const memberId = useRecoilValue(loginIdState); // 사용자 ID
  const memberType = useRecoilValue(memberTypeState); // 사용자 타입
  const [receiveListNote, setReceiveListNote] = useState([]); // 보낸 쪽지리스트
  const [sendListNote, setSendListNote] = useState([]); // 받은 쪽지리스트
  const [selectMenu, setSelectMenu] = useState("write"); //쓰기 스테이트 기본값
  const backServer = import.meta.env.VITE_BACK_SERVER; // 서버값 저장
  const [selectedContent, setSelectedContent] = useState(null); // 선택한 내용
  const [detailcontent, setDetailContent] = useState(false); // 내용의 상세보기
  const [selectNoteNos, setSelectNoteNos] = useState([]); // 삭제할 선택된 노트번호들 배열
  const [noteModal, setNoteModal] = useRecoilState(noteModalState);
  const [radioCheck, setRadioCheck] = useState("");
  const navigate = useNavigate();

  // 기존 모달 열기 부분 대신 아래로 수정
  useEffect(() => {
    if (noteModal.isOpen) {
      setNote((prev) => ({ ...prev, noteReceiverId: noteModal.targetId }));
    }
  }, [noteModal]);

  const closeModal = () => {
    setNoteModal({ isOpen: false, targetId: "" });
  };

  //개별 체크박스 선택하기
  const selectCheck = (noteNo) => {
    setSelectNoteNos((checkSelect) => {
      const newList = checkSelect.includes(noteNo) //배열안에 특정값 있는지 확인용
        ? checkSelect.filter((id) => id !== noteNo)
        : [...checkSelect, noteNo];

      return newList;
    });
  };

  //전체선택 체크박스 선택하기
  const allCheck = (list, checked) => {
    if (checked) {
      const allIds = list.map((note) => note.noteNo);
      setSelectNoteNos(allIds);
    } else {
      setSelectNoteNos([]);
    }
  };

  //삭제 버튼 클릭 시 axios 요청하기
  const deleteNotes = () => {
    //삭제 실행햇을때 불러오는 값들이 0이 아니고 1이므로 반대로 값을 줘야함
    const deleteType = selectMenu === "send" ? "receive" : "send";

    if (selectNoteNos.length === 0) {
      Swal.fire({
        title: "선택된 쪽지가 없습니다.",
        text: "삭제할 쪽지를 선택하세요.",
        icon: "warning",
      });
    } else {
      axios
        .patch(
          `${backServer}/note/update?deleteType=${deleteType}`,
          selectNoteNos
        )
        .then((res) => {
          if (res)
            Swal.fire({
              title: "삭제 완료",
              text: "쪽지가 삭제되었습니다.",
              icon: "success",
            });
          //메뉴값 다시 불러오기
          menuClick(selectMenu);
          // 선택 초기화하기
          setSelectNoteNos([]);
        })
        .catch((err) => {
          Swal.fire({
            title: "삭제 실패",
            text: "쪽지 삭제 중 오류가 발생했습니다.",
            icon: "error",
          });
          navigate("/pageerror");
        });
    }
  };
  const nowDate = (dateString) => {
    const now = dayjs(); //현재 날짜/시간 가져오는 함수
    const target = dayjs(dateString); // 날짜를 dayjs 형식으로 변환하기
    const diffDays = now.diff(target, "day"); // 현재날짜와 지난날짜와 비교
    // 보낸날짜가 17일이면 오늘이 19일 그럼 2일전 표시이렇게 자동으로 계산

    if (diffDays >= 7) {
      return target.format("YYYY-MM-DD"); // 7일 이상이면 날짜로 변형
    }
    return target.fromNow(); //한국어로 ?? 시간전 표시하기
  };

  const [note, setNote] = useState({
    // 입력받을 아이디,내용 함수 생성
    noteId: props ? props.noteId : "",
    noteContent: "",
  });
  const inputData = (e) => {
    //입력받은 아이디, 내용
    const name = e.target.name;
    const value = e.target.value;
    const newNote = { ...note, [name]: value };
    setNote(newNote);
  };

  const sendNote = () => {
    //보내기 버튼 누를때 작동
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
            icon: "success",
          });
          setNote({ noteId: "", noteContent: "" });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "전송 실패",
          text: "상대방의 아이디를 찾을 수 없습니다.",
          icon: "error",
        });
        navigate("/pageerror");
      });
  };

  const menuClick = (menu) => {
    //메뉴 클릭할때
    setSelectMenu(menu); //클릭했을때 함수 변경용
    setDetailContent(false);
    setSelectedContent(null);

    if (menu === "send") {
      //받은 메시지 리스트목록이라서 보낸사람아이디로 나오게
      axios
        .get(`${backServer}/note/received/${memberId}`)
        .then((res) => {
          setReceiveListNote(res.data);
        })
        .catch((err) => {
          navigate("/pageerror");
        });
    }
    if (menu === "receive") {
      // 보낸쪽지함
      axios
        .get(`${backServer}/note/send/${memberId}`)
        .then((res) => {
          setSendListNote(res.data);
        })
        .catch((err) => {
          navigate("/pageerror");
        });
    }
  };

  const title = (
    <div className="note-title">
      {detailcontent
        ? "쪽지 상세보기"
        : selectMenu === "write"
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
        {/*---------------받은쪽지함-----------------*/}
        {selectMenu === "send" && !detailcontent && (
          <div className="send-content-wrap">
            <div className="send-delbutton-wrap">
              <div className="send-delbutton">
                <button onClick={deleteNotes}>삭제</button>
              </div>
            </div>
            <div className="send-content-box">
              <table className="send-tbl">
                <thead>
                  <tr className="send-tr">
                    <th style={{ width: "10%" }}>
                      <input // 전체선택한거
                        type="checkbox"
                        onChange={(e) =>
                          allCheck(receiveListNote, e.target.checked)
                        }
                        checked={
                          receiveListNote.length > 0 &&
                          selectNoteNos.length === receiveListNote.length
                        }
                      ></input>
                    </th>
                    <th style={{ width: "15%" }}>보낸사람</th>
                    <th style={{ width: "55%" }}>내용</th>
                    <th style={{ width: "20%" }}>보낸 날짜</th>
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
                            <input //개별선택한거 가져오기
                              type="checkbox"
                              onChange={() => selectCheck(receive.noteNo)}
                              checked={selectNoteNos.includes(receive.noteNo)}
                            ></input>
                          </td>
                          <td>{receive.sendId}</td>
                          <td
                            onClick={() => {
                              if (receive.noteContentRead === 0) {
                                axios
                                  .patch(
                                    `${backServer}/note/content?noteNo=${receive.noteNo}`
                                  )
                                  .then((res) => {})
                                  .catch((err) => {
                                    navigate("/pageerror");
                                  });
                              }
                              setSelectedContent(receive);
                              setDetailContent(true);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {receive.noteContent}
                          </td>
                          <td>{nowDate(receive.noteDate)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/*---------------보낸쪽지함-----------------*/}
        {selectMenu === "receive" && !detailcontent && (
          <div className="send-content-wrap">
            <div className="send-delbutton-wrap">
              <div className="send-delbutton">
                <button onClick={deleteNotes}>삭제</button>
              </div>
            </div>
            <div className="send-content-box">
              <table className="send-tbl">
                <thead>
                  <tr className="send-tr">
                    <th style={{ width: "10%" }}>
                      <input // 전체선택한거
                        type="checkbox"
                        onChange={(e) =>
                          allCheck(sendListNote, e.target.checked)
                        }
                        checked={
                          sendListNote.length > 0 &&
                          selectNoteNos.length === sendListNote.length
                        }
                      ></input>
                    </th>
                    <th style={{ width: "15%" }}>받은사람</th>
                    <th style={{ width: "55%" }}>내용</th>
                    <th style={{ width: "20%" }}>받은 날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {sendListNote.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        보낸 쪽지가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    sendListNote.map((send, i) => (
                      <tr key={i}>
                        <td>
                          <input //개별선택한거 가져오기
                            type="checkbox"
                            onChange={() => selectCheck(send.noteNo)}
                            checked={selectNoteNos.includes(send.noteNo)}
                          ></input>
                        </td>
                        <td>{send.receiveId}</td>
                        <td
                          onClick={() => {
                            setSelectedContent(send);
                            setDetailContent(true);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {send.noteContent}
                        </td>
                        <td>{nowDate(send.noteDate)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/*--------------상세보기 창만드는곳--------------*/}
        <div className="detail-header">
          {selectMenu === "send" ? "받은쪽지함" : "보낸쪽지함"}
        </div>
        {detailcontent && selectedContent && (
          <div className="detail-box">
            <div className="detail-info">
              {selectMenu === "send" && (
                <div>
                  <b>보낸사람:</b> {selectedContent.sendId}
                </div>
              )}
              {selectMenu === "receive" && (
                <div>
                  <b>받은사람:</b> {selectedContent.receiveId}
                </div>
              )}
              <div>
                <b>보낸날짜:</b> {selectedContent.noteDate}
              </div>
            </div>
            <div className="detail-content-box">
              {selectedContent.noteContent}
            </div>
            <div className="detail-buttons detail">
              {selectMenu === "send" && (
                <button
                  onClick={() => {
                    setNote({
                      ...note,
                      noteId: selectedContent.sendId, // 보낸 사람 아이디 자동 복사
                      noteContent: "", // 내용비우기
                    });
                    setDetailContent(false); // 상세보기 닫기
                    setSelectedContent(null);
                    setSelectMenu("write"); // 작성 모드로 이동하기
                  }}
                >
                  답장하기
                </button>
              )}
              <button
                onClick={() => {
                  setDetailContent(false);
                  setSelectedContent(null);
                }}
              >
                돌아가기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  return (
    <div>
      <BaseModal
        open={noteModal.isOpen}
        close={closeModal}
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
