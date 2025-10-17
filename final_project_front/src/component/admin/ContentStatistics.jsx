import { useState } from "react";
import "./contentStatistics.css";

import { Bar } from "react-chartjs-2";

const ContentStatistics = () => {
  const MonthChart = () => {
    const data = {
      labels: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ],
      datasets: [
        {
          label: "가입자 수",
          data: [12, 19, 3, 5, 2, 3, 8, 20, 1, 6, 5, 70],
          borderWidth: 1,
          backgroundColor: "rgba(54,162,235,0.5)",
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: "월별 가입자" },
        legend: { position: "top" },
      },
      scales: { y: { beginAtZero: true } },
    };

    return (
      <div>
        <Bar
          data={data}
          options={options}
          style={{ position: "relative", height: "200px", width: "100px" }}
        />
      </div>
    );
  };

  const DaysChart = () => {
    const data = {
      labels: [
        "1일",
        "2일",
        "3일",
        "4일",
        "5일",
        "6일",
        "7일",
        "8일",
        "9일",
        "10일",
        "11일",
        "12일",
        "13일",
        "14일",
        "15일",
        "16일",
        "17일",
        "18일",
        "19일",
        "20일",
        "21일",
        "22일",
        "23일",
        "24일",
        "25일",
        "26일",
        "27일",
        "28일",
        "29일",
      ],
      datasets: [
        {
          label: "가입자 수",
          data: [12, 19, 3, 5, 2, 3, 8, 20, 1, 6, 5, 70],
          borderWidth: 1,
          backgroundColor: "rgba(54,162,235,0.5)",
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: "월별 가입자" },
        legend: { position: "top" },
      },
      scales: { y: { beginAtZero: true } },
    };

    return (
      <div>
        <Bar
          data={data}
          options={options}
          style={{ position: "relative", height: "200px", width: "100px" }}
        />
      </div>
    );
  };
  const [chartToggle, setChartToggle] = useState("month");
  return (
    <div className="admin-content-wrap">
      <div className="content-head">
        <div className="title m">통계 페이지</div>
        <div className="title s">사이트 이용 지표</div>
      </div>
      <div className="content-body">
        <div className="firstChartBox">
          <button
            onClick={() => {
              setChartToggle("month");
            }}
          >
            월별
          </button>
          <button
            onClick={() => {
              setChartToggle("days");
            }}
          >
            일별
          </button>
        </div>
        <div>
          {chartToggle === "month" && MonthChart()}
          {chartToggle === "days" && DaysChart()}
        </div>
      </div>
    </div>
  );
};
export default ContentStatistics;
