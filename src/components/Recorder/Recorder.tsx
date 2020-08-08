import React, { useRef, useState, useEffect } from "react";
import "./Recorder.css";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import { start, stop, selectDateStart } from "../../redux/recorder";
import { addZero } from "../../lib/utils";

const Recorder = () => {
  const dispatch = useDispatch(); // from redux

  const dateStart = useSelector(selectDateStart); //not sure what selector is

  const started: boolean = dateStart !== ""; //
  let interval = useRef<number>(0); // not sure what useRef is
  const [, setCount] = useState<number>(0); //using react hooks to get state

  const handleClick = () => {
    if (started) {
      //already started, pressed to stop
      window.clearInterval(interval.current);
      dispatch(stop());
    } else {
      //starting
      dispatch(start());
      interval.current = window.setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    //cleaning up to avoid memory leak
    return () => {
      window.clearInterval(interval.current);
    };
  }, []);

  //calculating when the button was pressed and current time
  let seconds = started
    ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000)
    : 0;

  const hours = seconds ? Math.floor(seconds / 60 / 60) : 0;
  seconds -= hours * 60 * 60;
  const minutes = seconds ? Math.floor(seconds / 60) : 0;
  seconds -= minutes * 60;

  return (
    <div
      className={cx("recorder", {
        //cs is used to change classnames based on condition
        "recorder-started": started,
      })}
    >
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
