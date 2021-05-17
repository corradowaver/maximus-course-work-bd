import React, {Component} from 'react'
import axios from "axios";
import GoodModal from "./GoodModal";
import {Button} from "@material-ui/core";
import Demand from "./Demand";

class Goods extends Component {

    state = {
        show: false,
        show_demand: false,
        goods: [],
        most_goods: [],
        id: -1,
        id_demand: -1,
        good_name: "",
        good_priority: ""
    };

    showModal = (e, id, name, priority) => {
        this.setState({
            show: !this.state.show,
            id: id,
            good_name: name,
            good_priority: priority
        });
    };

    componentDidMount() {
        axios.get('http://127.0.0.1:8080/goods')
            .then(res => {
                this.setState({goods: res.data});
            }).catch(function (error) {
            if (error.response) {
                alert(error.response.data);
            }
        })

        axios.get('http://127.0.0.1:8080/goods-five-popular')
            .then(res => {
                this.setState({most_goods: res.data});
            }).catch(function (error) {
            if (error.response) {
                alert(error.response.data);
            }
        })
    }

    tdclick(event) {
        event.stopPropagation()
    };

    showDemand = (event, id) => {
        event.stopPropagation()
        this.changeDemandState(id)
    }

    changeDemandState = (id) => {
        this.setState({
            show_demand: !this.state.show_demand,
            id_demand: id
        });
    }

    renderTableDataMost(list) {
        return list.map((good, index) => {
            const {id, name, priority} = good //destructuring
            return (
                <tr key={id} onClick={e => {
                    this.showModal(e, id, name, priority);
                }}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{priority}</td>
                </tr>
            )
        })
    }

    renderTableData(list) {
        return list.map((good, index) => {
            const {id, name, priority} = good //destructuring
            return (
                <tr key={id} onClick={e => {
                    this.showModal(e, id, name, priority);
                }}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{priority}</td>
                    <Button type="button" class="btn btn-warning" onClick={e => {
                        this.showDemand(e, id)
                    }}>Узнать</Button>

                </tr>
            )
        })
    }

    renderTableHeaderMost() {
        let header = ["ID", "Название", "Приоритет"]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableHeader() {
        let header = ["ID", "Название", "Приоритет", "Спрос"]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    render() {
        return (
            <div className="cringeMain">
                <div className="cringeDiv">
                    <h4 className='title-most-popular'>Пять самых популярных товаров</h4>

                    <table table class="table table-success table-striped">
                        <tbody>
                        <tr>{this.renderTableHeaderMost()}</tr>
                        {this.renderTableDataMost(this.state.most_goods)}
                        </tbody>
                    </table>
                </div>
                <div className="cringeDiv">
                    <h4 className='title-most-popular'>Все товары</h4>
                    <table class="table table-success table-striped">
                        <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData(this.state.goods)}
                        </tbody>
                    </table>
                    {this.state.show ? (
                        <GoodModal id={this.state.id} name={this.state.good_name}
                                   priority={this.state.good_priority}
                                   onClose={this.showModal} show={this.state.show}/>) : null}
                    {this.state.show_demand ? (<Demand
                                                       id={this.state.id_demand}
                                                       onClose={this.changeDemandState}
                                                       show={this.state.show_demand}/>) : null}
                </div>
                <button type="button" className="btn btn-outline-success" onClick={e => {
                    this.showModal(e, -1)
                }}>Добавить товар
                </button>
            </div>
        )
    }
}

export default Goods
