import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const Clock1 = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [limit, setLimit] = useState(2);
  const [isBreak, setIsBreak] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            clearInterval(interval);
            handleCycleCompletion();
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, minutes, seconds]);

  const handleCycleCompletion = () => {
    if (isBreak) {
      setCycles((prevCycles) => prevCycles + 1);
      setIsBreak(false);
      setMinutes(25);
      setSeconds(0);
    } else {
      setIsBreak(true);
      setMinutes(5);
      setSeconds(0);
    }

    if (limit !== 0 && cycles + 1 === limit) {
      setIsRunning(false);
    }
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setCycles(0);
    setMinutes(25);
    setSeconds(0);
  };
  let increase = () => {
    setLimit(limit + 1)
  }
  let decrease = () => {
    setLimit(limit - 1)
  }
  return (
    <Container maxWidth sx={{ margin: "0px", width: "100%", }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Pomodoro Clock</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>cycle limit : {limit}</h1>
      </div>




      <div style={{ display: "flex", justifyContent: "center" }}>

        {isBreak ? <p>Break Time &nbsp; </p> : <p>Work Time &nbsp; </p>}
        <p>
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>

      </div>

      <div className="flex" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", }}>
        {!isRunning && cycles !== limit && (
          <Button variant="contained" onClick={handleStart}>Start</Button>
        )}

        {isRunning && (
          <Button variant="contained" onClick={handleStop}>Stop</Button>
        )}
        <Button variant="contained" onClick={handleReset}>Reset</Button>
        <Button variant="contained" onClick={increase}> increase limit</Button>
        <Button variant="contained" disabled={limit === 0} onClick={decrease}>decrease limit</Button>
      </div>




    </Container>
  );
};

export default Clock1;
