import React, {Component} from 'react'
import axios from "axios";
import {Button} from "@material-ui/core";
import ReactDom from "react-dom";
import ReactApexChart from "react-apexcharts";

class Child extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: "Good count",
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
                    text: 'Good demand trends',
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

    convertDate(inputFormat) {
        function pad(s) {
            return (s < 10) ? '0' + s : s;
        }

        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-')
    }

    renderTableData(list) {
        return list.map((demand, index) => {
            const {date, good_count} = demand
            return (

                    <tr key={date}>
                        <td>{this.convertDate(date)}</td>
                        <td>{good_count}</td>
                    </tr>
            )
        })
    }

    renderTableHeader() {
        let header = ["Дата", "Количество"]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    render() {
        var good_counts = [];
        var dates = [];

        this.props.demands.map((good, iter) => {
                const {date, good_count} = good;
                good_counts.push(good_count);
                dates.push(date);
            }
        )

        this.state = {
            series: [{
                name: "Количество",
                data: good_counts
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
                    text: 'Спрос на товары',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: dates
                }
            },
        };

        return (
            <div>
                <div id="chart">
                    <ReactApexChart id="demand-shart" options={this.state.options} series={this.state.series}
                                    type="line" height={350}/>
                </div>

                <table className="table table-success table-striped">
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData(this.props.demands)}
                    </tbody>
                </table>
            </div>

        );
    }
}

class Demand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            demands: [],
            default_date: new Date(),
            lhs_date: new Date(),
            rhs_date: new Date(),
            good_count: [],
            dates: []
        };

        var curr = new Date();
        curr.setDate(curr.getDate() - 1);
        this.state.lhs_date = curr.toISOString().substr(0, 10);

        curr.setDate(curr.getDate() + 2);
        this.state.rhs_date = curr.toISOString().substr(0, 10);
    }

    convertDate(inputFormat) {
        function pad(s) {
            return (s < 10) ? '0' + s : s;
        }

        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-')
    }

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    handleSubmit = event => {
        if (this.state.lhs_date == "" || this.state.rhs_date == "") {
            alert("First date should be less then second")
        } else if (this.state.lhs_date > this.state.rhs_date) {
            alert("First date should be less then second")
        } else {
            axios.get('http://127.0.0.1:8080/goods-demand?id=' + this.props.id + '&lhs=' +
                this.convertDate(this.state.lhs_date)
                + '&rhs=' + this.convertDate(this.state.rhs_date))
                .then(res => {
                    this.setState({demands: res.data});
                }).catch(function (error) {
                if (error.response) {
                    alert(error.response.data);
                }
            })
        }

        var good_counts = [];
        var dates = [];

        this.state.demands.map((good, iter) => {
                const {date, good_count} = good;
                good_counts.push(good_count);
                dates.push(date);
            }
        )

        this.state.good_count = good_counts
        this.state.dates = dates
    }

    handleChangeLhsDate = event => {
        this.setState({
            lhs_date: event.target.value
        });
    }

    handleChangeRhsDate = event => {
        this.setState({
            rhs_date: event.target.value
        });
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        return ReactDom.createPortal(
            <div className='modal demand-modal' id='modal' onClick={this.onClose}>
                <div className='modal-content demand-modal-content cringeModal' id='modal' onClick={e => e.stopPropagation()}>
                    <h4>График спроса для товара: {this.props.id}</h4>
                    <div className='demand-content '>
                        <Child demands={this.state.demands} good_counts={this.state.good_counts}
                               dates={this.state.dates}/>
                        <label>Дата начала </label>
                        <input type="date" value={this.state.lhs_date} onChange={this.handleChangeLhsDate}/><br/>

                        <label>Дата конца </label>
                        <input type="date" value={this.state.rhs_date} onChange={this.handleChangeRhsDate}/><br/>
                        <div className='actions'>
                            <Button type="button" class="btn btn-outline-success" onClick={this.handleSubmit}>Показать
                                спрос</Button>
                        </div>
                    </div>
                </div>
            </div>,
            document.getElementById('root')
        );
    }
}

export default Demand
