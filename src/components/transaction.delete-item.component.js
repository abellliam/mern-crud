import React, {Component} from 'react';
import axios from 'axios';
import {Item} from './transaction.item-list.component'
const backendUrl = 'http://localhost:4000/crud/transaction'

export default class DeleteItem extends Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);

        this.state = {
            client_code: '',
            date: '',
            type: '',
            amount: ''
        }
    }

    componentDidMount() {
        this._isMounted = true;
        console.log(this.props.match.params.id);

        axios.get(`${backendUrl}/${this.props.match.params.id}`)
            .then(response => {
                if(this._isMounted) {
                    this.setState(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onDelete(event) {
        event.preventDefault();

        axios.post(`${backendUrl}/delete`, { id: this.props.match.params.id })
        .then(console.log(`Client ${this.props.match.params.id} deleted`))
        .catch(err => (console.log(err)));

        this.props.history.push('/transaction');
    }

    render() {
        return(
            <div style={{marginTop: 20}}>
                <h3>Are you sure you want to delete this Transaction?</h3>
                <table className="table table-striped" style={{marginTop: 1 + 'em'}}>
                    <thead>
                        <tr>
                            <th>Client Code</th>
                            <th>Transaction date</th>
                            <th>Transaction type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Item item={this.state} key={0} ></Item>
                    </tbody>
                </table>
                <input type="button" value="Delete Item" className="btn btn-danger" onClick={this.onDelete}/>
            </div>
        )
    }
}