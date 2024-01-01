import React from 'react';
import classes from './App.module.css';
import Topbar from './Components/Topbar/Topbar';
import Orderpage from './Container/OrderListingPage/OrderListing';
import Productpage from './Container/ProductListingPage/ProductListing';
import Userpage from './Container/UserListingPage/UserListing';
import Loginpage from './Container/LoginPage/Login';
import Orderdetails from "./Container/OrderDetailsPage/OrderDetails";
import Productdetails from "./Container/ProductDetailsPage/ProductDetails";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ROUTE_ENDPOINTS } from './utils/RouteEndpoints';

class App extends React.Component {
  state = {
    loginStatus: localStorage.getItem('loginStatus') === "true",
    currentPage: localStorage.getItem('currentPage') ? localStorage.getItem('currentPage') : '',
  }

  onUserLoggedIn = () => {
    localStorage.setItem('loginStatus', true)
    this.setState({ loginStatus: true })
  }

  onUserLoggedOut = () => {
    localStorage.setItem('loginStatus', false)
    this.setState({ loginStatus: false })
  }

  pageUpdate = () => {
    this.setState({ currentPage: localStorage.getItem('currentPage') ? localStorage.getItem('currentPage') : '' })
  }

  render() {
    return (
      
      <BrowserRouter>
        <div className={classes.App}>
          <Topbar loginStatus={this.state.loginStatus} onUserLoggedOut={this.onUserLoggedOut} />
          <main className={classes.MainContainer}>
            <Switch>
              {
                !this.state.loginStatus ?
                  <>
                    <Route path={ROUTE_ENDPOINTS.LOGIN_PAGE} render={() => <Loginpage onUserLoggedIn={this.onUserLoggedIn} />} />
                    <Route render={() => <Redirect to={ROUTE_ENDPOINTS.LOGIN_PAGE} />} />
                  </>
                  :
                  <>
                    <Route path={ROUTE_ENDPOINTS.ORDER_LIST} component={Orderpage} />
                    <Route path={ROUTE_ENDPOINTS.ORDER_DETAIL + '/:id'} component={Orderdetails} />
                    <Route path={ROUTE_ENDPOINTS.PROD_DETAIL + '/:id'} component={Productdetails} />
                    <Route path={ROUTE_ENDPOINTS.LOGIN_PAGE} component={() => <Redirect to={!this.state.loginStatus ? ROUTE_ENDPOINTS.LOGIN_PAGE : ROUTE_ENDPOINTS.ORDER_LIST} />} />
                    <Route path={ROUTE_ENDPOINTS.PRODUCT_LIST} component={Productpage} />
                    <Route path={ROUTE_ENDPOINTS.USER_LIST} component={Userpage} />
                    <Route exact path={ROUTE_ENDPOINTS.HOME_PAGE} render={() => <Redirect to={!this.state.loginStatus ? ROUTE_ENDPOINTS.LOGIN_PAGE : ROUTE_ENDPOINTS.ORDER_LIST} />} />
                    
                  </>
              }
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;

