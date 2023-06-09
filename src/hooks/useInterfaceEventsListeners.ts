import { useEffect } from "react"; 
import {
  goBackwards,
  goForwards,
  Keys,
  rotLeft,
  rotRight,
  setPos,
  strafeLeft,
  strafeRight,
} from "../utils/positionHelpers";
import { useGameData } from "./useGameData";
import { usePosition } from "./usePosition";

export const useInterfaceEventsListeners = () => {
  const [gameData, setGameData] = useGameData();
  const position = usePosition();

  const handleKeyDown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case Keys.Forward: {
        setGameData(setPos(goForwards));
        break;
      }
      case Keys.Backward: {
        setGameData(setPos(goBackwards));
        break;
      }
      case Keys.StrafeLeft: {
        setGameData(setPos(strafeLeft));
        break;
      }
      case Keys.StrafeRight: {
        setGameData(setPos(strafeRight));
        break;
      }
      case Keys.RotLeft: {
        setGameData(rotLeft);
        break;
      }
      case Keys.RotRight: {
        setGameData(rotRight);
        break;
      }
      default:
        break;
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      // Remove event listeners on cleanup
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return position;
};

export const UserInterfaceListeners = () => {
  useInterfaceEventsListeners();
  return null;
};
