import { useEffect, useState } from "react";
import "./contentStatistics.css";
import { Bar, Line, Pie } from "react-chartjs-2";
import dayjs from "dayjs";
import axios from "axios";

//메인 컴포넌트 위치 ▼
const ContentStatistics = () => {
  //chartjs 참고 문서 위치
  // 'https://react-chartjs-2.js.org/docs/working-with-datasets'
  //메인 컴포넌트는 월간/주간/일간에 대한 정보를 가지고 있는다.

  const searchCriteria = ["5년", "1년", "1개월", "1일"];
  const [selectCriteria, setSelectCriteria] = useState(searchCriteria[1]);

  /* **************************************************************** */
  /* ********* [Chart (Bar) > data > Label 속성에 들어갈 배열] ********* */
  /*
  const yearsLabels = () => {
    const arr = [];
    for (let y = 0; y < 5; y++) {
      arr.push(dayjs().$y - 4 + y);
    }
    return arr;
  };
  const yearLabels = () => {
    const arr = [];
    for (let m = 0; m < 12; m++) {
      arr.push(`${m + 1}월`);
    }
    return arr;
  };

  const monthLabels = () => {
    const arr = [];
    for (let d = 0; d < 31; d++) {
      arr.push(`${d + 1}일`);
    }
    return arr;
  };

  const dayLabels = () => {
    const arr = [];
    for (let h = 0; h < 24; h++) {
      arr.push(`${h + 1}시`);
    }
    return arr;
  };

  const labels =
    selectCriteria === "5년"
      ? yearsLabels()
      : selectCriteria === "1년"
      ? yearLabels()
      : selectCriteria === "1개월"
      ? monthLabels()
      : dayLabels();
      */

  /* **************************************************************** */
  /*
  console.log(yearsLabels());
  console.log(yearLabels());
  console.log(monthLabels());
  console.log(dayLabels());
  */
  /* **************************************************************** */
  const [ar, setAr] = useState(0);
  const [ru, setRu] = useState(0);
  const [bc, setBc] = useState(0);
  const [bcc, setBcc] = useState(0);
  const [wc, setWc] = useState(0);

  const [ruDiff, setRuDiff] = useState(0);
  const [bcDiff, setBcDiff] = useState(0);
  const [bccDiff, setBccDiff] = useState(0);
  const [wcDiff, setWcDiff] = useState(0);

  /* ************** [Chart (Bar) > data 에 들어갈 객체] *************** */
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  const [withdrawLabels, setWithdrawLabels] = useState([]);
  const [withdrawValues, setWithdrawValues] = useState([]);

  const [freeBoardLabels, setFreeBoardLabels] = useState([]);
  const [freeBoardValues, setFreeBoardValues] = useState([]);

  const [tradeBoardLabels, setTradeBoardLabels] = useState([]);
  const [tradeBoardValues, setTradeBoardValues] = useState([]);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "가입자",
        data: values,
        backgroundColor: "rgba(5, 20, 160, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  const dataWithdraw = {
    labels: withdrawLabels,
    datasets: [
      {
        label: "탈퇴 유저 수",
        data: withdrawValues,
        backgroundColor: "rgba(216, 14, 0, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  const dataFreeBoard = {
    labels: freeBoardLabels,
    datasets: [
      {
        label: "자유 게시판 게시글 등록 수",
        data: freeBoardValues,
        backgroundColor: "rgba(5, 20, 160, 0.5)",
        borderWidth: 1,
      },
    ],
  };
  const dataTradeBoard = {
    labels: tradeBoardLabels,
    datasets: [
      {
        label: "거래 게시판 게시글 등록 수",
        data: tradeBoardValues,
        backgroundColor: "rgba(5, 20, 160, 0.5)",
        borderWidth: 1,
      },
    ],
  };
  /* **************************************************************** */

  console.log(selectCriteria);
  console.log(labels);

  /* ********* [5년,1년,월간,일간 선택 값에 따라 객체 돌려받기] *********** */
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/admin/statistics?selectCriteria=${selectCriteria}`
      )
      .then((res) => {
        console.log("받아온 데이터");
        console.log(res.data);
        console.log(res.data.accessionCounts);
        const results = res.data.accessionCounts;
        setRu(res.data.ru);
        setBc(res.data.bc);
        setBcc(res.data.bcc);
        setWc(res.data.wc);
        setAr(res.data.ar);
        setRuDiff(res.data.ruDiffDay);
        setBcDiff(res.data.bcDiffDay);
        setBccDiff(res.data.bccDiffDay);
        setWcDiff(res.data.wcDiffDay);

        const labels = results.map((r) => {
          return r.label;
        });
        setLabels(labels);

        const values = results.map((r) => {
          return r.value;
        });
        setValues(values);

        const resultsWithdraw = res.data.listWithdraw;

        const withdrawLabels = resultsWithdraw.map((r) => {
          return r.label;
        });
        setWithdrawLabels(withdrawLabels);

        const withdrawValues = resultsWithdraw.map((r) => {
          return r.value;
        });
        setWithdrawValues(withdrawValues);

        const listFreeBoard = res.data.listFreeBoard;

        const freeBoardLabels = listFreeBoard.map((r) => {
          return r.label;
        });
        setFreeBoardLabels(freeBoardLabels);

        const freeBoardValues = listFreeBoard.map((r) => {
          return r.value;
        });
        setFreeBoardValues(freeBoardValues);

        const listTradeBoard = res.data.listTradeBoard;

        const tradeBoardLabels = listTradeBoard.map((r) => {
          return r.label;
        });
        setTradeBoardLabels(tradeBoardLabels);

        const tradeBoardValues = listTradeBoard.map((r) => {
          return r.value;
        });
        setTradeBoardValues(tradeBoardValues);

        console.log(labels);

        console.log(values);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [selectCriteria]);
  /* **************************************************************** */

  const pieData = {
    labels: ["가입", "탈퇴"],
    datasets: [
      {
        label: "비율(%)",
        data: [ar, 100 - ar],
        backgroundColor: ["rgba(0, 102, 255, 0.5)", "rgba(255, 94, 0, 0.5)"],
      },
    ],
  };

  return (
    <div className="admin-right">
      <div className="admin-content-wrap">
        <div className="content-head">
          <div className="title m">통계 페이지</div>
          <div className="title s">사이트 이용 지표</div>
        </div>
        <DiffCount />

        <div className="placeholder">
          <div className="chartFilter">
            {searchCriteria.map((sc, i) => {
              return (
                <button
                  key={"criteria-" + i}
                  onClick={() => {
                    setSelectCriteria(sc);
                  }}
                  className={
                    selectCriteria === sc
                      ? "criteriaBtn selected"
                      : "criteriaBtn"
                  }
                >
                  {sc}
                </button>
              );
            })}
          </div>

          <div className="chartFlex">
            <ChartTemplate
              title={
                selectCriteria === "5년"
                  ? "연간 가입자 수"
                  : selectCriteria === "1년"
                  ? "월간 가입자 수"
                  : selectCriteria === "1개월"
                  ? "일간 가입자 수"
                  : "시간대별 가입자 수"
              }
              subTitle={"기준 : " + selectCriteria}
              chartTag={<Pie data={pieData} />}
            />
          </div>
          <div className="chartFlex">
            <ChartTemplate
              title={
                selectCriteria === "5년"
                  ? "연간 가입자 수"
                  : selectCriteria === "1년"
                  ? "월간 가입자 수"
                  : selectCriteria === "1개월"
                  ? "일간 가입자 수"
                  : "시간대별 가입자 수"
              }
              subTitle={"기준 : " + selectCriteria}
              chartTag={<Bar data={data} />}
            />
            <ChartTemplate
              title={
                selectCriteria === "5년"
                  ? "연간 탈퇴 유저 수"
                  : selectCriteria === "1년"
                  ? "월간 탈퇴 유저 수"
                  : selectCriteria === "1개월"
                  ? "일간 탈퇴 유저 수"
                  : "시간대별 탈퇴 유저 수"
              }
              subTitle={"기준 : " + selectCriteria}
              chartTag={<Bar data={dataWithdraw} />}
            />
          </div>
          <div className="chartFlex">
            <ChartTemplate
              title={
                selectCriteria === "5년"
                  ? "연간 자유 게시물 수"
                  : selectCriteria === "1년"
                  ? "월간 자유 게시물 수"
                  : selectCriteria === "1개월"
                  ? "일간 자유 게시물 수"
                  : "시간대별 자유 게시물 등록 수"
              }
              subTitle={"기준 : " + selectCriteria}
              chartTag={<Line data={dataFreeBoard} />}
            />
            <ChartTemplate
              title={
                selectCriteria === "5년"
                  ? "연간 거래 게시물 수"
                  : selectCriteria === "1년"
                  ? "월간 거래 게시물 수"
                  : selectCriteria === "1개월"
                  ? "일간 거래 게시물 수"
                  : "시간대별 거래 게시물 등록 수"
              }
              subTitle={"기준 : " + selectCriteria}
              chartTag={<Line data={dataTradeBoard} />}
            />
          </div>
        </div>
        <div className="placeholder">
          <div>
            (후순위) 가입자 수 → 첫 게시글 조회 인원 수 → 첫 게시글 or 댓글 작성
            인원 수
          </div>
        </div>
      </div>
    </div>
  );
};

export { ContentStatistics, DiffCount };

//ContentStatistics 컴포넌트의 하위 컴포넌트 위치 ▼

/** 차트 양식
 * title(String) : 차트 상단의 제목
 * subTitle(String) : 차드 제목 하단의 부제목
 * chartTag(tag) : 추가할 차트 넣기
 * */
const ChartTemplate = (props) => {
  const title = props.title;
  const subTitle = props.subTitle;
  const chartTag = props.chartTag;
  console.log(title);
  console.log(subTitle);
  console.log(chartTag);
  return (
    <div className="chartBox">
      <div className="chartBox-head">
        <div>
          <div className="chartBox-title">{title}</div>
          <div className="chartBox-subTitle">{subTitle}</div>
        </div>
      </div>
      <div className="chartBox-content">{chartTag}</div>
    </div>
  );
};

const DiffCount = () => {
  const [ru, setRu] = useState(0);
  const [bc, setBc] = useState(0);
  const [bcc, setBcc] = useState(0);
  const [wc, setWc] = useState(0);
  const [ar, setAr] = useState(0);
  const [ruDiff, setRuDiff] = useState(0);
  const [bcDiff, setBcDiff] = useState(0);
  const [bccDiff, setBccDiff] = useState(0);
  const [wcDiff, setWcDiff] = useState(0);
  const searchCriteria = ["5년", "1년", "1개월", "1일"];
  const [selectCriteria, setSelectCriteria] = useState(searchCriteria[1]);
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/admin/statistics?selectCriteria=${selectCriteria}`
      )
      .then((res) => {
        console.log("받아온 데이터");
        console.log(res.data);
        console.log(res.data.accessionCounts);
        const results = res.data.accessionCounts;
        setRu(res.data.ru);
        setBc(res.data.bc);
        setBcc(res.data.bcc);
        setWc(res.data.wc);
        setAr(res.data.ar);
        setRuDiff(res.data.ruDiffDay);
        setBcDiff(res.data.bcDiffDay);
        setBccDiff(res.data.bccDiffDay);
        setWcDiff(res.data.wcDiffDay);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectCriteria]);

  return (
    <div className="entireBox">
      <div className="element">
        <div className="entireBox-title">전체 가입자 수</div>
        <div className="entireBox-content">{ru} 명</div>
        <div className={ruDiff >= 0 ? "entireBox-plus" : "entireBox-minus"}>
          전일 대비 {ruDiff >= 0 ? `+${ruDiff} ▲` : `${ruDiff} ▼`}
        </div>
      </div>
      <div className="element">
        <div className="entireBox-title">전체 게시글 수</div>
        <div className="entireBox-content">{bc} 건</div>
        <div className={bcDiff >= 0 ? "entireBox-plus" : "entireBox-minus"}>
          전일 대비 {bcDiff >= 0 ? `+${bcDiff} ▲` : `${bcDiff} ▼`}
        </div>
      </div>
      <div className="element">
        <div className="entireBox-title">전체 댓글 수</div>
        <div className="entireBox-content">{bcc} 건</div>
        <div className={bccDiff >= 0 ? "entireBox-plus" : "entireBox-minus"}>
          전일 대비 {bccDiff >= 0 ? `+${bccDiff} ▲` : `${bccDiff} ▼`}
        </div>
      </div>
      <div className="element">
        <div className="entireBox-title">전체 탈퇴 유저 수</div>
        <div className="entireBox-content">{wc}명</div>
        <div className={wcDiff >= 0 ? "entireBox-plus" : "entireBox-minus"}>
          전일 대비 {wcDiff >= 0 ? `+${wcDiff} ▲` : `${wcDiff} ▼`}
        </div>
      </div>
    </div>
  );
};
