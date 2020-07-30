import React, { useRef, useState, useEffect } from "react";
import "./Recorder.css";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import { start, selectDateStart } from "../../redux/recorder";

const addZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);

const Recorder = () => {
  const dispatch = useDispatch(); // from redux

  const dateStart = useSelector(selectDateStart);

  const started = dateStart !== "";
  let interval = useRef<number>(0);
  const [, setCount] = useState<number>(0); //using react hooks

  const handleClick = () => {
    dispatch(start());
    interval.current = window.setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  };

  useEffect(() => {
    //cleaning up to avoid memory leak
    return () => {
      window.clearInterval(interval.current);
    };
  }, []);

  let seconds = started
    ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000)
    : 0;

  const hours = seconds ? Math.floor(seconds / 60 / 60) : 0;
  seconds -= hours * 60 * 60;
  const minutes = seconds ? Math.floor(seconds / 60) : 0;
  seconds -= minutes * 60;

  return (
    <div className={cx("recorder", { "recorder-started": started })}>
      <button className="recorder-record" onClick={handleClick}>
        <span></span>
      </button>
      <div className="recorder-counter">
        {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}
      </div>
    </div>
  );
};

export default Recorder;
