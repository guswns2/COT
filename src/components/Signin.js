import { useEffect } from "react";
import { TextField, Input, Icon } from "@mui/material";
import "./css/Signin.css";

const Signin = () => {
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  return (
    <div className="signin" data-animate-on-scroll>
      <div className="frame">
        <div className="rec1">
          <section className="rec-item" id="LoginContainer" />
        </div>
        <button className="signbtn1">
          <button className="signbtn-item" />
          <div className="singin1">Singin</div>
        </button>
        <TextField
          className="pw1"
          sx={{ width: 365.3946228027344 }}
          color="primary"
          variant="standard"
          type="text"
          label="PW"
          placeholder="PW"
          size="medium"
          margin="none"
        />
        <TextField
          className="company"
          sx={{ width: 365.3946228027344 }}
          color="primary"
          variant="standard"
          type="text"
          label="회사명"
          placeholder="회사명"
          size="medium"
          margin="none"
        />
        <TextField
          className="comadd"
          sx={{ width: 365.3946228027344 }}
          color="primary"
          variant="standard"
          type="text"
          label="회사주소"
          placeholder="회사주소"
          size="medium"
          margin="none"
        />
        <TextField
          className="id1"
          sx={{ width: 365.3948669433594 }}
          color="primary"
          variant="standard"
          type="text"
          label="ID"
          placeholder="ID"
          size="medium"
          margin="none"
        />
        <TextField
          className="name"
          sx={{ width: 365.3948669433594 }}
          color="primary"
          variant="standard"
          type="text"
          label="Name"
          placeholder="Name"
          size="medium"
          margin="none"
        />
        <div className="sign-in">Sign in</div>
        <img className="signinicon" alt="" src="../icon.svg" />
      </div>
    </div>
  );
};

export default Signin;
