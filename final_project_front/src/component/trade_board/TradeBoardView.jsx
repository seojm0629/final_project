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
              <img src="/image/default_img.png" />
              {/*
              <img
                src={
                  tradeBoard.tradeThumbnailPath
                    ? `${import.meta.env.VITE_BACK_SERVER}/tradeBoard/thumb/${
                        tradeBoard.tradeThumbnailPath
                      }`
                    : "image/default_img.png"
                }
              ></img>
               */}
            </div>
            <div className="tradeBoard-view-preview">
              <div className="tradeBoard-view-content2">
                <p>{tradeBoard.tradeBoardTitle}</p>
                <p>{tradeBoard.tradeBoardCategory}</p>
                <p>2시간 전</p>
                <p>{tradeBoard.tradeBoardPrice}원</p>
                <p>{tradeBoard.tradeBoardPlace}</p>
                <p>관심</p>
                <p>조회수</p>
                <p>신고하기</p>
                <p>찜 아이콘</p>
                <p>문의</p>
                <p>판매자 아이디</p>
                <p>매너 점수</p>
              </div>
              <div className="tradeBoard-view-comment"></div>
              <div className="tradeBoard-view-product"></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TradeBoardView;
