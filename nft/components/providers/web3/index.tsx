import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers } from "ethers";
import { createContext, FunctionComponent, useState, useEffect, useContext } from "react";
import {  Web3State, createDefaultState, createWeb3State, loadContract } from "./utils";

const Web3Context = createContext<Web3State>(createDefaultState());

function pageReload() {
    window.location.reload()
}


const Web3Provider: FunctionComponent<any> = ({ children }) => {
    const [web3Api, setweb3Api] = useState<Web3State>(createDefaultState())

    const ethereum = typeof window !== 'undefined' ? window.ethereum : null;
    const provider = ethereum ? new ethers.BrowserProvider(ethereum) : null;
    var flag = 0
    useEffect(() => {
        async function initWeb3() {
            const contract = await loadContract("NftMarketplace", provider!);

            try {
                setGlobalListeners(window.ethereum)
                setweb3Api(createWeb3State({
                    ethereum: window.ethereum,
                    provider,
                    contract,
                    isLoading: false
                }))
            } catch (e: any) {
                console.error("Please, install metamask wallet ");
                setweb3Api((api) => createWeb3State({
                    ...api as any,
                    isLoading: false
                }))
            }

        }
        initWeb3();
        return () => {
            if (ethereum) { removeGlobalListeners(window.ethereum); }
        }

    }, [])
    const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
        ethereum.on("accountsChanged", handleAccount(ethereum))
        ethereum.on('chainChanged', pageReload);
    }
    const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
        ethereum.removeListener("accountsChanged", handleAccount)
        ethereum.removeListener("chainChanged", pageReload)
    }
    const handleAccount = (ethereum: MetaMaskInpageProvider) => async () => {
        const isLocked =  !(await ethereum._metamask.isUnlocked());
        if (isLocked) { pageReload(); }
      }
      
    return (
        <Web3Context.Provider value={web3Api}>
            {children}
        </Web3Context.Provider>
    )
}

export function useWeb3() {
    return useContext(Web3Context)
}
export function useHooks() {
    const { hooks } = useWeb3();
    return hooks;
}
export default Web3Provider