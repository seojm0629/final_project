import axios from "axios";
import { useEffect, useState } from "react";
//import "./tradeBoard.css";
import PageNavigation from "../utils/PageNavigation";
import { useNavigate } from "react-router-dom";

const TradeBoardList = () => {
  const [tradeBoardList, setTradeBoardList] = useState([]);
  const [reqPageInfo, setReqPageInfo] = useState({
    sideBtnCount: 3, // 현재 페이지 양옆에 버튼을 몇개 둘껀데?
    pageNo: 1, //몇번째 페이지를 요청하는데? (페이징에서 씀)
    listCnt: 10, //한 페이지에 몇개 리스트를 보여줄건데? (페이징에서 씀)
  });
  const [totalListCount, setTotalListCount] = useState(10);
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACK_SERVER}/tradeBoard?reqPage=${
          reqPageInfo.pageNo
        }&&listCnt=${reqPageInfo.listCnt}`
      )
      .then((res) => {
        console.log(res);
        setTradeBoardList(res.data.tradeBoardList);
        setTotalListCount(res.data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPageInfo]);
  console.log(tradeBoardList);
  console.log(totalListCount);
  return (
    <section className="section tradeBoard-list">
      <div className="page-title">중고거래 게시판</div>
      <div className="tradeBoard-list-wrap">
        <ul className="posting-wrap">
          {tradeBoardList.map((tradeBoard, index) => {
            return (
              <TradeBoardItem
                key={"tradeBoard-" + index}
                tradeBoard={tradeBoard}
              />
            );
          })}
        </ul>
      </div>
      <div className="tradeBoard-paging-wrap">
        {tradeBoardList.length != 0 && (
          <PageNavigation
            reqPageInfo={reqPageInfo}
            setReqPageInfo={setReqPageInfo}
            totalListCount={totalListCount}
          />
        )}
      </div>
    </section>
  );
};

const TradeBoardItem = (props) => {
  const tradeBoard = props.tradeBoard;
  const navigate = useNavigate();
  return (
    <li
      className="posting-item"
      onClick={() => {
        navigate(`/tradeBoard/view/${tradeBoard.tradeBoardNo}`);
      }}
    >
      <div className="posting-img">
        <img
          src={
            tradeBoard.tradeBoardThumb !== null
              ? `${import.meta.env.VITE_BACK_SERVER}/tradeBoard/thumb/${
                  tradeBoard.tradeBoardThumb
                }`
              : "/image/default_img.png"
          }
        ></img>
      </div>
      <div className="posting-info">
        <div className="posting-title">{tradeBoard.tradeBoardTitle}</div>
        <div className="posting-sub-info">
          {/* <span>{member.memberId}</span> */}
          <span>{tradeBoard.tradeBoardDate}</span>
        </div>
      </div>
    </li>
  );
};

export default TradeBoardList;
