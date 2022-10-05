import React from 'react';
import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";
import {sumTransactions} from "@utils/index";

const RADIAN = Math.PI / 180;

// @ts-ignore
const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index, fill, name, value}) => {

    if(value < 4){
        return null
    }

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const sin = Math.sin(-midAngle * RADIAN);
    const cos = Math.cos(-midAngle * RADIAN);

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const sx = cx + (radius + 50) * cos;
    const sy = cy + (radius + 50) * sin;
    const line_x = cx + (radius + 10) * cos;
    const line_y = cy + (radius + 10) * sin;

    const tx = cx + (radius + 60) * cos;
    const ty = cy + (radius + 60) * sin;

    const ex = tx + (cos >= 0 ? 1 : -1) * 22;

    return (
        <g style={{opacity: 1}}>
            <line strokeWidth="2" stroke={fill} x1={line_x} y1={line_y} x2={sx} y2={sy}></line>
            <circle cx={sx} cy={sy} r="19.375" fill={fill} stroke="none"></circle>
            <defs>
                <mask id="label-circle-clip">
                    <circle r="20.375" cx="20.375" cy="20.375" fill="#fff" maskUnits="userSpaceOnUse"></circle>
                </mask>
            </defs>
            <image mask="url(#label-circle-clip)" fill="#fff" xlinkHref={name}
                   preserveAspectRatio="xMinYMax meet" cx="0" cy="0" width="40.75" height="40.75" style={{
                transform: `translate(${sx + (cos >= 0 ? 1 : -1) - 20}px, ${sy + (cos >= 0 ? 1 : -1) - 20}px)`
            }}></image>
            <text x={sx - (sx > cx ? -25 : 25)} y={sy-16} dy={18} fill={fill} textAnchor={sx > cx ? 'start' : 'end'}
                  dominantBaseline="central" style={{fontSize: "0.96875em", fontWeight: 400}}>{value.toFixed(2)}%
            </text>
        </g>
    );
};

// @ts-ignore
const PeriodPie = ({transactions}) => {

    const colors = Object.keys(transactions).map((item) => {
        return transactions[item].category.hex
    })

    const total = Object.keys(transactions).map((item) => {
        return sumTransactions(transactions[item].transactions)
    }).reduce((acc, a) => acc + a, 0);

    const data = Object.keys(transactions).map((item) => {
        return {
                name: transactions[item].category.icon,
                value: (sumTransactions(transactions[item].transactions)*100)/total
            }
    })

    return (<ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
            <Pie
                dataKey="value"
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                labelLine={false}
                label={renderCustomizedLabel}
            >{
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>)
            }
            </Pie>
        </PieChart>
    </ResponsiveContainer>)
}

export default PeriodPie;