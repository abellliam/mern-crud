import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import axios from 'axios';
const backendUrl = 'http://localhost:4000/crud/transaction'

export const Item = props => (
    <tr>
        <td>{props.item.client_code}</td>
        <td>{props.item.date}</td>
        <td>{props.item.type}</td>
        <td>{`$${props.item.amount.toLocaleString()}`}</td>
        {props.displayActions && 
            <td>
                <Link className='btn btn-success' to={`transaction/edit/${props.item._id}`}>Edit</Link>
                <Link className='btn btn-danger' style={{marginLeft: 1 + 'em'}} to={`transaction/delete/${props.item._id}`}>Delete</Link>
            </td>
        }
    </tr>
);

export default class itemList extends Component {
        render() {
        return (
            <div style={{marginTop: 20}}>
                <h3 style={{display: 'inline'}}>Transaction list</h3>
                <ReactToPrint 
                    trigger={() => <button style ={{display: 'inline', float: 'right', marginRight: '20px'}} className='btn btn-primary'>Print list</button>}
                    content={() => this.componentRef}
                />
                <button 
                    style={{display: 'inline', float: 'right', marginRight: '20px'}}
                    className='btn btn-secondary'
                    onClick={() => this.componentRef.setState({displayActions: !this.componentRef.state.displayActions})}
                >
                    Display actions
                </button>
                <Table ref={el => (this.componentRef = el)} displayActions = {true} />
            </div>
        )
    }
}

class Table extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {items: [],
                      displayActions: true};
    }

    componentDidMount() {
        this._isMounted = true;

        axios.get(`${backendUrl}`)
            .then(response => {
                if(this._isMounted) {
                    this.setState({
                        items: response.data
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get(`${backendUrl}`)
            .then(response => {
                if(this._isMounted) {
                    this.setState({items: response.data})
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    itemList(displayActions) {
        return this.state.items.map(function(currentItem, idx) {
            return <Item item={currentItem} key={idx} displayActions={displayActions} />
        });
    }

    render() {
        return (
            <table className="table table-striped" style={{marginTop: 1 + 'em'}}>
                    <thead>
                        <tr>
                            <th>Client Code</th>
                            <th>Transaction Date</th>
                            <th>Transaction Type</th>
                            <th>Amount</th>
                            {this.state.displayActions &&
                                <th>Actions</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        { this.itemList(this.state.displayActions) }
                    </tbody>
                </table>
        )
    }
}