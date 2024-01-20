import { useRef } from "react";
import Gallery from "./components/Gallery";
import "./styles/home.scss";
import CursorManager from "./CustomCursor/Cursormanager";
import CustomCursor from "./CustomCursor";

// const images = [
//   "https://images.unsplash.com/photo-1704809938308-8336b66d3fb5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1705292415688-5ce8600bc192?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1705449589011-58b69afb110c?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// ];

function App() {
  const ref = useRef(null);

  if (typeof window === "undefined" || !window.document) {
    return null;
  }

  return (
    <>
      <CursorManager>
        <CustomCursor />
        <div className="main-container" ref={ref}>
          <Gallery />
        </div>
      </CursorManager>
    </>


  );
}

export default App;
