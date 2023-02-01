import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
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

function BarChartPreMonth (props){

  const [realData, setRealData] = useState([]);
  const [preData, setPreData] = useState([]);

  const [labels, setLabels] = useState([]);
  // const monthLabels = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
  // const timelabels = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  
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

      // 이중 그래프에 써먹을 것.
      {
        label: "전력사용량 최대값",
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

    // 월간 전력소비량
    axios
      .post("http://127.0.0.1:3001/Chart30", {
        // SecondSection.js 로부터 props형식으로 받은 날짜값을 전달
        datevalue: props.val,
      })
      .then((result) => {
        // 받는 부분
        console.log("ChartData 받는 부분", result.data.chart30data);
        console.log("라벨 받는 부분", result.data.labels);
        setRealData(result.data.chart30data);
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

export default BarChartPreMonth;