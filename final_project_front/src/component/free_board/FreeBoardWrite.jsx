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

const FreeBoardWrite = (props) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
  const menus = props.menus;
  const [freeBoard, setFreeBoard] = useState({
    freeBoardCategoryNo: freeBoardCategoryNo,
    freeBoardSubcategoryNo: freeBoardSubcategoryNo,
    freeBoardTitle: freeBoardTitle,
    memberNo: memberNo,
    freeBoardContent: freeBoardContent,
    freeBoardThumbnail: freeBoardThumbnail,
  });
  //게시글 작성 state

  const writeFreeBoard = () => {
    const formData = new FormData();
    formData.append("freeBoardCategoryNo", freeBoard.freeBoardCategoryNo);
    formData.append("freeBoardSubcategoryNo", freeBoard.freeBoardSubcategoryNo);
    formData.append("freeBoardTitle", freeBoard.freeBoardTitle);
    formData.append("memberNo", freeBoard.memberNo);
    formData.append("freeBoardContent", freeBoard.freeBoardContent);

    if (freeBoardThumbnail) {
      formData.append("freeBoardThumbnail", freeBoard.freeBoardThumbnail);
    }

    axios
      .post(`${backServer}/freeBoard/write`, formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
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
        console.log(err);
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
        console.log(err);
      });
  }, [cate]);
  const handleChange = (e) => {
    setCate(e.target.value);
  };
  const subHandleChange = (e) => {
    setSelectedSub(e.target.value);
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
                  console.log(sub);
                  console.log(sub.freeBoardCategoryNo);
                  console.log(sub.freeBoardSubcategoryNo);
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
            ></TextEditor>
          </div>
        </div>
      </div>
      <div className="submit-section">
        <div className="write-button">
          <button
            className="submit-btn"
            onClick={() => {
              writeFreeBoard();
            }}
          >
            작성하기
          </button>
        </div>
        <div className="cancel-button">
          <button className="cancel-btn">취소하기</button>
        </div>
      </div>
    </div>
  );
};

export default FreeBoardWrite;
