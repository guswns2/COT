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
  // dateStrings : 'date'
});

let adminid; // 관리자 session값 저장 부분
let adminnick; // 관리자닉네임 session값 저장 부분

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
router.post("/Date", function (request, response) {
  console.log("날짜 라우터");
  const date = request.body.datevalue;
  console.log("날짜: " + request.body.datevalue);
  //나중에 다시
  let sql = "";
  conn.query(sql, [date], function (err, rows) {
    if (!err) {
      console.log("입력 완료!");
    } else {
      console.log("입력 실패!" + err);
    }
  });
});
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

// Chart에 대한 라우터
router.post('/Chart',function(request, response){
  console.log("Chart 라우터 진입")
  // const arr1 = [-65, -59, -80, -81, -56, -55, -100]; // DB에서 받은 실제값
  // const arr2 = [50, 30, 20, 50, 70, 60, 90]; // DB에서 받은 예측값
  // const arr3 = [10,20,30,40,50,60,70,80,90,100,110,120];
  // const arr4 = [10,20,30,40,50,60,70,80,90,100,110,120];
  
  // 1. 하루치 전력 합 가져오기 
  let sql1 = 'select sum(usee) sum from usetest WHERE tm BETWEEN "2021-05-28 01:00:00" AND DATE_ADD("2021-05-28 23:00:00", INTERVAL 23 hour)';
  
  // 2. 일주일치 전력 합 가져오기
  let sql2 =
    'select sum(usee) sum from usetest WHERE tm BETWEEN "2021-01-01 00:00:00" AND DATE_ADD("2021-01-01 23:00:00", INTERVAL 6 day)';
  
  // 3. 한달치 전력 합 가져오기
  let sql3 =
    'select * from usetest WHERE tm BETWEEN "2021-01-01 00:00:00" AND DATE_ADD("2021-01-01 00:00:00", INTERVAL 1 month)';

  let sql4 =
    'select * from usetest';

    conn.query(sql1, function (err, rows) {

    if (rows.length > 0) {
      console.log("데이터 받아오기 성공 : " + rows.length);
      console.log("치 : ", rows[0]);
     
      rows[0]
      // console.log("두번째 : " + rows[1].tmp);
      // console.log("세번째 : " + rows[2].tmp);
      // console.log("네번째 : " + rows[3].tmp);
      // console.log("다섯번째 : " + rows[4].tmp);
      // console.log("여섯번째 : " + rows[5].tmp);
      // console.log("일곱번째 : " + rows[6].tmp);
      // console.log(arr1);
      response.json({
        chartdata : rows
        // chartdata2 : arr2,
        // chartdata3 : rows[2].tmp,
        // chartdata4 : arr4
      });
    } else {
      console.log("로그인 실패");
    }
  });
});

module.exports = router;
