import { useEffect, useState } from 'react';
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);

const DoughnutChart= () =>{

  const [totalEmission, setTotalEmission] = useState(0);
  const [accEmission, setAccEmission] = useState(0);
  const [spareEmission, setSpareEmission] = useState(0);

    let data = {
      labels: ["누적 배출량", "여유 배출량"],
      datasets: [
        {
          type: "doughnut",
          data: [accEmission, spareEmission],
          backgroundColor: ["pink", "lightgray"],
          // hoverBackgroundColor:["green","red"], // 호버링 색 정하기
          cutout: "80%", //도넛 내부 직경 크기 변경
          datalabels: {
            color: "black",
            font: { size: 17 },
          },
        },
      ],
      
    };
    
    let options = {
      responsive: false,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: false,
          text: "title",
        },
        datalabels: {
          display:true,
          formatter:((context, args) => {
            const index = args.dataIndex;
            console.log(args.chart.data.labels);
            return (parseFloat((context/totalEmission)*100)+"").slice(0,4)+"%";
          })
        },
        },
      };
      

      //도넛차트 가운데에 글씨넣는 속성 plugins
    let textCenter = {
      id: 'textCenter',
      beforeDatasetsDraw(chart, args, pluginOptions) {
        const {ctx, data} = chart;
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        const num = Object.values(data)[1][0].data[0];
        let num1 = String(num).split(".",2);
        console.log("num1", num1);
        console.log("accEmission", Object.values(data)[1][0].data[0]);

        // 아래 구문을 넣으면 숫자를 3칸씩 ,로 구분해줌
        let num2 = num1[0].split('');
        for (let i = 0; i < num2.length; i++){
          
          // if (i%3 == 1 && i != num2.length-1 && num2.length%2 == 0){
          //   num2[i] = num2[i] + ",";
          // } else if (num2.length%2 == 1 && i != num2.length-1 && (i+1)%3 == 1){
          //   num2[i] = num2[i] + ",";
          // }
        }
        num2 = num2.join('');
        console.log('num2 : ',num2)

        ctx.save();

        //누적 사용 배출권
        ctx.font = 'bolder 13px sans-serif';
        ctx.fillStyle = "#D78C98";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("누적 배출량", xCoor-40, yCoor - 55);

        ctx.font = "bolder 25px sans-serif";
        ctx.fillStyle = "#D78C98";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(num2, xCoor, yCoor - 30);

        ctx.font = "bolder 10px sans-serif";
        ctx.fillStyle = "#D78C98";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("(t/tco2)", xCoor+46, yCoor - 10);
        
        //총 배출 가능
        ctx.font = "bolder 13px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("배출권 총량", xCoor - 40, yCoor + 15);

        ctx.font = "bolder 25px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText('15,000,000', xCoor, yCoor + 40);

        ctx.font = "bolder 10px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("(t/tco2)", xCoor + 46, yCoor + 60);
      }
    }

      useEffect(() => {
        axios
          .post("http://127.0.0.1:3001/Emission", {
          })
          .then((result) => {
            console.log("Emission", result.data.accemission);
            setAccEmission(result.data.accemission);
            setTotalEmission(15000000);
            setSpareEmission(15000000 - result.data.accemission);
          }) // axios로 보낼 위치에 데이터 보내기를 성공하면 then
          .catch(() => {
            console.log("데이터 보내기 실패!");
          });
      }, []);
  return (
    <>
      <Doughnut
        data={data}
        options={options}
        plugins={[textCenter,ChartDataLabels]}
        style={{ display: "inline-block" }}
        width={"320px"}
        height={"320px"}
      />
    </>
  );
}

export default DoughnutChart;