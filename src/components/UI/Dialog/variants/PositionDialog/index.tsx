import React, {useContext} from 'react';
import PositionForm from "@components/UI/PositionForm";
import { StyledTransactionEdit, StyledTransactionEditDialog, StyledTransactionEditDialogClose, StyledTransactionEditDialogCloseIcon, StyledTransactionEditDialogContent } from './style';
import { StyledHeaderOverlay } from '@components/Layout/Main/components/Header/style';
import {ITransactionCategory} from "@interfaces/category";
import {createPosition, deletePosition, editPosition, IPositionData} from "@utils/index";
import {raw} from "next/dist/build/webpack/loaders/next-middleware-wasm-loader";
import WalletContext from "@contexts/wallet";
import {ITransaction} from "@interfaces/transaction";
import {mutate} from "swr";
import {useSelector} from "react-redux";
import {IRootStore} from "@store/index";

interface IProps {
    editMode?: boolean;
    position: any;
    onClose: any;
}
interface IFormInputs {
    currency: string;
    date: Date;
    units: number;
    open: number;
}


const PositionDialog = ({editMode, onClose, position}: IProps) => {

    const queryString = useSelector<IRootStore, string>(state => state.wallet.queryString)
    const {wallet} = useContext(WalletContext)

    const handleDelete = async () => {
        console.log("DELETE position")
        await deletePosition(position._id)
        await mutate(`/wallets/${wallet!._id}/positions${queryString}`)
    }

    const handleSubmit = async (rawData: IFormInputs) => {

        const data: IPositionData =  {
            units: rawData.units,
            open: rawData.open,
            walletID: wallet!._id,
            createdAt: rawData.date,
            currency: rawData!.currency
        }

        if(editMode){
            console.log('EDIT')
            console.log(data)
            await editPosition(data, position._id)
            await mutate(`/wallets/${wallet!._id}/positions${queryString}`)

        } else {
            console.log('CREATE')
            console.log(data)
            await createPosition(data)
            await mutate(`/wallets/${wallet!._id}/positions${queryString}`)
        }
        onClose()
    }

    return (
        <StyledTransactionEdit editMode={editMode}>
            <StyledTransactionEditDialog>
                <StyledTransactionEditDialogClose onClick={onClose}>
                    <StyledTransactionEditDialogCloseIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                          fill="currentColor">
                        <path fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"/>
                    </StyledTransactionEditDialogCloseIcon>
                </StyledTransactionEditDialogClose>
                <StyledTransactionEditDialogContent>
                    <PositionForm position={position} onSubmit={handleSubmit} onDelete={handleDelete} />
                </StyledTransactionEditDialogContent>
            </StyledTransactionEditDialog>
            <StyledHeaderOverlay active={true} onClick={onClose}/>
        </StyledTransactionEdit>
    )
}

export default PositionDialog;