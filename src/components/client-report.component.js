 import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import axios from 'axios';
const backendURL = 'http://localhost:4000/crud';

export const Item = props => (
    <tr>
        <td>{props.item.investment}</td>
        <td>{props.item.rate}</td>
        <td>{props.item.balance}</td>
        <td>{props.item.date_from}</td>
        <td>{props.item.date_to}</td>
        <td>{props.item.days_in}</td>
        <td>{props.item.interest}</td>
    </tr>
);

export default class MonthlyReport extends Component {
    _isMounted = false

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);

        this.state = {
            client_code: '',
            clients: []
        }
    }

    componentDidMount() {
        this._isMounted = true;

        axios.get(`${backendURL}`)
            .then(response => {
                if(this._isMounted) {
                    this.setState({
                        clients: response.data
                    });
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    componentDidUpdate() {
        if(this.state.clients.length === 0) {
            axios.get(`${backendURL}`)
                .then(response => {
                    if(this._isMounted) {
                        this.setState({
                            clients: response.data
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onChange(event) {
        this.setState({
            client_code: event.target.value
        })
    }
    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3 style={{display: 'inline'}}>Monthly Report</h3>
                <label style={{marginLeft: '100px', fontSize: '24px'}}>Client Code</label>
                <select
                    style={{marginLeft: '20px', display: 'inline', width: '25%'}}
                    className="form-control"
                    value={this.state.client_code}
                    onChange={this.onChange}
                >
                <option label=" "></option>
                {this.state.clients.map(client =>
                    <option key={client.client_code}>{client.client_code}</option>
                )}
                </select>
                <ReactToPrint 
                    trigger={() => <button style ={{display: 'inline', float: 'right', marginRight: '20px'}} className='btn btn-primary'>Print report</button>}
                    content={() => this.componentRef}
                />
                <Table ref={el => (this.componentRef = el)} client_code={this.state.client_code} client={!this.state.clients.find(client => {return client.client_code === this.state.client_code}) ? '': this.state.clients.find(client => {return client.client_code === this.state.client_code})} />
            </div>
        )
    }
}

class Table extends Component {
    itemList() {
        let currentClient = this.props.client;
        if (currentClient.interest) {
            let interest = JSON.parse(currentClient.interest);
            let ans = [];
            for (let i = 0; i < interest.length; i++) {
                let currentItem = interest[i]
                currentItem.investment = (i === 0 ? currentClient.investment : '');
                currentItem.rate = (i === 0 ? `${currentItem.rate}%` : '')
                currentItem.balance = currentItem.balance.toLocaleString('en-AU', {style: 'currency', currency: 'AUD'});
                currentItem.interest = currentItem.interest.toLocaleString('en-AU', {style: 'currency', currency: 'AUD'});
                ans.push(<Item item={currentItem} key={JSON.stringify(currentItem)}/>);
            }
            let lastItem = {investment: '', rate: '', balance: '', interest: currentClient.interest_month.toLocaleString('en-AU', {style: 'currency', currency: 'AUD'}), date_from: '', date_to: '', days_in: 'TOTAL'}
            ans.push(<Item item={lastItem} key={JSON.stringify(lastItem)}/>);
            return ans;
        }
    }

    render() {
        return (
            <div className="table">
                <p style={{marginTop: 20}}>{this.props.client.client_name}<br/>{this.props.client.address_1}<br/>{this.props.client.address_2}<br/>{this.props.client.address_3}</p>
                <table className="table table-borderless" style={{marginTop: '50px'}}>
                    <thead>
                        <tr>
                            <th style={{borderBottom: '1pt solid black'}}>Investment Type</th>
                            <th style={{borderBottom: '1pt solid black'}}>Interest Rate</th>
                            <th style={{borderBottom: '1pt solid black'}}>Balance</th>
                            <th style={{borderBottom: '1pt solid black'}}>Date From</th>
                            <th style={{borderBottom: '1pt solid black'}}>Date To</th>
                            <th style={{borderBottom: '1pt solid black'}}>Days In</th>
                            <th style={{borderBottom: '1pt solid black'}}>Interest</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.itemList() }
                    </tbody>
                </table>
            </div>
        )
    }
}