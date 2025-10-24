import axios from "axios";
import { useEffect, useState } from "react";
import "./tradeBoard.css";
import PageNavigation from "../utils/PageNavigation";
import { useNavigate } from "react-router-dom";

const TradeBoardList = () => {
  const [tradeBoardList, setTradeBoardList] = useState([]);
  const [reqPageInfo, setReqPageInfo] = useState({
    sideBtnCount: 3,
    pageNo: 1,
    listCnt: 16,
  });
  const [totalListCount, setTotalListCount] = useState(10);
  const navigate = useNavigate();
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
      <button
        className="btn write-btn"
        onClick={() => navigate("/tradeBoard/write")}
      >
        글쓰기
      </button>
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

  // 거래 완료 상태 확인 (2: 완료)
  const isTradeCompleted = tradeBoard.tradeBoardStatus === 2;

  return (
    <li
      className={`posting-item ${isTradeCompleted ? "completed" : ""}`} // 거래 완료 시 'completed' 클래스 추가
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
        <div className="posting-price">
          {isTradeCompleted && (
            <span className="trade-completed-text">거래 완료</span>
          )}
          <span className="price-amount">{tradeBoard.tradeBoardPrice}원</span>
        </div>
      </div>
    </li>
  );
};

export default TradeBoardList;
