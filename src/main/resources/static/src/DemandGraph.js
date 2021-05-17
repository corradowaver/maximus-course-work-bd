import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts'
import ReactDom from 'react-dom'

export default class DemandGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: "Desktops",
                data: this.props.good_counts
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'Product Trends by Month',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: this.props.dates,
                }
            },
        };
    }

    render() {
        // var good_counts = [];
        // var dates = [];
        //
        // console.log(this.props.demands)
        //
        // this.props.demands.map((good, iter) => {
        //         const {date, good_count} = good;
        //         good_counts.push(good_count);
        //         dates.push(date);
        //     }
        // )
        //
        // this.setState({
        //     series: [{
        //         name: "Desktops",
        //         data: good_counts
        //     }],
        //     options: {
        //         xaxis: {
        //             categories: dates,
        //         }
        //     }
        // })

        console.log("this.props.dates" + this.props.dates)
        console.log("this.props.good_counts" + this.props.good_counts)

        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350}/>
            </div>
        )
    }
}
