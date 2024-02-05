import { Web3Hooks, setupHooks } from "@/components/hooks/web3/setupHooks"
import { Web3Dependencies } from "@/types/hooks"
import { MetaMaskInpageProvider } from "@metamask/providers"
import { BrowserProvider, Contract, ethers } from "ethers"
//for hardhat
// import {SimpleStorageAddress,NftMartketplaceAddress} from "../../../config"

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider
  }
}
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
}

export type Web3Params = {
  ethereum: MetaMaskInpageProvider | null,
  provider: BrowserProvider | null,
  contract: Contract | null
}

export type Web3State = {
  isLoading: boolean,
  hooks: Web3Hooks
} & Nullable<Web3Dependencies>

export const createDefaultState = () => {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks({ isLoading: true } as any)
  }
}

export const createWeb3State = ({ ethereum, provider, contract, isLoading }: Web3Dependencies) => {
  return {
    ethereum,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({ ethereum, provider, contract, isLoading })
  }
}

//For hardhat 
// export const LoadContract = async(
//   name :string,
//   provider : BrowserProvider
// ) : Promise< Contract> =>{
//   try{
//     const res = await fetch(`artifacts/contracts/${name}.sol/${name}.json`);
//     const Artifact = await res.json();
//     console.log("Contract address : ", NftMartketplaceAddress)
//     console.log("The artifact is :",Artifact)
//     const contract = new ethers.Contract(NftMartketplaceAddress,Artifact.abi,provider)

//     return contract
//   }catch(error){
//     return Promise.reject(`Contract ${name} cannot be loaded`);
//   }
// }

const NETWORK_ID = 5777

export const loadContract = async (
  name: string,
  provider: BrowserProvider
): Promise<Contract> => {
  debugger
  try {
    debugger
    if (!NETWORK_ID) {
      return Promise.reject("Network ID is not defined!");
    }
    const res = await fetch(`contracts/${name}.json`);

    const Artifact = await res.json();
    // const signer = await provider!.getSigner()
    const signer = await provider.getSigner();
    if (!signer) {
      return Promise.reject("Unable to get signer from provider!");
    }

    if (Artifact.networks[NETWORK_ID].address && provider) {
      const contract = new ethers.Contract(
        Artifact.networks[NETWORK_ID].address,
        Artifact.abi,
        signer
      )
      return contract;
    } else {
      return Promise.reject(`Contract: [${name}] cannot be loaded!`);
    }
  } catch (error) {
    return Promise.reject(`Contract: [${name}] cannot be loaded!`)
  }

}

export async function addMaticNetwork() {
  try {
    const result = await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
        chainId: "0x89",
        rpcUrls: ["https://polygon-rpc.com/"],
        chainName: "Matic Mainnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18
        },
        blockExplorerUrls: ["https://polygonscan.com/"]
      }]
    });
  } catch (error){
    console.log(error)
  }
}

export async function addGanache() {
  try {
    const result = await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
        chainId: "0x89",
        rpcUrls: ["HTTP://127.0.0.1:7545"],
        chainName: "ganache",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18
        },
      }]
    });
  } catch (error){
    console.log(error)
  }
}