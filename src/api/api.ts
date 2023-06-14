import { BigNumber, ethers, Contract } from "ethers";
import {
  CharacterAttributes,
  CharacterStatsDictionary,
  Item,
  TurnType,
} from "../types";
import { JsonRpcSigner } from "@ethersproject/providers/src.ts/json-rpc-provider";
import Web3Modal from "web3modal";
import { CharacterAttributesStructOutput } from "../../typechain/FantasyAttributesManager";
import { Contracts } from "../providers/ContractsProvider";
import { mapCharacterAPIToLocalStats } from "../utils/mapCharacterAPIToLocalStats";
import { buildContractCallArgs } from "../utils/calculateProof";
import { InjectedConnector } from "@web3-react/injected-connector";
import { initialGameData } from "../providers/GameDataProvider";
import { Sdk, MetaMaskWalletProvider, NetworkNames } from "etherspot";

// --------------------------------------------------------------------------------

var provider: any;
export const injected = new InjectedConnector({
  supportedChainIds: [5001, 1313161555],
});

const auraro = 1313161555;
const mantle = 5001;

const auroraParams = [
  {
    chainId: `0x${(1313161555).toString(16)}`,
    rpcUrls: ["https://testnet.aurora.dev/"],
    chainName: "Aurora Testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://explorer.testnet.aurora.dev/"],
  },
];

const mantleParams = [
  {
    chainId: `0x${(5001).toString(16)}`,
    rpcUrls: ["https://rpc.testnet.mantle.xyz"],
    chainName: "Mantle Testnet",
    nativeCurrency: {
      name: "MNT",
      symbol: "MNT",
      decimals: 18,
    },
    blockExplorerUrls: ["https://explorer.testnet.mantle.xyz/"],
  },
];

export const fetchAllMintedCharacters = async ({
  signer,
  contracts,
}: {
  signer: JsonRpcSigner | undefined;
  contracts: Contracts;
}): Promise<CharacterStatsDictionary | null> => {
  if (!signer) {
    return null;
  }
  const address = await signer.getAddress();

  const rawTokenIds: BigNumber[] = await contracts.fantasyCharacterContract
    .connect(signer)
    .getAllCharacters(address);
  const tokenIds = rawTokenIds.map(id => id.toNumber());

  const characterMap: CharacterStatsDictionary = {};
  const promises = tokenIds.map(async tokenId => {
    const character: CharacterAttributesStructOutput =
      await contracts.attributesManagerContract
        .connect(signer)
        .getPlayer(tokenId);
    const stats = mapCharacterAPIToLocalStats(character, tokenId);
    characterMap[stats.id] = stats;
  });
  await Promise.all(promises);
  return characterMap;
};
export const FETCH_MINTED_CACHE_KEY = "allMintedCharacters";

// --------------------------------------------------------------------------------

export const createCharacter = async ({
  signer,
  characterId,
  contracts,
}: {
  signer: JsonRpcSigner | undefined;
  characterId: number | null;
  contracts: Contracts;
}): Promise<void | null> => {
  if (!signer) {
    return null;
  }
  if (!signer) {
    return null;
  }
  const tx = await contracts.fantasyCharacterContract
    .connect(signer)
    .createCharacter(characterId);
  await tx.wait();
};
export const CREATE_CHARACTER_CACHE_KEY = "createCharacter";

// --------------------------------------------------------------------------------

export const enterCampaign = async ({
  signer,
  characterTokenId,
  contracts,
}: {
  signer: JsonRpcSigner | undefined;
  characterTokenId: number;
  contracts: Contracts;
}): Promise<void | null> => {
  if (!signer) {
    return null;
  }

  const turn = await contracts.castleCampaignContract
    .connect(signer)
    .playerTurn(characterTokenId);
  const turnNumber = turn.toNumber();
  if (turnNumber === 0) {
    const tx = await contracts.castleCampaignContract
      .connect(signer)
      .enterCampaign(characterTokenId);
    await tx.wait();
  }
};
export const ENTER_CAMPAIGN_CACHE_KEY = "enterCampaign";

// --------------------------------------------------------------------------------

export const generateTurn = async ({
  signer,
  characterTokenId,
  contracts,
}: {
  signer: JsonRpcSigner | undefined;
  characterTokenId: number;
  contracts: Contracts;
}): Promise<void | null> => {
  if (!signer) {
    return null;
  }
  const tx = await contracts.castleCampaignContract
    .connect(signer)
    .generateTurn(characterTokenId);
  await tx.wait();
};
export const GENERATE_TURN_CACHE_KEY = "generateTurn";

// --------------------------------------------------------------------------------

