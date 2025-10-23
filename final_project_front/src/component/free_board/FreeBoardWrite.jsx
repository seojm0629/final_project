import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { isLoginState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import TextEditor from "../utils/TextEditor";
import { useEffect, useState } from "react";
import axios from "axios";

const FreeBoardWrite = (props) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const setFreeBoardTitle = props.setFreeBoardTitle;
  const [memberId, setMemberId] = useRecoilState(isLoginState); // 로그인된 memberId, memberType
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const [freeBoardWriteTitle, setFreeBoardWriteTitle] = useState("");
  const [freeBoardContent, setFreeBoardContent] = useState("");
  const [cate, setCate] = useState(""); //받아올 상위 카테고리
  const [subCate, setSubCate] = useState([]); // 받아올 하위 카테고리
  const [selectedSub, setSelectedSub] = useState(""); //받아온 하위카테고리 value값으로 지정하여 출력하는 용도
  const menus = props.menus;

  useEffect(() => {
    axios
      .get(`${backServer}/freeBoard/boardWrite?freeBoardCategory=${cate}`)
      .then((res) => {
        setSubCate(res.data);
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
            <span>작성자</span>
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
              <InputLabel id="demo-simple-select-helper-label">SUB</InputLabel>
              {}
              <Select
                sx={{ height: 40 }}
                value={selectedSub}
                onChange={subHandleChange}
                label="subCate"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {subCate.map((sub, i) => {
                  console.log(subCate);
                  console.log(sub);
                  return (
                    <MenuItem key={"sub" + i} value={sub.freeBoardSubcategory}>
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
              value={freeBoardWriteTitle}
              placeholder="제목 입력"
              onChange={(e) => {
                setFreeBoardWriteTitle(e.target.value);
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
              setFreeBoardContent={setFreeBoardContent}
              freeBoardContent={freeBoardContent}
            ></TextEditor>
          </div>
        </div>
      </div>
      <div className="submit-section">
        <div className="write-button">
          <button className="submit-btn">작성하기</button>
        </div>
        <div className="cancel-button">
          <button className="cancel-btn">취소하기</button>
        </div>
      </div>
    </div>
  );
};

export default FreeBoardWrite;
