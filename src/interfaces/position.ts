interface IPositionAmount {
    value: number;
    currency: string;
}

export interface IPosition {
    _id: string;
    units: number;
    open: number;
    note: string;
    currency: string;
    amount: IPositionAmount;
    otherAmount?: IPositionAmount;
    createdAt: string;
}