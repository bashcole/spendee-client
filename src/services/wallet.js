import {privateRequest} from "./axios";

const update = async (id, data) => {
    await privateRequest.patch(`/wallets/${id}`, data)
}

const actions = {
    update
}

export default actions