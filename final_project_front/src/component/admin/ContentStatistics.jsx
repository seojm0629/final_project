import { useState } from "react";
import "./contentStatistics.css";

import { Bar } from "react-chartjs-2";

const ContentStatistics = () => {
  return (
    <div className="admin-right">
      <div className="admin-content-wrap">
        <div className="content-head">
          <div className="title m">통계 페이지</div>
          <div className="title s">사이트 이용 지표</div>
        </div>

        <div className="placeholder">필터 (year/moth/day)</div>
        <div className="placeholder">DAU/가입자 수/게시글 수/댓글 수</div>
        <div className="placeholder">신규 가입자 수 (필터에 따라)</div>
        <div className="placeholder">
          게시글 작성자 수 / 게시판 게시글 작성 비중 / 탈퇴 유저 수 / 가입자 수
          → 첫 게시글 조회 인원 수 → 첫 게시글 or 댓글 작성 인원 수
        </div>
      </div>
    </div>
  );
};

//ContentStatistics 컴포넌트의 하위 컴포넌트 위치 ▼

export default ContentStatistics;
