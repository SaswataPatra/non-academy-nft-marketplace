import { useWeb3 } from "../providers/web3";

export const useAccount = () => {
    // const hooks = useHooks();
    const { hooks } = useWeb3();
    const swrRes = hooks.useAccount()

    return {
        account: swrRes
    }
}
export const useNetwork = () => {
    const { hooks } = useWeb3()
    const swrRes = hooks.useNetwork()

    return {
        network: swrRes
    }
}
export const useContract = () => {
    const { hooks } = useWeb3()
    const swrRes = hooks.useContract()

    return {
        contract: swrRes
    }
}
