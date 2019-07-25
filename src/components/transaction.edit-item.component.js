import React, {Component} from 'react';
import axios from 'axios';
const clientBackendUrl = 'http://localhost:4000/crud'
const backendUrl = 'http://localhost:4000/crud/transaction';

export default class EditItem extends Component {

    constructor(props) {
        super(props);

        this._isMounted = false;

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
        this._isMounted = true

        axios.get(`${backendUrl}/${this.props.match.params.id}`)
            .then(response => {
                if(this._isMounted){
                    this.setState(response.data);
                }
            })
            .catch(function(error) {
                console.log(error)
            });
        
        axios.get(`${clientBackendUrl}`)
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
        axios.get(`${clientBackendUrl}`)
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
        const client = JSON.parse(JSON.stringify(this.state));
        axios.post(`${backendUrl}/update/${this.props.match.params.id}`, client)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        this.props.history.push('/transaction');
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Edit Transaction</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Client Code</label>
                        <select className="form-control"
                               value={this.state.client_code}
                               onChange={event => {
                                   this.onChange(event, 'client_code')
                               }}
                        >
                            {this.state.client_codes.map(client_code =>
                                <option>{client_code}</option>
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
                        <input type="submit" value="Edit transaction" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}