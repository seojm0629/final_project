import React, { useEffect, useState } from "react";
import "./contentMember.css";
import axios from "axios";
import PageNavigation from "../utils/PageNavigation";
import { TableSortLabel, Typography } from "@mui/material";
import Swal from "sweetalert2";
import SearchBar from "../utils/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import MemberDetail from "./MemberDetail";
import Button from "@mui/material/Button";
import BaseModal from "../utils/BaseModal";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
  MultiSectionDigitalClock,
  TimeField,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import * as XLSX from "xlsx";

const ContentMember = () => {
  const [memberList, setMemberList] = useState([]);
  const handleDownload = () => {
    const listToXlsx = XLSX.utils.json_to_sheet(memberList); //Json 을 엑셀의 시트로 변환해주는 친구
    const wb = XLSX.utils.book_new(); //워크북 객체를 생성하고 그 워크북에 방금 생성한 워크 시트를 묶어주는 친구
    XLSX.utils.book_append_sheet(wb, listToXlsx, "Sheet1"); //새로운 파일로 저장하는 부분
    XLSX.writeFile(wb, "memberList.xlsx");
  };
  const [reqPageInfo, setReqPageInfo] = useState({
    order: 2, //어떤 정렬을 요청할건데??
    // 1: 회원 번호 오름차순
    // 2: 회원 번호 내림차순
    // 3: 신고 받은 수 오름차순
    // 4: 신고 받은 수 내림차순
    // 5: 좋아요 받은 수 오름차순
    // 6: 좋아요 받은 수 내림차순
    // 7: 작성 게시글 수 오름차순
    // 8: 작성 게시글 수 내림차순
    // 9 : 작성 댓글 수 오름차순
    // 10 : 작성 댓글 수 내림차순
    // 11: 회원 정지 오름차순
    // 12: 회원 정지 내림차순
    pageNo: 1, //몇번째 페이지를 요청하는데?
    sideBtnCount: 3,
    listCnt: 15, //한 페이지에 몇개 리스트를 보여줄건데?
    searchType: "no",
    searchText: "",
  });

  const [reqDetailPageInfo, setReqDetailPageInfo] = useState({
    sideBtnCount: 2, // 현재 페이지 양옆에 버튼을 몇개 둘껀데?
    pageNo: 1, //몇번째 페이지를 요청하는데? (페이징에서 씀)
    listCnt: 10, //한 페이지에 몇개 리스트를 보여줄건데? (페이징에서 씀)
  });

  const [totalListCount, setTotalListCount] = useState(0);

  const [memberLoading, setMemberLoading] = useState(false); // 회원 리스트 로딩
  const [detailLoading, setDetailLoading] = useState(false);
  const [updateMemberType, setUpdateMemberType] = useState();
  const [detailTotalCount, setDetailTotalCount] = useState(0);
  //■■■■■■■■■■■■ 이까지는 ■■■■■■■■■■■■
  // Client -> Back 으로 전달하고 응답받을 값
  // memberList : Back -> Client
  // reqPageInfo : Client -> Back
  // totalListCount : Back -> Client
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

  useEffect(() => {
    //console.log("updateMemberType");
    //console.log("리스트 가져오기 시작");
    setMemberLoading(true);
    //console.log(updateMemberType !== undefined);
    updateMemberType !== undefined &&
      axios
        .patch(
          `${import.meta.env.VITE_BACK_SERVER}/admin/memberTypeUpdate`,
          updateMemberType
        )
        .then((res) => {
          axios
            .get(
              `${import.meta.env.VITE_BACK_SERVER}/admin/memberList?order=${
                reqPageInfo.order
              }&pageNo=${reqPageInfo.pageNo}&searchText=${
                reqPageInfo.searchText
              }&searchType=${reqPageInfo.searchType}&listCnt=${
                reqPageInfo.listCnt
              }`
            )
            .then((res) => {
              //console.log(res.data.pageList);
              //console.log(res.data.totalListCount);
              //console.log("확인");
              //console.log(userDetailInfo);
              //console.log(userDetailInfo.length);
              setMemberList(res.data.pageList);
              setTotalListCount(res.data.totalListCount);
            })
            .catch((err) => {
              console.log(err);
            });
          if (res.data === 1) {
            Swal.fire({
              title: "알림",
              text: `등급 변경이 완료되었습니다.`,

              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                //console.log("리스트 가져오기 끝");
                setMemberLoading(false);
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "경고",
            text: `등급 변경 실패되었습니다.`,

            icon: "error",
          });
        });
  }, [updateMemberType]);

  const [reqListToggle, setReqListToggle] = useState(false);
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  //■■■■■■■■■■■■ 여기서부터 ■■■■■■■■■■■■
  useEffect(() => {
    //console.log("pageInfo : ");
    //console.log(reqPageInfo);
    console.log("리스트 가져오기 시작");
    setMemberLoading(true);

    axios
      .get(
        `${import.meta.env.VITE_BACK_SERVER}/admin/memberList?order=${
          reqPageInfo.order
        }&pageNo=${reqPageInfo.pageNo}&searchText=${
          reqPageInfo.searchText
        }&searchType=${reqPageInfo.searchType}&listCnt=${reqPageInfo.listCnt}`
      )
      .then((res) => {
        //console.log(res.data.pageList);
        //console.log(res.data.totalListCount);
        //console.log("확인");
        //console.log(userDetailInfo);
        //console.log(userDetailInfo.length);
        setMemberList(res.data.pageList);
        setTotalListCount(res.data.totalListCount);
        console.log("리스트 가져오기 끝");
        setMemberLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPageInfo, reqListToggle]);
  //■■■■■■■■■■■■ 이까지는 ■■■■■■■■■■■■
  // Back 호출하고 리턴 받기
  //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  const [searchType, setSearchType] = useState("no");
  const [searchText, setSearchText] = useState("");

  const searchPlaceholder = {
    no: "회원 번호로 검색",
    id: "아이디로 검색",
    email: "이메일로 검색",
  };

  const inputData = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };
  //test
  const search = () => {
    if (searchText === "") {
      Swal.fire({
        title: "알림",
        text: `${searchPlaceholder[searchType]}어를 입력하세요!`,
        icon: "warning",
      });
    } else {
      setReqPageInfo({
        ...reqPageInfo,
        searchType: searchType,
        searchText: searchText,
        pageNo: 1,
      });
    }
  };
  const reset = () => {
    setSearchText("");
    setSearchType("no");
    const resetData = {
      order: 2, //어떤 정렬을 요청할건데??

      pageNo: 1, //몇번째 페이지를 요청하는데?
      sideBtnCount: 3,
      listCnt: 15, //한 페이지에 몇개 리스트를 보여줄건데?
      searchType: "no",
      searchText: "",
    };

    setReqPageInfo(resetData);
  };
  //위는 SearchBar 컴포넌트로 분리했음

  const sortSelect = (x) => {
    // 1: 회원 번호 오름차순
    // 2: 회원 번호 내림차순
    // 3: 신고 받은 수 오름차순
    // 4: 신고 받은 수 내림차순
    // 5: 좋아요 받은 수 오름차순
    // 6: 좋아요 받은 수 내림차순
    // 7: 작성 게시글 수 오름차순
    // 8: 작성 게시글 수 내림차순
    // 9 : 작성 댓글 수 오름차순
    // 10 : 작성 댓글 수 내림차순
    // 11: 회원 정지 오름차순
    // 12: 회원 정지 내림차순
    // 13: 회원 등급 오름차순
    // 14: 회원 등급 내림차순
    if (x === "no") {
      reqPageInfo.order === 1
        ? setReqPageInfo({ ...reqPageInfo, order: 2 })
        : setReqPageInfo({ ...reqPageInfo, order: 1 });
    } else if (x === "claim") {
      reqPageInfo.order === 3
        ? setReqPageInfo({ ...reqPageInfo, order: 4 })
        : setReqPageInfo({ ...reqPageInfo, order: 3 });
    } else if (x === "like") {
      reqPageInfo.order === 5
        ? setReqPageInfo({ ...reqPageInfo, order: 6 })
        : setReqPageInfo({ ...reqPageInfo, order: 5 });
    } else if (x === "board") {
      reqPageInfo.order === 7
        ? setReqPageInfo({ ...reqPageInfo, order: 8 })
        : setReqPageInfo({ ...reqPageInfo, order: 7 });
    } else if (x === "comment") {
      reqPageInfo.order === 9
        ? setReqPageInfo({ ...reqPageInfo, order: 10 })
        : setReqPageInfo({ ...reqPageInfo, order: 9 });
    } else if (x === "ban") {
      reqPageInfo.order === 11
        ? setReqPageInfo({ ...reqPageInfo, order: 12 })
        : setReqPageInfo({ ...reqPageInfo, order: 11 });
    } else if (x === "grade") {
      reqPageInfo.order === 13
        ? setReqPageInfo({ ...reqPageInfo, order: 14 })
        : setReqPageInfo({ ...reqPageInfo, order: 13 });
    }
  };

  const [userDetailInfo, setUserDetailInfo] = useState({});
  const reqUserInfo = (member) => {
    console.log("reqUser");
    console.log(member);
    setUserDetailInfo({ ...userDetailInfo, member: member });
    setReqDetailPageInfo({ ...reqDetailPageInfo, pageNo: 1 });
  };
  //console.log(userDetailInfo.member != null && userDetailInfo.member.memberNo);
  const [banReason, setBanReason] = useState("");

  const MemberList = (props) => {
    const m = props.m;
    const [benMode, setBenMode] = useState(false);
    const [dateValue, setDateValue] = useState(dayjs());
    const [timeValue, setTimeValue] = useState(dayjs());

    const confirm = (
      <div
        onClick={() => confirmData()}
        style={{ width: "100%", height: "100%" }}
      >
        확인
      </div>
    );

    const confirmData = () => {
      console.log(m);
      console.log(dateValue);
      console.log(dateValue.$y + "-" + (dateValue.$M + 1) + "-" + dateValue.$D);
      //const banText =
      //  dateValue.$y + "-" + (dateValue.$M + 1) + "-" + dateValue.$D;
      console.log(timeValue);
      console.log(timeValue.$H + ":" + timeValue.$m + ":" + timeValue.$s);

      const banText =
        dateValue.$y +
        "-" +
        (dateValue.$M + 1) +
        "-" +
        dateValue.$D +
        " " +
        timeValue.$H +
        ":" +
        timeValue.$m +
        ":" +
        timeValue.$s;
      console.log(banText);
      console.log(banReason);
      const banSet = {
        memberNo: m.memberNo,
        memberBenFinishDate: banText,
        memberBanContent: banReason,
      };
      console.log(banSet);
      axios
        .post(`${import.meta.env.VITE_BACK_SERVER}/admin/memberBan`, banSet)
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            title: "알림",
            text: `해당 이용자 정지되었습니다.`,

            confirmButtonText: "확인",
          });
          setBenMode(false);
          setDateValue(dayjs());
          setTimeValue(dayjs());
          setBanReason("");
          setReqListToggle(!reqListToggle);
          console.log(reqListToggle);
        });
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const BanModalContent = () => {
      return (
        <div className="adminModal ban-modal">
          <div className="adminModal titleText">
            [{m.memberNickname}] 회원을 정지하시겠습니까?
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
              <div className="adminModal subtitleText">
                정지 사유를 입력하세요
              </div>
            </div>
            <input
              type="text"
              placeholder="욕설 사용으로 50일 정지"
              value={banReason}
              onChange={(e) => {
                setBanReason(e.target.value);
              }}
            ></input>
            <div>
              <div className="adminModal subtitleText">날짜를 선택해주세요</div>
            </div>
            <DatePicker
              value={dateValue}
              onChange={(newValue) => {
                setDateValue(newValue);
              }}
            />
            <div>
              <div className="adminModal subtitleText">시간을 선택해주세요</div>
            </div>
            <MultiSectionDigitalClock
              timeSteps={{ hours: 1, minutes: 15, seconds: 10 }}
              views={["hours", "minutes", "seconds"]}
              value={timeValue}
              onChange={(newValue) => {
                setTimeValue(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
      );
    };
    return (
      <tr key={"member-" + m.memberNo} className="row">
        <td>{m.memberNo}</td>
        <td>{m.memberId}</td>
        <td>{m.memberEmail}</td>
        <td>{m.totalClaimCnt}</td>
        <td>{m.totalLikeCnt}</td>
        <td>{m.totalPostCnt}</td>
        <td>{m.totalCommentCnt}</td>
        <td>{m.memberDate}</td>
        <td key={"select-" + m.memberNo}>
          <select
            defaultValue={m.memberType}
            onChange={(e) => {
              setUpdateMemberType({
                memberType: e.target.value,
                memberNo: m.memberNo,
              });
            }}
          >
            <option value="1">관리자</option>
            <option value="2">일반</option>
          </select>
        </td>
        <td
          onMouseOver={() => {
            console.log(isModalOpen);
            setBenMode(true);
          }}
          onMouseOut={() => {
            console.log(isModalOpen);
            !isModalOpen && setBenMode(false);
          }}
          key={"claim-" + m.memberNo}
        >
          {benMode ? (
            <div className="banMode">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <BaseModal
                  title="이용자 정지"
                  content={<BanModalContent />}
                  buttonLabel="정지"
                  contentBoxStyle={{ width: "400px", height: "800px" }}
                  end={
                    <div>
                      <button
                        onClick={() => {
                          setIsModalOpen(false);
                          setBenMode(false);
                        }}
                      >
                        취소
                      </button>
                    </div>
                  }
                  result={confirm}
                />
              </button>

              <button
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <BaseModal
                  title="벤모드"
                  content={<div>회원을 선택하시겠습니까?</div>}
                  buttonLabel="선택"
                  contentBoxStyle={{ width: "800px", height: "500px" }}
                  end={"닫기버튼이름"}
                  result={"확인버튼"}
                />
              </button>
            </div>
          ) : m.isBen === "FALSE" ? (
            "정상"
          ) : (
            `${m.isBen}`
          )}
        </td>
        <td>
          <button
            onClick={() => {
              reqUserInfo(m);
            }}
          >
            <SearchIcon />
          </button>
        </td>
      </tr>
    );
  };
  //console.log("이거 확인해야함");
  const [userDetailBoard, setUserDetailBoard] = useState([]);
  useEffect(() => {
    if (userDetailInfo.member === undefined || userDetailInfo.member === null) {
      return;
    }
    setDetailLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_BACK_SERVER}/admin/memberDetail?memberNo=${
          userDetailInfo.member.memberNo
        }&pageNo=${reqDetailPageInfo.pageNo}&listCnt=${
          reqDetailPageInfo.listCnt
        }`
      )
      .then((res) => {
        setUserDetailBoard(res.data.memberDetail);
        setDetailTotalCount(res.data.totalListCount);
        setDetailLoading(false);
      })
      .catch((err) => console.log(err));
  }, [userDetailInfo, reqDetailPageInfo.pageNo, reqDetailPageInfo.listCnt]);
  const hasMember = userDetailInfo && userDetailInfo.member != null;
  /*
  const banPopup = (m) => {
    Swal.fire({
      title: "알림",
      text: `회원을 정지하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("정지");
        axios
          .patch(
            `${import.meta.env.VITE_BACK_SERVER}/admin/memberBan?memberNo=${
              m.memberNo
            }`
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  */

  return (
    <div className="admin-right">
      <div className="admin-content-wrap">
        <div className="content-head">
          <div className="title m">회원 관리 페이지</div>
          <div className="title s">
            실시간 회원 정보 (조회된 회원 수 : {totalListCount})
          </div>
          <SearchBar
            searchType={searchType}
            setSearchType={setSearchType}
            searchText={searchText}
            searchPlaceholder={searchPlaceholder}
            inputData={inputData}
            search={search}
            reset={reset}
          />
        </div>
        <div className="content-body">
          <div>
            <button onClick={handleDownload} className="btn">
              엑셀로 다운로드 (조회)
            </button>
          </div>

          <table className="member-table">
            <thead>
              <tr>
                <th>
                  <TableSortLabel
                    active={reqPageInfo.order === 1 || reqPageInfo.order === 2}
                    direction={
                      reqPageInfo.order === 1
                        ? "asc"
                        : reqPageInfo.order === 2
                        ? "desc"
                        : undefined
                    }
                    onClick={() => {
                      sortSelect("no");
                    }}
                  >
                    회원 번호
                  </TableSortLabel>
                  {/* MEMBER_TBL */}
                </th>
                <th>
                  아이디
                  {/*" https://mui.com/material-ui/api/table-sort-label/"*/}
                  {/* MEMBER_TBL */}
                </th>
                <th>이메일 {/* MEMBER_TBL */}</th>
                <th>
                  <TableSortLabel
                    active={reqPageInfo.order === 3 || reqPageInfo.order === 4}
                    direction={
                      reqPageInfo.order === 3
                        ? "asc"
                        : reqPageInfo.order === 4
                        ? "desc"
                        : undefined
                    }
                    onClick={() => {
                      sortSelect("claim");
                    }}
                  >
                    받은 신고
                  </TableSortLabel>
                  {/* FB_CLAIM_TBL, FBC_CLAIM_TBL, TB_CLAIM_TBL, TBC_CLAIM_TBL */}
                </th>
                <th>
                  <TableSortLabel
                    active={reqPageInfo.order === 5 || reqPageInfo.order === 6}
                    direction={
                      reqPageInfo.order === 5
                        ? "asc"
                        : reqPageInfo.order === 6
                        ? "desc"
                        : undefined
                    }
                    onClick={() => {
                      sortSelect("like");
                    }}
                  >
                    받은 좋아요
                  </TableSortLabel>
                </th>
                <th>
                  {/* FB_LIKE_TBL, FBC_LIKE_TBL, TB_LIKE_TBL, TBC_LIKE_TBL */}
                  <TableSortLabel
                    active={reqPageInfo.order === 7 || reqPageInfo.order === 8}
                    direction={
                      reqPageInfo.order === 7
                        ? "asc"
                        : reqPageInfo.order === 8
                        ? "desc"
                        : undefined
                    }
                    onClick={() => {
                      sortSelect("board");
                    }}
                  >
                    작성 게시글
                  </TableSortLabel>
                </th>
                <th>
                  {/* FREE_BOARD_TBL, TRADE_BOARD_TBL */}
                  <TableSortLabel
                    active={reqPageInfo.order === 9 || reqPageInfo.order === 10}
                    direction={
                      reqPageInfo.order === 9
                        ? "asc"
                        : reqPageInfo.order === 10
                        ? "desc"
                        : undefined
                    }
                    onClick={() => {
                      sortSelect("comment");
                    }}
                  >
                    작성 댓글
                  </TableSortLabel>
                </th>

                <th>
                  {/* FB_COMMENT_TBL, TB_COMMENT_TBL */}
                  회원가입일
                </th>
                <th>
                  {/* MEMBER_TBL */}
                  <TableSortLabel
                    active={
                      reqPageInfo.order === 13 || reqPageInfo.order === 14
                    }
                    direction={
                      reqPageInfo.order === 13
                        ? "asc"
                        : reqPageInfo.order === 14
                        ? "desc"
                        : undefined
                    }
                    onClick={() => {
                      sortSelect("grade");
                    }}
                  >
                    회원 등급
                  </TableSortLabel>
                </th>
                <th>
                  <TableSortLabel
                    active={
                      reqPageInfo.order === 11 || reqPageInfo.order === 12
                    }
                    direction={
                      reqPageInfo.order === 11
                        ? "asc"
                        : reqPageInfo.order === 12
                        ? "desc"
                        : undefined
                    }
                    onClick={() => {
                      sortSelect("ban");
                    }}
                  >
                    회원 정지
                  </TableSortLabel>
                </th>
                {/* MEMBER_BEN_TBL */}
                <th>상세 보기</th>
              </tr>
            </thead>
            <tbody>
              {memberLoading ? (
                <tr>
                  <td colSpan={12}>
                    <div className="loadingMsg">
                      <Button
                        fullWidth
                        loading
                        loadingPosition="start"
                        variant="outlined"
                        className="loadingBtn"
                      >
                        로딩중입니다. 잠시만 기다려주세요!
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : memberList.length === 0 ? (
                <tr>
                  <td colSpan={12}>데이터가 없습니다.</td>
                </tr>
              ) : (
                memberList.map((m, i) => {
                  return <MemberList key={m.memberNo} m={m} />;
                })
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={12}>
                  <PageNavigation
                    reqPageInfo={reqPageInfo}
                    setReqPageInfo={setReqPageInfo}
                    totalListCount={totalListCount}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="admin-detail-content-wrap">
        {!hasMember ? (
          <div className="nullMsg">상세보기를 클릭해보세요.</div>
        ) : detailLoading ? (
          <div className="content-head">
            <div className="title m">사용자 상세 정보</div>
            <div className="loadingMsg">
              <Button
                fullWidth
                loading
                loadingPosition="start"
                variant="outlined"
                className="loadingBtn"
              >
                로딩중입니다. 잠시만 기다려주세요!
              </Button>
            </div>
          </div>
        ) : (
          <div className="content-head">
            <div className="title m">사용자 상세 정보</div>
            <MemberDetail
              reqPageInfo={reqDetailPageInfo}
              setReqPageInfo={setReqDetailPageInfo}
              totalListCount={detailTotalCount}
              userDetailInfo={userDetailInfo}
              userDetailBoard={userDetailBoard}
              detailLoading={detailLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentMember;