export const moveIsFinal = async ({
  signer,
  characterTokenId,
  contracts,
}: {
  signer: JsonRpcSigner | undefined;
  characterTokenId: number;
  contracts: Contracts;
}): Promise<boolean | null> => {
  if (!signer) {
    return null;
  }
  const numberOfTurns = await contracts.castleCampaignContract
    .connect(signer)
    .numberOfTurns();
  const playerTurn = await contracts.castleCampaignContract
    .connect(signer)
    .playerTurn(characterTokenId);
  return numberOfTurns.toNumber() === playerTurn.toNumber();
};
export const MOVE_IS_FINAL_CACHE_KEY = "moveIsFinal";

// --------------------------------------------------------------------------------

export const unlockFinalTurn = async ({
  signer,
  characterTokenId,
  contracts,
  proof,
  publicSignals,
}: {
  signer: JsonRpcSigner | undefined;
  characterTokenId: number;
  contracts: Contracts;
  proof: any;
  publicSignals: [string, string];
}): Promise<void | null> => {
  if (!signer) {
    return null;
  }
  const args = buildContractCallArgs(proof, publicSignals);
  const tx = await contracts.castleCampaignContract
    .connect(signer)
    .unlockFinalTurn(characterTokenId, ...args);
  await tx.wait();
};
export const UNLOCK_FINAL_TURN_CACHE_KEY = "unlockFinalTurn";

// --------------------------------------------------------------------------------
export const fetchSigner = async (setGameData: any): Promise<JsonRpcSigner> => {
  const web3Modal = new Web3Modal();
  await web3Modal.clearCachedProvider();
  const connection = await web3Modal.connect();
  provider = new ethers.providers.Web3Provider(connection);
  const network = await provider.getNetwork();
  const selectedNetwork = localStorage.getItem("network");
  const chainId = selectedNetwork === "Aurora" ? auraro : mantle;
  if (chainId !== network.chainId) {
    const provider = await injected.getProvider();
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId:
              selectedNetwork === "Aurora"
                ? auroraParams[0].chainId
                : mantleParams[0].chainId,
          },
        ],
      });
      window.location.reload();
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: selectedNetwork === "Aurora" ? auroraParams : mantleParams,
          });
          window.location.reload();
        } catch (addError) {
          setGameData(initialGameData);
        }
      } else {
        setGameData(initialGameData);
      }
    }
  }
  // try {
  //   if (!MetaMaskWalletProvider.detect()) {
  //     console.log("MetaMask not detected");
  //   }
  //   const walletProvider = await MetaMaskWalletProvider.connect();

  //   const sdk = new Sdk(walletProvider, {
  //     networkName: "aurora" as NetworkNames,
  //     omitWalletProviderNetworkCheck: true,
  //   });
  //   await sdk.computeContractAccount();
  //   const { state } = sdk;

  //   console.log("Smart wallet", state.account);
  //   console.log("Account balances", await sdk.getAccountBalances());
  //   const receiver = "0xC32F3C6b77b43765987D69f61405835077a881c8";
  //   const amtInWei = "100"; //Send 0.5 ETH
  //   //this method will add the transaction to a batch, which has to be executed later.
  //   const transaction = await sdk.batchExecuteAccountTransaction({
  //     to: receiver, //wallet address
  //     value: amtInWei, //in wei
  //   });
  //   console.log(transaction);
  //   console.log("Estimating transaction");
  //   const result = await sdk.estimateGatewayBatch();
  //   console.log("Estimation ", result.estimation);
  //   const hash = await sdk.submitGatewayBatch();
  //   console.log("Transaction submitted", hash);
  // } catch (e) {
  //   console.log(e);
  // }
  provider = new ethers.providers.Web3Provider(connection);
  return provider.getSigner();
};
export const FETCH_SIGNER_CACHE_KEY = "fetchSigner";

// --------------------------------------------------------------------------------

export const attackWithAbility = async ({
  signer,
  characterTokenId,
  abilityIndex,
  target,
  contracts,
}: {
  signer: JsonRpcSigner | undefined;
  characterTokenId: number;
  abilityIndex: number;
  target: number;
  contracts: Contracts;
}): Promise<void | null> => {
  if (!signer) {
    return null;
  }

  var hash = await contracts.castleCampaignContract
    .connect(signer)
    .attackWithAbility(characterTokenId, abilityIndex, target);
  await hash.wait();
};
export const ATTACK_ABILITY_CACHE_KEY = "attackWithAbility";

// --------------------------------------------------------------------------------

export const attackWithItem = async ({
  signer,
  characterTokenId,
  itemIndex,
  target,
  contracts,
}: {
  signer: JsonRpcSigner | undefined;
  characterTokenId: number;
  itemIndex: number;
  target: number;
  contracts: Contracts;
}): Promise<void | null> => {
  if (!signer) {
    return null;
  }
  var hash = await contracts.castleCampaignContract
    .connect(signer)
    .attackWithItem(characterTokenId, itemIndex, target);
  await hash.wait();
};
export const ATTACK_ITEM_CACHE_KEY = "attackWithItem";

// --------------------------------------------------------------------------------

