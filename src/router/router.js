

const { appBarClasses } = require("@mui/material");
const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const path = require("path");
const { arrayBuffer } = require("stream/consumers");

let conn = mysql.createConnection({
  host: "project-db-stu.ddns.net",
  user: "cot",
  password: "sion1234",
  port: "3307",
  database: "cot",
  dateStrings : 'date'
});

router.get("*", function (request, response) {
  console.log("Happy Hacking!");
  response.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

//CUST,ADMIN 로그아웃 라우터 (유현 - Fin)
router.get("/Logout", function (request, response) {
  console.log("로그아웃 라우터");

  window.localStorage.clear();
  console.log("스토리지 삭제 완료");

  delete request.session.user;
  console.log("로그아웃완료");

  // response.redirect("http://127.0.0.1:3000/");
});

//로그인 라우터
router.post("/Login", function (request, response) {
  console.log("로그인 라우터");
  const id = request.body.ID;
  const pw = request.body.PW;

  console.log("사용자가 보낸 id : " + request.body.ID);
  console.log("사용자가 보낸 PW : " + request.body.PW);

  //나중에 다시
  let sql = "select * from USER where USER_ID = ? and USER_PW = ?";

  conn.query(sql, [id, pw], function (err, rows) {
    if (rows.length > 0) {
      console.log("로그인성공 : " + rows.length);
      request.session.user = {
        id: rows[0].id,
      };
      idqwe = request.session.user.id;

      response.json({ result: "success", id: id });
    } else {
      console.log("로그인 실패");
    }
  });
});

//회원가입
router.post("/SignIn", function (request, response) {
  console.log("회원가입 라우터");
  const userID = request.body.ID;
  const userPW = request.body.PW;
  const userName = request.body.name;
  const company = request.body.company;
  const comadd = request.body.comadd;

  console.log("사용자가 입력한 ID : " + request.body.ID);
  console.log("사용자가 입력한 PW : " + request.body.PW);
  console.log("사용자가 입력한 이름 : " + request.body.name);
  console.log("사용자가 입력한 회사 : " + request.body.company);
  console.log("사용자가 입력한 회사주소 : " + request.body.comadd);

  let sql =
    //sql문 나중에 다시
    "insert into USER(USER_ID, USER_PW, USER_NAME, COMP_NAME, COMP_ADD) values(?, ?, ?, ?, ?)";
  conn.query(
    sql,
    [userID, userPW, userName, company, comadd],
    function (err, rows) {
      if (!err) {
        console.log("회원가입 완료!");
        response.json({ result: "success Join" });
      } else {
        console.log("회원가입 실패!" + err);
      }
    }
  );
});

//모달 사용량 입력 라우터
router.post("/Modal", function (request, response) {
  console.log("사용량 입력 라우터");
  const elec = request.body.elec;
  const co2 = request.body.co2;

  console.log("사용자가 보낸 전력사용량 : " + request.body.elec);
  console.log("사용자가 보낸 탄소배출량 : " + request.body.co2);

  //나중에 다시
  let sql = "insert into PREDICT(PRE_POWER, PRE_CARBON) values (?, ?)";

  conn.query(sql, [elec, co2], function (err, rows) {
    if (!err) {
      console.log("입력 완료!");
      response.redirect("http://127.0.0.1:3000");
    } else {
      console.log("입력 실패!" + err);
    }
  });
});

//날짜 데이터 값 보내기 라우터
// router.post("/Date", function (request, response) {
//   console.log("날짜 라우터");
//   const date = request.body.datevalue;
//   console.log("날짜: " + request.body.datevalue);
//   //나중에 다시
//   let sql = "";
//   conn.query(sql, [date], function (err, rows) {
//     if (!err) {
//       console.log("입력 완료!");
//     } else {
//       console.log("입력 실패!" + err);
//     }
//   });
// });

//ADMIN 회원가입 라우터 (유현 - Fin)
router.post("/Adjoinus", function (request, response) {
  console.log("관리자 가입 라우터");

  let id = request.body.id;
  let pw = request.body.pw;
  // let cafeName = request.body.cafeName;
  // let cafeTel = request.body.cafeTel;
  // let cafeAdd = request.body.cafeAdd;
  let BusinessNum = request.body.BusinessNum;

  console.log("사용자가 보낸 id : " + id);
  console.log("사용자가 보낸 PW : " + pw);
  // console.log("사용자가 보낸 cafeName : " + cafeName);
  // console.log("사용자가 보낸 cafeTel : " + cafeTel);
  // console.log("사용자가 보낸 cafeAdd : " + cafeAdd);
  console.log("사용자가 보낸 businessNum : " + BusinessNum);
  let sql = "insert into ADMINISTRATOR values(?, ?, '' ,?)";

  conn.query(sql, [id, pw, BusinessNum], function (err, rows) {
    if (!err) {
      console.log("입력성공");

      response.json({
        id: id,
        pw: pw,
        // cafeName: cafeName,
        // cafeTel: cafeTel,
        // cafeAdd: cafeAdd,
        BusinessNum: BusinessNum,
      });
    } else {
      console.log("입력실패" + err);
    }
  });
});


// 시간별 전력소비량/탄소배출량
router.post('/ChartNow',function(request, response){
  console.log("ChartNow 라우터 진입");

  // n만큼의 시간을 더하면 날짜를 반환해줌
  function StringToHours(n) {

    let stringNewDate = new Date();
    stringNewDate.setHours(stringNewDate.getHours()+n);

    return (
      stringNewDate.getFullYear() +
      "-" +
      (stringNewDate.getMonth() + 1 > 9
        ? (stringNewDate.getMonth() + 1).toString()
        : "0" + (stringNewDate.getMonth() + 1)) +
      "-" +
      (stringNewDate.getDate() > 9
        ? stringNewDate.getDate().toString()
        : "0" + stringNewDate.getDate().toString()) +
        " " +
        (stringNewDate.getHours()) + ":00:00"
    );
  }

  console.log("현재시간 : ", StringToHours(0));

  // 시간단위 전력 가져오기
  let date = StringToHours(0);
  console.log("여기있따!",date);
  let sql = `select * from dayuse WHERE use_day BETWEEN "${date.slice(0,10)} 00:00:00" AND "${date} 23:00:00"`;
  let sql2 = `select * from predict WHERE pre_time BETWEEN "${date.slice(0,10)} 00:00:00" AND "${date.slice(0,10)} 23:00:00" AND pre_id = "7" LIMIT 24;`;
  conn.query(sql, function (err, rows) {
    let preArr = [];

    // 예측 전력량 반복문
    conn.query(sql2, (err2, rows2) => {
      if (rows2.length > 0) {
        console.log("데이터 받아오기 성공 pre : " + rows2.length);
        for (let i = 0; i < rows2.length; i++) {
          preArr.push(rows2[i].pre_power);
          // console.log(`row2[${i}]`, rows2[i]);
        }
      }
      if (rows.length > 0) {
        console.log("preArr : ", preArr);
        console.log("데이터 받아오기 성공 time : " + rows.length);
        let labelsArr = [];
        let electArr = [];
        let carbonArr = [];

        // 라벨, 전력, 탄소 배열
        for (let i = 0; i < rows.length; i++) {
          electArr.push(rows[i].use_power);
          carbonArr.push(rows[i].use_carborn);
          console.log(`row[${i}]`, rows[i]);
        }
        for (let i = 0; i < 24; i++) {
          if (i == 0){
            labelsArr.push(date.slice(5, 10) + " 0" + i + "시");
          } else if(i < 10){
            labelsArr.push("0" + i + "시");
          } else {
            labelsArr.push(i + "시");
          }
        }


        // 라벨 날짜 맞추는 부분
        let todayLabels = labelsArr;
        // let yesterdayLabels = labelsArr.slice(0, 24);
        // for (let i = 0; i < todayLabels.length; i++) {
        //   if (i == 0 || todayLabels[i].substring(11, 13) == "00") {
        //     todayLabels.splice(i, 1, todayLabels[i].substring(5, 13) + "시");
        //   } else {
        //     todayLabels.splice(i, 1, todayLabels[i].substring(11, 13) + "시");
        //   }

        //   // yesterdayLabels.splice(i,1,yesterdayLabels[i].substring(5,13));
        // }

        // 전력사용량/탄소배출량 배열 적용
        let todayElect = electArr;
        let todayCarbon = carbonArr;
        // 전력 예측량 배열 적용
        let todayPre = preArr;
        // let yesterdayElect = electArr.slice(0,24);

        console.log("labelsArr : ", labelsArr);
        console.log("todayLabels : ", todayLabels);
        // console.log('yesterdayLabels : ',yesterdayLabels);
        console.log("electArr : ", electArr);
        console.log("todayElect : ", todayElect);
        console.log("todayCarbon", todayCarbon);
        console.log("todayPre : ", todayPre);
        // console.log('yesterdayElect : ',yesterdayElect);

        response.json({
          todayElect: todayElect,
          todayCarbon: todayCarbon,
          // yesterdayElect: yesterdayElect,
          todayLabels: todayLabels,
          todayPre: todayPre,
          // yesterdayLabels:yesterdayLabels,
          nowtime: date,
        });
      } else {
        console.log("ChartWeek 실패");
      }
    });
  });
});

// 7일간 전력소비량/탄소배출량 BarChartWeek
router.post('/ChartWeek',function(request, response){
  console.log("ChartWeek 라우터 진입");

  if (request.body.datevalue != null){
    let date1 = request.body.datevalue;
    console.log('date1',date1);
    let stringDate = String(date1);

  // 날짜를 더할 수 있는 함수 (날 기준)
  function StringToDate(date, n) {
    let yyyy = date.substring(0, 4);
    let mm = date.substring(5, 7);
    let dd = date.substring(8, 10);
    mm = Number(mm) - 1;

    let stringNewDate = new Date(yyyy, mm, dd);
    stringNewDate.setDate(stringNewDate.getDate() + n);

    return (
      stringNewDate.getFullYear() +
      "-" +
      (stringNewDate.getMonth() + 1 > 9
        ? (stringNewDate.getMonth() + 1).toString()
        : "0" + (stringNewDate.getMonth() + 1)) +
      "-" +
      (stringNewDate.getDate() > 9
        ? stringNewDate.getDate().toString()
        : "0" + stringNewDate.getDate().toString())
    );
  }

  let chartweekpower = [];
  let chartweekcarborn = [];
  let labels = [];
  for (let i = 0; i < 7; i++) {

    // 1. 한시간씩 전력 가져오기
    let date = StringToDate(stringDate, i);
    labels.push(date.substring(5,7)+"월 "+date.substring(8,10)+'일');

    let sql = `select sum(use_power) power, sum(use_carborn) carborn from dayuse WHERE use_day BETWEEN "${date} 00:00:00" AND DATE_ADD("${date} 00:00:00", INTERVAL 23 hour)`;

    conn.query(sql, function (err, rows) {
      if (rows.length > 0) {
        console.log("데이터 받아오기 성공 : " + rows.length);
        console.log("power : ", rows);
        chartweekpower.push(rows[0].power);
        chartweekcarborn.push(rows[0].carborn);
        if (chartweekpower.length == 7){
           response.json({
             chartweekpower: chartweekpower,
             chartweekcarborn: chartweekcarborn,
             labels : labels
           });
           console.log("데이터 보내기 성공 - ChartWeek");
        }
      } else {
        console.log("ChartWeek 실패");
      }
    });
  }
}
});

// 한달간 일일 전력소비량/탄소배출량 BarChartMonth
router.post('/ChartMonth',function(request, response){
  console.log("ChartMonth 라우터 진입");

  if (request.body.datevalue != null){
    let date1 = request.body.datevalue;
    console.log('date1',date1);
    let stringDate = String(date1);

  // 날짜를 더할 수 있는 함수 (날 기준)
  function StringToDate(date, n) {
    let yyyy = date.substring(0, 4);
    let mm = date.substring(5, 7);
    let dd = date.substring(8, 10);
    mm = Number(mm) - 1;

    let stringNewDate = new Date(yyyy, mm, dd);
    stringNewDate.setDate(stringNewDate.getDate() + n);

    return (
      stringNewDate.getFullYear() +
      "-" +
      (stringNewDate.getMonth() + 1 > 9
        ? (stringNewDate.getMonth() + 1).toString()
        : "0" + (stringNewDate.getMonth() + 1)) +
      "-" +
      (stringNewDate.getDate() > 9
        ? stringNewDate.getDate().toString()
        : "0" + stringNewDate.getDate().toString())
    );
  }

  let chartmonthpower = [];
  let chartmonthcarborn = [];
  let labels = [];
  for (let i = 0; i < 30; i++) {

    // 1. 한시간씩 전력 가져오기
    let date = StringToDate(stringDate, i);
    if (date.substring(8,10)=='01' || i == 0){
      labels.push(date.substring(5, 7) + "월 " + date.substring(8, 10) + "일");
    }else
    labels.push(date.substring(8,10)+'일');

    let sql = `select sum(use_power) power, sum(use_carborn) carborn from dayuse WHERE use_day BETWEEN "${date} 00:00:00" AND DATE_ADD("${date} 00:00:00", INTERVAL 23 hour)`;

    conn.query(sql, function (err, rows) {
      if (rows.length > 0) {
        console.log("데이터 받아오기 성공 : " + rows.length);
        chartmonthpower.push(rows[0].power);
        chartmonthcarborn.push(rows[0].carborn);
        if (chartmonthpower.length == 30){
           response.json({
             chartmonthpower: chartmonthpower,
             chartmonthcarborn: chartmonthcarborn,
             labels : labels
           });
           console.log("데이터 보내기 레츠기릿! - chartmonth");
        }
      } else {
        console.log("ChartMonth 실패");
      }
    });
  }
}
});

// 월간 전력소비량/탄소배출량 BarChartYear
router.post('/ChartYear',function(request, response){
  console.log("ChartYear 라우터 진입");

  if (request.body.datevalue != null){
    let date = request.body.datevalue;
    console.log("date", date);
  // let stringDate = String(date1);

  // // 날짜를 더할 수 있는 함수 (월 기준)
  function StringToMonth(date, n) {
    let yyyy = date.substring(0, 4);
    let mm = date.substring(5, 7);
    let dd = date.substring(8, 10);
    mm = Number(mm) - 1;

    let stringNewDate = new Date(yyyy, mm, dd);
    stringNewDate.setMonth(stringNewDate.getMonth() + n);

    return (
      stringNewDate.getFullYear() +
      "-" +
      (stringNewDate.getMonth() + 1 > 9
        ? (stringNewDate.getMonth() + 1).toString()
        : "0" + (stringNewDate.getMonth() + 1)) +
      "-" +
      (stringNewDate.getDate() > 9
        ? stringNewDate.getDate().toString()
        : "0" + stringNewDate.getDate().toString())
    );
  }

  // // 날짜를 더할 수 있는 함수 (일 기준)
  function StringToDate(date, n) {
    let yyyy = date.substring(0, 4);
    let mm = date.substring(5, 7);
    let dd = date.substring(8, 10);
    mm = Number(mm) - 1;

    let stringNewDate = new Date(yyyy, mm, dd);
    stringNewDate.setDate(stringNewDate.getDate() + n);

    return (
      stringNewDate.getFullYear() +
      "-" +
      (stringNewDate.getMonth() + 1 > 9
        ? (stringNewDate.getMonth() + 1).toString()
        : "0" + (stringNewDate.getMonth() + 1)) +
      "-" +
      (stringNewDate.getDate() > 9
        ? stringNewDate.getDate().toString()
        : "0" + stringNewDate.getDate().toString())
    );
  }

  let chartyearpower = [];
  let chartyearcarborn = [];
  for (let i = 0; i < 12; i++) {
    let dateyear = date.substring(0, 4);
    let datemonth = 0;
    if (i+1 < 10){
      datemonth = StringToDate(StringToMonth(dateyear + "-" + "0"+(i + 1) + "-01", 1),-1);
    } else{
      datemonth = StringToDate(StringToMonth(dateyear + "-" + (i + 1) + "-01", 1),-1);
    }
    
    console.log('dateyear : ', dateyear);
    console.log('datemonth : ', datemonth);

    // 한달치 전력 합 가져오기
    let sql = `select sum(use_power) power, sum(use_carborn) carborn from dayuse WHERE use_day BETWEEN 
    "${dateyear + "-" + (i + 1) + "-01"} 00:00:00" AND "${datemonth} 23:00:00"`;

    conn.query(sql, function (err, rows) {
      if (rows.length > 0) {
        console.log("데이터 받아오기 성공 월간 : " + rows.length);
        console.log(rows);
        chartyearpower.push(rows[0].power);
        chartyearcarborn.push(rows[0].carborn);
        if (chartyearpower.length == 12) {
          response.json({
            chartyearpower: chartyearpower,
            chartyearcarborn: chartyearcarborn,
            labels: date.substring(0, 4) + "년 ",
          });
          console.log("데이터 보내기 레츠기릿연간! : ", chartyearpower);
        }
      } else {
        console.log("chartyear 실패");
      }
    });
  }
}
});

// 탄소배출권 라우터
router.post('/Emission',function(request, response){
  console.log("Emission 라우터 진입");

  // n만큼의 시간을 더하면 날짜를 반환해줌
  function StringToHours(n) {

    let stringNewDate = new Date();
    stringNewDate.setHours(stringNewDate.getHours()+n);

    return (
      stringNewDate.getFullYear() +
      "-" +
      (stringNewDate.getMonth() + 1 > 9
        ? (stringNewDate.getMonth() + 1).toString()
        : "0" + (stringNewDate.getMonth() + 1)) +
      "-" +
      (stringNewDate.getDate() > 9
        ? stringNewDate.getDate().toString()
        : "0" + stringNewDate.getDate().toString()) +
        " " +
        (stringNewDate.getHours()) + ":00:00"
    );
  }

  console.log("현재시간 : ", StringToHours(0));

  // 시간단위 전력 가져오기
  let date = '2020-10-15 00:00:00';
  let sql = `select sum(use_carborn) carborn from dayuse WHERE use_day BETWEEN DATE_ADD("${date.slice(0,4)}-01-01 00:00:00", INTERVAL -23 hour) AND "${date}"`;

  conn.query(sql, function (err, rows) {
    if (rows.length > 0) {
      console.log("데이터 받아오기 성공 accEmssion : " + rows.length);
      console.log("rows : ", rows)
      console.log("accEmission : ", rows[0].carborn);
      let accemission = rows[0].carborn;
      response.json({
        accemission : accemission,
      });
    } else {
      console.log("Emission 실패");
    }
  });
});

//MainSection
router.post("/MainSection", function (request, response) {
  console.log("MainSection 라우터 진입");

  // n만큼의 시간을 더하면 날짜를 반환해줌
  function StringToHours(n) {
    let stringNewDate = new Date();
    stringNewDate.setHours(stringNewDate.getHours() + n);

    return (
      stringNewDate.getFullYear() +
      "-" +
      (stringNewDate.getMonth() + 1 > 9
        ? (stringNewDate.getMonth() + 1).toString()
        : "0" + (stringNewDate.getMonth() + 1)) +
      "-" +
      (stringNewDate.getDate() > 9
        ? stringNewDate.getDate().toString()
        : "0" + stringNewDate.getDate().toString()) +
      " " +
      stringNewDate.getHours() +
      ":00:00"
    );
  }

  console.log("현재시간 : ", StringToHours(0));

  // 시간단위 전력 가져오기
  let date = StringToHours(0);
  let sql = `select sum(use_power) power, sum(use_carborn) carborn from dayuse WHERE use_day BETWEEN "${date.slice(0,10)} 00:00:00" AND "${date}"`;

  conn.query(sql, function (err, rows) {
    if (rows.length > 0) {
      console.log('MainSection : ', rows);
      response.json({
        mainsection : rows,
      });
    } else {
      console.log("MainSection 실패");
    }
  });
});

router.post("/ReportData", function (request, response) {
  console.log("ReportData 라우터 진입");

  let weekPower = request.body.weekPower;
  let weekCarborn = request.body.weekCarborn;
  let weeklabels = request.body.weeklabels;
  let monthPower = request.body.monthPower;
  let monthCarborn = request.body.monthCarborn;
  let monthlabels = request.body.monthlabels;
  let yearPower = request.body.yearPower;
  let yearCarborn = request.body.yearCarborn;
  let yearlabels = request.body.yearlabels;
  let selectdate = request.body.selectdate;

  // 선택날짜 삭제
  let deletesqlselected = "delete from selectedDate";
  conn.query(deletesqlselected, function (err, rows) {
    if (!err) {
      console.log("deletesqlselected 삭제 성공");
    } else {
      console.log("deletesqlselected 삭제 실패");
    }
  });

  // 리포트 주간 삭제
  let deletesqlweek = "delete from reportdataWeek";
  conn.query(deletesqlweek, function (err, rows) {
    if (!err) {
      console.log("reportdataWeek 삭제 성공");
    } else {
      console.log("reportdataWeek 삭제 실패");
    }
  });

  // 리포트 월간 삭제
  let deletesqlmonth = "delete from reportdataMonth";
  conn.query(deletesqlmonth, function (err, rows) {
    if (!err) {
      console.log("reportdataMonth 삭제 성공");
    } else {
      console.log("reportdataMonth 삭제 실패");
    }
  });

  //리포트 연간 삭제
  let deletesqlyear = "delete from reportdataYear";
  conn.query(deletesqlyear, function (err, rows) {
    if (!err) {
      console.log("reportdataYear 삭제 성공");
    } else {
      console.log("reportdataYear 삭제 실패");
    }
  });

  // 선택날짜 데이터 입력
  // selectedDate 테이블에 넣기
  let sql = "insert selectedDate values(?)";

  conn.query(sql, [selectdate], function (err, rows) {
    if (!err) {
      console.log("reportdataWeek 성공");
    } else {
      console.log("reportdataWeek 실패");
    }
  });
  

  // 주간 리포트 데이터 입력
  for (let i = 0; i < weekPower.length; i++) {
    // reportdataWeek 테이블에 넣기
    let sql = "insert reportdataWeek values(?,?,?)";
    if (monthPower[i] == "") {
      conn.query(sql, [null, null, weeklabels[i]], function (err, rows) {
        if (!err) {
          console.log("reportdataWeek 성공");
        } else {
          console.log("reportdataWeek 실패");
        }
      });
    } else {
      conn.query(
        sql,
        [weekPower[i], weekCarborn[i], weeklabels[i]],
        function (err, rows) {
          if (!err) {
            console.log("reportdataWeek 성공");
          } else {
            console.log("reportdataWeek 실패");
          }
        }
      );
    }
  }

  // 월간 리포트 데이터 입력
  for (let i = 0; i < monthPower.length; i++) {
    // reportdataMonth 테이블에 넣기
    let sql = "insert reportdataMonth values(?,?,?)";
    if (monthPower[i] == "") {
      conn.query(sql, [null, null, monthlabels[i]], function (err, rows) {
        if (!err) {
          console.log("reportdataMonth 성공");
        } else {
          console.log("reportdataMonth 실패");
        }
      });
    } else {
      conn.query(
        sql,
        [monthPower[i], monthCarborn[i], monthlabels[i]],
        function (err, rows) {
          if (!err) {
            console.log("reportdataMonth 성공");
          } else {
            console.log("reportdataMonth 실패");
          }
        }
      );
    }
  }

  // 연간 리포트 데이터 입력
  for (let i = 0; i < yearPower.length; i++) {
    // reportdataYear 테이블에 넣기
    let sql = "insert reportdataYear values(?,?,?)";
    if (yearPower[i] == "") {
      conn.query(sql, [null, null, yearlabels[i]], function (err, rows) {
        if (!err) {
          console.log("reportdataYear 성공");
          if (i == yearPower.length - 1) {
            response.json({
              result: i,
            });
          }
        } else {
          console.log("reportdataYear 실패");
        }
      });
    } else {
      conn.query(
        sql,
        [yearPower[i], yearCarborn[i], yearlabels[i]],
        function (err, rows) {
          if (!err) {
            console.log("reportdataYear 성공");
            if (i == yearPower.length - 1) {
              response.json({
                result: i,
              });
            }
          } else {
            console.log("reportdataYear 실패");
          }
        }
      );
    }
  }
});

module.exports = router;
 