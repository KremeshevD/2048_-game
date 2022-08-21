import { useState, useEffect } from 'react';
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
export default function useCellSize() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const cellH = Math.floor(windowDimensions.height/11.8)
  const cellW = Math.floor(windowDimensions.width/6.2)
  let cellSize = cellH > cellW ? cellW : cellH 
  return cellSize;
}