import React, { useContext } from "react";
import { CursorContext } from "./Cursormanager";
import "./style.scss";

// TODO: Hide if cursor not moved
const CustomCursor = () => {
  const { size } = useContext(CursorContext);
  const secondaryCursor = React.useRef(null);
  const positionRef = React.useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  });

  React.useEffect(() => {

    const moveHandler = (event) => {
      const posX = event.clientX ?? event.touches?.[0]?.clientX;
      const posY = event.clientY ?? event.touches?.[0]?.clientY;
  
      positionRef.current.mouseX =
        posX - secondaryCursor.current.clientWidth / 2;
      positionRef.current.mouseY =
        posY - secondaryCursor.current.clientHeight / 2;
    };
  
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("touchmove", moveHandler);
    
    return () => {
      // Don't forget to clean up both event listeners
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("touchmove", moveHandler);
    };
  }, []);

  React.useEffect(() => {
    const followMouse = () => {
      positionRef.current.key = requestAnimationFrame(followMouse);
      const {
        mouseX,
        mouseY,
        destinationX,
        destinationY,
        distanceX,
        distanceY,
      } = positionRef.current;
      if (!destinationX || !destinationY) {
        positionRef.current.destinationX = mouseX;
        positionRef.current.destinationY = mouseY;
      } else {
        positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
        positionRef.current.distanceY = (mouseY - destinationY) * 0.1;
        if (
          Math.abs(positionRef.current.distanceX) +
            Math.abs(positionRef.current.distanceY) <
          0.1
        ) {
          positionRef.current.destinationX = mouseX;
          positionRef.current.destinationY = mouseY;
        } else {
          positionRef.current.destinationX += distanceX;
          positionRef.current.destinationY += distanceY;
        }
      }
      secondaryCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
    };
    followMouse();
  }, []);
  return (
    <div className="cursor-wrapper">
      <div className={`secondary-cursor ${size}`} ref={secondaryCursor}></div>
    </div>
  );
};

export default CustomCursor;