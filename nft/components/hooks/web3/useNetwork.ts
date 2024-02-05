import { CryptoHookFactory } from "@/types/hooks"
import useSWR, { SWRConfiguration } from "swr"

type UseNetworkResponse = {
    isLoading: boolean,
    targetNetwork: string,
    isSupported: boolean
}
const NETWORKS: { [k: string]: string } = {
    1: "Ethereum Main network",
    5: "Goerli test network",
    11155111: "Sepolia Test Network",
    1337: "Ganache",
    31337 : "Hardhat",

}
const config: SWRConfiguration = {
    revalidateOnFocus: false
}
type NetworkHookFactory = CryptoHookFactory<string, UseNetworkResponse>

export type UseNetworkHook = ReturnType<NetworkHookFactory>

const targetID: string = process.env.NEXT_PUBLIC_TARGET_ID as string
const targetNetwork = NETWORKS[targetID]

export const hookFactory: NetworkHookFactory = ({ provider, isLoading }) => () => {
    const { data, isValidating, mutate, ...swr } = useSWR(provider ? "web3/useNetwork" : null, async () => {

        const chain_id = (await provider?.getNetwork())!.chainId

        if (!chain_id) {
            throw "Cannot find network"
        }

        return NETWORKS[chain_id as unknown as number]
    }, config)
    // console.log("DATA", data)
    // console.log("TARGET", targetNetwork)
    return {
        ...swr,
        data,
        isValidating,
        isLoading: isLoading || isValidating,
        mutate,
        targetNetwork,
        isSupported: data === targetNetwork
    }
}