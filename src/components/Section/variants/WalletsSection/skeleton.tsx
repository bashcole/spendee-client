import React from 'react';
import {WalletCardSkeleton} from "@components/Card/variants/WalletCard/skeleton";
import Skeleton from "react-loading-skeleton";
import Section from "@components/Section";
import ActionsCard from "@components/Card/variants/ActionsCard";
import CardList from "@components/CardList";

const WalletsSectionSkeleton = () => {
    return (<Section title={<Skeleton width="120px"/>}>
        <CardList>
            <WalletCardSkeleton/>
            <WalletCardSkeleton/>
            <WalletCardSkeleton/>
            <WalletCardSkeleton/>
            <WalletCardSkeleton/>
            <WalletCardSkeleton/>
            <ActionsCard>
                <Skeleton/>
                <Skeleton/>
            </ActionsCard>
        </CardList>
    </Section>)
}

export default WalletsSectionSkeleton;