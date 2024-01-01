import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTE_ENDPOINTS } from '../../utils/RouteEndpoints';
import Logo from '../../Assets/kafene-logo.png';
import classes from './Topbar.module.css';

const Topbar = (props) => {
    const currentLocation = useLocation().pathname;
    return (
        <div className={classes.Topbar}>
            <div className={classes.TopbarLeft}>
                <div className={classes.LogoWrapper}>
                    <img src={Logo} alt="Logo" />
                    <p className={classes.BrandName}>Kafene</p>
                </div>
                <nav className={classes.TopbarMenuWrapper}>
                    <Link className={[classes.TopbarMenuItems, currentLocation.includes('orders') ? classes.Active : null].join(' ')} to={ROUTE_ENDPOINTS.HOME_PAGE}>Orders</Link>
                    <Link className={[classes.TopbarMenuItems, currentLocation.includes('products') ? classes.Active : null].join(' ')} to={ROUTE_ENDPOINTS.PRODUCT_LIST}>Products</Link>
                    <Link className={[classes.TopbarMenuItems, currentLocation.includes('users') ? classes.Active : null].join(' ')} to={ROUTE_ENDPOINTS.USER_LIST}>Users</Link>
                </nav>

            </div>

            <div className={classes.TopbarRight}>
                {
                    props.loginStatus ?
                        <Link className={classes.TopbarMenuItems} onClick={props.onUserLoggedOut}>Logout</Link>
                        :
                        null
                }
            </div>

        </div>
    );
}

export default Topbar;