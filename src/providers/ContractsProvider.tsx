import * as React from "react";
import { ReactElement, useEffect } from "react";
import { ethers } from "ethers";
import CastleCampaign from "../../artifacts/contracts/CastleCampaign.sol/CastleCampaign.json";
import { useWallet } from "../hooks/useWallet";
import FantasyCharacter from "../../artifacts/contracts/FantasyCharacter.sol/FantasyCharacter.json";
import FantasyAttributesManager from "../../artifacts/contracts/FantasyAttributesManager.sol/FantasyAttributesManager.json";

const fantasyCharacterAddress_aurora =
  process.env.REACT_APP_FANTASY_CHARACTER_ADDRESS_AURORA!;
const attributesManagerAddress_aurora =
  process.env.REACT_APP_ATTRIBUTES_MANAGER_ADDRESS_AURORA!;
const castleCampaignAddress_aurora =
  process.env.REACT_APP_CASTLE_CAMPAIGN_ADDRESS_AURORA!;

const fantasyCharacterAddress_mantle =
  process.env.REACT_APP_FANTASY_CHARACTER_ADDRESS_MANTLE!;
const attributesManagerAddress_mantle =
  process.env.REACT_APP_ATTRIBUTES_MANAGER_ADDRESS_MANTLE!;
const castleCampaignAddress_mantle =
  process.env.REACT_APP_CASTLE_CAMPAIGN_ADDRESS_MANTLE!;

export type Contracts = {
  castleCampaignContract: ethers.Contract;
  attributesManagerContract: ethers.Contract;
  fantasyCharacterContract: ethers.Contract;
};

export const ContractsContext = React.createContext<Contracts | null>(null);

export const ContractsProvider: React.FC = ({
  children,
}): ReactElement | null => {
  const [contracts, setContracts] = React.useState<Contracts | null>(null);
  const { signer } = useWallet();
  useEffect(() => {
    if (signer && !contracts) {
      const selectedNetwork = localStorage.getItem("network");
      setContracts({
        castleCampaignContract: new ethers.Contract(
          selectedNetwork === "Aurora"
            ? castleCampaignAddress_aurora
            : castleCampaignAddress_mantle,
          CastleCampaign.abi,
          signer
        ),
        attributesManagerContract: new ethers.Contract(
          selectedNetwork === "Aurora"
            ? attributesManagerAddress_aurora
            : attributesManagerAddress_mantle,
          FantasyAttributesManager.abi,
          signer
        ),
        fantasyCharacterContract: new ethers.Contract(
          selectedNetwork === "Aurora"
            ? fantasyCharacterAddress_aurora
            : fantasyCharacterAddress_mantle,
          FantasyCharacter.abi,
          signer
        ),
      });
    }
  }, [contracts, signer]);
  if (!contracts) {
    return null;
  }
  return (
    <ContractsContext.Provider value={contracts}>
      {children}
    </ContractsContext.Provider>
  );
};
