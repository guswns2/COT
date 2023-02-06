import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
}from 'chart.js'
import { useState, useEffect } from "react";
import axios from "axios";


ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
)

function BarChartNow (){

  const [todayElect, setTodayElect] = useState([]);
  const [yesterdayElect, setYesterdayElect] = useState([]);
  const [predictElect, setPredictElect] = useState([]);
  const [todayCarbon, setTodayCarbon] = useState([]);
  // const [totalLabels, setTotalLabels] = useState([]);
  const [todayLabels, setTodayLabels] = useState([]);

  const data = {
    labels:todayLabels,
    // [
    //   "00시",
    //   "01시",
    //   "02시",
    //   "03시",
    //   "04시",
    //   "05시",
    //   "06시",
    //   "07시",
    //   "08시",
    //   "09시",
    //   "10시",
    //   "11시",
    //   "12시",
    //   "13시",
    //   "14시",
    //   "15시",
    //   "16시",
    //   "17시",
    //   "18시",
    //   "19시",
    //   "20시",
    //   "21시",
    //   "22시",
    //   "23시",
    // ],
    datasets: [
      {
        label: "금일 전력사용량",
        data: todayElect,
        backgroundColor: ["rgba(234,234,71,0.3)"],
        borderColor: ["rgb(255, 205, 86)"],
        borderWidth: 2,
      },

      // 이중 그래프에 써먹을 것. Line 그래프 - 보류
      // {
      //   label: "전일 전력사용량",
      //   data: yesterdayElect,
      //   backgroundColor: "green",
      //   borderColor: "green",
      //   tension: 0,
      //   type: "line",
      //   order: 0,
      //   borderWidth: 3,
      // },
      {
        label: "금일 탄소배출량",
        data: todayCarbon,
        backgroundColor: "white",
        borderColor: "white",
        tension: 0,
        type: "line",
        order: 0,
        borderWidth: 3,
        
      },
      {
        label: "금일 예상 전력사용량",
        data: predictElect,
        backgroundColor: "pink",
        borderColor: "pink",
        tension: 0,
        type: "line",
        order: 0,
        borderWidth: 3,
      },
      
    ],
  };

const options = {
  reponsive: true,
  maintainAspectRatio: false,
  type: "bar",
  data: data,
  plugins: {
    legend: {
      labels: {
        color: "white",
      },
      display: true,
    },
  },
  scales: {
    y: {
      ticks: {
        color: "white",
      },
      beginAtZero: true,
      grid: {
        color: "#3F3F3F",
      },
    },
    x: {
      ticks: {
        color: "white",
      },
      grid: {
        color: "#3F3F3F",
      },
    },
  },
};

  useEffect(() => {

    // 시간대별 전력소비량/탄소배출량
    axios
      .post("http://127.0.0.1:3001/ChartNow", {
      })
      .then((result) => {
        // 받는 부분
        console.log("todayElect : ", result.data.todayElect);
        console.log("yesterdayElect : ", result.data.yesterdayElect);
        console.log("todayLabels : ", result.data.todayLabels);
        // console.log("yesterdayLabels : ", result.data.yesterdayLabels);
        console.log("todayCarbon : ", result.data.todayCarbon);
        console.log("todayPre : ", result.data.todayPre);
        setTodayElect(result.data.todayElect);
        // setYesterdayElect(result.data.yesterdayElect);
        setTodayLabels(result.data.todayLabels);
        setTodayCarbon(result.data.todayCarbon);
        setPredictElect(result.data.todayPre);
      }) // axios로 보낼 위치에 데이터 보내기를 성공하면 then
      .catch(() => {
        console.log("chartnow 데이터 보내기 실패!");
      });
  }, []);
  
    return(
        <>
        {console.log("now 전달 체크 : ", todayElect)}
            <Bar
            data={data}
            options={options} 
            ></Bar>
        </>
    )
}

export default BarChartNow;