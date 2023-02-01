const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {},
    {
      label: "Weekly Sales",
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: [
        "#FF0000",
        "#FF8000",
        "#FFFF00",
        "#3ADF00",
        "#0101DF",
        "#000080",
        "#5F04B4",
      ],
      borderRadius: 10, // Bar의 반지름
      borderSkipped: true, // Bar의 모든 권한 생략
      order: 78,
    },
    {
      label: "Weekly Sales",
      data: [20, 15, 9, 9, 15, 13, 19],
      backgroundColor: "#04B45F",
      borderColor: "#04B45F",
      tension: 0.6,
      type: "line",
      order: 1,
    },
  ],
};
const config = {
  type: "bar",
  data,
  options: {
    plugins: {
      tootip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
        stacked: true,
      },
    },
  },
};
