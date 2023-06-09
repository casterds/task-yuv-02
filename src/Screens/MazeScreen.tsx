import * as React from "react"; 
import { doorTextureMaps } from "../Maze/DoorTextures";
import { wallTextureMaps } from "../Maze/WallTextures";
import { Ceiling, Floor } from "../Maze/EnvironmentTextures";
import { WallType } from "../types";
import { useWallsWithTransforms } from "../hooks/useWallsWithTransforms";
import { useDoorsWithTransforms } from "../hooks/useDoorsWithTransforms";
import { useGameData } from "../hooks/useGameData";
import { useHandleTriggerPoints } from "../hooks/useHandleTriggerPoints";
import { useQueryAllMintedCharacters } from "../api/useQueryAllMintedCharacters";
import { Map } from "../Maze/Map";
import styled from "styled-components";
import {
  UNSCALED_VIEWPORT_HEIGHT,
  UNSCALED_VIEWPORT_WIDTH,
} from "../Maze/constants";
import { scale } from "../utils/scale";
import { AbsoluteFill } from "../components/Layout";
import { useQueryMoveIsFinal } from "../api/useQueryMoveIsFinal";
import { usePosition } from "../hooks/usePosition";
import {
  isAtDragonTrigger,
  isAtGateTrigger,
} from "../utils/generateCollisionMaps";

const CentreCrop = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;

const Modal = styled.div`
  position: absolute;
  bottom: 6px;
  left: 6px;
  right: 6px;
  flex-direction: row;
  justify-content: center;
  padding: 3px 3px;
  text-align: center;
  align-items: center;
  background-color: #2b2417;
  border: 1px solid white;
  box-shadow: 0 0 0 1px #2b2417;
  z-index: 4000;
  font-size: 8px;
`;

const NaturalView = styled.div`
  width: ${scale(UNSCALED_VIEWPORT_WIDTH)}px;
  height: ${scale(UNSCALED_VIEWPORT_HEIGHT)}px;
  position: relative;
`;

export const MazeScreen = () => {
  useHandleTriggerPoints();
  useQueryAllMintedCharacters();
  const walls = useWallsWithTransforms();
  const doors = useDoorsWithTransforms();
  const { data: isFinalTurn } = useQueryMoveIsFinal();
  const position = usePosition();
  const [gameData] = useGameData();
  const { isGateOpen, spawnPoints } = gameData;
  const isAtGateTriggerPoint = isAtGateTrigger(position);
  const isAtDragonTriggerPoint = isAtDragonTrigger(position);

  const wallSurfaces = walls
    .map(values => {
      const { x1, y1, x2, y2, type } = values;
      let textureMap;
      switch (type) {
        case WallType.Wall1:
          textureMap = wallTextureMaps;
          break;
        case WallType.Wall2:
          textureMap = wallTextureMaps;
          break;
      }
      const leftRight = textureMap[`${x1},${y1},${x2},${y2}`];
      const rightLeft = textureMap[`${x2},${y2},${x1},${y1}`];
      return leftRight || rightLeft;
    })
    .filter(Boolean);

  const doorSurfaces = doors
    .map(values => {
      const { x1, y1, x2, y2 } = values;
      const leftRight = doorTextureMaps[`${x1},${y1},${x2},${y2}`];
      const rightLeft = doorTextureMaps[`${x2},${y2},${x1},${y1}`];
      return { Surface: leftRight || rightLeft, ...values };
    })
    .filter(Boolean);

  return (
    <AbsoluteFill>
      <CentreCrop>
        <NaturalView>
          <Ceiling />
          <Floor />
          {wallSurfaces.map((Surface, index) => {
            return Surface ? <Surface key={index} /> : null;
          })}
          {doorSurfaces.map(({ Surface }, index) => {
            return Surface ? (
              <Surface
                key={index}
                // @ts-ignore
                open={isGateOpen}
              />
            ) : null;
          })}
        </NaturalView>
        <Map rotateMap={false} />
        {isAtGateTriggerPoint && !isGateOpen && !isFinalTurn ? (
          <Modal>You need to find the Dragon Lance to unlock the gate!</Modal>
        ) : null}
        {isFinalTurn && !isAtGateTriggerPoint && !isAtDragonTriggerPoint ? (
          <Modal>Head to the exit</Modal>
        ) : null}
      </CentreCrop>
    </AbsoluteFill>
  );
};
