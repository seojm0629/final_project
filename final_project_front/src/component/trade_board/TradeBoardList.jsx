import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TradeBoardList = () => {
  const [tradeBoardList, setTradeBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/tradeBoard?reqPage=${reqPage}`)
      .then((res) => {
        console.log(res);
        setTradeBoardList(res.data.TradeBoardList);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);
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
        {pi !== null && (
          <PageNavigation pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
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
          <span>{tradeBoard.tradeBoardWriter}</span>
          <span>{tradeBoard.tradeBoardDate}</span>
        </div>
      </div>
    </li>
  );
};

export default TradeBoardList;
