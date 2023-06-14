import * as React from "react";
import { useState } from "react";

import { GameModes } from "../types";
import { ButtonText } from "../components/Button";
import { useGameData } from "../hooks/useGameData";
import { AbsoluteCenterFill, AbsoluteFill } from "../components/Layout";
import styled from "styled-components";

import bgBattle from "../assets/scaled/battle_background.png";
import { Image } from "../components/Image";

const Background = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
`;

const dropdown = {
  backgroundColor: "transparent",
  border: "none",
  padding: "5px",
  color: "#fffbfb",
  margin: "5px",
};
var selectedNetwork: any;

const handleChange = (e: any) => {
  console.log(e.target.value);
  selectedNetwork = e.target.value;
  localStorage.setItem("network", e.target.value);
};

const Title = styled.div``;

export const SplashScreen = () => {
  const [_, setGameData] = useGameData();
  const connect = () => {
    if (selectedNetwork != undefined) {
      setGameData(gameData => ({
        ...gameData,
        mode: GameModes.SelectingCharacter,
      }));
    } else {
      alert("please select the network");
    }
  };
  return (
    <AbsoluteFill>
      <Background src={bgBattle} style={{ opacity: 0.3 }} />
      <AbsoluteCenterFill>
        <Title>Fantasy Campaign</Title>
        <select style={dropdown} onChange={handleChange}>
          <option>select network</option>
          <option value="Mantle"> Mantle Testnet </option>
          <option value="Aurora"> Aurora Testnet </option>
        </select>
        <ButtonText onClick={connect}>~ Press Start ~</ButtonText>
      </AbsoluteCenterFill>
    </AbsoluteFill>
  );
};
