import React, {Component} from 'react';
import axios from 'axios';
import {Item} from './client.item-list.component';
const backendUrl = 'http://localhost:4000/crud';

export default class DeleteItem extends Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);

        this.state = {
            client_code: '',
            client_name: '',
            address_1: '',
            address_2: '',
            address_3: '',
            postcode: '',
            account_name: '',
            account_no: '',
            TFN_1: '',
            TFN_2: '',
            investment: '',
            balance: '',
            email: '',
            as_of: ''
        }
    }

    componentDidMount() {
        this._isMounted = true;

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

        this.props.history.push('/');
    }

    render() {
        return(
            <div style={{marginTop: 20}}>
                <h3>Are you sure you want to delete this client?</h3>
                <table className="table table-striped" style={{marginTop: 1 + 'em'}}>
                    <thead>
                        <tr>
                            <th>Client Code</th>
                            <th>Client Name</th>
                            <th>Investment Type</th>
                            <th>Client Balance ($)</th>
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