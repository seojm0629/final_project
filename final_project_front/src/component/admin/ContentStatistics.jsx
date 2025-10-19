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
  const [ru, setRu] = useState(0);
  const [bc, setBc] = useState(0);
  const [bcc, setBcc] = useState(0);
  const [wc, setWc] = useState(0);

  /* ************** [Chart (Bar) > data 에 들어갈 객체] *************** */
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
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
        console.log(res.data);
        console.log(res.data.accessionCounts);
        const results = res.data.accessionCounts;
        setRu(res.data.ru);
        setBc(res.data.bc);
        setBcc(res.data.bcc);
        setWc(res.data.wc);

        const labels = results.map((r) => {
          return r.label;
        });
        setLabels(labels);

        const values = results.map((r) => {
          return r.value;
        });
        setValues(values);
        console.log(labels);

        console.log(values);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectCriteria]);
  /* **************************************************************** */
  const PIE_DUMMY = { signup: 60, withdraw: 40 }; // 합계 100

  const pieData = {
    labels: ["가입", "탈퇴"],
    datasets: [
      {
        label: "비율(%)",
        data: [PIE_DUMMY.signup, PIE_DUMMY.withdraw],
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
        {/*개발 중인 것 여기 넣고 테스트 해서 하단에 배치하기 */}
        <div className="placeholder">
          <div>테스트 영역</div>
        </div>
        <div className="entireBox">
          <div className="element">
            <div className="entireBox-title">전체 가입자 수</div>
            <div className="entireBox-content">{ru} 명</div>
            <div className="entireBox-plus">전일 대비 +6 ▲</div>
          </div>
          <div className="element">
            <div className="entireBox-title">전체 게시글 수</div>
            <div className="entireBox-content">{bc} 건</div>
            <div className="entireBox-minus">전일 대비 -4 ▼</div>
          </div>
          <div className="element">
            <div className="entireBox-title">전체 댓글 수</div>
            <div className="entireBox-content">{bcc} 건</div>
            <div className="entireBox-plus">전일 대비 +8 ▲</div>
          </div>
          <div className="element">
            <div className="entireBox-title">전체 탈퇴 유저 수</div>
            <div className="entireBox-content">{wc}명</div>
            <div className="entireBox-minus">전일 대비 -2 ▼</div>
          </div>
        </div>
        <div className="placeholder"></div>
        {/* 주간/월간/일간 필터 */}
        <div className="placeholder">
          <div>
            필터 (year/month/day) - 기타를 클릭하면 특정 기간 조회할 수 있도록
            고민하기
          </div>
          <div>
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
        </div>

        <div className="placeholder">
          <div>신규 가입자 수 (필터에 따라)</div>
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
              chartTag={<Bar data={data} />}
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
              chartTag={<Line data={data} />}
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
              chartTag={<Line data={data} />}
            />
          </div>
        </div>
        <div className="placeholder">
          <div>
            게시글 작성자 수 / 게시판 게시글 작성 비중 / 탈퇴 유저 수 / 가입자
            수 → 첫 게시글 조회 인원 수 → 첫 게시글 or 댓글 작성 인원 수
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentStatistics;

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

/** 개수 표기 양식
 * title (String) : 추출된 값의 의미 (제목)
 * value : 추출된 값
 * difference : 전일 대비 얼마나 차이나는지 비율
 */
const CountTemplate = (props) => {
  const title = props.title;
  const value = props.value;
  const difference = props.difference;

  return <div>아아2</div>;
};
