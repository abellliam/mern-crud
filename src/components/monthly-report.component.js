import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import axios from 'axios';
const backendURL = 'http://localhost:4000/crud';

export const Item = props => (
    <tr>
        <td>{props.item.client_code}</td>
        <td>{props.item.client_name}</td>
        <td>{props.item.investment}</td>
        <td>{props.item.balance.toLocaleString('en-AU', {style: 'currency', currency: 'AUD'})}</td>
        <td>{props.item.interest_month.toLocaleString('en-AU', {style: 'currency', currency: 'AUD'})}</td>
        <td>{props.item.interest_year.toLocaleString('en-AU', {style: 'currency', currency: 'AUD'})}</td>
    </tr>
);

export default class MonthlyReport extends Component {
    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3 style={{display: 'inline'}}>Monthly Report</h3>
                <ReactToPrint 
                    trigger={() => <button style ={{display: 'inline', float: 'right', marginRight: '20px'}} className='btn btn-primary'>Print report</button>}
                    content={() => this.componentRef}
                />
                <Table ref={el => (this.componentRef = el)} />
            </div>
        )
    }
}

class Table extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this._isMounted = true;

        axios.get(`${backendURL}`)
            .then(response => {
                if(this._isMounted) {
                    this.setState({
                        items: response.data
                    });
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    componentDidUpdate() {
        axios.get(`${backendURL}`)
            .then(response => {
                if(this._isMounted) {
                    this.setState({items: response.data})
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    itemList() {
        return this.state.items.map(function(currentItem, idx) {
            ['interest_month', 'interest_year'].forEach((prop) =>{if (!currentItem[prop]) {currentItem[prop] = ''}});
            return <Item item={currentItem} key={idx} />
        });
    }

    render() {
        return (
            <div className="table">
                <table className="table table-borderless" style={{marginTop: '50px'}}>
                    <thead>
                        <tr>
                            <th style={{borderBottom: '1pt solid black'}}>Client Code</th>
                            <th style={{borderBottom: '1pt solid black'}}>Client Name</th>
                            <th style={{borderBottom: '1pt solid black'}}>Investment Type</th>
                            <th style={{borderBottom: '1pt solid black'}}>Balance</th>
                            <th style={{borderBottom: '1pt solid black'}}>Interest this month</th>
                            <th style={{borderBottom: '1pt solid black'}}>Interest this financial year</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.itemList() }
                        <tr />
                        <tr>
                            <td>TOTAL</td>
                            <td />
                            <td />
                            <td>{`$${(Math.round(100*this.state.items.reduce((total, item) =>{return total + item.balance}, 0))/100).toLocaleString()}`}</td>
                            <td>{`$${(Math.round(100*this.state.items.reduce((total, item) =>{return total + item.interest_month}, 0))/100).toLocaleString()}`}</td>
                            <td>{`$${(Math.round(100*this.state.items.reduce((total, item) =>{return total + item.interest_year}, 0))/100).toLocaleString()}`}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}