import React from 'react';
import Axios from 'axios'
import classes from './OrderListing.module.css';
import { Link } from 'react-router-dom';
import { ROUTE_ENDPOINTS } from '../../utils/RouteEndpoints';

class Orderpage extends React.Component {
    state = {
        orderList: [],
        filteredList: [],
        allNew: true,
        allDelivered: true,
        allTransit: true,
        allPacked: true,
    }

    componentDidMount() {
        Axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
            .then(res => {
                console.log(res.data)
                this.setState({ orderList: res.data, filteredList: res.data });
            })
            .catch()
    }

    displayTableContent = (item) => {
        const dd = item.orderDate.split('-')[0];
        const mm = item.orderDate.split('-')[1];
        const yy = item.orderDate.split('-')[2];

        return (
            <Link className={classes.TableLink} to={`${ROUTE_ENDPOINTS.ORDER_DETAIL}/${item.id}`}>
                <tr className={classes.TableContent} key={item.id}>
                    <td className={classes.BlurText}>{item.id}</td>
                    <td className={classes.BoldText}>{item.customerName}</td>
                    <td className={classes.BoldText}>{`${dd} ${mm}, ${yy}`} <br /><span className={classes.BlurText}>{item.orderTime}</span></td>
                    <td className={classes.BlurText}>{`${item.amount}`}</td>
                    <td className={classes.BoldText}>{item.orderStatus}</td>
                </tr>
            </Link>
        )
    }

    orderStatusFunc = (type, value) => {
        if (!value) {
            return []
        }
        switch (type) {
            case "new":
                const arr = [...this.state.orderList].filter(item => {
                    return item.orderStatus === "New"
                })
                return arr;
            case "packed":
                return [...this.state.orderList].filter(item => {
                    return item.orderStatus === "Packed"
                })
            case "transit":
                return [...this.state.orderList].filter(item => {
                    return item.orderStatus === "InTransit"
                })
            case "delivered":
                return [...this.state.orderList].filter(item => {
                    return item.orderStatus === "Delivered"
                })
            default:
        }
    }

    onContainerClick = (type, value) => {
        switch (type) {
            case "new":
                if (value) {
                    var newValue = [...this.orderStatusFunc('new', value), ...this.orderStatusFunc('packed', this.state.allPacked), ...this.orderStatusFunc('transit', this.state.allTransit), ...this.orderStatusFunc('delivered', this.state.allDelivered)];
                    this.setState({ allNew: value, filteredList: [...newValue] });
                }
                else {
                    var newValue = [...this.state.filteredList].filter(item => {
                        return item.orderStatus !== 'New'
                    })
                    this.setState({ allNew: value, filteredList: newValue })
                }
                break;
            case "packed":
                if (value) {
                    var newValue = [...this.orderStatusFunc('new', this.state.allNew), ...this.orderStatusFunc('packed', value), ...this.orderStatusFunc('transit', this.state.allTransit), ...this.orderStatusFunc('delivered', this.state.allDelivered)];
                    this.setState({ allPacked: value, filteredList: [...newValue] });
                }
                else {
                    var newValue = [...this.state.filteredList].filter(item => {
                        return item.orderStatus !== 'Packed'
                    })
                    this.setState({ allPacked: value, filteredList: newValue })
                }
                break;
            case "transit":
                if (value) {
                    var newValue = [...this.orderStatusFunc('new', this.state.allNew), ...this.orderStatusFunc('packed', this.state.allPacked), ...this.orderStatusFunc('transit', value), ...this.orderStatusFunc('delivered', this.state.allDelivered)];
                    this.setState({ allTransit: value, filteredList: [...newValue] });
                }
                else {
                    var newValue = [...this.state.filteredList].filter(item => {
                        return item.orderStatus !== 'InTransit'
                    })
                    this.setState({ allTransit: value, filteredList: newValue })
                }
                break;
            case "delivered":
                if (value) {
                    var newValue = [...this.orderStatusFunc('new', this.state.allNew), ...this.orderStatusFunc('packed', this.state.allPacked), ...this.orderStatusFunc('transit', this.state.allTransit), ...this.orderStatusFunc('delivered', value)];
                    this.setState({ allDelivered: value, filteredList: [...newValue] });
                }
                else {
                    var newValue = [...this.state.filteredList].filter(item => {
                        return item.orderStatus !== 'Delivered'
                    })
                    this.setState({ allDelivered: value, filteredList: newValue })
                }
                break;
            default:

        }
    }

    render() {
        var TableContents = this.state.filteredList.map(item => {
            return this.displayTableContent(item)
        })
        return (
            <div className={classes.MainContainer}>

                <h1 className={classes.MainHeading}>Orders</h1>

                <div className={classes.MainContentWrapper}>
                    <div className={classes.FilterWrapper}>
                        <h3>Filters</h3>
                        <div className={classes.FilterItemsWrapper}>
                            <p className={classes.TotalCount}>Count: {this.state.filteredList.length}</p>
                            <label className={classes.Container}>
                                <input onClick={(e) => this.onContainerClick('new', e.target.checked)} type="checkbox" checked={this.state.allNew} name="new" />
                                <span className={classes.Checkmark}></span>New
                            </label>
                            <label className={classes.Container}>
                                <input onClick={(e) => this.onContainerClick('packed', e.target.checked)} type="checkbox" checked={this.state.allPacked} name="packed" />
                                <span className={classes.Checkmark}></span>Packed
                            </label>
                            <label className={classes.Container}>
                                <input onClick={(e) => this.onContainerClick('transit', e.target.checked)} type="checkbox" checked={this.state.allTransit} name="transit" />
                                <span className={classes.Checkmark}></span>InTransit
                            </label>
                            <label className={classes.Container}>
                                <input onClick={(e) => this.onContainerClick('delivered', e.target.checked)} type="checkbox" checked={this.state.allDelivered} name="delivered" />
                                <span className={classes.Checkmark}></span>Delivered
                            </label>
                        </div>
                    </div>

                    <div className={classes.OrderTableWrapper}>
                        <table className={classes.OrderTable}>
                            <tr className={classes.TableHeading}>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th style={{ marginLeft: '-30px' }}>Amount</th>
                                <th>Status</th>
                            </tr>

                            <tbody>
                                {TableContents}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Orderpage;