import useSWR from "swr";
import {privateFetcher} from "@utils/index";
import {ITransaction} from "@interfaces/transaction";
import {IPosition} from "@interfaces/position";

const useFetchWalletPositions = (id: any, params: any) => {

    const queryString = new URLSearchParams(params).toString();

    const {data} = useSWR<IPosition[]>(`/wallets/${id}/positions?${queryString}`, privateFetcher.get)

    return {
        positions: data
    }
}

export default useFetchWalletPositions;