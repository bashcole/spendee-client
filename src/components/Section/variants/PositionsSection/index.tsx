import React, {useContext} from 'react';
import Skeleton from "react-loading-skeleton";
import {StyledTransactions} from "@components/Section/variants/TransactionsSection/style";
import {dateToMY, sumTransactions} from "@utils/index";
import Position from "@components/Section/variants/PositionsSection/components/Position";
import WalletContext from "@contexts/wallet";
import {IPosition} from "@interfaces/position";
import Header from "@components/Section/variants/PositionsSection/components/Header";

interface IProps {
    positions: IPosition[] | undefined;
}

interface IGroupedTransactions {
    [key: string]: IPosition[]
}

const PositionsSection = ({positions}: IProps) => {

    if (!positions) {
        return <Skeleton height="420px"></Skeleton>
    }

    return (
        <>
            <Header/>
            <StyledTransactions>
                {positions.map((position) => (
                    <Position key={position._id} position={position}/>
                ))}
            </StyledTransactions>

        </>)
}

export default PositionsSection;