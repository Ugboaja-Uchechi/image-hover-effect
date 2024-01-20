import React from 'react';
// import "./styles/home.scss";
import "../styles/gallery.scss"

const images = [
  "https://images.unsplash.com/photo-1704809938308-8336b66d3fb5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1705292415688-5ce8600bc192?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1705449589011-58b69afb110c?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export const GalleryItem = ({ src }) => {
  return (
    <div className='gallery-item-wrapper'>
      <div className='gallery-item'>
        <div
          className='gallery-item-image sepia'
          style={{ backgroundImage: `url(${src})` }}
        >
        </div>
        <div
          className='gallery-item-image masked'
          style={{ backgroundImage: `url(${src})` }}
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