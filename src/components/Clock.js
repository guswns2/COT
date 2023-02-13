import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <span>{time.toLocaleDateString()}{time.getDay()}</span><br></br>
      <span>{time.toLocaleTimeString()}</span>
    </>
  );
}

export default Clock;
