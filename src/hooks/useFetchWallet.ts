import useSWR from "swr";
import {IWallet} from "@interfaces/wallet";
import {privateFetcher} from "@utils/index";

const useFetchWallet = (id: any) => {
    const {data} = useSWR<IWallet>(`/wallets/${id}`, privateFetcher.get)

    return {
        wallet: data
    }
}

export default useFetchWallet;