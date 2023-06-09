import styled from "styled-components"; 

const ButtonBase = styled.button`
  appearance: none;
  font-family: inherit;
  border-radius: 0;
  outline: none;
  text-align: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  filter: grayscale(${props => (props.disabled ? 1 : 0)})
    brightness(${props => (props.disabled ? 0.4 : 1)});
`;

export const ButtonLarge = styled(ButtonBase)`
  padding: 2px 6px;
  color: white;
  font-size: 7px;
  border: 1px solid #48865f;
  background-color: black;
  box-shadow: 0 0 0 1px black;
`;

export const ButtonAttack = styled(ButtonBase)`
  padding: 1px 4px;
  color: white;
  font-size: 7px;
  background-color: red;
  border: 1px solid black;
  box-shadow: 0 0 0 1px white;
`;

export const ButtonSecondary = styled(ButtonBase)`
  background-color: transparent;
  border: 1px solid transparent;
  padding: 5px;
  color: white;
  font-size: 7px;
`;

export const ButtonText = styled(ButtonBase)`
  background-color: transparent;
  border: none;
  padding: 5px;
  color: white;
  font-size: 9px;
`;
