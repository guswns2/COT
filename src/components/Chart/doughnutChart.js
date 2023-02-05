import { useEffect, useState } from 'react';
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);

function DoughnutChart() {
  const [data, setData] = useState({
    datasets: [{
        data: [10, 20],
        backgroundColor:[
          'pink',
          'purple'
        ]
    },
  ],
  labels: [
      'pink',
      'purple'
  ], 
});
  useEffect(()=> {
    const fetchData = () =>  {
      fetch().then((data) => {
        const res = data.json();
        return res
      }).then((res) => {
        console.log("resss", res)
        const label = [];
        const data = [];
        for(var i of res) {
            label.push(i.name);
            data.push(i.id)
        }
        setData(
          {
            datasets: [{
                data:data,
                backgroundColor:[
                  'pink',
                  'purple'
                ]
            },
          ],
          labels:label, 
        }
        )

      }).catch(e => {
        console.log("error", e)
      }) 
    }
  fetchData();
  }, [])

  return (
    <>
      <Doughnut data={data}/>
    </>
  );
}

export default DoughnutChart;