import React, { Component } from 'react';
import axios from 'axios';
import {Item as RateItem} from './rate.item-list.component';
const backendURL = 'http://localhost:4000/crud';

export default class MonthlyProcessing extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.undo = this.undo.bind(this);

        this.state = {
            rate: {}
        };
    }
    
    convertDate(date) {
        return date.split('-').reverse().join('/')
    }

    componentDidMount() {
        this._isMounted = true;
        axios.get(`${backendURL}/rate/last`)
            .then(response => {
                if(this._isMounted) {
                    this.setState({
                        rate: response.data
                    });
                }
            })
            .catch(error =>{
                console.log(error);
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    undo() {
        const rate = this.state.rate;
        rate.eom_calc = 'No';

        // Update eom_calc and submit rate
        axios.post(`${backendURL}/rate/update/${rate._id}`, rate)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        // Get all clients
        let clients;
        axios.get(`${backendURL}/`)
            .then(res => {clients = res.data})
            .then(() =>
        {
        // Update clients details
        for (let clientNo in clients) {
            let client = clients[clientNo];
            client.balance -= client.interest_month;
            client.interest = '';
            client.interest_year -= client.interest_month;
            client.interest_month = '';

        }
        // Post clients to backend
        axios.post(`${backendURL}/update/`, clients)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        
        })
        .catch(err => console.log(err));

        this.props.history.push('/');
    }

    onSubmit() {
        const rate = this.state.rate;
        rate.eom_calc = 'Yes';

        // Update end of month for rate
        axios.post(`${backendURL}/rate/update/${rate._id}`, rate)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        
        // Get all clients
        let clients;
        axios.get(`${backendURL}/`)
            .then(res => {clients = res.data})
            .then(() =>
        {
        // Get current month from rate
        let splitDate = this.state.rate.date.split('-');
        let curMonth = splitDate[1];
        const curYear = parseInt(splitDate[0]);
        const daysInYear = (curYear % 4 === 0) ? 366: 365;
        
        // Get transactions for this month
        let transactions;
        axios.get(`${backendURL}/transaction/month/${curMonth}`)
            .then(res => {transactions = res.data})
            .then(() =>
        {
        curMonth = parseInt(curMonth);
        const daysInMonth = new Date(curYear, curMonth, 0).getDate();
        let clientTransactions = {};
        clients.forEach(client =>{
            clientTransactions[client.client_code] = [client.balance]; 
        })

        // Sort transactions by value of day
        transactions.sort((a, b) => {return parseInt(a.date.split('-')[2]) - parseInt(b.date.split('-')[2])})

        // Map transaction dates/amounts to clients
        transactions.forEach(transaction =>{
            clientTransactions[transaction.client_code].push(transaction)
        });


        // Construct array of dates and amounts per client
        for (let client in clientTransactions) {
            let transactionHistory = [];
            let clientTransaction = clientTransactions[client];
            let curBalance = clientTransaction.shift();
            clientTransaction.forEach(transaction =>{
                curBalance += (transaction.type === 'Withdrawal' ? -1 : 1) * transaction.amount
                transactionHistory.push({'date': parseInt(transaction.date.split('-')[2]), 'strDate': this.convertDate(transaction.date), 'balance': curBalance})
            });
            clientTransactions[client] = {'history': transactionHistory};
        };
        let clientInterests = {};
        // Calculate interest for each client
        for (let client_code in clientTransactions) {
            let interest = 0;
            let curDate = 1;
            let strCurDate = this.convertDate(this.state.rate.date);
            // Set starting date to client as_of if appropriate
            for (const client_item of clients) {
                if (client_item.client_code === client_code) {
                    const clientDate = client_item.as_of.split('-');
                    if (curYear === parseInt(clientDate[0]) && curMonth === parseInt(clientDate[1])) {
                        curDate = parseInt(clientDate[2]);
                        strCurDate = this.convertDate(client_item.as_of);
                    }
                }
            }
            let dailyRate = (this.state.rate.rate / daysInYear / 100);
            let clientTransaction = clientTransactions[client_code].history;
            let balance = clients.find(client => {return client.client_code === client_code}).balance;
            let totalInterest = 0
            if (clientTransaction.length) {
                clientTransaction.forEach(transaction =>{
                    interest = balance * dailyRate * (transaction.date - curDate);
                    const clientInterest = {'interest': Math.round(100*interest)/100, 'date_from': strCurDate, 'date_to': transaction.strDate, 'days_in': transaction.date - curDate, 'balance': balance, 'rate': this.state.rate.rate}
                    if (clientInterests[client_code]) {
                        clientInterests[client_code].push(clientInterest);
                    } else {
                        clientInterests[client_code] = [clientInterest];
                    }
                    curDate = transaction.date;
                    strCurDate = transaction.strDate;
                    balance = transaction.balance;
                    totalInterest += interest;
                });
            }

            interest = balance * dailyRate * (daysInMonth + 1 - curDate);
            totalInterest += interest;
            const clientInterest = {'interest': Math.round(100*interest)/100, 'date_from': strCurDate, 'date_to': daysInMonth.toString() + this.convertDate(this.state.rate.date).slice(2), 'days_in': daysInMonth + 1 - curDate, 'balance': balance, 'rate': this.state.rate.rate}
            if (clientInterests[client_code]) {
                clientInterests[client_code].push(clientInterest);
            } else {
                clientInterests[client_code] = [clientInterest];
            }
            
            clientTransactions[client_code] = {balance_reinvest: Math.round(100*(balance + totalInterest))/100,
                                               balance_cheque: balance,
                                               interest_month: Math.round(100*totalInterest)/100};
        };

        // Update balance for clients
        for(let clientNo in clients) {
            let client = clients[clientNo];
            let newInfo = clientTransactions[client.client_code]
            let interestStr = clientInterests[client.client_code]
            client.balance = (client.investment === 'Reinvest' ? newInfo.balance_reinvest : newInfo.balance_cheque);
            client.interest = JSON.stringify(interestStr)
            client.interest_month = newInfo.interest_month;
            client.interest_year = client.interest_year ? client.interest_year: 0;
            // If it's July, reset the interest otherwise add to existing
            client.interest_year = (curMonth === 7) ? newInfo.interest_month : Math.round(100*(client.interest_year + newInfo.interest_month))/100;
        }
        axios.post(`${backendURL}/update/`, clients)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
        
        this.props.history.push('/');

    }
    
    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Perform Monthly Processing using this rate?</h3>
                <table className="table table-striped" style={{marginTop: 1 + 'em'}}>
                    <thead>
                        <tr>
                            <th>Interest rate</th>
                            <th>Date</th>
                            <th>End of month calculated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <RateItem item={this.state.rate} key={0} displayActions={true} />
                    </tbody>
                </table>
                <div style={{display: 'flex', justifyContent: 'space-between', float: 'right', 'width': '30%'}}>
                    <input type="submit" value="Undo processing" className="btn btn-danger" onClick={this.undo} />
                    <input type="submit" value="Perform processing" className="btn btn-primary" onClick={this.onSubmit} />
                </div>
            </div>
        );
    }
}