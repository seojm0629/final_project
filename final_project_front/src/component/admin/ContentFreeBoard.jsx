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
  const insertCate = {
    categoryAddText: categoryAddText,
    subCategoryAddText: subCategoryAddText,
    memberNo: memberNo,
  };

  console.log(insertCate);

  const [toggle, setToggle] = useState(false);
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
  }, [toggle]);

  const [noticeSet, setNoticeSet] = useState();

  console.log(noticeSet);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACK_SERVER}/admin/insertNotice`, noticeSet)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [noticeSet]);
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
                <div>
                  <div className="form-label">메인 카테고리</div>
                  <input
                    type="text"
                    value={categoryAddText}
                    onChange={(e) => {
                      setCategoryAddText(e.target.value);
                    }}
                  ></input>
                </div>
                <div>
                  <div className="form-label">서브 카테고리</div>
                  <input
                    type="text"
                    value={subCategoryAddText}
                    onChange={(e) => {
                      setSubCategoryAddText(e.target.value);
                    }}
                  ></input>
                  <button
                    className="admin-btn"
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  >
                    등록
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-content-wrap">
        <div className="content-head">
          <div className="title m">공지사항</div>
          <div className="content_box">공지사항 리스트 들어갈 자리</div>

          <table>
            <thead>
              <tr>
                <td>번호</td>
                <td>내용</td>
                <td>등록일</td>
                <td>상태</td>
                <td>등록자</td>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
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
