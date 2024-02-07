import { Web3Dependencies } from "@/types/hooks";
import { UseAccountHook } from "./useAccount";
import { hookFactory as createAccountHook } from "./useAccount";
import { UseNetworkHook, hookFactory as createNetworkHook } from "./useNetwork";
import { UseContractHook } from "./useContract";
import { hookFactory as createContractHook } from "./useContract";
export type Web3Hooks = {
    useAccount: UseAccountHook;
    useNetwork: UseNetworkHook;
    useContract: UseContractHook;
}

export type SetupHooks = {
    (d: Web3Dependencies): Web3Hooks
}
export const setupHooks: SetupHooks = (deps) => {
    return {
        useAccount: createAccountHook(deps),
        useNetwork: createNetworkHook(deps),
        useContract : createContractHook(deps),

    }
}