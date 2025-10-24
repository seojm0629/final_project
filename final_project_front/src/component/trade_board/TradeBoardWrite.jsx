import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import Swal from "sweetalert2";
import "./tradeBoard.css";

const TradeBoardWrite = () => {
  const navigate = useNavigate();
  const loginId = useRecoilValue(loginIdState); // ✅ 로그인 아이디 가져오기

  const [formData, setFormData] = useState({
    tradeBoardTitle: "",
    tradeBoardContent: "",
    tradeBoardPrice: "",
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // ✅ 로그인 안했을 때 접근 차단
  useEffect(() => {
    if (!loginId) {
      Swal.fire({
        icon: "warning",
        title: "로그인이 필요합니다",
        text: "글쓰기는 로그인 후 이용 가능합니다.",
        confirmButtonText: "로그인하기",
      }).then(() => navigate("/member/login"));
    }
  }, [loginId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.tradeBoardTitle ||
      !formData.tradeBoardContent ||
      !formData.tradeBoardPrice
    ) {
      Swal.fire("입력 오류", "제목, 내용, 가격은 필수입니다.", "error");
      return;
    }

    const data = new FormData();
    data.append("tradeBoardTitle", formData.tradeBoardTitle);
    data.append("tradeBoardContent", formData.tradeBoardContent);
    data.append("tradeBoardPrice", formData.tradeBoardPrice);
    data.append("memberId", loginId); // ✅ 작성자 아이디 추가

    images.forEach((img) => data.append("tradeBoardImages", img));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACK_SERVER}/tradeBoard`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data === "success") {
        Swal.fire(
          "등록 완료!",
          "게시글이 성공적으로 등록되었습니다.",
          "success"
        );
        navigate("/tradeBoard/list");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("등록 실패", "오류가 발생했습니다.", "error");
    }
  };

  return (
    <div className="trade-write-wrap">
      <h2>중고거래 글쓰기</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            name="tradeBoardTitle"
            value={formData.tradeBoardTitle}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label>내용</label>
          <textarea
            name="tradeBoardContent"
            value={formData.tradeBoardContent}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label>가격</label>
          <input
            type="number"
            name="tradeBoardPrice"
            value={formData.tradeBoardPrice}
            onChange={handleChange}
            placeholder="가격을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label>이미지 업로드 (여러장 가능)</label>
          <input type="file" multiple onChange={handleImageChange} />
        </div>

        <div className="img-preview">
          {previewImages.map((src, idx) => (
            <img key={idx} src={src} alt={`preview-${idx}`} width="100" />
          ))}
        </div>

        <div className="btn-wrap">
          <button type="submit" className="btn submit-btn">
            등록
          </button>
          <button
            type="button"
            className="btn cancel-btn"
            onClick={() => navigate("/tradeBoard/list")}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default TradeBoardWrite;
