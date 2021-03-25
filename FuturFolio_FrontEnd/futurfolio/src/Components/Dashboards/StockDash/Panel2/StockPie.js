import { ResponsivePie } from '@nivo/pie';
import React from 'react';
import './StockPie.css';

export default function StockPie(props) {    
    
    let PieData = [];
    let colors = ['#01ABC1','#3f80ED','#3A4AA5']
    let i = 0;
    let amount = 0;
    let totalAmount = 0;

    // Get total stocks amount
    for (var item of props.stocks) {
        amount = props.stockAmount(item)
        totalAmount += amount; 
    }

    // Get data per each stock for pie chart
    for (var item of props.stocks) {
        amount = props.stockAmount(item)
        PieData.push({
          id:(amount/totalAmount*100).toFixed(2) + '%',
          label: item.stockSymbol,
          value: amount,
          color: colors[i]
        });
        i++
    }
    
    const MyResponsivePie = (data) => (
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            startAngle={360}
            endAngle={0}
            innerRadius={0.45}
            padAngle={2}
            cornerRadius={3}
            colors={{datum: 'data.color'}}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', '1.5' ] ] }}
            enableRadialLabels={false}
            radialLabelsSkipAngle={10}
            radialLabelsTextColor="#333333"
            radialLabelsLinkColor={{ from: 'color' }}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor="#ffffff"
            sliceLabel="id"
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 90,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )
    

    return (
        <div className="PieBox">
            <p className="Panel2Title">Allocation</p>
            {MyResponsivePie(PieData)}
        </div>
    )
}