import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const TradeBoardView = () => {
  const params = useParams();
  const tradeBoardNo = params.tradeBoardNo;
  const [tradeBoard, setTradeBoard] = useState(null);
  const navigate = useNavigate();
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
  const deleteBoard = () => {
    Swal.fire({
      title: "게시글 삭제",
      text: "게시글을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제하기",
      cancelButtonText: "취소",
    }).then((select) => {
      if (select.isConfirmed) {
        axios
          .delete(
            `${import.meta.env.VITE_BACK_SERVER}/tradeBoard/${tradeBoardNo}`
          )
          .then((res) => {
            console.log(res);
            if (res.data === 1) {
              navigate("/tradeBoard/list");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
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
