import React, {Component} from 'react';
import axios from 'axios';
import {Item} from './rate.item-list.component'
const backendUrl = 'http://localhost:4000/crud/rate'

export default class DeleteItem extends Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);

        this.state = {
            rate: '',
            date: '',
            eom_calc: ''
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
        .then(console.log(`Rate ${this.props.match.params.id} deleted`))
        .catch(err => (console.log(err)));

        this.props.history.push('/rate');
    }

    render() {
        return(
            <div style={{marginTop: 20}}>
                <h3>Are you sure you want to delete this Interest rate?</h3>
                <table className="table table-striped" style={{marginTop: 1 + 'em'}}>
                    <thead>
                        <tr>
                            <th>Interest rate</th>
                            <th>Date</th>
                            <th>End of month calculated</th>
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