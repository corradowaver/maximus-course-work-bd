import React from "react";
import ReactDom from 'react-dom'
//import {CSSTransaction} from 'react-transaction-group'
import styles from './Modal.css';
import axios from "axios";
import {Button} from "@material-ui/core";


export default class GoodModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            good_count: '',
            create_date: '',
            good_id: -1,
            good_list: []
        }

        var curr = new Date();
        curr.setDate(curr.getDate());

        console.log(this.props.create_date)

        if (this.props.id !== -1) {
            this.state.good_count =  this.props.good_count;
            this.state.create_date = this.props.create_date
            this.state.good_id = this.props.good_id;
        } else {
            this.state.create_date = curr.toISOString().substr(0,10);
        }
    }

    getGoods = () => {
        axios.get('http://127.0.0.1:8080/goods')
            .then(res => {
                this.setState({ good_list: res.data });
            }).catch(function (error) {
            if (error.response) {
                alert(error.response.data);

            }
        })
    }

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    handleChangeGoodCount = event => {
        let telephone = event.target.value;

        if (!Number(telephone) && telephone !== '') {
            return;
        }

        this.setState({good_count: telephone})
    }

    handleChangeGoodId = event => {
        this.setState({
            good_id: event.target.value
        });
    }

    handleChangeCreateDate = event => {
        let telephone = event.target.value;
        this.setState({create_date: telephone})
    }

    delete = () => {
        axios.delete('http://127.0.0.1:8080/delete-sale?id=' + this.props.id)
            .catch(function (error) {
                alert(error.response.data);
                if (error.response) {
                    console.log(error.response.data)
                    alert(error.response.data);
                }
            })

        window.location.reload();
        this.onClose();
    }


    convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
    }


    handleSubmit = event => {
        if (!this.state.good_count) {
            alert("Please enter good count")
            return;
        }

        if (!this.state.create_date) {
            alert("Please enter create date")
            return;
        }

        alert("Количество товаров в заявке больше на количество товаров на обоих складах")

        let payload = { id: this.props.id, good_count: this.state.good_count, create_date: this.convertDate(this.state.create_date),
            good_id: this.state.good_id, name: '', priority: ''};

        console.log(payload)
        axios.post('http://127.0.0.1:8080/add-sale', payload)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data)
                    alert(error.response.data);

                }
            })


        window.location.reload();
        this.onClose();


        event.preventDefault();
    }

    renderSelect() {
        this.getGoods()
        return this.state.good_list.map((good, index) => {
            const { id, name, priority} = good
            return (
                <option value={id} >
                    {name}
                </option>
            )
        })
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        return ReactDom.createPortal(
            <div className='modal' id='modal' onClick={this.onClose}>
                <div className='modal-content cringeModal' id='modal' onClick={e => e.stopPropagation()}>
                    <h4>{this.props.id === -1 ? "Новая продажа " : "Продажа: " + this.props.id}</h4>
                    <div className='content'>
                        <label>Количество товара </label>
                        <input type="text" value={this.state.good_count} onChange={this.handleChangeGoodCount} /><br/>

                        <label>Дата создания </label>
                        <input type="date" value={this.state.create_date} onChange={this.handleChangeCreateDate} /><br/>
                        <label>Товар </label>
                        <select defaultValue={this.state.good_id} value={this.state.good_id} onChange={this.handleChangeGoodId}>
                            {this.renderSelect()}
                        </select>
                    </div>
                    <div className='actions'>
                        <Button type="button" class="btn btn-outline-success" onClick={this.handleSubmit}>{this.props.id === -1 ? "Добавить" : "Изменить"}</Button>
                        {this.props.id === -1 ? <label/> : ( <Button type="button" class="btn btn-outline-danger" onClick={this.delete}>Удалить</Button>)}

                    </div>
                </div>
            </div>,
            document.getElementById('root')
        );
    }
}
