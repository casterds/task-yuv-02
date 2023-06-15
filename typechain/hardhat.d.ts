/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "LinkTokenInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LinkTokenInterface__factory>;
    getContractFactory(
      name: "VRFConsumerBase",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VRFConsumerBase__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "ERC721Enumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Enumerable__factory>;
    getContractFactory(
      name: "ERC721URIStorage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721URIStorage__factory>;
    getContractFactory(
      name: "IERC721Enumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Enumerable__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "CampaignPlaymaster",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CampaignPlaymaster__factory>;
    getContractFactory(
      name: "CastleCampaign",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CastleCampaign__factory>;
    getContractFactory(
      name: "IVerifier",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVerifier__factory>;
    getContractFactory(
      name: "CastleCampaignItems",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CastleCampaignItems__factory>;
    getContractFactory(
      name: "FantasyAttributesManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FantasyAttributesManager__factory>;
    getContractFactory(
      name: "FantasyCharacter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FantasyCharacter__factory>;
    getContractFactory(
      name: "IFantasyAttributesManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IFantasyAttributesManager__factory>;
    getContractFactory(
      name: "ICastleCampaign",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICastleCampaign__factory>;
    getContractFactory(
      name: "MockVRF",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockVRF__factory>;
    getContractFactory(
      name: "Verifier",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Verifier__factory>;

    getContractAt(
      name: "LinkTokenInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LinkTokenInterface>;
    getContractAt(
      name: "VRFConsumerBase",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.VRFConsumerBase>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "ERC721Enumerable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721Enumerable>;
    getContractAt(
      name: "ERC721URIStorage",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721URIStorage>;
    getContractAt(
      name: "IERC721Enumerable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Enumerable>;
    getContractAt(
      name: "IERC721Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "CampaignPlaymaster",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CampaignPlaymaster>;
    getContractAt(
      name: "CastleCampaign",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CastleCampaign>;
    getContractAt(
      name: "IVerifier",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IVerifier>;
    getContractAt(
      name: "CastleCampaignItems",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CastleCampaignItems>;
    getContractAt(
      name: "FantasyAttributesManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FantasyAttributesManager>;
    getContractAt(
      name: "FantasyCharacter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FantasyCharacter>;
    getContractAt(
      name: "IFantasyAttributesManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IFantasyAttributesManager>;
    getContractAt(
      name: "ICastleCampaign",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICastleCampaign>;
    getContractAt(
      name: "MockVRF",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockVRF>;
    getContractAt(
      name: "Verifier",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Verifier>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}