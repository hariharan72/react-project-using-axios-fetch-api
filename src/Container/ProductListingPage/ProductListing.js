import React from 'react';
import Axios from 'axios';
import classes from './ProductListing.module.css';
import { Link } from 'react-router-dom';
import { ROUTE_ENDPOINTS } from '../../utils/RouteEndpoints';

class Productpage extends React.Component {
    state = {
        productList: [],
        filteredList: [],
        allLowStock: true,
        allExpired: true,
    }

    componentDidMount() {
        Axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products')
            .then(res => {
                console.log(res.data);
                const updatedData = res.data.map(item => ({
                    ...item,
                    isExpired: new Date(item.expiryDate).getTime() < new Date().getTime(),
                    isLowStock: item.stock < 100
                }));
                this.setState({ productList: updatedData, filteredList: updatedData });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Handle the error, e.g., set an error state
            });
    }
    

    displayTableContent = (item) => {
        const dd = item.expiryDate.split('-')[0];
        const mm = item.expiryDate.split('-')[1];
        const yy = item.expiryDate.split('-')[2];

        return (
            <Link className={classes.TableLink} to={`${ROUTE_ENDPOINTS.PROD_DETAIL}/${item.id}`}>
                <tr className={[classes.TableContent, item.isExpired ? classes.ExpiredRow : null].join(' ')} key={item.id}>
                    <td className={classes.BlurText}>{item.id}</td>
                    <td className={classes.BoldText}>{item.medicineName}</td>
                    <td className={classes.BlurText}>{item.medicineBrand}</td>
                    <td className={classes.BoldText}>{`${dd} ${mm}, ${yy}`}</td>
                    <td className={classes.BlurText}>{`${item.unitPrice}`}</td>
                    <td className={classes.BlurText}>{item.stock}</td>
                </tr>
            </Link>
        )
    }

    orderStatusFunc = () => {
        const { productList, allExpired, allLowStock } = this.state;
    
        return productList.filter(item => {
            const isExpired = new Date(item.expiryDate).getTime() < new Date().getTime();
            const isLowStock = item.stock < 100;
    
            if (allExpired && allLowStock) {
                return isExpired && isLowStock;
            } else if (allExpired) {
                return isExpired;
            } else if (allLowStock) {
                return isLowStock;
            } else {
                return true;
            }
        });
    };
    
    
    
    
    
    

    onContainerClick = (type, value) => {
        switch (type) {
            case "expired":
                this.setState({ allExpired: value }, () => {
                    const newValue = this.orderStatusFunc();
                    this.setState({ filteredList: newValue });
                });
                break;
            case "lowStock":
                this.setState({ allLowStock: value }, () => {
                    const newValue = this.orderStatusFunc();
                    this.setState({ filteredList: newValue });
                });
                break;
            default:
        }
    };
    
    render() {
        var TableContents = this.state.filteredList.map(item => {
            return this.displayTableContent(item)
        })
        return (
            <div className={classes.MainContainer}>
                <h1 className={classes.MainHeading}>Products</h1>
                <div className={classes.MainContentWrapper}>
                    <div className={classes.FilterWrapper}>
                        <h3>Filters</h3>
                        <div className={classes.FilterItemsWrapper}>
                            <p className={classes.TotalCount}>Count: {this.state.filteredList.length}</p>
                            <label className={classes.Container}>
                                <input onClick={(e) => this.onContainerClick('expired', e.target.checked)} type="checkbox" checked={this.state.allExpired} name="expired" />
                                <span className={classes.Checkmark}></span>Expired
                            </label>
                            <label className={classes.Container}>
                                <input onClick={(e) => this.onContainerClick('lowStock', e.target.checked)} type="checkbox" checked={this.state.allLowStock} name="low-stock" />
                                <span className={classes.Checkmark}></span>Low Stock
                            </label>
                        </div>
                    </div>

                    <div className={classes.OrderTableWrapper}>
                        <table className={classes.OrderTable}>
                            <tr className={classes.TableHeading}>
                                <th>ID</th>
                                <th>Product Name</th>
                                <th>Product Brand</th>
                                <th style={{ minWidth: '100px' }}>Expiry Date</th>
                                <th>Unit Price</th>
                                <th>Stock</th>
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

export default Productpage;