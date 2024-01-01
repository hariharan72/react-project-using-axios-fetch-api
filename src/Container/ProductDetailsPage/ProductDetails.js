import React from 'react';
import Axios from 'axios'
import classes from './ProductDetails.module.css';

class Productdetails extends React.Component {

    state = {
        prodData: {},
    }


    componentDidMount() {
        const OrderId = this.props.match.params.id;
        Axios.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products/${OrderId}`)
            .then(Response => {
                console.log(Response.data);
                this.setState({ prodData: { ...Response.data } });
            })
            .catch(err => {
                console.log("Call Failed!!");
            })

    }



    render() {

        return (
            <div className={classes.MainWrapper}>
                <div className={classes.ProdContainer}>
                    <h1>Product</h1>
                    <div key={this.state.prodData.id} className={classes.ProdItems}><h4>Product ID: </h4><p>{this.state.prodData.id}</p></div>
                    <div className={classes.ProdItems}><h4>Product Name: </h4><p>{this.state.prodData.medicineName}</p></div>
                    <div className={classes.ProdItems}><h4>Product Brand: </h4><p>{this.state.prodData.medicineBrand}</p></div>
                    <div className={classes.ProdItems}><h4>Expiry Date: </h4><p>{this.state.prodData.expiryDate}</p></div>
                    <div className={classes.ProdItems}><h4>Unit Price: </h4><p>{this.state.prodData.unitPrice}</p></div>
                    <div className={classes.ProdItems}><h4>Stock: </h4><p>{this.state.prodData.stock}</p></div>
                </div>
            </div>
        )

    }
}

export default Productdetails;

