import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TradeBoardView = () => {
  const params = useParams();
  const tradeBoardNo = params.tradeBoardNo;
  const [tradeBoard, setTradeBoard] = useState(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/tradeBoard/${tradeBoardNo}`)
      .then((res) => {
        console.log(res);
        setTradeBoard(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className="section tradeBoard-view-wrap">
      <div className="page-title">게시글</div>
      {tradeBoard && (
        <div className="tradeBoard-view-content">
          <div className="tradeBoard-view-info">
            <div className="tradeBoard-thumbnail">
              <img
                src={
                  tradeBoard.tradeBoardThumb
                    ? `${import.meta.env.VITE_BACK_SERVER}/tradeBoard/thumb/${
                        tradeBoard.tradeBoardThumb
                      }`
                    : "image/default_img.png"
                }
              ></img>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TradeBoardView;
