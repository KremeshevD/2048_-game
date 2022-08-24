function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
export default function getCellSize() {
  const windowDimensions = getWindowDimensions();
  const cellH = Math.floor(windowDimensions.height/11.8)
  const cellW = Math.floor(windowDimensions.width/6.2)
  let cellSize = cellH > cellW ? cellW : cellH 
  return cellSize;
}