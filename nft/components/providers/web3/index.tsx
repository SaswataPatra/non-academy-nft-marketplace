import { FunctionComponent, createContext, useContext, useState } from "react";


const Web3Context = createContext<any>(null)

const Web3Provider : FunctionComponent<any> =({children}) =>{
    const [web3Api, setweb3Api] = useState({test:"Hello Provider"})
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