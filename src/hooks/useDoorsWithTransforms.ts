import { rotate } from "../utils/rotate"; 
import { round } from "../utils/round";
import { doorsCoords } from "../Maze/mapData";
import { usePosition } from "./usePosition";

export const useDoorsWithTransforms = () => {
  const { row, col, dir } = usePosition();

  const Rot = 90 * dir;

  return doorsCoords.map(({ x1, x2, y1, y2, ...rest }) => {
    // Since doors exist in the middle of tiles, a door in the next cell directly ahead
    const orow = row + 0.5;
    const ocol = col + 0.5;
    const Cx = ocol;
    const Cy = orow;
    const [x1p, y1p] = rotate(x1, y1, Cx, Cy, Rot);
    const [x2p, y2p] = rotate(x2, y2, Cx, Cy, Rot);
    const x1r = round(x1p);
    const y1r = round(y1p);
    const x2r = round(x2p);
    const y2r = round(y2p);
    return {
      x1: x1r - ocol,
      y1: y1r - orow,
      x2: x2r - ocol,
      y2: y2r - orow,
      ...rest,
    };
  });
};
