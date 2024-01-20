import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from "classnames"
import "../styles/gallery.scss"
import { CursorContext } from '../CustomCursor/Cursormanager';

const images = [
  "https://images.unsplash.com/photo-1704809938308-8336b66d3fb5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1705292415688-5ce8600bc192?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1705449589011-58b69afb110c?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export const GalleryItem = ({ src }) => {
  const ref = useRef(null);
  const mouseContext = useContext(CursorContext);

  const [clipMaskRadius, setClipMaskRadius] = useState(0);
  const [clipMask, setClipMask] = useState({ x: 0, y: 0 })
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReveal(true);
    }, 100)
  }, []);

  useEffect(() => {
    // Define ref here
    const element = ref.current;

    function getCoordinates(event) {
      const coords = event.changedTouches ? event.changedTouches[0] : event;
      const imagePosition = {
        posX: element.offsetLeft,
        posY: element.offsetTop,
      };

      const posX = coords.pageX - imagePosition.posX;
      const posY = coords.pageY - imagePosition.posY;

      setClipMask({
        x: (posX / element.clientWidth) * 100,
        y: (posY / element.clientHeight) * 100,
      });
    }

    const mouseMoveHandler = (event) => {
      window.requestAnimationFrame(() => {
        getCoordinates(event);
      });
    };

    const touchStartHandler = (event) => {
      setClipMaskRadius(25);
      mouseContext.setSize("hide");
      mouseMoveHandler(event);
    };

    const touchEndHandler = () => {
      setClipMaskRadius(0);
      mouseContext.setSize("small");
    }

    element.addEventListener("mousemove", mouseMoveHandler);
    element.addEventListener("touchmove", mouseMoveHandler);
    element.addEventListener("touchstart", touchStartHandler);
    element.addEventListener("touchend", touchEndHandler);

    // Return a function to clean up the event listener when the component unmounts
    return () => {
      element.removeEventListener("mousemove", mouseMoveHandler);
      element.removeEventListener("touchmove", mouseMoveHandler);
      element.removeEventListener("touchstart", touchStartHandler);
      element.removeEventListener("touchend", touchEndHandler);
    };
  }, [mouseContext]); // Include "mouseContext" inside the array of dependencies.

  return (
    <div className={cn('gallery-item-wrapper', { "is-reveal": reveal })}
      ref={ref}
      onMouseEnter={() => {
        setClipMaskRadius(25);
        mouseContext.setSize("hide");
      }}
      onMouseLeave={() => {
        setClipMaskRadius(0);
        mouseContext.setSize("small");
      }}
    >
      <div className='gallery-item'>
        <div
          className='gallery-item-image sepia'
          style={{ backgroundImage: `url(${src})` }}
        >
        </div>
        <div
          className='gallery-item-image masked'
          style={{
            backgroundImage: `url(${src})`,
            clipPath: `circle(${clipMaskRadius}% at ${clipMask.x}% ${clipMask.y}%)`,
          }}
        >
        </div>
      </div>
    </div>
  )
}


const Gallery = () => {
  return (
    <div className='gallery'>
      {images.map((src) => (
        <GalleryItem key={src} src={src} />
      ))}
    </div>
  )
}

export default Gallery