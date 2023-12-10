import { FunctionComponent, createContext, useContext, useEffect, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Web3State, createDefaultState } from "./utils";
import { ethers } from "ethers";

const Web3Context = createContext<Web3State>(createDefaultState())

const Web3Provider : FunctionComponent<any> =({children}) =>{
    const [web3Api, setweb3Api] = useState<Web3State>(createDefaultState())
    const ethereum = typeof window !== 'undefined' ? window.ethereum : null;

    const provider = ethereum ? new ethers.BrowserProvider(ethereum) : null;


    useEffect(() => {
      function initWeb3(){
        setweb3Api({
            ethereum : window.ethereum,
            provider : provider,
            contract : null,
            isLoading : false
        })
      }
      initWeb3()
    }, [])
    
    return (

        <Web3Context.Provider value={web3Api}>
            {children}
        </Web3Context.Provider>
    )
}

export function useweb3(){
    return useContext(Web3Context)
}

export default Web3Provider