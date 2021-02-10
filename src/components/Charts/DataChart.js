import React, {useState} from 'react'
import {Doughnut} from 'react-chartjs-2'

class DataChart extends React.Component{

    // Charts State
    state = {
        data: {
            labels: this.props.labels,
            datasets:[{
                label: 'Student Overview',
                data: this.props.data,
                borderWidth: 0,
                backgroundColor: [
                    'rgb(141, 99, 7)',
                    'rgb(15, 26, 46)',
                ]
            }],
        }
        
    }
    render(){
        return (
            <div className="chart" style={{margin: `${this.props.margin}`}}>
                <Doughnut
                data={this.state.data}
                width={25}
                height={10}
                options={{
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
                />
            </div>
        )
    }
}

export default DataChart
