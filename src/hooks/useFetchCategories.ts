import useSWR from "swr";
import {privateFetcher} from "@utils/index";
import {ITransactionCategory} from "@interfaces/category";

const useFetchCategories = () => {
    const {data} = useSWR<ITransactionCategory[]>('/categories', privateFetcher.get)

    return {
        categories: data
    }
}

export default useFetchCategories;