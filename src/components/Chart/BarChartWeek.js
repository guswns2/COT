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
    Legend
)

function BarChartWeek (props){

  const [realData, setRealData] = useState([]);
  const [preData, setPreData] = useState([]);
  const [labels, setLabels] = useState([]);
  
  const data = {
    labels: labels,
    datasets: [
      {
        label: "전력사용량",
        data: realData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 2,
      },

      // 이중 그래프에 써먹을 것. Line 그래프
      {
        label : '전력사용량 최대값',
        data: realData,
        backgroundColor: "#A5FB7E",
        borderColor: "#A5FB7E",
        tension: 0,
        type: "line",
        order: 0,
        borderWidth: 3,
      },
    ],
  };

const config = {
    type:"bar",
    data: data,
    options: {
          scales: {
          y: {
            beginAtZero: true,
          },
      plugins:{
        legend:{
            labels:{
              boxWidth: 0
            },
        },
       },
        },
      },
      
}

  useEffect(() => {

    // 주간 전력소비량
    axios
      .post("http://127.0.0.1:3001/ChartWeek", {
        // SecondSection.js 로부터 props형식으로 받은 날짜값을 전달
        datevalue: props.val,
      })
      .then((result) => {
        // 받는 부분
        console.log("ChartData 받는 부분", result.data.chartweekdata);
        console.log("라벨 받는 부분", result.data.labels);
        setRealData(result.data.chartweekdata);
        setLabels(result.data.labels);
      }) // axios로 보낼 위치에 데이터 보내기를 성공하면 then
      .catch(() => {
        console.log("데이터 보내기 실패!");
      });
  }, [props.val]);
  
    return(
        <>
        {console.log("만약? 여기서 : ", realData)}
            <Bar
            data={data}
            config={config}
            options= {{
                  reponsive:true,
                  maintainAspectRatio: false,
                  plugins : {
                    legend :{
                    display:false
                      }
                  }  
                    }} 
            ></Bar>
        </>
    )
}

export default BarChartWeek;