export const castHealAbility = async ({
  signer,
  characterTokenId,
  abilityIndex,
  contracts,
}: {
  signer: JsonRpcSigner | undefined;
  characterTokenId: number;
  abilityIndex: number;
  contracts: Contracts;
}): Promise<void | null> => {
  if (!signer) {
    return null;
  }
  await contracts.castleCampaignContract
    .connect(signer)
    .castHealAbility(characterTokenId, abilityIndex);
};
export const HEAL_ABILITY_CACHE_KEY = "castHealAbility";

// --------------------------------------------------------------------------------

export const getMobStats = async ({
  signer,
  characterTokenId,
  contracts,
}: {
  signer: JsonRpcSigner | undefined;
  characterTokenId: number;
  contracts: Contracts;
}) => {
  if (!signer) {
    return null;
  }
  const playerTurn = await contracts.castleCampaignContract
    .connect(signer)
    .playerTurn(characterTokenId);
  const mobStats: CharacterAttributesStructOutput[] =
    await contracts.castleCampaignContract
      .connect(signer)
      .getMobsForTurn(characterTokenId, playerTurn);
  return mobStats.map((stats, index) =>
    mapCharacterAPIToLocalStats({
      ...stats,
      class: index,
    })
  );
};
export const GET_MOB_STATS_CACHE_KEY = "getMobStats";

// --------------------------------------------------------------------------------

export const getLootStats = async ({
  signer,
  characterTokenId,
  contracts,
}: {
  signer: JsonRpcSigner | undefined;
  characterTokenId: number;
  contracts: Contracts;
}): Promise<null | Item[]> => {
  if (!signer) {
    return null;
  }
  const playerNonce = await contracts.castleCampaignContract
    .connect(signer)
    .playerNonce(characterTokenId);
  const lootStats: Item[] = await contracts.castleCampaignContract
    .connect(signer)
    .campaignInventory(characterTokenId, playerNonce, characterTokenId);
  return lootStats;
};
export const GET_LOOT_STATS_CACHE_KEY = "getLootStats";

// --------------------------------------------------------------------------------

export const endExploreLoot = async ({
  signer,
  characterTokenId,
  contracts,
}: {
  signer: JsonRpcSigner | undefined;
  characterTokenId: number;
  contracts: Contracts;
}): Promise<void | null> => {
  if (!signer) {
    return null;
  }
  await contracts.castleCampaignContract
    .connect(signer)
    .endExploreLoot(characterTokenId);
};
export const END_LOOT_CACHE_KEY = "endExploreLoot";

// --------------------------------------------------------------------------------

export const getPlayerStats = async ({
  signer,
  characterTokenId,
  contracts,
}: {
  signer: JsonRpcSigner | undefined;
  characterTokenId: number;
  contracts: Contracts;
}): Promise<CharacterAttributes | null> => {
  if (!signer) {
    return null;
  }
  const stats = await contracts.castleCampaignContract
    .connect(signer)
    .getCurrentCampaignStats(characterTokenId);
  return mapCharacterAPIToLocalStats(stats, characterTokenId);
};
export const GET_PLAYER_STATS_CACHE_KEY = "getPlayerStats";

// --------------------------------------------------------------------------------

export const getCampaignInventory = async ({
  signer,
  characterTokenId,
  characterNonce,
  contracts,
}: {
  signer: JsonRpcSigner | undefined;
  characterTokenId: number;
  characterNonce: number;
  contracts: Contracts;
}): Promise<void | null> => {
  if (!signer) {
    return null;
  }

  await contracts.castleCampaignContract
    .connect(signer)
    .campaignInventory(characterTokenId, characterNonce);
};
export const GET_INVENTORY_CACHE_KEY = "getCampaignInventory";

// --------------------------------------------------------------------------------

export const getTurnData = async ({
  signer,
  contracts,
  characterTokenId,
}: {
  signer: JsonRpcSigner | undefined;
  contracts: Contracts;
  characterTokenId: number;
}): Promise<TurnType | null> => {
  if (!signer) {
    return null;
  }
  const turnNumber = await contracts.castleCampaignContract
    .connect(signer)
    .playerTurn(characterTokenId);
  const turnType = await contracts.castleCampaignContract
    .connect(signer)
    .turnTypes(characterTokenId, turnNumber);
  return turnType;
};

// --------------------------------------------------------------------------------
//unlock final turn
// --------------------------------------------------------------------------------

export const getCurrentCampaignStatus = async ({
  signer,
  characterTokenId,
  contracts,
}: {
  signer: JsonRpcSigner | undefined;
  characterTokenId: number;
  contracts: Contracts;
}): Promise<void | null> => {
  if (!signer) {
    return null;
  }
  await contracts.castleCampaignContract
    .connect(signer)
    .getCurrentCampaignStatus(characterTokenId);
};
export const GET_STATUS_CACHE_KEY = "getCurrentCampaignStatus";
