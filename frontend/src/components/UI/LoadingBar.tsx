import classes from "./LoadingBar.module.css";
import { useEffect, useState } from "react";
function LoadingBar() {
  const [filled, setFilled] = useState<number>(0);
  useEffect(() => {
    if (filled < 100) {
      setTimeout(() => {
        setFilled((currentState) => currentState + 2);
      }, 50);
    }
  }, [filled]);
  return (
    <div className={classes["loading-bar"]} style={{ width: `${filled}vw` }} />
  );
}

export default LoadingBar;
