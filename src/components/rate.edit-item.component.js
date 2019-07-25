import React, {Component} from 'react';
import axios from 'axios';
const backendUrl = 'http://localhost:4000/crud/rate';

export default class EditItem extends Component {

    constructor(props) {
        super(props);

        this._isMounted = false;

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            rate: '',
            date: '',
            eom_calc: ''
        }
    }

    componentDidMount() {
        this._isMounted = true

        axios.get(`${backendUrl}/${this.props.match.params.id}`)
            .then(response => {
                if(this._isMounted){
                    this.setState(response.data)
                }
            })
            .catch(function(error) {
                console.log(error)
            });
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

        this.props.history.push('/rate');
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Edit Interest rate</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Interest rate (%)</label>
                        <input type="number"
                                className="form-control"
                                value={this.state.rate}
                                onChange={event => {
                                    this.onChange(event, 'rate')
                                }}
                        />
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
                        <label>End of Month Calculated</label>
                        <select className="form-control"
                                value={this.state.eom_calc}
                                onChange={event => {
                                    this.onChange(event, 'eom_calc')
                                }}
                        >
                            <option label=" "></option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit interest rate" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}