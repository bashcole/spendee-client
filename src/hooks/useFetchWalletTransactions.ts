import useSWR from "swr";
import {privateFetcher} from "@utils/index";
import {ITransaction} from "@interfaces/transaction";

const useFetchWalletTransactions = (id: any, params: any) => {

    const queryString = new URLSearchParams(params).toString();

    const {data} = useSWR<ITransaction[]>(`/wallets/${id}/transactions?${queryString}`, privateFetcher.get)

    return {
        transactions: data
    }
}

export default useFetchWalletTransactions;