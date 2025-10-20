import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { isLoginState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import TextEditor from "../utils/TextEditor";
import { useState } from "react";

const FreeBoardWrite = (props) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const setFreeBoardTitle = props.setFreeBoardTitle;
  const [memberId, setMemberId] = useRecoilState(isLoginState); // 로그인된 memberId, memberType
  const [freeBoardWriteTitle, setFreeBoardWriteTitle] = useState("");
  const [freeBoardContent, setFreeBoardContent] = useState("");
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
            <div>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 20 },
                  }}
                  label="test1" //카테고리 name
                ></FormControlLabel>
              </FormGroup>
            </div>
            <div>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                  label="test2" //카테고리 name
                ></FormControlLabel>
              </FormGroup>
            </div>
            <div>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                  label="test3" //카테고리 name
                ></FormControlLabel>
              </FormGroup>
            </div>
            <div>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                  label="test4" //카테고리 name
                ></FormControlLabel>
              </FormGroup>
            </div>
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
