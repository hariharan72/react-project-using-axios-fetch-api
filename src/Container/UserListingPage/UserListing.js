import React from 'react';
import Axios from 'axios'
import classes from './UserListing.module.css';

class Userpage extends React.Component {
    state = {
        productList: [],
        filteredList: [],
        showExpired: true,
        showLowStock: true,
    }

    componentDidMount() {
        Axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users')
            .then(res => {
                console.log(res.data)
                this.setState({ productList: res.data, filteredList: res.data });
            })
            .catch()
    }

    displayTableContent = (item) => {
        const dd = item.dob.split('-')[0];
        const mm = item.dob.split('-')[1];
        const yy = item.dob.split('-')[2];

        return (
            <tr className={[classes.TableContent, item.isExpired ? classes.ExpiredRow : null].join(' ')} key={item.id}>
                <td className={classes.BlurText}>{item.id}</td>
                <td className={classes.BoldText}><img className={classes.ProfilePic} src={item.profilePic} alt="Profile Pic" /></td>
                <td className={classes.BlurText}>{item.fullName}</td>
                <td className={classes.BoldText}>{`${dd} ${mm}, ${yy}`}</td>
                <td className={classes.BlurText}>{`${item.gender}`}</td>
                <td className={classes.BlurText}>{`${item.currentCity}, ${item.currentCountry}`}</td>
            </tr>
        )
    }

    orderStatusFunc = (type, value) => {
        if (!value) {
            return []
        }
        switch (type) {
            case "expired":
                const arr = [...this.state.productList].filter(item => {
                    return item.isExpired
                })
                return arr;
            case "lowStock":
                return [...this.state.productList].filter(item => {
                    return item.isLowStock
                })
            case "others":
                var result = [...this.state.productList].filter(item => {
                    return !item.isLowStock
                }).filter(item => {
                    return !item.isExpired
                })
                result.pop()
                result.pop()
                return result
        }
    }

    filterClickFunc = (type, value) => {
        switch (type) {
            case "expired":
                if (value) {
                    var updatedVal = [...this.orderStatusFunc('expired', value), ...this.orderStatusFunc('lowStock', this.state.showLowStock), ...this.orderStatusFunc('others', value)];

                    this.setState({ showExpired: value, filteredList: [...updatedVal] });
                } else {
                    var updatedVal = [...this.state.filteredList].filter(item => {
                        return !item.isExpired
                    })
                    this.setState({ showExpired: value, filteredList: updatedVal })
                }
                break;
            case "lowStock":
                if (value) {
                    var updatedVal = [...this.orderStatusFunc('expired', this.state.showExpired), ...this.orderStatusFunc('lowStock', value), ...this.orderStatusFunc('others', value)];

                    this.setState({ showLowStock: value, filteredList: [...updatedVal] });
                } else {
                    var updatedVal = [...this.state.filteredList].filter(item => {
                        return !item.isLowStock
                    })
                    this.setState({ showLowStock: value, filteredList: updatedVal })
                }
                break;
        }
    }

    searchFunc = (e) => {
        if (e.keyCode === 13) {
            if (e.target.value.length < 2) {
                alert('Please enter at least 2 characters');
                this.setState({ filteredList: [...this.state.productList] });
            } else {
                Axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=' + e.target.value)
                    .then(res => {
                        console.log(res.data);
    
                        // Check if the response data is empty
                        if (res.data.length === 0) {
                            alert('No users found.');
                        } else {
                            this.setState({ filteredList: res.data });
                        }
                    })
                    .catch(error => {
                        // Handle the error, e.g., log it or show a generic error message
                        console.error('Error fetching data:', error);
                    });
            }
        }
    }
    

    resetFunc = () => {
        Axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users')
            .then(res => {
                console.log(res.data)
                this.setState({ filteredList: res.data });
            })
            .catch()
    }

    render() {
        var TableContents = this.state.filteredList.map(item => {
            return this.displayTableContent(item)
        })
        return (
            <div className={classes.MainContainer}>
                <h1 className={classes.MainHeading}>Users</h1>
                <div className={classes.MainContentWrapper}>

                    <div className={classes.SearchWrapper}>
                        <form className={classes.SearchForm} onSubmit={(e) => e.preventDefault()}>
                            <input onKeyUp={this.searchFunc} className={classes.SearchBox} type="search" placeholder="Search by Name" />
                            <input type="reset" onClick={this.resetFunc} className={classes.ResetBtn} value="Reset" />
                        </form>
                    </div>

                    <div className={classes.OrderTableWrapper}>
                        <table className={classes.OrderTable}>
                            <tr className={classes.TableHeading}>
                                <th>ID</th>
                                <th>User Avatar</th>
                                <th>Full Name</th>
                                <th style={{ minWidth: '100px' }}>DoB</th>
                                <th>Gender</th>
                                <th>Current Location</th>
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

export default Userpage;