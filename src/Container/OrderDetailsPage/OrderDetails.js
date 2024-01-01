import React from 'react';
import Axios from 'axios'
import classes from './OrderDetails.module.css';

class Orderdetails extends React.Component {

    state = {
        orderData: {},
    }


    componentDidMount() {
        const OrderId = this.props.match.params.id;
        Axios.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders/${OrderId}`)
            .then(Response => {
                console.log(Response.data);
                this.setState({ orderData: { ...Response.data } });
            })
            .catch(err => {
                console.log("Call Failed!!");
            })

    }



    render() {

        return (
            <div className={classes.MainWrapper}>
                <div className={classes.ProdContainer}>
                    <h1>Order</h1>
                    <div key={this.state.orderData.id} className={classes.ProdItems}><h4>Order ID: </h4><p>{this.state.orderData.id}</p></div>
                    <div className={classes.ProdItems}><h4>Customer Name: </h4><p>{this.state.orderData.customerName}</p></div>
                    <div className={classes.ProdItems}><h4>Order Date: </h4><p>{this.state.orderData.orderDate}</p></div>
                    <div className={classes.ProdItems}><h4>Order Amount: </h4><p>{this.state.orderData.amount}</p></div>
                    <div className={classes.ProdItems}><h4>Order Status: </h4><p>{this.state.orderData.orderStatus}</p></div>
                </div>
            </div>
        )

    }
}

export default Orderdetails;

