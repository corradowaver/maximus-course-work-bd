import React, { Component } from 'react'
import axios from "axios";
import styles from './warehoudeTable.css';
import SaleModal from "./SaleModal";
import {Button} from "@material-ui/core";

class Sales extends Component {

    state = {
        show: false,
        goods: [],
        id: -1,
        good_count: "",
        create_date: "",
        good_id: 0
    }

    showModal = (e, id, good_count, create_date, good_id) => {
        this.setState({
            show: !this.state.show,
            id: id,
            good_count: good_count,
            create_date: create_date,
            good_id: good_id
        });
    };


    componentDidMount() {
        axios.get('http://127.0.0.1:8080/sales')
            .then(res => {
                const goods = res.data;
                this.setState({ goods: res.data });
            }).catch(function (error) {
            if (error.response) {
                alert(error.response.data);

            }
        })

    }

    tdclick(event){
        event.stopPropagation()
    };

    renderTableData() {
        return this.state.goods.map((good, index) => {
            const { id, good_count, create_date, good_id, name, priority} = good //destructuring
            return (
                <tr key={id} onClick={e => {
                    this.showModal(e, id, good_count, create_date, good_id);
                }}>
                    <td>{id}</td>
                    <td>{good_count}</td>
                    <td>{this.convertDate(create_date)}</td>
                    <td>{good_id}</td>
                    <td>{name}</td>
                    <td onClick={this.tdclick}>{priority}</td>
                </tr>
            )
        })
    }


    convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
    }

    renderTableHeader() {
        let header = ["ID", "Количество", "Дата создания", "ID товара", "название", "приоритет"]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    render() {
        return (
                <div className="cringeMain">
                    <div className="cringeDiv">
                <h4 className='titlePage'>Информация о продажах</h4>
                <table class="table table-success table-striped">
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                    </tbody>
                </table>
                {this.state.show ? (<SaleModal id = {this.state.id} good_count = {this.state.good_count} create_date = {this.state.create_date}
                                               good_id = {this.state.good_id} onClose={this.showModal} show={this.state.show} />) : null}
                    </div>
                <Button type="button" class="btn btn-outline-success" onClick={e => {this.showModal(e, -1)}}>Добавить продажу</Button>

            </div>
        )
    }
}

export default Sales
