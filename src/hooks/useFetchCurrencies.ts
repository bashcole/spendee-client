import useSWR from "swr";
import {privateFetcher, toQueryString} from "@utils/index";
import {ICurrency} from "@interfaces/currency";

const useFetchCurrencies = (query?: object) => {
    const {data} = useSWR<ICurrency[]>(`/currencies${toQueryString(query)}`, privateFetcher.get)

    return {
        currencies: data
    }
}

export default useFetchCurrencies;