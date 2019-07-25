import React, {Component} from 'react';
import axios from 'axios';
const backendUrl = 'http://localhost:4000/crud/rate'; 

export default class CreateItem extends Component {
    _isMounted = false;


    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            rate: '',
            date: '',
            eom_calc: 'No'
        }
    }

    componentDidMount() {
        this._isMounted = true;

        axios.get(`${backendUrl}/last`)
            .then(response => {
                if(this._isMounted) {
                    let resDate = response.data.date;
                    let splitDate = resDate.split('-').map(num => parseInt(num))
                    // Add 1 to the month
                    splitDate[1] += 1;
                    let newDate = splitDate.map(num => num < 10 ? `0${num.toString()}` : num.toString()).join('-');
                    this.setState({
                        date: newDate
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get(`${backendUrl}/last`)
            .then(response => {
                if(this._isMounted) {
                    let resDate = response.data.date;
                    let splitDate = resDate.split('-').map(num => parseInt(num))
                    // Add 1 to the month
                    splitDate[1] += 1
                    let newDate = splitDate.map(num => num < 10 ? `0${num.toString()}` : num.toString()).join('-');
                    this.setState({
                        date: newDate
                    });
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

        const newItem = JSON.parse(JSON.stringify(this.state));

        axios.post(`${backendUrl}/add`, newItem)
            .then(res => console.log(res.data));

        this.setState({
            rate: '',
            date: '',
            eom_calc: ''
        })

        this.props.history.push('/rate');
    }



    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create new Interest rate</h3>
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
                               readOnly={true}
                        />
                    </div>
                    <div className="form-group">
                        <label>End of Month Calculated</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.eom_calc}
                               readOnly
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create interest rate" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}