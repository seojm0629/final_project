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
  const menus = props.menus;

  useEffect(() => {
    if (cate) {
      clickSub();
    }
  }, [cate]);

  const clickSub = () => {
    axios
      .get(`${backServer}/freeBoard/boardWrite?freeBoardCategory=${cate}`)
      .then((res) => {
        console.log(res.data);
        //setSubCate(res.data.freeBoardSubcategory);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setCate(e.target.value);
  };
  const subHandleChange = (e) => {
    setSubCate(e.target.value);
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
                <ContentPasteOutlinedIcon></ContentPasteOutlinedIcon>
              </InputLabel>
              <Select
                sx={{ height: 40 }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={cate}
                label="cate"
                onChange={handleChange}
              >
                <MenuItem value="null">
                  <em>카테고리</em> {/*default = 카테고리*/}
                </MenuItem>
                {menus.map((m, i) => {
                  return (
                    <MenuItem
                      key={"m" + i}
                      value={m.freeBoardCategory}
                      onChange={() => {
                        clickSub();
                      }}
                    >
                      <em>{m.freeBoardCategory}</em>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                sx={{ height: 40 }}
                value={subCate}
                onChange={subHandleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>카테고리</em> {/*default = 카테고리*/}
                </MenuItem>

                {/*menus.map((m, i) => {
                  return m.freeBoardSubcategory.map((n, j) => {
                    console.log(n);
                    return (
                      j % 2 === 0 && (
                        <MenuItem key={"n" + j} value={n}>
                          <em>{n}</em>
                        </MenuItem>
                      )
                    );
                  });
                })*/}

                {/*menus
                  .filter((m) => {
                    m.freeBoardCategory === cate[0];
                  }) // 필터링하여 선택된 상위 카테고리에 맞는 하위 카테고리만 표시
                  .map((m, i) => {
                    console.log(m);
                    return m.freeBoardSubcategory.map((sub, j) => (
                      <MenuItem key={"sub" + j} value={sub}>
                        {sub}
                      </MenuItem>
                    ));
                  })*/}
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
