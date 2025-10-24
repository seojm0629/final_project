import ReactQuill, { Quill } from "react-quill";
import "./contentFreeBoard.css";
import { useEffect, useState } from "react";
import { memberNoState, loginIdState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";

import { FreeBoardSideMenuMap } from "../free_board/FreeBoardMain";
import axios from "axios";
import Swal from "sweetalert2";
import BaseModal from "../utils/BaseModal";

const ContentFreeBoard = () => {
  const [noticeValue, setNoticeValue] = useState("");
  const [refreshToggle, setRefreshToggle] = useState(true);
  console.log(noticeValue);

  const [memberNo, setMemberNo] = useRecoilState(memberNoState);
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  console.log(memberNoState);
  console.log(memberNo);
  console.log(memberId);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image", "blockquote", "code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
    "image",
    "blockquote",
    "code-block",
  ];

  const [categoryAddText, setCategoryAddText] = useState("");
  console.log(categoryAddText);
  const [subCategoryAddText, setSubCategoryAddText] = useState("");
  console.log(subCategoryAddText);

  const [insertCate, setInsertCate] = useState();
  const [deleteCate, setDeleteCate] = useState();

  console.log(insertCate);

  useEffect(() => {
    axios
      .post(
        `${import.meta.env.VITE_BACK_SERVER}/admin/insertFreeCate`,
        insertCate
      )
      .then((res) => {
        console.log(res.data);

        setRefreshToggle(!refreshToggle);
        Swal.fire({
          title: "알림",
          text: `카테고리 추가가 완료되었습니다.`,

          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [insertCate]);

  const [noticeSet, setNoticeSet] = useState();

  //console.log(noticeSet);

  const [noticeList, setNoticeList] = useState();
  const [delNoticeNo, setDelNoticeNo] = useState();
  const [noticeToggle, setNoticeToggle] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/admin/selectAllNotice`)
      .then((res) => {
        console.log(res.data);
        setNoticeList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [noticeToggle]);
  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACK_SERVER}/admin/insertNotice`, noticeSet)
      .then((res) => {
        console.log(res.data);
        setNoticeList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [noticeSet]);
  console.log(noticeList);

  useEffect(() => {
    axios
      .delete(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/admin/delNotice?noticeNo=${delNoticeNo}`
      )
      .then((res) => {
        console.log(res.data);
        setNoticeToggle(!noticeToggle);
        if (res.data === 1) {
          Swal.fire({
            title: "알림",
            text: "메인 카테고리 삭제가 완료되었습니다.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  useEffect(() => {
    if (deleteCate === undefined) {
      return;
    }

    //메인 카테고리에 입력된 값이 있고, 서브 카테고리에 입력된 값이 없으면
    if (categoryAddText && subCategoryAddText == "") {
      Swal.fire({
        title: "알림",
        text: "메인 카테고리에만 값을 입력하셨습니다. 하위 카테고리도 모두 삭제됩니다. 정말 삭제하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: "네",
        cancelButtonText: "아니요",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("하위까지 모두 삭제");
          //여기서 메인 카테고리 삭제 로직 돌려야함
          axios
            .delete(
              `${import.meta.env.VITE_BACK_SERVER}/admin/${
                deleteCate.categoryAddText
              }`
            )
            .then((res) => {
              console.log(res.data);
              if (res.data === 1) {
                setRefreshToggle(!refreshToggle);
                Swal.fire({
                  title: "알림",
                  text: "메인 카테고리 삭제가 완료되었습니다.",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    } else if (categoryAddText && subCategoryAddText) {
      //여기서 메인/서브 카테고리 삭제 로직 돌려야 함
      console.log("입력된 메인/서브 카테고리 값 삭제");
      //1. 입력된 값을 서버에 전송하고
      axios
        .delete(
          `${
            import.meta.env.VITE_BACK_SERVER
          }/admin/freeboard?delCate=${categoryAddText}&subCate=${subCategoryAddText}`
        )
        .then((res) => {
          console.log(res.data);
          if (res.data === 1) {
            setRefreshToggle(!refreshToggle);
            Swal.fire({
              title: "알림",
              text: "카테고리 삭제가 완료되었습니다.",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "알림",
            text: "값이 잘못 입력되었습니다. 다시 입력하세요",
          });
        });
    } else {
      Swal.fire({
        title: "알림",
        text: "값이 입력되지 않았습니다. 값을 입력하세요.",
        icon: "warning",
      });
    }
  }, [deleteCate]);

  return (
    <div className="admin-right freeBoard">
      <div className="admin-content-wrap">
        <div className="content">
          <div className="content_box">
            <div className="content_box_title">공지사항</div>
            <div className="editor-wrap">
              <ReactQuill
                theme="snow"
                value={noticeValue}
                onChange={setNoticeValue}
                modules={modules}
                formats={formats}
                placeholder="여기에 작성하세요"
              />
            </div>
            <div className="noticeBox">
              <button
                className="admin-btn"
                onClick={() => {
                  setNoticeSet({
                    memberNo: memberNo,
                    noticeContent: noticeValue,
                    noticeTarget: 1,
                  });
                }}
              >
                적용
              </button>
              <BaseModal
                title="공지사항"
                content={<NoticeContent noticeValue={noticeValue} />}
                buttonLabel="미리보기"
                contentBoxStyle={{ width: "800px", height: "600px" }}
                end="취소"
                result={confirm}
              />
            </div>
          </div>
          <div className="content_box">
            <div className="content_box_title">카테고리</div>
            <div className="cate-wrap">
              <div className="cate-left">
                <div className="section-title">미리보기</div>
                <div className="category-preview">
                  <FreeBoardSideMenuMap refreshToggle={refreshToggle} />
                </div>
              </div>
              <div className="cate-right">
                <div className="flexClass">
                  <div className="form-label">메인 카테고리</div>
                  <input
                    type="text"
                    value={categoryAddText}
                    onChange={(e) => {
                      setCategoryAddText(e.target.value);
                    }}
                  ></input>

                  <div className="form-label">서브 카테고리</div>
                  <input
                    type="text"
                    value={subCategoryAddText}
                    onChange={(e) => {
                      setSubCategoryAddText(e.target.value);
                    }}
                  ></input>
                  <div className="btnC">
                    <button
                      className="admin-btn"
                      onClick={() => {
                        setInsertCate({
                          categoryAddText: categoryAddText,
                          subCategoryAddText: subCategoryAddText,
                          memberNo: memberNo,
                        });
                      }}
                    >
                      등록
                    </button>
                    <button
                      className="admin-btn"
                      onClick={() => {
                        setDeleteCate({
                          categoryAddText: categoryAddText,
                          subCategoryAddText: subCategoryAddText,
                          memberNo: memberNo,
                        });
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-content-wrap">
        <div className="content-head">
          <div className="title m">공지사항</div>

          <div className="content-body">
            <table className="member-table freeBoard">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>내용</th>
                  <th>등록일</th>
                  <th>게시판</th>
                  <th>상태</th>
                  <th>회원 번호</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {noticeList &&
                  noticeList.map((notice, i) => {
                    return (
                      <tr>
                        <td>{notice.noticeNo}</td>
                        <td
                          dangerouslySetInnerHTML={{
                            __html: notice.noticeContent,
                          }}
                        ></td>
                        <td>{notice.noticeDate}</td>
                        <td>{notice.noticeTarget == 1 ? "자유" : "거래"}</td>
                        <td>
                          <select value={notice.noticeIsactive}>
                            <option>{notice.noticeIsactive}</option>
                          </select>
                        </td>
                        <td>{notice.memberNo}</td>
                        <td>
                          <button
                            className="admin-btn"
                            onClick={() => {
                              setDelNoticeNo(notice.noticeNo);
                            }}
                          >
                            삭제하기
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoticeContent = (props) => {
  const noticeValue = props.noticeValue;
  return <div dangerouslySetInnerHTML={{ __html: noticeValue }}></div>;
};

const confirm = (
  <div onClick={() => confirmData()} style={{ width: "100%", height: "100%" }}>
    확인
  </div>
);

export default ContentFreeBoard;
