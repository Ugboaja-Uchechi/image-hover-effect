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
    function getCoordinates(mouse) {
      const imagePosition = {
        posX: ref.current.offsetLeft,
        posY: ref.current.offsetTop,
      };

      const posX = mouse.pageX - imagePosition.posX;
      const posY = mouse.pageY - imagePosition.posY;

      setClipMask({
        x: (posX / ref.current.clientWidth) * 100,
        y: (posY / ref.current.clientHeight) * 100,
      });
    }

    ref.current.addEventListener("mousemove", (mouse) => {
      window.requestAnimationFrame(() => {
        getCoordinates(mouse);
      });
    });
  }, []);

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