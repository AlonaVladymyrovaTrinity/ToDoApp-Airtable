import React, { useState, useEffect } from "react";
import style from "../css/ResizeAnimationStopper.module.css";
import PropTypes from "prop-types";

/*This will stop all transitions and animations on all elements 
while the window is being resized, reducing jank and improving performance.*/

function ResizeAnimationStopper({ children }) {
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      setIsResizing(true);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsResizing(false);
      }, 400);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={isResizing ? style["resize-animation-stopper"] : ""}>
      {children}
    </div>
  );
}

ResizeAnimationStopper.propTypes = {
  children: PropTypes.object,
  // oneOfType([
  //   PropTypes.arrayOf(PropTypes.node),
  //   PropTypes.node,
  //   PropTypes.elementType,
  // ]).isRequired,
};

export default ResizeAnimationStopper;
