import React, { useState, useEffect } from 'react';
import moment from 'moment'

import {
    BarChart,
    Bar,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
const ClickPerDay = ({ datas }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        let chartKeys = {}
        for (let i = 0; i < datas.length; i++) {
            let key = moment(new Date(datas[i].createdAt)).format('L');
            if (chartKeys[key]) {
                chartKeys[key] += 1;
            } else {
                chartKeys[key] = 1;
            }

        }
        let chartDatas = []
        for (var key in chartKeys) {
            chartDatas.push({ name: key, value: chartKeys[key] })
        }
        console.log(chartDatas)
        chartDatas = chartDatas.sort(function (a, b) {
            return new Date(a.name).getTime() > new Date(b.name).getTime() ? 1 : -1;
        });
        console.log(chartDatas)

        setChartData(chartDatas)
    }, [])

    return (
        <ResponsiveContainer width='100%' height="100%" >
            <BarChart data={chartData}>
                <XAxis dataKey="name" />

                <YAxis dataKey='value' name='Value' />

                <Bar dataKey="value" fill="#82ca9d" />

            </BarChart>
        </ResponsiveContainer>
    );
};

export default ClickPerDay;