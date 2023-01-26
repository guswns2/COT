import { useEffect } from "react";
import Header from "../components/Header";
import CarbonEmissionCard from "../components/CarbonEmissionCard";
import "./COT.css";

const COT = () => {
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
    <div className="cot" data-animate-on-scroll>
      <Header />
      <CarbonEmissionCard />
      <div className="second-section">
        <div className="second-container1" id="info1-con2">
          <div className="second-info1" id="Second Info1" />
        </div>
        <div className="second-container2" id="info1-con1">
          <div className="second-info2" id="Second Info2" />
          <div className="second-info3" id="info1-c1d2">
            <div className="info3-box1" id="info1-c1d2" />
            <div className="info3-box1" id="info1-c1d2" />
          </div>
        </div>
        <div className="second-container3" id="info1-con2">
          <div className="second-info1" id="Second Info4" />
        </div>
      </div>
    </div>
  );
};

export default COT;
