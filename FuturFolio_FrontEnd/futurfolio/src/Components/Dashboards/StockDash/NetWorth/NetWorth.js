import React, { Component } from 'react';
import NetWorthTab from './NetWorthTab';
import { ResponsiveLine } from '@nivo/line';
import { Defs, linearGradientDef } from '@nivo/core';

export default class NetWorth extends Component {
    constructor() {
        super();
        this.state = {
            NetWorth: "25,023",
            Currency: '£',
            colors: ["#00a2ff", "#00d123", "#00ccff", "#6bf181"]
        };
      }
    
    MyResponsiveLine = (data) => (
        <ResponsiveLine
            data={data}
            margin={{ top: 5, right: 50, bottom: 40, left: 40 }}
            xScale={{
                type: 'time',
                format: '%Y-%m-%d',
                useUTC: false,
                precision: 'day'
            }}
            xFormat="time:%Y-%m-%d"
            yScale={{ 
                type: 'linear',
                min: 0,
                max: 'auto',
                stacked: false,
                reverse: false 
            }}
            curve="catmullRom"
            defs={[
                linearGradientDef('gradientA', [
                    { offset: 0, color: 'inherit' },
                    { offset: 100, color: 'inherit', opacity: 0 },
                ]),
            ]}
            fill={[{ match: '*', id: 'gradientA' }]}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 0,
                tickPadding: 15,
                format: '%b %d',
                /*tickValues: 'every 2 days',*/ 
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 0,
                tickPadding: 15,
                /*
                format: value =>
                `${(value).toString().substr(0,2)} k`
                */
            }}
            enableGridX={false}
            colors={{ datum: 'color' }}
            lineWidth={2}
            pointSize={3}
            pointColor={{ from: 'color', modifiers: [] }}
            pointBorderWidth={10}
            pointBorderColor={{ theme: 'background' }}
            pointLabelYOffset={-12}
            enableArea={true}
            areaBaselineValue={0}
            areaBlendMode="multiply"
            crosshairType="cross"
            useMesh={true}
            legends={[
                {
                    anchor: 'top',
                    direction: 'row',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    )

    GraphData = () => {
        const { stocks } = this.props;
        let stockBigChart = [];

        // BIG O(a*b)
        for (let i=0; i<stocks[1].comparisons.length; i++) { // Get 5y graph
            let chartData = [];
            for (let j=0; j<stocks[1].timestamp.length; j += 20) {
                try {
                    let currentDate = new Date(0);
                    currentDate.setUTCSeconds(stocks[1].timestamp[j]);
                    let finalDate = currentDate.getUTCFullYear()+"-";
                    let temp = currentDate.getUTCMonth();
                    if (temp<10) {
                        finalDate = finalDate + "0" + temp + "-";
                    }
                    else {
                        finalDate = finalDate + temp + "-";
                    }

                    temp = currentDate.getUTCDate();
                    if (temp<10) finalDate = finalDate + "0" + temp;
                    else finalDate = finalDate + temp;

                    chartData.push({
                        x: finalDate,
                        y: stocks[1].comparisons[i].close[j],
                    });
                    currentDate.toString();
                }
                catch {
                    console.log("undefined");
                }
            }

            stockBigChart.push({
                id: stocks[1].comparisons[i].symbol,
                color: this.state.colors[i],
                data: chartData
            }); 
        }

        return stockBigChart;
    }

    render() {

        return (
            <div className="NetworthBox">
                <NetWorthTab 
                Currency={this.state.Currency}
                NetWorth={this.state.NetWorth} />
                <div className="BigLineChartBox">
                    {this.MyResponsiveLine(this.GraphData())}
                </div>
            </div>
        )
    }
}
