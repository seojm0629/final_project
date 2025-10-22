import ReactQuill, { Quill } from "react-quill";
import "./contentFreeBoard.css";
import { useEffect, useState } from "react";
import { memberNoState, loginIdState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";

import { FreeBoardSideMenuMap } from "../free_board/FreeBoardMain";
import axios from "axios";

const ContentFreeBoard = () => {
  const [value, setValue] = useState("");
  const [refreshToggle, setRefreshToggle] = useState(true);
  console.log(value);

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

  const insertCate = { categoryAddText: categoryAddText, memberNo: memberNo };

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

  return (
    <div className="admin-right">
      <div className="admin-content-wrap">
        <div className="content">
          <div className="content_box">
            <div className="content_box_title">공지사항</div>
            <div>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
                placeholder="여기에 작성하세요"
              />
            </div>
            <div className="noticeBox">
              <button className="admin-btn">적용</button>
              <button className="admin-btn">미리보기</button>
              <button className="admin-btn">초기화</button>
            </div>
          </div>
          <div className="content_box">
            <div className="content_box_title">카테고리</div>
            <div>
              <div>미리보기</div>
              <div>
                <FreeBoardSideMenuMap refreshToggle={refreshToggle} />
              </div>
            </div>
            <div>
              <div>메인 카테고리</div>
              <input
                type="text"
                value={categoryAddText}
                onChange={(e) => {
                  setCategoryAddText(e.target.value);
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
            <div>
              <div>서브 카테고리</div>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-content-wrap">
        <div className="content-head">
          <div className="title m">공지사항</div>
          <div className="content_box">공지사항 리스트 들어갈 자리</div>
        </div>
      </div>
    </div>
  );
};

export default ContentFreeBoard;
