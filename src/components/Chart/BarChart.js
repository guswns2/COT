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

function BarChart (){

  const [realData, setRealData] = useState([]);
  const [preData, setPreData] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [monthData2, setMonthData2] = useState([]);
  // const [tmp, setTmp] = useState([]);

  const labels = ['Mon','Tue','Wed','Tur','Fri','Sat','Sun']
  const monthLabels = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
  const timelabels = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  
  const data = {
  labels: labels,
  datasets: [
    {
    data: realData,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 2
    
  },
  // {
  //   data: preData,
  //   backgroundColor: [
  //     'rgba(255, 99, 132, 0.2)',
  //     'rgba(255, 159, 64, 0.2)',
  //     'rgba(255, 205, 86, 0.2)',
  //     'rgba(75, 192, 192, 0.2)',
  //     'rgba(54, 162, 235, 0.2)',
  //     'rgba(153, 102, 255, 0.2)',
  //     'rgba(201, 203, 207, 0.2)'
  //   ],
  //   borderColor: [
  //     'rgb(255, 99, 132)',
  //     'rgb(255, 159, 64)',
  //     'rgb(255, 205, 86)',
  //     'rgb(75, 192, 192)',
  //     'rgb(54, 162, 235)',
  //     'rgb(153, 102, 255)',
  //     'rgb(201, 203, 207)'
  //   ],
  //   borderWidth: 2 
  // }
]
  
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
    // axios
    //       .post("http://127.0.0.1:3001/Chart", {
    //       // 보내는 부분 없음
    //       })
    //       .then((result) => {
    //         // 받는 부분
    //         console.log("ChartData 받는 부분", result.data.chartdata[0]);
    //         let arr = [];
    //         let arr2 = [];
    //         for (let i = 0; i < result.data.chartdata.length; i++){
    //           arr.push(Object.values(result.data.chartdata[i]));
    //           console.log("arr : ", arr); // arr은 이중 배열
    //           arr2.push(arr[i][0]);
    //           console.log("arr2 : ", arr2); // arr2는 전력값
    //         }
    //         setRealData(arr2);
    //         console.log("리얼데이터 : ",realData);
           
    //         // setRealData(chartdata);
    //       }) // axios로 보낼 위치에 데이터 보내기를 성공하면 then
    //       .catch(() => {
    //         console.log("데이터 보내기 실패!");
    //       });

    // 주간 전력소비량
          axios
            .post("http://127.0.0.1:3001/Chart7", {
              // 보내는 부분 없음
            })
            .then((result) => {
              // 받는 부분
              console.log("ChartData 받는 부분", result.data.chart7data);
              let arr = [];
              let arr2 = [];
              // for (let i = 0; i < result.data.chart7data.length; i++) {
              //   arr.push(Object.values(result.data.chart7data[i]));
              //   console.log("arr : ", arr); // arr은 이중 배열
              //   arr2.push(arr[i][0]);
              //   console.log("arr2 : ", arr2); // arr2는 전력값
              // }
              // setRealData(arr2);
              // console.log("리얼데이터 : ", realData);

              // setRealData(chartdata);
            }) // axios로 보낼 위치에 데이터 보내기를 성공하면 then
            .catch(() => {
              console.log("데이터 보내기 실패!");
            });
  },[]);
  

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

export default BarChart;