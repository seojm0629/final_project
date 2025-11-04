import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { loginIdState, memberNoState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import TextEditor from "../utils/TextEditor";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FreeBoardWrite = (props) => {
  //const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [memberId, setMemberId] = useRecoilState(loginIdState); // 로그인된 memberId, memberType
  const [memberNo, setMemberNo] = useRecoilState(memberNoState);
  const [memberNickname, setMemberNickname] = useState(""); //작성자 닉네임
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const [freeBoardTitle, setFreeBoardTitle] = useState("");
  const [freeBoardContent, setFreeBoardContent] = useState("");
  const [cate, setCate] = useState(""); //받아올 상위 카테고리
  const [subCate, setSubCate] = useState([]); // 받아올 하위 카테고리
  const [selectedSub, setSelectedSub] = useState(""); //받아온 하위카테고리 value값으로 지정하여 출력하는 용도
  const [freeBoardCategoryNo, setFreeBoardCategoryNo] = useState();
  const [freeBoardSubcategoryNo, setFreeBoardSubcategoryNo] = useState();
  const [freeBoardThumbnail, setFreeBoardThumbnail] = useState(null);
  //const [freeBoardPhoto, setFreeBoardPhoto] = useState([]);
  const navigate = useNavigate();
  const menus = props.menus;
  /*
  const [freeBoard, setFreeBoard] = useState({
    freeBoardCategoryNo: freeBoardCategoryNo,
    freeBoardSubcategoryNo: freeBoardSubcategoryNo,
    freeBoardTitle: freeBoardTitle,
    memberNo: memberNo,
    freeBoardContent: freeBoardContent,
    freeBoardThumbnail: freeBoardThumbnail,
  });
  //게시글 작성 state
  */
  const writeFreeBoard = () => {
    if (
      freeBoardCategoryNo === undefined ||
      freeBoardSubcategoryNo === undefined
    ) {
      Swal.fire({
        title: "카테고리",
        text: "카테고리 선택해주세요.",
        icon: "warning",
      });
      return;
    } else if (freeBoardTitle === "" || freeBoardTitle === " ") {
      Swal.fire({
        title: "제목 입력",
        text: "제목을 입력해주세요.",
        icon: "warning",
      });
      return;
    } else if (freeBoardContent === "" || freeBoardContent === " ") {
      Swal.fire({
        title: "내용 입력",
        text: "내용을 입력해주세요.",
        icon: "warning",
      });
      return;
    }
    const formData = new FormData();
    formData.append("freeBoardCategoryNo", freeBoardCategoryNo);
    formData.append("freeBoardSubcategoryNo", freeBoardSubcategoryNo);
    formData.append("freeBoardTitle", freeBoardTitle);
    formData.append("memberNo", memberNo);
    formData.append("freeBoardContent", freeBoardContent);

    if (freeBoardThumbnail !== null) {
      formData.append("freeBoardThumbnail", freeBoardThumbnail);
    }
    axios
      .post(`${backServer}/freeBoard/boardWrite`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data === 1) {
          navigate("/freeBoard/content");
        }
      })
      .catch((err) => {
        navigate("/pageerror");
      });
  };
  useEffect(() => {
    //회원 아이디 조회 후 회원 닉네임 get
    axios
      .get(`${backServer}/member/${memberId}`)
      .then((res) => {
        setMemberNickname(res.data.memberNickname);
        setMemberNo(res.data.memberNo);
      })
      .catch((err) => {
        navigate("/pageerror");
      });
  }, [memberId]);
  useEffect(() => {
    axios
      .get(`${backServer}/freeBoard/boardWrite?freeBoardCategory=${cate}`)
      .then((res) => {
        setSubCate(res.data);
        //freeBoard State에 들어갈 상위 카테고리 NO
      })
      .catch((err) => {
        navigate("/pageerror");
      });
  }, [cate]);
  const handleChange = (e) => {
    setCate(e.target.value);
  };
  const subHandleChange = (e) => {
    const selected = subCate.find(
      (sub) => sub.freeBoardSubcategory === e.target.value
    );

    setSelectedSub(e.target.value);

    if (selected) {
      setFreeBoardCategoryNo(selected.freeBoardCategoryNo);
      setFreeBoardSubcategoryNo(selected.freeBoardSubcategoryNo);
    }
  };
  const cancelWrite = () => {
    Swal.fire({
      title: "취소",
      text: "취소하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((confirm) => {
      if (confirm.isConfirmed) {
        if (
          freeBoardTitle !== "" ||
          freeBoardContent !== "" ||
          freeBoardCategoryNo !== undefined ||
          freeBoardSubcategoryNo !== undefined ||
          freeBoardThumbnail !== null
        ) {
          setFreeBoardTitle("");
          setFreeBoardContent("");
          setFreeBoardCategoryNo();
          setFreeBoardSubcategoryNo();
          setFreeBoardThumbnail(null);
        }
        navigate("/freeBoard/content");
      }
    });
  };
  return (
    <div className="write-wrap">
      <div className="nickname section-area">
        <div className="text-area">
          <div>
            <DriveFileRenameOutlineOutlinedIcon></DriveFileRenameOutlineOutlinedIcon>
            <span>닉네임</span>
          </div>
          <div className="nickname-text">
            <span>{memberNickname}</span>
          </div>
        </div>
      </div>
      <div className="category-select section-area">
        <div className="category-area">
          <div>
            <CategoryOutlinedIcon></CategoryOutlinedIcon>
            <span>카테고리</span>
          </div>
          {/*카테고리 개수만큼 처리*/}
          <div className="category-text">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Catogory
              </InputLabel>
              <Select
                sx={{ height: 40 }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={cate}
                label="cate"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>카테고리</em> {/*default = 카테고리*/}
                </MenuItem>
                {menus.map((m, i) => {
                  return (
                    <MenuItem key={"m" + i} value={m.freeBoardCategory}>
                      <em>{m.freeBoardCategory}</em>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Sub</InputLabel>
              <Select
                sx={{ height: 40 }}
                value={selectedSub}
                onChange={subHandleChange}
                label="subCate"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {subCate.map((sub, i) => {
                  return (
                    <MenuItem
                      key={"sub" + i}
                      value={sub.freeBoardSubcategory}
                      onChange={() => {
                        setFreeBoardCategoryNo(sub.freeBoardCategoryNo);
                        setFreeBoardSubcategoryNo(sub.freeBoardSubcategoryNo);
                      }}
                    >
                      <em>{sub.freeBoardSubcategory}</em>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="write-title section-area">
        <div className="title-area">
          <div>
            <SubtitlesOutlinedIcon></SubtitlesOutlinedIcon>
            <span>제 목</span>
          </div>
          <div className="title-text">
            <input
              type="text"
              id="freeBoardTitle"
              name="freeBoardTitle"
              value={freeBoardTitle}
              placeholder="제목 입력"
              onChange={(e) => {
                setFreeBoardTitle(e.target.value);
              }}
            ></input>
          </div>
        </div>
      </div>
      <div className="content-write">
        <div>
          <ContentPasteOutlinedIcon></ContentPasteOutlinedIcon>
          <span>내 용</span>
        </div>
        <div className="content-area">
          <div className="content-editor">
            <TextEditor
              setData={setFreeBoardContent}
              data={freeBoardContent}
              setFreeBoardThumbnail={setFreeBoardThumbnail}
            ></TextEditor>
          </div>
        </div>
      </div>
      <div className="submit-section">
        <div className="write-button">
          <button className="submit-btn" onClick={writeFreeBoard}>
            작성하기
          </button>
        </div>
        <div className="cancel-button">
          <button className="cancel-btn" onClick={cancelWrite}>
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreeBoardWrite;
