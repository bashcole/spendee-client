import useSWR from "swr";
import {IWallet} from "@interfaces/wallet";
import {privateFetcher} from "@utils/index";

const useFetchWallets = () => {
    const {data} = useSWR<IWallet[]>('/wallets', privateFetcher.get)

    return {
        wallets: data
    }
}

export default useFetchWallets;