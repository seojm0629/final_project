import ReactQuill, { Quill } from "react-quill";
import "./contentFreeBoard.css";
import { useState } from "react";
import { memberNoState, loginIdState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import FreeBoardSideMenu from "../utils/FreeBoardSideMenu";

const ContentFreeBoard = () => {
  const [value, setValue] = useState("");
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
  return (
    <div>
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
            <div className="noticeBox search-text">
              <button>적용</button>
              <button>미리보기</button>
              <button>초기화</button>
            </div>
          </div>
          <div className="content_box">
            <div className="content_box_title">카테고리</div>
            <div className="categoryBox">양식이 들어갈 자리</div>
            <div>
              <FreeBoardSideMenu></FreeBoardSideMenu>
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
