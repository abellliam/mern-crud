import React, {Component} from 'react';
import axios from 'axios';
const clientBackendURL = 'http://localhost:4000/crud'
const backendUrl = 'http://localhost:4000/crud/transaction'; 

export default class CreateItem extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            client_code: '',
            date: '',
            type: '',
            amount: '',
            client_codes: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
        axios.get(`${clientBackendURL}`)
            .then(response => {
                if(this._isMounted) {
                    this.setState({client_codes: response.data.map(item => item.client_code)})
                }
            })
            .catch(function (error) {
                console.log(error);
                return [];
            });
    }

    componentDidUpdate() {
        axios.get(`${clientBackendURL}`)
            .then(response => {
                if(this._isMounted) {
                    this.setState({client_codes: response.data.map(item => item.client_code)})
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    onChange(event, property) {
        this.setState({
            [property]: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        
        console.log(`Form submitted`);

        const newItem = {
            client_code: this.state.client_code,
            date: this.state.date,
            type: this.state.type,
            amount: this.state.amount
        }

        axios.post(`${backendUrl}/add`, newItem)
            .then(res => console.log(res.data));

        this.setState({
            client_code: '',
            date: '',
            type: '',
            amount: ''
        })

        this.props.history.push('/transaction');
    }



    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create new Transaction</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Client Code</label>
                        <select className="form-control"
                                value={this.state.client_code}
                                onChange={event => {
                                    this.onChange(event, 'client_code')
                                }}
                        >
                            <option label=" "></option>
                            {this.state.client_codes.map(client_code =>
                                <option key={client_code}>{client_code}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input type="date"
                               className="form-control"
                               value={this.state.date}
                               onChange={event => {
                                   this.onChange(event, 'date')
                               }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <select className="form-control"
                                value={this.state.type}
                                onChange={event => {
                                    this.onChange(event, 'type')
                                }}
                        >
                            <option label=" "></option>
                            <option>Withdrawal</option>
                            <option>Deposit</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input type="number"
                               className="form-control"
                               value={this.state.amount}
                               onChange={event => {
                                   this.onChange(event, 'amount')
                               }}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create transaction" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}