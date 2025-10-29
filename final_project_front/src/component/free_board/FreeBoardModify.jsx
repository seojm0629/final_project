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
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const FreeBoardModify = (props) => {
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

  const navigate = useNavigate();
  const menus = props.menus;
  const param = useParams();
  const freeBoardNo = param.freeBoardNo; //상세페이지에서 파라미터로 보냄

  //수정할 데이터 저장 후 MenuItem에 넣을  default 값
  const [freeBoardSubcategory, setFreeBoardSubcategory] = useState();
  const [freeBoardCategory, setFreeBoardCategory] = useState();
  const modifyFreeBoard = () => {
    if (freeBoardCategory === undefined || freeBoardSubcategory === undefined) {
      alert("카테고리 선택해주세요.");
      return;
    } else if (freeBoardTitle === null) {
      alert("제목을 입력해주세요.");
      return;
    } else if (freeBoardContent === null) {
      alert("내용을 입력해주세요.");
      return;
    }
    const formData = new FormData();
    formData.append("freeBoardCategoryNo", freeBoardCategoryNo);
    formData.append("freeBoardSubcategoryNo", freeBoardSubcategoryNo);
    formData.append("freeBoardTitle", freeBoardTitle);
    formData.append("memberNo", memberNo);
    formData.append("freeBoardContent", freeBoardContent);
    console.log(formData);
    if (freeBoardThumbnail !== null) {
      formData.append("freeBoardThumbnail", freeBoardThumbnail);
    }
    axios
      .patch(`${backServer}/freeBoard/modify/fix`, formData, {
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
        console.log(err);
      });
  };

  useEffect(() => {
    {
      freeBoardCategory &&
        axios
          .get(
            `${backServer}/freeBoard/boardWrite?freeBoardCategory=${freeBoardCategory}`
          )
          .then((res) => {
            setSubCate(res.data);
            //freeBoard State에 들어갈 상위 카테고리 NO
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }, [freeBoardCategory]);
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

  const handleChange = (e) => {
    setCate(e.target.value);
    setFreeBoardCategory(e.target.value);
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
          setFreeBoardCategoryNo(undefined);
          setFreeBoardSubcategoryNo(undefined);
          setFreeBoardThumbnail(null);
        }
        navigate("/freeBoard/content");
      }
    });
  };
  useEffect(() => {
    axios
      .get(`${backServer}/freeBoard/modify?freeBoardNo=${freeBoardNo}`)
      .then((res1) => {
        setFreeBoardTitle(res1.data.freeBoardTitle);
        setFreeBoardContent(res1.data.freeBoardContent);

        axios
          .get(
            `${backServer}/freeBoard/modify/cate?freeBoardSubcategoryNo=${res1.data.freeBoardSubcategoryNo}&freeBoardCategoryNo=${res1.data.freeBoardCategoryNo}`
          )
          .then((res2) => {
            setFreeBoardCategory(res2.data.freeBoardCategory);
            setFreeBoardSubcategory(res2.data.freeBoardSubcategory);

            console.log(res2.data.freeBoardCategory);
            console.log(res2.data.freeBoardSubcategory);
          })
          .catch((err2) => {
            console.log(err2);
          });
      })
      .catch((err1) => {
        console.log(err1);
      });
  }, [freeBoardCategory, freeBoardSubcategory]);
  console.log("freeBoardCategory : " + freeBoardCategory);
  console.log("freeBoardSubcategory : " + freeBoardSubcategory);
  console.log("subCate : " + subCate);
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
                카테고리
              </InputLabel>
              {freeBoardCategory && (
                <Select
                  sx={{ height: 40 }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={freeBoardCategory}
                  label="cate"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>카테</em> {/*default = 카테고리*/}
                  </MenuItem>
                  {menus.map((m, i) => {
                    return (
                      <MenuItem key={"m" + i} value={m.freeBoardCategory}>
                        <em>{m.freeBoardCategory}</em>
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                서브카테고리
              </InputLabel>
              {freeBoardCategory && freeBoardSubcategory && (
                <Select
                  sx={{ height: 40 }}
                  value={freeBoardSubcategory}
                  onChange={subHandleChange}
                  label="subCate"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disabled={!freeBoardCategory}
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
              )}
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
          <button className="submit-btn" onClick={modifyFreeBoard}>
            수정하기
          </button>
        </div>
        <div className="cancel-button">
          <button className="cancel-btn" onClick={cancelWrite}>
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreeBoardModify;
