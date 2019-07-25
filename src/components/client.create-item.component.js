import React, {Component} from 'react';
import axios from 'axios';
const backendUrl = 'http://localhost:4000/crud'; 

export default class CreateItem extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);   
        
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

    onChange(event, property) {
        this.setState({
            [property]: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        
        console.log(`Form submitted`);

        const newItem = JSON.parse(JSON.stringify(this.state));

        axios.post(`${backendUrl}/add`, newItem)
            .then(res => console.log(res))
            .then(() => {
                Object.keys(newItem).forEach(property => {
                    newItem[property] = '';
                });
        
                this.setState(newItem);
        
                this.props.history.push('/');
            });
    }



    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create new Client</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Client Code</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.client_code}
                               onChange={event => {
                                   this.onChange(event, 'client_code')
                               }}
                            />
                    </div>
                    <div className="form-group">
                        <label>Client Name</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.client_name}
                               onChange={event => {
                                   this.onChange(event, 'client_name')
                               }}
                            />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.address_1}
                               onChange={event => {
                                   this.onChange(event, 'address_1')
                               }}
                            />
                    </div>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               value={this.state.address_2}
                               onChange={event => {
                                   this.onChange(event, 'address_2')
                               }}
                            />
                    </div>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               value={this.state.address_3}
                               onChange={event => {
                                   this.onChange(event, 'address_3')
                               }}
                            />
                    </div>
                    <div className="form-group">
                        <label>Postcode</label>
                        <input type="number"
                               min="1000"
                               max="9999"
                               className="form-control"
                               value={this.state.postcode}
                               onChange={event => {
                                   this.onChange(event, 'postcode')
                               }}
                            />
                    </div>
                    <div className="form-group">
                        <label>Account Name</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.account_name}
                               onChange={event => {
                                   this.onChange(event, 'account_name')
                               }}
                            />
                    </div>
                    <div className="form-group">
                        <label>Account Number</label>
                        <input type="number"
                               className="form-control"
                               value={this.state.account_no}
                               onChange={event => {
                                   this.onChange(event, 'account_no')
                               }}
                            />
                    </div>
                    <div className="form-group">
                        <label>Tax File Number</label>
                        <input type="number"
                               max="999999999"
                               className="form-control"
                               value={this.state.TFN_1}
                               onChange={event => {
                                   this.onChange(event, 'TFN_1')
                               }}
                            />
                    </div>
                    <div className="form-group">
                        <input type="number"
                               max="999999999"
                               className="form-control"
                               value={this.state.TFN_2}
                               onChange={event => {
                                   this.onChange(event, 'TFN_2')
                               }}
                            />
                    </div>
                    <div className="form-group">
                        <label>Investment Type</label>
                        <select className="form-control"
                                value={this.state.investment}
                                onChange={event => {
                                    this.onChange(event, 'investment')
                                }}
                            >
                            <option />
                            <option>Reinvest</option>
                            <option>Cheque</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Balance</label>
                        <input type="number"
                               className="form-control"
                               value={this.state.balance}
                               onChange={event => {
                                   this.onChange(event, 'balance')
                               }}
                            />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.email}
                               onChange={event => {
                                   this.onChange(event, 'email')
                               }}
                            />
                    </div>
                    <div className="form-group">
                        <label>As Of</label>
                        <input type="date"
                               className="form-control"
                               value={this.state.as_of}
                               onChange={event => {
                                   this.onChange(event, 'as_of')
                               }}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create client" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}