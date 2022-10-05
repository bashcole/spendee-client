import React from 'react';
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";
import {filterByType, formatNumber, groupByPeriod, sumTransactions} from "@utils/index";
import {differenceInDays, format, startOfDay} from "date-fns";

const CustomTooltip = ({ active, payload, label, currecy }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{backgroundColor: "white", padding: "1rem"}}>
                <strong>{label}</strong>
                <p style={{display: "block"}}>Income: <span style={{color: '#2dba75'}}>{formatNumber(payload[0].value, 'en', currecy)}</span></p>
                <p style={{display: "block"}}>Expense: <span style={{color: '#f14c52'}}>{formatNumber(payload[1].value, 'en', currecy)}</span></p>
            </div>
        );
    }

    return null;
};

const ChangeBar = ({wallet, transactions, startDate, endDate}) => {

    const diff = differenceInDays(startDate, endDate)
    const dateFormat = diff > 32 ? 'LLL dd, yyyy' : 'LLL, yyyy'

    const _temp = groupByPeriod(transactions.sort((a ,b) => new Date(a.createdAt) - new Date(b.createdAt)), (transaction) => {
        return format(new Date(transaction.createdAt), dateFormat)
    })
    const data = Object.keys(_temp).map((item) => {
        return {
            "name": item,
            "income": sumTransactions(filterByType(_temp[item].transactions, 'income')),
            "expense": sumTransactions(filterByType(_temp[item].transactions, 'expense')) * -1
        }
    })

    return (<ResponsiveContainer width="100%" height="100%">
        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="1"  vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip currecy={wallet?.currency}/>}/>
            <Bar dataKey="income" fill="#2dba75" barSize={4} />
            <Bar dataKey="expense" fill="#f14c52" barSize={4} />
        </BarChart>
    </ResponsiveContainer>)
}

export default ChangeBar;